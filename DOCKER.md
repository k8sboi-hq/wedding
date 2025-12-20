# Docker/Podman Deployment Guide

This guide covers how to build and run the wedding website using either Docker or Podman.

## Quick Start with Podman

### Build the Image

```bash
podman build -t wedding-website:latest .
```

### Run the Container

```bash
# Simple run (accessible at http://localhost:8080)
podman run -d \
  --name wedding-website \
  -p 8080:80 \
  wedding-website:latest

# With volume mounts for live development
podman run -d \
  --name wedding-website \
  -p 8080:80 \
  -v ./index.html:/srv/index.html:ro,Z \
  -v ./assets:/srv/assets:ro,Z \
  wedding-website:latest
```

### Container Management

```bash
# Check container status
podman ps

# View logs
podman logs wedding-website
podman logs -f wedding-website  # Follow logs

# Stop container
podman stop wedding-website

# Remove container
podman rm wedding-website

# Restart container
podman restart wedding-website
```

### Test the Website

```bash
# Check if the site is accessible
curl http://localhost:8080

# Open in browser
xdg-open http://localhost:8080  # Linux
open http://localhost:8080      # macOS
```

## Using Docker Compose with Podman

Podman supports docker-compose via `podman-compose`:

```bash
# Install podman-compose (if not already installed)
pip install podman-compose

# Build and start
podman-compose up -d

# View logs
podman-compose logs -f

# Stop and remove
podman-compose down
```

## Using Docker

### With Docker Compose

```bash
# Build and start
docker compose up -d

# View logs
docker compose logs -f

# Stop and remove
docker compose down
```

### Without Docker Compose

```bash
# Build
docker build -t wedding-website:latest .

# Run
docker run -d \
  --name wedding-website \
  -p 8080:80 \
  wedding-website:latest
```

## Production Deployment

For production deployment with HTTPS:

1. **Update Caddyfile.docker** with your domain:
   ```caddyfile
   yourdomain.com {
       # ... rest of config
   }
   ```

2. **Run with port 443 exposed**:
   ```bash
   podman run -d \
     --name wedding-website \
     -p 80:80 \
     -p 443:443 \
     -v caddy_data:/data \
     -v caddy_config:/config \
     wedding-website:latest
   ```

3. **Caddy will automatically obtain SSL certificates** from Let's Encrypt.

## Health Check

The container includes a health check that runs every 30 seconds:

```bash
# Check container health
podman inspect --format='{{.State.Health.Status}}' wedding-website
```

## Troubleshooting

### Port Already in Use

If port 8080 is already in use:

```bash
# Use a different port
podman run -d --name wedding-website -p 9090:80 wedding-website:latest
```

### SELinux Issues (Fedora/RHEL)

If you encounter permission issues with volume mounts, add `:Z` flag:

```bash
-v ./index.html:/srv/index.html:ro,Z
```

### View Caddy Configuration

```bash
podman exec wedding-website cat /etc/caddy/Caddyfile
```

### Interactive Shell

```bash
podman exec -it wedding-website sh
```

## Image Size Optimization

The image is based on `caddy:2-alpine` which provides a minimal footprint (~50MB).

To check image size:

```bash
podman images wedding-website
```

## Security Features

The Caddyfile.docker includes:

- X-Frame-Options (clickjacking protection)
- X-Content-Type-Options (MIME sniffing protection)
- X-XSS-Protection
- Referrer-Policy
- Content-Security-Policy
- Gzip/Zstd compression
- Static asset caching

## Files Overview

- `Dockerfile` - Container image definition
- `Caddyfile.docker` - Caddy config for Docker/Podman
- `Caddyfile` - Production Caddy config (for VM deployment)
- `docker-compose.yml` - Multi-container orchestration
- `.dockerignore` - Files to exclude from build context
