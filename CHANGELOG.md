# Wedding Website Changelog

## [Unreleased] - 2026-01-05

### Added - RSVP Feature with Authorized Guest Control

#### New Features
- **Database-backed RSVP system** with PostgreSQL
- **Authorized guest control** - Only guests with pre-generated links can RSVP
- **Admin dashboard** at `/admin/rsvp` for viewing all RSVP responses
- **Guest authorization API** - Automatic authorization when generating links from `/admin`
- **RSVP statistics** - Real-time counts of Yes/No/Maybe responses per party
- **CSV export** - Download all RSVP responses
- **Secure authentication** - Session-based admin login with bcrypt password hashing

#### Database Schema
- `rsvps` - Stores guest RSVP responses (Yes/No/Maybe)
- `authorized_guests` - Controls who can access RSVP form
- `admin_users` - Admin login credentials
- `admin_sessions` - Session management with auto-expiry

#### New API Endpoints
- `POST /api/admin/authorized-guests` - Authorize a guest for RSVP (admin only)
- `GET /api/guest/check-authorization` - Check if guest can RSVP (public)
- `GET /api/rsvp` - Get existing RSVP (public)
- `POST /api/rsvp` - Submit/update RSVP (public)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/verify` - Verify admin session
- `GET /api/admin/rsvps` - List all RSVPs with filters (admin only)
- `DELETE /api/admin/rsvps/:id` - Delete RSVP (admin only)
- `GET /api/admin/rsvps/export` - Export RSVPs to CSV (admin only)

#### Admin Tools
- `npm run create-admin` - Interactive script to create admin users
- `npm run pre-migration-check` - Verify environment before migration

#### Documentation
- `MIGRATION_GUIDE.md` - Complete step-by-step migration instructions
- `QUICK_MIGRATION.md` - Quick reference for production migration
- `RSVP_README.md` - RSVP feature documentation
- `scripts/pre-migration-check.sh` - Automated pre-migration validation

### Changed

#### Admin Dashboard Consolidation (2026-01-05)
- **Merged `/admin` and `/admin/rsvp` into unified dashboard** at `/admin/rsvp`
- Added tabbed interface for better organization:
  - **RSVP Responses Tab**: View, filter, delete, and export all RSVP submissions
  - **Guest Links Tab**: Generate personalized invitation links, manage guest list
- Single authentication system (database-backed sessions instead of client-side password)
- Auto-authorizes guests in database when generating links
- **Removed localStorage dependency** - All guest links now stored in database
- Added `guest_links` table for persistent guest link storage
- Removed old `/admin` page

#### Infrastructure
- **Docker Compose** - Added PostgreSQL service with health checks
- **Dockerfile** - Updated to include scripts and database directories
- **Environment variables** - Added database and session configuration

#### Components
- **RSVPSection** - Now checks guest authorization before showing form
- **RSVPForm** - Integrated with database backend

### Fixed

#### Build Issues (2026-01-05)
- **TypeScript error** in route handler middleware - Added support for dynamic route params
- **PostgreSQL type constraint** - Fixed generic type to extend `QueryResultRow`
- **Docker build** - Added scripts directory to container for admin tools
- **Route params** - Updated for Next.js 15+ async params pattern

#### Type Fixes
- `src/lib/auth/middleware.ts` - Updated `requireAuth` to support handlers with optional context
- `src/lib/db/connection.ts` - Added `QueryResultRow` type constraint to query function
- `src/app/api/admin/rsvps/[id]/route.ts` - Fixed async params handling

### Technical Details

#### Authentication Flow
1. Admin logs in at `/admin/rsvp` with username/password
2. Server validates credentials against `admin_users` table
3. Session token stored in HTTP-only cookie (24-hour expiry)
4. Token validated on each admin API request

#### RSVP Authorization Flow
1. Admin generates guest link from `/admin` page
2. Guest name + party saved to `authorized_guests` table
3. Guest visits personalized link with `?party=X&guest=base64name`
4. Frontend checks authorization via `/api/guest/check-authorization`
5. RSVP form shown only if authorized

#### Database Connection
- Connection pooling with max 10 connections
- Idle timeout: 30 seconds
- Connection timeout: 2 seconds
- Slow query logging (>100ms)

#### Security Features
- Bcrypt password hashing (10 salt rounds)
- HTTP-only session cookies
- Secure flag in production (HTTPS only)
- SameSite=Strict (CSRF protection)
- Parameterized SQL queries (SQL injection prevention)
- Input validation on all API endpoints

### Migration Notes

#### Breaking Changes
- Requires PostgreSQL database
- Requires environment variables: `DATABASE_URL`, `ADMIN_SESSION_SECRET`
- Admin user must be created after deployment

#### Backward Compatibility
- `/admin` page still works with localStorage (existing guest links)
- New guest links auto-authorize in database
- Non-breaking for existing visitors

#### Deployment Steps
1. Add database environment variables to `.env`
2. Sync code to production server
3. Build new Docker images
4. Start PostgreSQL first (auto-initializes schema)
5. Create admin user with `npm run create-admin`
6. Start all services

### Dependencies Added
- `pg@^8.11.3` - PostgreSQL client
- `bcryptjs@^2.4.3` - Password hashing
- `tsx` - TypeScript execution for admin scripts
- `@types/pg@^8.10.9` - PostgreSQL type definitions
- `@types/bcryptjs@^2.4.6` - Bcrypt type definitions

### Configuration Files
- `.env.example` - Updated with database and session variables
- `docker-compose.yml` - Added postgres service
- `database/schema.sql` - Database schema with all tables
- `database/init.sql` - Database initialization script

---

## Previous Releases

### [Phase 2] - Deployed
- Migrated to React + TypeScript + Shadcn + TailwindCSS
- Hand-made SVG illustrations
- QR code for bank transfer
- Query params to hide/show sections
- Navigation bar
- Thank you footer section

### [Phase 1] - Deployed
- Basic layout and sections
- Optimized images for web
- Music player with playlist
- Caddy Dockerfile for production
- Docker compose production deployment
