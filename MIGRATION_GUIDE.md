# Production Migration Guide - RSVP Feature

**Migration Date:** 2026-01-05
**Feature:** Database-backed RSVP system with authorized guest control
**Estimated Downtime:** ~5-10 minutes

---

## 📋 Pre-Migration Checklist

- [ ] Backup current deployment
- [ ] Review .env configuration
- [ ] Test locally first (optional but recommended)
- [ ] Schedule migration during low traffic time

---

## 🔧 Step-by-Step Migration Instructions

### Step 1: Backup Current Deployment

On your **local machine**:

```bash
# Backup the production deployment directory
ssh docker-prod "cd /home/deployer/deployment && tar -czf ~/wedding-backup-$(date +%Y%m%d-%H%M%S).tar.gz ."

# Download backup to local machine (optional)
scp docker-prod:~/wedding-backup-*.tar.gz ~/backups/
```

### Step 2: Update Environment Variables

On your **local machine**, update `.env` file:

```bash
# Edit .env file
nano .env
```

Add these new variables (if not already present):

```bash
# PostgreSQL Database
POSTGRES_DB=wedding_rsvp
POSTGRES_USER=wedding_user
POSTGRES_PASSWORD=<generate-secure-password>

# Database URL for application
DATABASE_URL=postgresql://wedding_user:<your-password>@postgres:5432/wedding_rsvp

# Admin session secret (32+ characters)
ADMIN_SESSION_SECRET=<generate-secure-secret>

# Session expiry in hours
SESSION_EXPIRY_HOURS=24
```

**Generate secure values:**

```bash
# Generate PostgreSQL password
openssl rand -base64 32

# Generate admin session secret
openssl rand -base64 32
```

Copy these values into your `.env` file.

### Step 3: Sync Code to Production Server

On your **local machine**:

```bash
# Sync all files to production server
npm run rsync

# Or manually:
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  ~/working/wedding-website/ \
  docker-prod:/home/deployer/deployment/
```

### Step 4: SSH into Production Server

```bash
ssh docker-prod
cd /home/deployer/deployment
```

**All remaining steps are executed on the production server.**

---

### Step 5: Stop Current Services

```bash
# Stop all running containers
docker compose down

# Verify containers are stopped
docker compose ps
```

**Expected output:** No containers running.

---

### Step 6: Verify Environment Configuration

```bash
# Check that .env file exists and has required variables
cat .env | grep -E "DATABASE_URL|ADMIN_SESSION_SECRET|POSTGRES"

# Expected output should show all database and session variables
```

If any variables are missing, add them now:

```bash
nano .env
# Add missing variables, then save (Ctrl+O, Enter, Ctrl+X)
```

---

### Step 7: Build New Docker Images

```bash
# Build with no cache to ensure latest code
docker compose build --no-cache

# This may take 5-10 minutes
```

**Expected output:** Build completes successfully with "Successfully tagged..." message.

---

### Step 8: Start PostgreSQL Database Only

```bash
# Start only the postgres service
docker compose up -d postgres

# Wait for database to be ready (check health status)
docker compose ps

# Wait until postgres shows "healthy" status
# This may take 10-30 seconds
```

**Verify database is ready:**

```bash
docker compose logs postgres | tail -20
```

Look for: `"database system is ready to accept connections"`

---

### Step 9: Verify Database Schema

The schema should be automatically initialized from `database/schema.sql` on first startup.

Verify tables were created:

```bash
docker exec -it wedding-postgres psql -U wedding_user -d wedding_rsvp -c "\dt"
```

**Expected output:** List of tables including:
- `rsvps`
- `authorized_guests`
- `admin_sessions`
- `admin_users`

If tables are missing, manually run the schema:

```bash
docker exec -i wedding-postgres psql -U wedding_user -d wedding_rsvp < database/schema.sql
```

---

### Step 10: Create Admin User

```bash
# Create admin user for /admin/rsvp access
docker exec -it wedding-app npm run create-admin
```

**Interactive prompts:**
1. **Username:** `admin` (or your preferred username)
2. **Password:** Enter a strong password (min 8 characters)
3. **Confirm password:** Re-enter the same password

**Expected output:**
```
✅ Admin user "admin" created successfully!
✨ You can now login to /admin with these credentials
```

