# Wedding RSVP System Documentation

Complete RSVP management system for your wedding website with PostgreSQL database backend and admin dashboard.

## 🎯 Features

### Guest Features
- ✅ Interactive RSVP form (Yes/No/Maybe)
- ✅ Optional notes field for special messages
- ✅ Automatic loading of previous responses
- ✅ Update RSVP anytime by revisiting link
- ✅ Hidden when no guest parameter (maintains privacy)
- ✅ Vietnamese language support

### Admin Features
- ✅ Secure authentication with HTTP-only cookies
- ✅ View all RSVP responses
- ✅ Real-time statistics dashboard
- ✅ Filter by party (Bride/Groom)
- ✅ Filter by status (Yes/No/Maybe)
- ✅ Search guests by name
- ✅ Delete individual RSVPs
- ✅ Export all data to CSV

## 📁 Project Structure

```
wedding-website/
├── database/
│   ├── schema.sql           # Database schema with tables and indexes
│   └── init.sql             # Initialization script
├── scripts/
│   └── create-admin.ts      # Admin user creation script
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── rsvp/
│   │   │   │   └── route.ts              # Public RSVP API (GET, POST)
│   │   │   └── admin/
│   │   │       ├── login/route.ts        # Admin login
│   │   │       ├── logout/route.ts       # Admin logout
│   │   │       ├── verify/route.ts       # Session verification
│   │   │       └── rsvps/
│   │   │           ├── route.ts          # List RSVPs
│   │   │           ├── [id]/route.ts     # Delete RSVP
│   │   │           └── export/route.ts   # Export CSV
│   │   └── admin/
│   │       └── rsvp/
│   │           └── page.tsx              # Admin dashboard UI
│   ├── components/
│   │   └── RSVP/
│   │       ├── RSVPForm.tsx              # RSVP form component
│   │       └── RSVPSection.tsx           # RSVP section wrapper
│   └── lib/
│       ├── db/
│       │   ├── connection.ts             # PostgreSQL connection pool
│       │   └── queries.ts                # Database query functions
│       ├── auth/
│       │   ├── password.ts               # Password hashing
│       │   ├── session.ts                # Session management
│       │   └── middleware.ts             # Auth middleware
│       ├── validation/
│       │   └── rsvp.ts                   # Input validation
│       └── utils/
│           └── csv-export.ts             # CSV export utility
└── docker-compose.yml                     # Updated with PostgreSQL
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

New packages added:
- `pg` - PostgreSQL client
- `bcryptjs` - Password hashing
- `tsx` - TypeScript execution

### 2. Configure Environment Variables

Update your `.env` file:

```bash
# PostgreSQL Database
POSTGRES_DB=wedding_rsvp
POSTGRES_USER=wedding_user
POSTGRES_PASSWORD=$(openssl rand -base64 32)

# Database URL for application
DATABASE_URL=postgresql://wedding_user:your_password@localhost:5432/wedding_rsvp

# Admin session secret (32+ characters)
ADMIN_SESSION_SECRET=$(openssl rand -base64 32)

# Session expiry in hours
SESSION_EXPIRY_HOURS=24
```

### 3. Start PostgreSQL

**Using Podman:**
```bash
# Start PostgreSQL container
podman run -d \
  --name wedding-postgres \
  -e POSTGRES_DB=wedding_rsvp \
  -e POSTGRES_USER=wedding_user \
  -e POSTGRES_PASSWORD=your_password_here \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:16-alpine

# Initialize database schema
podman exec -i wedding-postgres psql -U wedding_user -d wedding_rsvp < database/schema.sql
```

**Using Docker Compose/Podman Compose:**
```bash
podman-compose up -d postgres
# Schema is automatically initialized on first run
```

### 4. Create Admin User

```bash
npm run create-admin
```

Follow the interactive prompts:
- Enter username (default: admin)
- Enter password (minimum 8 characters)
- Confirm password

The script will:
- Hash your password with bcrypt
- Store it securely in the database
- Allow you to update the password later

### 5. Start Development Server

```bash
npm run dev
```

Access the application at `http://localhost:3001`

## 📝 Usage Guide

### For Guests

**Step 1:** Guests receive a personalized link from the admin page:
```
https://wedding.khoahuynh.dev/?party=1&guest=TmdoxbuG54buG6F6xuDDqg==
```

**Step 2:** When they visit the link:
- See their personalized invitation card
- Fill out the RSVP form (Yes/No/Maybe)
- Optionally add a message
- Submit the form

**Step 3:** They can return to the same link anytime to:
- View their previous RSVP
- Update their response
- Change their notes

### For Admins

**Step 1:** Login to admin dashboard
```
URL: https://wedding.khoahuynh.dev/admin/rsvp
Credentials: Your username and password from create-admin script
```

**Step 2:** View RSVP Dashboard
- See statistics: Total, Yes, No, Maybe, Party 1, Party 2
- Browse all RSVP responses in a table
- See guest names, status, notes, and timestamps

