# Vijay Saini - Professional Portfolio & Course Platform

A modern, fully-responsive portfolio website and course platform built with pure HTML, CSS, and JavaScript. Features a dynamic blog system, course showcase, and lead generation forms.

🌐 **Live Site**: [https://vijaysaini.com](https://vijaysaini.com)

## ✨ Features

### 🎓 Course Landing Page
- Professional course-selling layout optimized for conversions
- Featured courses with pricing and ratings
- Student testimonials and success stories
- Trust badges and social proof
- Call-to-action sections throughout

### 📚 Dynamic Blog System
- Write blog posts in Markdown
- Automatic blog index generation
- Syntax highlighting for code blocks
- Responsive blog listing and individual post pages
- SEO-friendly URLs and metadata

### 📥 Lead Generation
- Download page with form integration
- n8n webhook integration for email automation
- Form validation and user feedback
- Lead capture for course curriculum downloads

### 🎨 Modern Design
- Dark/Light theme switcher
- Smooth animations and transitions
- Fully responsive (mobile, tablet, desktop)
- Accessible and SEO-optimized
- Professional color scheme and typography

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (for building blog index)
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/TechSckoolByVijay/VijaySaini.com.git
cd VijaySaini.com
```

2. **Build the blog index**
```bash
npm run build
```

3. **Open in browser**
```bash
# Open index.html in your browser
# Or use a local server (recommended)
npx serve .
```

## 📝 Writing Blog Posts

### Create a New Blog Post

1. Create a new Markdown file in `content/blogs/`:
```bash
content/blogs/my-new-post.md
```

2. Add frontmatter at the top:
```markdown
---
title: "Your Blog Post Title"
date: 2026-01-05
author: Vijay Saini
tags: Azure, DevOps, Tutorial
---

# Your Blog Post Title

Your content here...
```

3. Build the blog index:
```bash
npm run build
```

4. The post will automatically appear on `blog.html`

### Markdown Support
- Headers (H1-H6)
- Lists (ordered and unordered)
- Code blocks with syntax highlighting
- Links and images
- Blockquotes
- Tables

## 🔧 Configuration

### n8n Webhook Setup (Download Form)

1. Create an n8n workflow with a webhook trigger
2. Update the webhook URL in `assets/js/download.js`:
```javascript
const N8N_WEBHOOK_URL = 'https://your-n8n-instance.com/webhook/devops-curriculum';
```

### Customize Content

- **Homepage**: Edit `index.html`
- **Courses**: Edit course cards in `index.html` and `projects.html`
- **About**: Edit `about.html`
- **Colors & Themes**: Edit `assets/css/themes/dark.css` and `light.css`
- **Styles**: Edit `assets/css/base.css` and `layout.css`

## 📦 Project Structure

```
VijaySaini.com/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── assets/
│   ├── css/
│   │   ├── base.css           # Base styles and utilities
│   │   ├── layout.css         # Layout components
│   │   └── themes/
│   │       ├── dark.css       # Dark theme
│   │       └── light.css      # Light theme
│   ├── images/                # Image assets
│   └── js/
│       ├── main.js            # Main JavaScript
│       ├── theme.js           # Theme switcher
│       ├── blog.js            # Blog listing
│       ├── blog-post.js       # Individual post rendering
│       └── download.js        # Download form handler
├── content/
│   └── blogs/                 # Markdown blog posts
├── data/
│   └── resume.md             # Resume content
├── public/
│   └── data/
│       └── blog-index.json   # Generated blog index (auto-created)
├── scripts/
│   └── build-blog-index.js   # Blog index generator
├── seo/
│   ├── meta.html
│   ├── robots.txt
│   └── sitemap.xml
├── *.html                     # HTML pages
├── package.json              # Node.js dependencies
└── README.md                 # This file
```

## 🚀 Deployment

### GitHub Pages (Automated)

The site automatically deploys to GitHub Pages when you push to the `main` branch.

**Setup Steps:**

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: GitHub Actions

2. **Push to main branch**
```bash
git add .
git commit -m "Deploy updates"
git push origin main
```

3. **GitHub Actions will automatically:**
   - Build the blog index from Markdown files
   - Deploy to GitHub Pages
   - Make your site live

**Custom Domain (Optional):**
- Add a `CNAME` file with your domain
- Configure DNS settings with your provider

### Manual Deployment

You can also deploy to any static hosting service:

1. Build the blog index:
```bash
npm run build
```

2. Upload all files to your hosting provider:
   - Netlify: Drag and drop the folder
   - Vercel: `vercel deploy`
   - Azure Static Web Apps: Use Azure CLI

## 🎨 Customization Guide

### Change Colors
Edit CSS variables in `assets/css/base.css`:
```css
:root {
    --accent-color: #3b82f6;  /* Primary color */
    --bg-primary: #0f0f23;    /* Background */
    --text-primary: #e4e4e7;  /* Text color */
}
```

### Add New Pages
1. Create HTML file (e.g., `services.html`)
2. Copy structure from existing page
3. Add navigation link in all pages
4. Style in `assets/css/layout.css`

### Modify Theme
- Dark theme: `assets/css/themes/dark.css`
- Light theme: `assets/css/themes/light.css`

## 📊 Analytics (Optional)

Add Google Analytics by including this in `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔒 Security

- No server-side code or databases
- Static files only
- Form submissions via n8n webhook
- HTTPS enforced on GitHub Pages

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 👨‍💻 Author

**Vijay Saini**
- Email: vijaysainiprofessional@gmail.com
- LinkedIn: [linkedin.com/in/vijay-saini-10759a8b](https://linkedin.com/in/vijay-saini-10759a8b)
- StackOverflow: [stackoverflow.com/users/5881105/vijay](https://stackoverflow.com/users/5881105/vijay)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Happy Coding!** 🚀
