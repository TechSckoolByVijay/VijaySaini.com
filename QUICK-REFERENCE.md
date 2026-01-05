# 🚀 Quick Reference Card

## 📁 Key Files

| File | Purpose |
|------|---------|
| `index.html` | Course landing page (revamped) |
| `download.html` | Lead generation page |
| `blog.html` | Blog listing |
| `blog-post.html` | Individual blog posts |
| `assets/js/download.js` | Download form + n8n integration |
| `assets/js/blog.js` | Blog listing logic |
| `assets/js/blog-post.js` | Blog post renderer |
| `scripts/build-blog-index.js` | Blog index generator |
| `.github/workflows/deploy.yml` | GitHub Actions CI/CD |

## 🛠️ Common Commands

```bash
# Build blog index
npm run build

# Test locally with server
npx serve .

# Git workflow
git add .
git commit -m "Your message"
git push origin main

# Check Node.js version
node --version
```

## 📝 Add a Blog Post

1. Create: `content/blogs/my-post.md`
2. Add frontmatter:
```markdown
---
title: "Post Title"
date: 2026-01-05
author: Vijay Saini
tags: Tag1, Tag2
---
```
3. Run: `npm run build`
4. Commit and push

## 🔧 Configure n8n Webhook

**File:** `assets/js/download.js` (Line ~12)

```javascript
const N8N_WEBHOOK_URL = 'YOUR_WEBHOOK_URL';
```

## 🎨 Customize Colors

**File:** `assets/css/base.css`

```css
:root {
    --accent-color: #3b82f6;
    --bg-primary: #0f0f23;
    --text-primary: #e4e4e7;
}
```

## 📊 Navigation Links

All pages have:
- Home → `index.html`
- About → `about.html`
- Skills → `skills.html`
- Courses → `projects.html`
- Blog → `blog.html`
- Download → `download.html`
- Contact → `contact.html`

## 🚀 Deploy to GitHub Pages

1. Go to: Settings → Pages
2. Source: **GitHub Actions**
3. Push to `main` branch
4. Wait for deployment (check Actions tab)

## 📦 Project Structure

```
VijaySaini.com/
├── .github/workflows/     # CI/CD
├── assets/               # CSS, JS, Images
├── content/blogs/        # Markdown posts
├── public/data/          # Generated JSON
├── scripts/              # Build scripts
├── *.html               # Pages
└── package.json         # NPM config
```

## ✅ Pre-Deployment Checklist

- [ ] Node.js installed
- [ ] Blog index built (`npm run build`)
- [ ] n8n webhook URL configured
- [ ] All pages have updated navigation
- [ ] Test locally with `npx serve .`
- [ ] GitHub Pages enabled
- [ ] CNAME file added (if custom domain)

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Blog posts not showing | Run `npm run build` |
| Download form not working | Update n8n webhook URL |
| GitHub Actions failing | Check Actions tab logs |
| Styling broken | Clear browser cache |
| Node.js not found | Install from nodejs.org |

## 📞 Support

- Email: vijaysainiprofessional@gmail.com
- Docs: See `README-NEW.md`, `SETUP.md`, `N8N-SETUP-GUIDE.md`

## 🎯 What's New

✅ Course landing page (conversion-optimized)
✅ Blog system (Markdown-based)
✅ Download page (lead generation)
✅ Enhanced CSS (modern components)
✅ GitHub Actions (automated deployment)
✅ Mobile responsive
✅ Dark/Light themes

---

**Your portfolio is production-ready!** 🎉
