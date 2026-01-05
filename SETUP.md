# Setup Instructions

## 🚀 Getting Started with Your Portfolio

### Step 1: Install Node.js

The blog system requires Node.js to build the blog index from Markdown files.

**Download Node.js:**
- Visit: https://nodejs.org/
- Download: LTS version (recommended)
- Install and follow the installer prompts

**Verify Installation:**
```powershell
node --version
npm --version
```

### Step 2: Build the Blog Index

After installing Node.js, run:

```powershell
npm run build
```

This will:
- Read all Markdown files from `content/blogs/`
- Generate `public/data/blog-index.json`
- Make your blog posts available on the website

### Step 3: Test Locally

**Option A: Simple File Opening**
- Open `index.html` in your browser
- Note: Blog may not work due to CORS restrictions

**Option B: Local Server (Recommended)**
```powershell
npx serve .
```
Then open: http://localhost:3000

### Step 4: Deploy to GitHub Pages

1. **Commit your changes:**
```bash
git add .
git commit -m "Initial setup"
git push origin main
```

2. **Enable GitHub Pages:**
   - Go to: Settings → Pages
   - Source: GitHub Actions
   - The workflow will automatically deploy

3. **Wait for deployment:**
   - Check Actions tab for progress
   - Your site will be live at: `https://yourusername.github.io/VijaySaini.com`

## 📝 Daily Workflow

### Adding a New Blog Post

1. Create a new `.md` file in `content/blogs/`:
```markdown
---
title: "My New Post"
date: 2026-01-05
author: Vijay Saini
tags: Tutorial, DevOps
---

# Content here...
```

2. Build the index:
```powershell
npm run build
```

3. Commit and push:
```bash
git add .
git commit -m "Add new blog post"
git push origin main
```

### Updating n8n Webhook

Edit `assets/js/download.js` and replace:
```javascript
const N8N_WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL';
```

## 🔧 Troubleshooting

### Blog Posts Not Showing
- Run `npm run build` to regenerate the index
- Check `public/data/blog-index.json` exists
- Verify markdown frontmatter format

### GitHub Actions Failing
- Check Actions tab for error details
- Ensure `scripts/build-blog-index.js` is committed
- Verify Node.js version in workflow (should be 18+)

### Download Form Not Working
- Update n8n webhook URL
- Check browser console for errors
- Test n8n webhook with curl/Postman

## 📞 Need Help?

Contact: vijaysainiprofessional@gmail.com

---

**You're all set! Happy coding! 🚀**
