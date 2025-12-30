# CLAUDE.md

## Project Overview

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
Starting the session by checking the recent commit history is recommended and then read the `progress.json` file for context on what has been done and what remains.

## Site Structure

```
.
├── public - all assets
    ├── assets - musics, images
└── src
    ├── app - Page and layouts and Global CSS
    ├── components - Many reusable components
    │   ├── Countdown - Live JavaScript countdown to wedding day
    │   ├── Details - Date, time, and venue information
    │   ├── Footer - Couple names and date
    │   ├── Hero - Couple photo, names, and wedding date
    │   ├── Icons
    │   ├── Maps - Embedded Google Maps iframe + link
    │   ├── MusicPlayer - Music player with wedding playlist including Icons
    │   ├── PhotoCarousel
    │   ├── RSVP - QR Code for sending money when unable to attend
    │   └── ui - reusable UI components (Button, Card, Modal, etc.)
    └── lib - Utils, custom SVG_PATTERNS, and constants
```

## Common tasks

### Testing Locally

```bash
npm run dev # starts local server

```

### Building the project

```bash
npm run build
```

## Key Configuration Points

- Keeping the Wedding theme consistent

- Icons are in the same directory as their components

## Important Notes

- **Roles** - This Project is implemented by Claude 95%, Daniel plays as Product Manager and does 5% of the code.
- **Vietnamese font support** - Cormorant Garamond handles Vietnamese characters (Lưu Nguyễn Hồng Sương)
- **Responsive design** - Mobile breakpoints at 768px and 480px
- **Security headers** - Pre-configured in Caddyfile (HSTS, CSP, etc.)

## File Permissions

Ensure correct ownership when deploying

### Caddyfile Configuration

- Located at `/etc/caddy/Caddyfile`
- Replace `your-domain.com` with actual domain
- Includes security headers (HSTS, X-Frame-Options, etc.)
- Automatic HTTPS with Let's Encrypt
- Gzip compression enabled
- Access logs: `/var/log/caddy/wedding-access.log`
