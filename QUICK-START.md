# Quick Start Guide - Wedding Invitation

## 🚀 Quick Deployment (5 minutes)

### 1. Upload Files to Server

```bash
# Create directory
sudo mkdir -p /var/www/wedding

# Upload your files
scp wedding-invitation.html user@your-server:/tmp/
scp couple-photo.jpg user@your-server:/tmp/

# Move to web directory
sudo mv /tmp/wedding-invitation.html /var/www/wedding/index.html
sudo mv /tmp/couple-photo.jpg /var/www/wedding/
sudo chown -R caddy:caddy /var/www/wedding
```

### 2. Configure Domain in Caddyfile

```bash
sudo nano /etc/caddy/Caddyfile
```

Replace with:

```
your-actual-domain.com {
    root * /var/www/wedding
    file_server
    encode gzip
}
```

### 3. Reload Caddy

```bash
sudo systemctl reload caddy
```

### 4. Add Tally Form

1. Create form at https://tally.so
2. Get embed code
3. Edit `/var/www/wedding/index.html`
4. Replace the `tally-placeholder` div with your embed code

## ✅ Done!

Visit `https://your-domain.com` to see your wedding invitation live!

## 🔧 Quick Fixes

**Photo not showing?**

```bash
# Update the JavaScript at bottom of HTML
document.getElementById('couplePhoto').src = 'couple-photo.jpg';
```

**Need to make changes?**

```bash
sudo nano /var/www/wedding/index.html
# Make changes, save (Ctrl+X, Y, Enter)
# Refresh your browser
```

**Check Caddy status:**

```bash
sudo systemctl status caddy
```

That's it! 🎉
