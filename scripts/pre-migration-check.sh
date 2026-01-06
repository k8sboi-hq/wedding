#!/bin/bash

# Pre-Migration Check Script
# Run this script BEFORE migrating to verify everything is ready

set -e

echo "🔍 Wedding Website - Pre-Migration Check"
echo "========================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Function to print success
success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Function to print error
error() {
    echo -e "${RED}✗${NC} $1"
    ((ERRORS++))
}

# Function to print warning
warning() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

# Check if .env file exists
echo "Checking environment configuration..."
if [ -f .env ]; then
    success ".env file exists"
else
    error ".env file not found"
    echo "  Run: cp .env.example .env"
fi

# Check required environment variables
if [ -f .env ]; then
    source .env 2>/dev/null || true

    # Check DATABASE_URL
    if [ -n "$DATABASE_URL" ] && [ "$DATABASE_URL" != "postgresql://wedding_user:your_secure_postgres_password_here@postgres:5432/wedding_rsvp" ]; then
        success "DATABASE_URL is set"
    else
        error "DATABASE_URL not configured properly"
    fi

    # Check POSTGRES_PASSWORD
    if [ -n "$POSTGRES_PASSWORD" ] && [ "$POSTGRES_PASSWORD" != "your_secure_postgres_password_here" ]; then
        success "POSTGRES_PASSWORD is set"
    else
        error "POSTGRES_PASSWORD not configured properly"
        echo "  Run: openssl rand -base64 32"
    fi

    # Check ADMIN_SESSION_SECRET
    if [ -n "$ADMIN_SESSION_SECRET" ] && [ "$ADMIN_SESSION_SECRET" != "your_random_32_character_secret_here" ]; then
        success "ADMIN_SESSION_SECRET is set"
    else
        error "ADMIN_SESSION_SECRET not configured properly"
        echo "  Run: openssl rand -base64 32"
    fi

    # Check NEXT_PUBLIC_BASE_URL
    if [ -n "$NEXT_PUBLIC_BASE_URL" ]; then
        success "NEXT_PUBLIC_BASE_URL is set to: $NEXT_PUBLIC_BASE_URL"
    else
        warning "NEXT_PUBLIC_BASE_URL not set"
    fi
fi

echo ""
echo "Checking required files..."

# Check docker-compose.yml
if [ -f docker-compose.yml ]; then
    success "docker-compose.yml exists"
else
    error "docker-compose.yml not found"
fi

# Check Dockerfile
if [ -f Dockerfile ]; then
    success "Dockerfile exists"
else
    error "Dockerfile not found"
fi

# Check database schema
if [ -f database/schema.sql ]; then
    success "database/schema.sql exists"
else
    error "database/schema.sql not found"
fi

# Check package.json for required scripts
if [ -f package.json ]; then
    if grep -q "create-admin" package.json; then
        success "package.json has create-admin script"
    else
        error "package.json missing create-admin script"
    fi
fi

echo ""
echo "Checking migration guides..."

# Check migration guides exist
if [ -f MIGRATION_GUIDE.md ]; then
    success "MIGRATION_GUIDE.md exists"
else
    warning "MIGRATION_GUIDE.md not found"
fi

if [ -f QUICK_MIGRATION.md ]; then
    success "QUICK_MIGRATION.md exists"
else
    warning "QUICK_MIGRATION.md not found"
fi

echo ""
echo "Checking database schema..."

# Check if authorized_guests table is in schema
if grep -q "CREATE TABLE.*authorized_guests" database/schema.sql; then
    success "authorized_guests table in schema"
else
    error "authorized_guests table not found in schema"
fi

# Check if admin_users table is in schema
if grep -q "CREATE TABLE.*admin_users" database/schema.sql; then
    success "admin_users table in schema"
else
    error "admin_users table not found in schema"
fi

# Check if admin_sessions table is in schema
if grep -q "CREATE TABLE.*admin_sessions" database/schema.sql; then
    success "admin_sessions table in schema"
else
    error "admin_sessions table not found in schema"
fi

# Check if rsvps table is in schema
if grep -q "CREATE TABLE.*rsvps" database/schema.sql; then
    success "rsvps table in schema"
else
    error "rsvps table not found in schema"
fi

echo ""
echo "Checking source code..."

# Check if API routes exist
if [ -f src/app/api/admin/authorized-guests/route.ts ]; then
    success "Authorized guests API route exists"
else
    error "Authorized guests API route not found"
fi

if [ -f src/app/api/guest/check-authorization/route.ts ]; then
    success "Check authorization API route exists"
else
    error "Check authorization API route not found"
fi

# Check database query functions
if [ -f src/lib/db/queries.ts ]; then
    if grep -q "authorizeGuest" src/lib/db/queries.ts; then
        success "authorizeGuest function exists in queries.ts"
    else
        error "authorizeGuest function not found in queries.ts"
    fi

    if grep -q "isGuestAuthorized" src/lib/db/queries.ts; then
        success "isGuestAuthorized function exists in queries.ts"
    else
        error "isGuestAuthorized function not found in queries.ts"
    fi
fi

echo ""
echo "========================================"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! Ready for migration.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Review MIGRATION_GUIDE.md for detailed instructions"
    echo "2. Or use QUICK_MIGRATION.md for quick reference"
    echo "3. Run: npm run rsync (to sync to production)"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ $WARNINGS warning(s) found. Review before proceeding.${NC}"
    echo ""
    echo "You can proceed with migration, but review warnings above."
    exit 0
else
    echo -e "${RED}✗ $ERRORS error(s) found. Fix before migrating.${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠ $WARNINGS warning(s) also found.${NC}"
    fi
    echo ""
    echo "Fix the errors above before proceeding with migration."
    exit 1
fi
