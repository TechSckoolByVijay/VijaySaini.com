# Using GitHub Secrets for n8n Credentials

## ⚠️ Security Considerations

Currently, your n8n credentials are **hardcoded** in `assets/js/download.js`. This works but has security implications:

### Current Setup (Working but Less Secure)
- ✅ **Pros:** Simple, works immediately, no build process needed
- ⚠️ **Cons:** Credentials visible in source code, anyone can see them in browser DevTools

### GitHub Secrets Approach (More Secure but Complex)
- ✅ **Pros:** Credentials hidden from source code
- ⚠️ **Cons:** Requires build process, environment variable injection, more complex setup

## 🔐 Option 1: Current Setup (Recommended for Static Sites)

**What you have now is actually FINE for static sites because:**

1. **Basic Auth is standard** - The credentials are for webhook access, not user data
2. **Limited scope** - Only allows calling your n8n webhook
3. **Rate limiting** - You can add rate limiting in n8n
4. **Easy to rotate** - Change password in n8n and update the file

**Security measures you can add:**
```javascript
// Add domain verification in your n8n workflow
// Only accept requests from your domain
```

## 🔒 Option 2: GitHub Secrets (Advanced)

If you want to hide credentials from source code, here's how:

### Step 1: Store Secrets in GitHub

1. Go to your repository: `https://github.com/TechSckoolByVijay/VijaySaini.com`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:

| Name | Value |
|------|-------|
| `N8N_WEBHOOK_URL` | `https://n8n.srv1012085.hstgr.cloud/webhook/3c2079b4-6bb9-4a0e-bf16-cf81651cc229` |
| `N8N_USERNAME` | `static_site` |
| `N8N_PASSWORD` | `FCT****` |

### Step 2: Create Environment Config Template

Create `assets/js/download.config.template.js`:
```javascript
// This file will be populated during build
const N8N_CONFIG = {
    webhookUrl: '__N8N_WEBHOOK_URL__',
    username: '__N8N_USERNAME__',
    password: '__N8N_PASSWORD__'
};
```

### Step 3: Update GitHub Actions Workflow

Modify `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Inject n8n credentials
        env:
          N8N_WEBHOOK_URL: ${{ secrets.N8N_WEBHOOK_URL }}
          N8N_USERNAME: ${{ secrets.N8N_USERNAME }}
          N8N_PASSWORD: ${{ secrets.N8N_PASSWORD }}
        run: |
          # Create config file from template
          sed -e "s|__N8N_WEBHOOK_URL__|$N8N_WEBHOOK_URL|g" \
              -e "s|__N8N_USERNAME__|$N8N_USERNAME|g" \
              -e "s|__N8N_PASSWORD__|$N8N_PASSWORD|g" \
              assets/js/download.config.template.js > assets/js/download.config.js

      - name: Build blog index
        run: |
          echo "Building blog index from markdown files..."
          node scripts/build-blog-index.js

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 4: Update download.js

Modify `assets/js/download.js` to use the config:
```javascript
// Load config (will be injected during build)
const N8N_WEBHOOK_URL = N8N_CONFIG.webhookUrl;
const N8N_USERNAME = N8N_CONFIG.username;
const N8N_PASSWORD = N8N_CONFIG.password;
```

### Step 5: Update HTML

Add script tag in `download.html` before `download.js`:
```html
<script src="assets/js/download.config.js"></script>
<script src="assets/js/download.js"></script>
```

## 🎯 Recommendation

**For your use case, I recommend keeping the current setup** because:

1. **Static sites can't truly hide secrets** - Even with GitHub Secrets, the credentials end up in the deployed JavaScript
2. **Basic Auth is designed for this** - It's meant to be transmitted over HTTPS
3. **Simpler maintenance** - No complex build process
4. **Easy to rotate** - Just change in n8n and update one file

## 🛡️ Best Practices (Current Setup)

### 1. Add Rate Limiting in n8n
In your n8n workflow, add a "Rate Limit" node:
- Max requests: 10 per minute
- Per: IP address

### 2. Add Domain Verification
In your n8n workflow, check the request origin:
```javascript
// In n8n Function node
if ($request.headers.origin !== 'https://vijaysaini.com') {
    return { error: 'Invalid origin' };
}
```

### 3. Monitor Usage
Set up n8n alerts for:
- Failed authentication attempts
- Unusual traffic patterns
- Daily usage reports

### 4. Rotate Credentials Regularly
Every 3-6 months:
1. Generate new password in n8n
2. Update `assets/js/download.js`
3. Deploy

### 5. Use HTTPS Only
Your n8n URL already uses HTTPS ✅

## 📊 Security Comparison

| Method | Security | Complexity | Best For |
|--------|----------|------------|----------|
| **Hardcoded (Current)** | Medium | Low | Static sites, public webhooks |
| **GitHub Secrets** | Medium+ | High | Larger teams, sensitive data |
| **Backend API** | High | Very High | Enterprise, payment processing |

## 🚨 When to Use GitHub Secrets

Use GitHub Secrets if:
- Multiple developers need access
- You rotate credentials frequently
- You have compliance requirements
- You're building a SaaS product

**For a personal course landing page: Current setup is fine! ✅**

## 💡 Alternative: Environment-Specific Configs

Create multiple config files:

**For Development:** `assets/js/download.dev.js`
```javascript
const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/test';
```

**For Production:** `assets/js/download.prod.js`
```javascript
const N8N_WEBHOOK_URL = 'https://n8n.srv1012085.hstgr.cloud/webhook/...';
```

Use different files based on domain:
```javascript
const isDev = window.location.hostname === 'localhost';
const configFile = isDev ? 'download.dev.js' : 'download.prod.js';
```

## ✅ Conclusion

**Your current setup is secure enough** for a course landing page. Focus on:
1. ✅ HTTPS (done)
2. ✅ Basic Auth (done)
3. ⏳ Add rate limiting in n8n
4. ⏳ Monitor usage
5. ⏳ Rotate password every 6 months

**Don't overcomplicate it!** Your credentials protect a webhook, not a bank account. 😊

---

Questions? Contact: vijaysainiprofessional@gmail.com