**Step 3:** Filter and Search
- **Party Filter:** Show only Party 1 (Bride) or Party 2 (Groom)
- **Status Filter:** Show only Yes, No, or Maybe responses
- **Search:** Type guest name to find specific responses

**Step 4:** Manage RSVPs
- **Delete:** Remove individual RSVPs (with confirmation)
- **Export:** Download all RSVPs as CSV file

**Step 5:** Logout
- Click "Logout" button to end session
- Session expires automatically after 24 hours

## 🗄️ Database Schema

### Tables

**rsvps**
- `id` - Unique RSVP ID
- `guest_name` - Guest's full name
- `party` - Party assignment ('1' or '2')
- `status` - Response ('yes', 'no', 'maybe')
- `notes` - Optional message from guest
- `created_at` - When RSVP was first created
- `updated_at` - When RSVP was last modified
- **Unique constraint:** (guest_name, party)

**admin_users**
- `id` - User ID
- `username` - Admin username
- `password_hash` - Bcrypt hashed password
- `created_at` - Account creation date

**admin_sessions**
- `id` - Session UUID
- `session_token` - Cryptographically secure token
- `expires_at` - Session expiry timestamp
- `created_at` - Session creation time

### Indexes
- `idx_rsvps_party` - Fast filtering by party
- `idx_rsvps_status` - Fast filtering by status
- `idx_rsvps_guest_name` - Fast name searches
- `idx_rsvps_party_status` - Combined party+status filtering

## 🔒 Security Features

### Password Security
- ✅ Bcrypt hashing with 10 salt rounds
- ✅ Passwords never stored in plaintext
- ✅ Password validation (minimum 8 characters)

### Session Security
- ✅ HTTP-only cookies (protected from XSS)
- ✅ Secure flag enabled (HTTPS only)
- ✅ SameSite=Strict (CSRF protection)
- ✅ Cryptographically secure random tokens
- ✅ Automatic session expiry (24 hours)

### Input Validation
- ✅ All inputs validated server-side
- ✅ SQL injection prevention (parameterized queries)
- ✅ Guest name length limits (255 characters)
- ✅ Notes length limits (1000 characters)
- ✅ Status and party enum validation

### API Security
- ✅ Public RSVP API: No auth required (guest name in URL is the "secret")
- ✅ Admin APIs: Session authentication required
- ✅ Proper HTTP status codes (401 Unauthorized, 400 Bad Request)

## 🌐 API Reference

### Public Endpoints

**GET /api/rsvp**
- Query params: `guest` (base64), `party` (1 or 2)
- Returns: Existing RSVP or null
- Auth: None required

**POST /api/rsvp**
- Body: `{ guestName, party, status, notes? }`
- Returns: Created/updated RSVP
- Auth: None required

### Admin Endpoints (Require Authentication)

**POST /api/admin/login**
- Body: `{ username, password }`
- Returns: Success + sets session cookie
- Auth: None required

**POST /api/admin/logout**
- Returns: Success + clears session cookie
- Auth: Required

**GET /api/admin/verify**
- Returns: `{ authenticated: boolean }`
- Auth: None required (checks session)

**GET /api/admin/rsvps**
- Query params: `party?`, `status?`, `search?`
- Returns: `{ rsvps: [...], stats: {...} }`
- Auth: Required

**DELETE /api/admin/rsvps/:id**
- Returns: Success message
- Auth: Required

**GET /api/admin/rsvps/export**
- Returns: CSV file download
- Auth: Required

## 📦 Deployment

### Production Checklist

- [ ] Generate secure environment variables
  ```bash
  openssl rand -base64 32  # For POSTGRES_PASSWORD
  openssl rand -base64 32  # For ADMIN_SESSION_SECRET
  ```

- [ ] Update `.env` with production values
  ```bash
  DATABASE_URL=postgresql://wedding_user:SECURE_PASSWORD@postgres:5432/wedding_rsvp
  ADMIN_SESSION_SECRET=YOUR_SECURE_SECRET_HERE
  NEXT_PUBLIC_BASE_URL=https://wedding.khoahuynh.dev
  ```

- [ ] Start services
  ```bash
  podman-compose up -d
  ```

- [ ] Create admin user
  ```bash
  podman exec -it wedding-app npm run create-admin
  ```

- [ ] Verify services
  ```bash
  # Check PostgreSQL
  podman exec -it wedding-postgres psql -U wedding_user -d wedding_rsvp -c "SELECT COUNT(*) FROM rsvps;"

  # Check application
  curl -I https://wedding.khoahuynh.dev
  ```

- [ ] Test RSVP flow
  - Generate test guest link from `/admin`
  - Submit test RSVP
  - Verify in `/admin/rsvp`

- [ ] Backup database
  ```bash
  podman exec wedding-postgres pg_dump -U wedding_user wedding_rsvp > backup.sql
  ```

