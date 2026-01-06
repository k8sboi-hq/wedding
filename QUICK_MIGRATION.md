# Quick Migration Reference Card

## 🚀 Quick Migration (TL;DR)

**On local machine:**
```bash
# 1. Update .env with database credentials
nano .env

# 2. Sync to production
npm run rsync
```

**On production server (docker-prod):**
```bash
# 3. SSH into server
ssh docker-prod
cd /home/deployer/deployment

# 4. Backup current deployment
tar -czf ~/wedding-backup-$(date +%Y%m%d-%H%M%S).tar.gz .

# 5. Stop services
docker compose down

# 6. Build new images
docker compose build --no-cache

# 7. Start services
docker compose up -d

# 8. Wait for services to be healthy (~30 seconds)
watch docker compose ps  # Wait until all show "healthy"

# 9. Create admin user
docker exec -it wedding-app npm run create-admin

# 10. Test
curl -I http://localhost:8080
```

**From browser:**
```
Visit: https://wedding.khoahuynh.dev/admin/rsvp
Login with credentials from step 9
```

---

## ⚡ Essential Commands

### Check Service Status
```bash
docker compose ps
```

### View Logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f wedding-app
docker compose logs -f postgres
```

### Restart Services
```bash
# All services
docker compose restart

# Specific service
docker compose restart wedding-app
```

### Database Access
```bash
# Access PostgreSQL CLI
docker exec -it wedding-postgres psql -U wedding_user -d wedding_rsvp

# View RSVPs
docker exec -it wedding-postgres psql -U wedding_user -d wedding_rsvp -c \
  "SELECT * FROM rsvps;"

# View authorized guests
docker exec -it wedding-postgres psql -U wedding_user -d wedding_rsvp -c \
  "SELECT * FROM authorized_guests;"
```

### Backup Database
```bash
docker exec wedding-postgres pg_dump -U wedding_user wedding_rsvp > \
  ~/wedding_rsvp_backup_$(date +%Y%m%d_%H%M%S).sql
```

---

## 🔄 Rollback
```bash
docker compose down
tar -xzf ~/wedding-backup-*.tar.gz -C /home/deployer/deployment/
cd /home/deployer/deployment
docker compose up -d
```

---

## 📋 Pre-Migration Checklist

Required environment variables in `.env`:
- [x] `POSTGRES_DB=wedding_rsvp`
- [x] `POSTGRES_USER=wedding_user`
- [x] `POSTGRES_PASSWORD=<secure-password>`
- [x] `DATABASE_URL=postgresql://wedding_user:<password>@postgres:5432/wedding_rsvp`
- [x] `ADMIN_SESSION_SECRET=<32-char-secret>`
- [x] `SESSION_EXPIRY_HOURS=24`

Generate secure values:
```bash
openssl rand -base64 32  # For POSTGRES_PASSWORD
openssl rand -base64 32  # For ADMIN_SESSION_SECRET
```

---

For detailed instructions, see `MIGRATION_GUIDE.md`
