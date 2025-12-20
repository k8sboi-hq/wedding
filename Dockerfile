# Dockerfile for Wedding Website with Caddy
# Multi-stage build for optimized image size

FROM caddy:2-alpine

# Set working directory
WORKDIR /srv

# Copy website files
COPY index.html /srv/
COPY assets/ /srv/assets/

# Copy Caddyfile for Docker environment
COPY Caddyfile.docker /etc/caddy/Caddyfile

# Expose port 80 and 443
EXPOSE 80 443

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Caddy will run automatically as the default command