### Backup Strategy

**Manual Backup:**
```bash
# Backup database
podman exec wedding-postgres pg_dump -U wedding_user wedding_rsvp > wedding_rsvp_$(date +%Y%m%d).sql

# Restore database
podman exec -i wedding-postgres psql -U wedding_user -d wedding_rsvp < wedding_rsvp_20260105.sql
```

**Export CSV (via Admin Dashboard):**
- Login to `/admin/rsvp`
- Click "Export CSV"
- Save file to safe location

## 🐛 Troubleshooting

### Database Connection Errors

**Error:** `DATABASE_URL environment variable is not set`
- **Solution:** Ensure `.env` file exists and contains `DATABASE_URL`

**Error:** `connection refused`
- **Solution:** Check PostgreSQL is running: `podman ps | grep postgres`
- **Solution:** Verify DATABASE_URL port matches PostgreSQL port

### Authentication Issues

**Error:** Login fails with correct credentials
- **Solution:** Check admin user exists:
  ```bash
  podman exec -it wedding-postgres psql -U wedding_user -d wedding_rsvp -c "SELECT * FROM admin_users;"
  ```
- **Solution:** Recreate admin user with `npm run create-admin`

**Error:** Session expires immediately
- **Solution:** Check `ADMIN_SESSION_SECRET` is set in `.env`
- **Solution:** Verify system time is correct (sessions use timestamps)

### RSVP Form Issues

**Error:** Form doesn't appear
- **Solution:** Ensure URL has both `party` and `guest` parameters
- **Solution:** Check guest name is properly base64-encoded

**Error:** Form submission fails
- **Solution:** Check browser console for error messages
- **Solution:** Verify API endpoint is reachable: `curl http://localhost:3001/api/rsvp`

### Database Query Slow

**Solution:** Check indexes exist:
```sql
SELECT indexname FROM pg_indexes WHERE tablename = 'rsvps';
```

**Solution:** Analyze query performance:
```sql
EXPLAIN ANALYZE SELECT * FROM rsvps WHERE party = '1' AND status = 'yes';
```

## 📊 Monitoring

### Health Checks

**Database Health:**
```bash
podman exec wedding-postgres pg_isready -U wedding_user -d wedding_rsvp
```

**Application Health:**
```bash
curl -I http://localhost:3001
```

### View Logs

**Application Logs:**
```bash
podman logs -f wedding-app
```

**Database Logs:**
```bash
podman logs -f wedding-postgres
```

### Database Queries

**View all RSVPs:**
```sql
SELECT * FROM rsvps ORDER BY created_at DESC;
```

**Count by status:**
```sql
SELECT status, COUNT(*) FROM rsvps GROUP BY status;
```

**Count by party:**
```sql
SELECT party, COUNT(*) FROM rsvps GROUP BY party;
```

**Recent RSVPs (last 24 hours):**
```sql
SELECT * FROM rsvps WHERE created_at > NOW() - INTERVAL '24 hours' ORDER BY created_at DESC;
```

## 🎓 Technical Details

### Database Connection Pooling
- Pool size: 10 connections
- Idle timeout: 30 seconds
- Connection timeout: 2 seconds
- Slow query threshold: 100ms (logged as warnings)

### Session Management
- Token length: 64 characters (hex)
- Token algorithm: Cryptographically secure random bytes
- Storage: PostgreSQL table with expiry timestamp
- Cleanup: Manual via `cleanup_expired_sessions()` function

### RSVP Upsert Logic
- Uses PostgreSQL `ON CONFLICT` clause
- Composite unique key: (guest_name, party)
- Automatically updates `updated_at` timestamp
- Allows guests to change their response

## 📚 Additional Resources

### Existing Admin System
- **Guest Link Manager:** `/admin` (uses old localStorage system)
- **RSVP Manager:** `/admin/rsvp` (new database system)
- Both systems are independent and can coexist

### CSV Export Format
```
ID,Guest Name,Party,Status,Notes,Created At,Updated At
1,Nguyễn Văn A,Party 1 (Bride),Yes,"Excited to attend!",2026-01-05T10:30:00Z,2026-01-05T10:30:00Z
```

### Party Numbering
- **Party 1:** Bride's Family Party (Tiệc Nhà Gái) - January 18, 2026
- **Party 2:** Groom's Family Party (Tiệc Nhà Trai) - January 25, 2026

## 🤝 Support

If you encounter issues:
1. Check this documentation
2. Review troubleshooting section
3. Check application logs
4. Verify environment variables
5. Test database connection

## 📝 Notes

- Database schema includes automatic `updated_at` trigger
- Sessions automatically expire after 24 hours (configurable)
- Guest names support Vietnamese characters (UTF-8)
- CSV export includes all RSVPs regardless of filters
- Admin can delete RSVPs but cannot edit them (guests must update via their link)
