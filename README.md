# Wedding Invitation - Setup Guide

Your complete wedding invitation website with countdown timer, Google Maps integration, and Tally form RSVP.

## 🎯 Features

- ✨ Beautiful, responsive design
- ⏱️ Live countdown to wedding day (January 25, 2026)
- 📍 Interactive Google Maps integration for Garden Plaza Saigon
- 📝 Tally form RSVP integration
- 🌏 Full Vietnamese font support
- 📱 Mobile-friendly responsive design
- 🔒 HTTPS with automatic SSL certificates via Caddy

## 📋 Prerequisites

- A server (VPS) running Linux (Ubuntu/Debian recommended)
- A domain name pointed to your server's IP address
- Caddy web server installed

## 🚀 Installation Steps

### Step 1: Install Caddy (if not already installed)

```bash
# For Ubuntu/Debian
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

### Step 2: Create Website Directory

```bash
# Create the directory for your wedding website
sudo mkdir -p /var/www/wedding

# Copy your wedding-invitation.html file
sudo cp wedding-invitation.html /var/www/wedding/index.html

# Set proper permissions
sudo chown -R caddy:caddy /var/www/wedding
sudo chmod -R 755 /var/www/wedding
```

### Step 3: Configure Caddy

```bash
# Edit the Caddyfile
sudo nano /etc/caddy/Caddyfile

# Copy the contents of the provided Caddyfile
# Replace 'your-domain.com' with your actual domain

# Test the configuration
sudo caddy validate --config /etc/caddy/Caddyfile

# Reload Caddy to apply changes
sudo systemctl reload caddy
```

### Step 4: Add Your Couple Photo

1. **Prepare your photo:**
   - Use the motorcycle photo from your coastal trip
   - Recommended size: 400x400 pixels
   - Format: JPG or PNG
   - Keep file size under 500KB for fast loading

2. **Upload to server:**

   ```bash
   # Upload your photo to the server
   sudo cp your-photo.jpg /var/www/wedding/couple-photo.jpg
   ```

3. **Update the HTML:**
   - Edit `/var/www/wedding/index.html`
   - Find this line: `<img src="data:image/svg+xml...`
   - Replace with: `<img src="couple-photo.jpg" alt="Daniel & Sương" class="couple-photo">`

   Or use this command:

   ```bash
   sudo nano /var/www/wedding/index.html
   # Find line with id="couplePhoto"
   # At the bottom of the file, uncomment and update:
   # document.getElementById('couplePhoto').src = 'couple-photo.jpg';
   ```

### Step 5: Integrate Tally Form

1. **Create your Tally form:**
   - Go to https://tally.so
   - Create a new form with fields like:
     - Name (required)
     - Email (required)
     - Number of guests (number input)
     - Dietary restrictions (optional)
     - Message to couple (optional)

2. **Get the embed code:**
   - In Tally, click "Share" → "Embed"
   - Copy the embed code

3. **Add to your website:**
   - Edit `/var/www/wedding/index.html`
   - Find the section with `class="tally-placeholder"`
   - Replace the entire `<div class="tally-placeholder">...</div>` with your Tally embed code

   Example:

   ```html
   <div class="tally-container">
     <iframe
       data-tally-src="https://tally.so/embed/YOUR-FORM-ID"
       width="100%"
       height="500"
       frameborder="0"
       marginheight="0"
       marginwidth="0"
       title="RSVP Form"
     ></iframe>
     <script>
       var d = document,
         w = "https://tally.so/widgets/embed.js",
         v = function () {
           "undefined" != typeof Tally
             ? Tally.loadEmbeds()
             : d
                 .querySelectorAll("iframe[data-tally-src]:not([src])")
                 .forEach(function (e) {
                   e.src = e.dataset.tallySrc;
                 });
         };
       if ("undefined" != typeof Tally) v();
       else if (d.querySelector('script[src="' + w + '"]') == null) {
         var s = d.createElement("script");
         ((s.src = w), (s.onload = v), (s.onerror = v), d.body.appendChild(s));
       }
     </script>
   </div>
   ```

## 🎨 Customization Options

### Change Colors

Edit the CSS variables at the top of the HTML file:

```css
:root {
  --primary-color: #2c5f4f; /* Main green color */
  --secondary-color: #8b7355; /* Brown accent */
  --accent-color: #d4a574; /* Gold accent */
  --text-dark: #2c2c2c; /* Dark text */
  --text-light: #666; /* Light text */
  --bg-light: #faf9f7; /* Background */
}
```

### Update Wedding Details

Find and modify these sections in the HTML:

- Date: `<div class="wedding-date">SATURDAY, JANUARY 25, 2026</div>`
- Time: `Reception: 18:00 - 21:00`
- Countdown: `const weddingDate = new Date('2026-01-25T18:00:00+07:00')`

### Update Map

If you need a different map location:

1. Go to Google Maps
2. Find your venue
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the iframe in the HTML

## 🔧 Troubleshooting

### Website not loading

```bash
# Check Caddy status
sudo systemctl status caddy

# View Caddy logs
sudo journalctl -u caddy -f

# Check if port 443 is open
sudo netstat -tlnp | grep :443
```

### SSL certificate issues

```bash
# Make sure your domain is pointing to your server
nslookup your-domain.com

# Check firewall
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### Photo not displaying

```bash
# Check file permissions
ls -la /var/www/wedding/

# Ensure the image path is correct in HTML
# The path should be relative: couple-photo.jpg (not /couple-photo.jpg)
```

## 🔒 Security Best Practices

1. **Keep Caddy updated:**

   ```bash
   sudo apt update && sudo apt upgrade caddy
   ```

2. **Enable automatic security headers:**
   Already configured in the Caddyfile!

3. **Regular backups:**
   ```bash
   # Backup your website
   sudo tar -czf wedding-backup-$(date +%Y%m%d).tar.gz /var/www/wedding
   ```

## 📱 Testing

### Local Testing

```bash
# Test locally before deploying
cd /path/to/wedding-invitation.html
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Mobile Testing

- Use browser developer tools (F12 → Toggle device toolbar)
- Test on actual devices
- Check different screen sizes

## 📊 Viewing RSVP Responses

1. Log into your Tally account
2. Go to your form
3. Click "Submissions" to see all responses
4. Export to Excel/CSV if needed

## 🎉 Go Live Checklist

- [ ] Domain DNS configured and propagated
- [ ] Caddy installed and running
- [ ] Website files uploaded to `/var/www/wedding`
- [ ] Couple photo added and displaying correctly
- [ ] Tally form integrated and tested
- [ ] RSVP submissions working
- [ ] SSL certificate active (https:// working)
- [ ] Mobile responsive design tested
- [ ] Countdown timer working correctly
- [ ] Map link opens correctly
- [ ] Vietnamese characters displaying properly

## 📞 Support Resources

- **Caddy Documentation:** https://caddyserver.com/docs/
- **Tally Help:** https://tally.so/help
- **Google Maps Embed:** https://developers.google.com/maps/documentation/embed

## 🎊 Congratulations!

Your wedding invitation website is now live! Share the link with your guests:
`https://your-domain.com`

---

**Created for Daniel & Lưu Nguyễn Hồng Sương**  
_Wedding Date: January 25, 2026_
