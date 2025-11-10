# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static wedding invitation website for Daniel & Lưu Nguyễn Hồng Sương's wedding on January 25, 2026. The site features a countdown timer, Google Maps integration for the venue (Garden Plaza Saigon), and a placeholder for Tally form RSVP integration.

## Technology Stack

- **Pure HTML/CSS/JavaScript** - No build tools or frameworks
- **Caddy** - Web server with automatic HTTPS
- **Google Fonts** - Playfair Display, Cormorant Garamond, Montserrat
- **Tally.so** - External form service for RSVP (integration pending)

## Deployment

### Production Deployment

The website is served by Caddy from `/var/www/wedding/`:

```bash
# Deploy to production
sudo cp index.html /var/www/wedding/
sudo chown -R caddy:caddy /var/www/wedding
sudo systemctl reload caddy
```

### Caddyfile Configuration

- Located at `/etc/caddy/Caddyfile`
- Replace `your-domain.com` with actual domain
- Includes security headers (HSTS, X-Frame-Options, etc.)
- Automatic HTTPS with Let's Encrypt
- Gzip compression enabled
- Access logs: `/var/log/caddy/wedding-access.log`

### Testing Locally

```bash
# Serve locally for testing
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Verify Caddy Status

```bash
sudo systemctl status caddy
sudo journalctl -u caddy -f  # View logs
sudo caddy validate --config /etc/caddy/Caddyfile  # Validate config
```

## Site Structure

**Single-page application** with these sections (all in `index.html`):

1. **Hero Section** - Couple photo, names, and wedding date
2. **Countdown Timer** - Live JavaScript countdown to wedding day
3. **Details Section** - Date, time, and venue information
4. **Map Section** - Embedded Google Maps iframe + link
5. **RSVP Section** - Placeholder for Tally form integration
6. **Footer** - Couple names and date

## Key Configuration Points

### Wedding Date/Time

Wedding date: **Sunday, January 25, 2026 at 18:00 ICT**
- Display date: lines 403, 452, 533
- Countdown timer: line 540

### Couple Photo

Replace the placeholder SVG (line 397-400):
```javascript
// Uncomment line 575 and update path
document.getElementById('couplePhoto').src = 'couple-photo.jpg';
```

### Tally Form Integration

Replace the placeholder (lines 506-524) with actual Tally embed code from https://tally.so

### CSS Variables

Customize colors via CSS variables (lines 21-28):
- `--primary-color: #2c5f4f` (green)
- `--secondary-color: #8b7355` (brown)
- `--accent-color: #d4a574` (gold)

### Google Maps

Current venue: Garden Plaza Saigon (170 Nguyen Van Troi St, Phu Nhuan District, HCMC)
- Embedded iframe: line 477-483
- Direct link: line 487 (https://maps.app.goo.gl/Edi1Vw3ed3ziP7bJ7)

## Common Tasks

### Update Wedding Date

1. Update display text: lines 403, 452, 533
2. Update countdown timer: line 540 (`new Date('2026-01-25T18:00:00+07:00')`)
3. Verify day of week: `date -d "YYYY-MM-DD" +"%A"`

### Add Couple Photo

1. Upload image to `/var/www/wedding/couple-photo.jpg`
2. Uncomment line 575 or directly edit img src at line 397

### Integrate RSVP Form

1. Create form at https://tally.so with fields: name, email, guest count, dietary restrictions, message
2. Get embed code from Tally (Share → Embed)
3. Replace entire `.tally-placeholder` div (lines 506-524) with Tally iframe + script

### Change Venue

1. Find new venue on Google Maps
2. Click Share → Embed a map → copy iframe code
3. Replace iframe at lines 477-483
4. Update venue details at lines 461-466
5. Update direct link at line 487

## Important Notes

- **No build process** - Edit HTML directly, changes are immediate
- **Vietnamese font support** - Cormorant Garamond handles Vietnamese characters (Lưu Nguyễn Hồng Sương)
- **Responsive design** - Mobile breakpoints at 768px and 480px
- **No git repository** - Manual file management required
- **Security headers** - Pre-configured in Caddyfile (HSTS, CSP, etc.)

## File Permissions

Ensure correct ownership when deploying:
```bash
sudo chown -R caddy:caddy /var/www/wedding
sudo chmod -R 755 /var/www/wedding
```