**⚠️ IMPORTANT:** Save these credentials securely! You'll need them to access `/admin/rsvp`.

**If you get "scripts/create-admin.ts not found" error:**

This means the Docker image was built before the Dockerfile was updated to include scripts. Rebuild:

```bash
docker compose down
docker compose build --no-cache wedding-app
docker compose up -d
```

Then try creating the admin user again.

---

### Step 11: Start All Services

```bash
# Start all services
docker compose up -d

# Check status of all services
docker compose ps
```

**Expected output:** All services should show "Up" status:
- `wedding-postgres` - Up (healthy)
- `wedding-app` - Up (healthy)
- `caddy` - Up (healthy)
- `cf-tunnel` - Up (if using Cloudflare Tunnel)

---

### Step 12: Verify Application Logs

```bash
# Check application logs for errors
docker compose logs wedding-app | tail -50

# Check for successful database connection
docker compose logs wedding-app | grep -i "database\|postgres"
```

**Look for:**
- ✅ `"📊 PostgreSQL connection pool created"`
- ✅ `"✅ Database connection successful"`
- ❌ No error messages about database connections

If you see errors, check the DATABASE_URL in `.env` matches the postgres credentials.

---

### Step 13: Test Website Availability

```bash
# Test website responds
curl -I http://localhost:8080

# Expected: HTTP/1.1 200 OK
```

Or from your local machine:

```bash
curl -I https://wedding.khoahuynh.dev

# Expected: HTTP/2 200
```

---

### Step 14: Test Admin Login

**From your browser:**

1. Go to `https://wedding.khoahuynh.dev/admin/rsvp`
2. Login with the admin credentials you created in Step 10
3. You should see the unified Admin Dashboard with two tabs

**Expected:** Login succeeds and you see the admin dashboard with:
- **RSVP Responses Tab**: Statistics (Total, Yes, No, Maybe, Party 1, Party 2), filters, RSVP list
- **Guest Links Tab**: Guest link generation form, guest list with copy/delete actions

---

### Step 15: Test Guest Link Generation

1. In the Admin Dashboard, click the **"Guest Links"** tab
2. Add a test guest:
   - **Name:** "Test Guest"
   - **Party:** Party 1
   - Click **"Generate Link"**
3. The guest will appear in the guest list below
4. Click **"Copy Link"** next to the guest
5. Open the link in an **incognito/private window**
6. **Expected:** You should see:
   - Personalized invitation card with "Test Guest" name
   - RSVP form (Yes/No/Maybe buttons)

---

### Step 16: Test Unauthorized Guest

1. Visit `https://wedding.khoahuynh.dev/?party=1&guest=VW5hdXRob3JpemVkIEd1ZXN0`
   (This is a guest NOT in the authorized list)
2. **Expected:** You should see:
   - Personalized invitation card
   - **NO RSVP form**
   - Message: "Cảm ơn bạn đã ghé thăm! 💐"

---

### Step 17: Verify Database Tables

```bash
# Check authorized_guests table
docker exec -it wedding-postgres psql -U wedding_user -d wedding_rsvp -c \
  "SELECT id, guest_name, party FROM authorized_guests;"

# Should show "Test Guest" if you completed Step 15
```

```bash
# Check if admin user exists
docker exec -it wedding-postgres psql -U wedding_user -d wedding_rsvp -c \
  "SELECT username FROM admin_users;"

# Should show "admin" or your chosen username
```

---

### Step 18: Monitor Logs (Optional)

Keep logs running in a separate terminal to monitor for issues:

```bash
# Follow all logs
docker compose logs -f

# Or follow specific service
docker compose logs -f wedding-app
```

Press `Ctrl+C` to stop following logs.

---

## ✅ Migration Complete!

Your production deployment now includes:

- ✅ PostgreSQL database with RSVP system
- ✅ Authorized guest control (only pre-generated links can RSVP)
- ✅ Admin dashboard at `/admin/rsvp` for viewing responses
- ✅ Guest link generator at `/admin` for creating invitation links
- ✅ Secure authentication for admin access

---

## 🧪 Post-Migration Testing Checklist

- [ ] Main website loads correctly
- [ ] All images and assets load
- [ ] Music player works
- [ ] Countdown timer works
- [ ] Guest link generation works (`/admin`)
- [ ] Admin RSVP dashboard works (`/admin/rsvp`)
- [ ] Authorized guests can see RSVP form
- [ ] Unauthorized guests cannot see RSVP form
- [ ] RSVP submission works
- [ ] RSVP responses appear in admin dashboard
- [ ] CSV export works

---

## 🔄 Rollback Instructions (If Needed)

If something goes wrong, you can rollback to the previous version:

```bash
# Stop current deployment
docker compose down

# Restore from backup
cd ~
tar -xzf wedding-backup-*.tar.gz -C /home/deployer/deployment/

# Start old version
cd /home/deployer/deployment
docker compose up -d
```

---

## 📊 Database Management

### Backup Database

```bash
# Manual backup
docker exec wedding-postgres pg_dump -U wedding_user wedding_rsvp > \
  ~/wedding_rsvp_backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore Database

```bash
# Restore from backup
docker exec -i wedding-postgres psql -U wedding_user -d wedding_rsvp < \
  ~/wedding_rsvp_backup_20260105_143000.sql
```

### View All RSVPs

```bash
docker exec -it wedding-postgres psql -U wedding_user -d wedding_rsvp -c \
  "SELECT guest_name, party, status, notes, created_at FROM rsvps ORDER BY created_at DESC;"
```

### View Authorized Guests

```bash
docker exec -it wedding-postgres psql -U wedding_user -d wedding_rsvp -c \
  "SELECT guest_name, party, created_at FROM authorized_guests ORDER BY created_at DESC;"
```

---

## 🆘 Troubleshooting

### Issue: Database connection errors

**Solution:**
```bash
# Check database is running
docker compose ps postgres

# Check database logs
docker compose logs postgres

# Verify DATABASE_URL in .env
cat .env | grep DATABASE_URL

# Restart database
docker compose restart postgres
```

### Issue: Admin login fails

**Solution:**
```bash
# Recreate admin user
docker exec -it wedding-app npm run create-admin

# Check admin_users table
docker exec -it wedding-postgres psql -U wedding_user -d wedding_rsvp -c \
  "SELECT username FROM admin_users;"
```

### Issue: "scripts/create-admin.ts not found"

**Solution:**
```bash
# Verify scripts directory exists in container
docker exec -it wedding-app ls -la scripts/

# If missing, rebuild the container
docker compose down
docker compose build --no-cache wedding-app
docker compose up -d

# Then create admin user
docker exec -it wedding-app npm run create-admin
```

### Issue: RSVP form not showing for authorized guests

**Solution:**
```bash
# Check if guest is in authorized_guests table
docker exec -it wedding-postgres psql -U wedding_user -d wedding_rsvp -c \
  "SELECT * FROM authorized_guests WHERE guest_name = 'Guest Name Here';"

# Check application logs
docker compose logs wedding-app | grep -i "authorization\|rsvp"
```

### Issue: 500 errors on API endpoints

**Solution:**
```bash
# Check application logs for errors
docker compose logs wedding-app | grep -i "error"

# Restart application
docker compose restart wedding-app
```

### Issue: Build fails

**Solution:**
```bash
# Clean Docker cache
docker system prune -a

# Rebuild from scratch
docker compose build --no-cache
```

---

## 📞 Support

If you encounter issues during migration:

1. Check application logs: `docker compose logs wedding-app`
2. Check database logs: `docker compose logs postgres`
3. Verify all environment variables in `.env`
4. Review this migration guide from the beginning
5. Use rollback instructions if critical issues occur

---

## 📝 Notes

- The `/admin` and `/admin/rsvp` pages have been **merged into one unified dashboard** at `/admin/rsvp`
- The unified admin dashboard has two tabs:
  - **RSVP Responses**: View, filter, and export RSVP submissions
  - **Guest Links**: Generate personalized invitation links
- Guest links are saved to both localStorage (for backward compatibility) and database (for RSVP authorization)
- Existing guest links from localStorage will continue to work
- Database is persisted in Docker volume `postgres_data`
- Session cookies expire after 24 hours (configurable via SESSION_EXPIRY_HOURS)

---

**Migration Guide Version:** 1.0
**Created:** 2026-01-05
**Last Updated:** 2026-01-05
