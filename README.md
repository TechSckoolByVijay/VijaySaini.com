# 🎨 Personal Portfolio Website - Vijay Saini

A modern, responsive, SEO-optimized multi-page personal portfolio website built with HTML, CSS, and JavaScript.

## ✨ Features

- **Multi-page Structure**: Home, About, Skills, Projects, and Contact pages
- **4 Theme Options**: Light, Dark, Minimal, and Neon (Cyberpunk) themes
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **SEO Optimized**: Meta tags, Open Graph, Schema.org markup, sitemap, and robots.txt
- **Modern UI/UX**: Clean design with smooth animations and transitions
- **Theme Persistence**: Your theme choice is saved in localStorage
- **Contact Form**: Frontend form with validation (ready for backend integration)
- **Accessible**: Proper heading structure, ARIA labels, and high contrast

## 📁 Project Structure

```
online-portfolio/
│
├── index.html              # Home page
├── about.html              # About page
├── skills.html             # Skills page
├── projects.html           # Projects page
├── contact.html            # Contact page
│
├── data/
│   └── resume.md           # Source resume content
│
├── assets/
│   ├── images/             # Images folder (add your photos here)
│   ├── css/
│   │   ├── base.css        # Global styles and CSS variables
│   │   ├── layout.css      # Layout components and responsive design
│   │   └── themes/
│   │       ├── light.css   # Light theme
│   │       ├── dark.css    # Dark theme (default)
│   │       ├── minimal.css # Minimal pastel theme
│   │       └── neon.css    # Neon cyberpunk theme
│   └── js/
│       ├── main.js         # Main interactions and animations
│       ├── theme.js        # Theme switching logic
│       └── resume-loader.js # Resume content loader (future enhancement)
│
├── seo/
│   ├── sitemap.xml         # Search engine sitemap
│   ├── robots.txt          # Crawler instructions
│   └── meta.html           # Reusable meta tags reference
│
├── copilot-instructions.md # Project specification
└── README.md               # This file
```

## 🚀 Getting Started

### Option 1: Open Locally

1. **Open the website**:
   - Simply open `index.html` in your web browser
   - Or right-click on `index.html` → "Open with" → Choose your browser

2. **Navigate the site**:
   - Use the navigation menu to explore different pages
   - Try switching themes using the dropdown in the top-right

### Option 2: Use a Local Server (Recommended)

For better performance and to avoid CORS issues:

#### Using Python:
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

#### Using Node.js (http-server):
```bash
# Install globally
npm install -g http-server

# Run server
http-server

# Then open: http://localhost:8080
```

#### Using VS Code Live Server:
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎨 Theme Customization

### Switching Themes

Use the theme dropdown in the navigation bar to switch between:
- **Light**: Clean and bright
- **Dark**: Default, easy on the eyes
- **Minimal**: Pastel colors with a clean aesthetic
- **Neon**: Cyberpunk-inspired with glowing effects

### Customizing Themes

Edit the CSS variables in the theme files:

```css
/* Example: assets/css/themes/dark.css */
[data-theme="dark"] {
    --bg-primary: #0f0f23;
    --accent-color: #3b82f6;
    /* ... modify colors as needed */
}
```

## 📝 Updating Content

### Method 1: Direct HTML Editing

Edit the HTML files directly to update content:
- `index.html` - Hero section, stats
- `about.html` - Experience, education, awards
- `skills.html` - Skills and certifications
- `projects.html` - Project details
- `contact.html` - Contact information

### Method 2: Update Resume Source

Edit `data/resume.md` and regenerate pages (requires manual sync or automation).

## 🖼️ Adding Images

1. Add your images to `assets/images/`
2. Update the references in HTML files:

```html
<!-- Replace profile placeholder with actual image -->
<img src="assets/images/profile.jpg" alt="Vijay Saini">
```

Recommended images:
- `profile.jpg` - Your professional photo
- `favicon.png` - Browser favicon
- `og-image.jpg` - Social media share image

## 🔍 SEO Configuration

### Update Meta Tags

Edit the meta tags in each HTML file's `<head>` section:

```html
<meta name="description" content="Your custom description">
<meta property="og:title" content="Your Title">
<meta property="og:image" content="your-image-url">
```

### Update Sitemap

After making changes, update `seo/sitemap.xml`:
- Change the domain from `vijaysaini.com` to your domain
- Update the `<lastmod>` dates

### Update Robots.txt

Edit `seo/robots.txt` to match your domain:
```
Sitemap: https://yourdomain.com/seo/sitemap.xml
```

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: > 968px
- **Tablet**: 768px - 968px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🌐 Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to Settings → Pages
3. Select branch and folder
4. Your site will be live at `https://yourusername.github.io/online-portfolio`

### Netlify

1. Drag and drop the project folder to [Netlify](https://app.netlify.com)
2. Or connect your GitHub repository
3. Deploy automatically

### Vercel

```bash
npm i -g vercel
vercel
```

### Traditional Hosting

Upload all files to your web server via FTP/SFTP.

## 🛠️ Customization Tips

### Changing Accent Color

Edit `assets/css/base.css`:
```css
:root {
    --accent-color: #your-color;
    --accent-hover: #your-hover-color;
}
```

### Adding New Pages

1. Create a new HTML file (e.g., `blog.html`)
2. Copy the structure from existing pages
3. Add navigation link to all pages
4. Update `seo/sitemap.xml`

### Contact Form Integration

The form in `contact.html` currently uses JavaScript for frontend validation. To make it functional:

**Option 1: Formspree**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option 2: Netlify Forms**
```html
<form name="contact" method="POST" data-netlify="true">
```

**Option 3: Custom Backend**
Update the form handler in `assets/js/main.js` to POST to your API.

## 📊 Analytics (Optional)

Add Google Analytics or other tracking:

```html
<!-- Add to <head> of each page -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'YOUR_ID');
</script>
```

## 🐛 Troubleshooting

### Themes not switching
- Check browser console for errors
- Ensure `assets/js/theme.js` is loaded
- Clear browser cache

### Animations not working
- Ensure `assets/js/main.js` is loaded
- Check if JavaScript is enabled in browser

### Styles not loading
- Check file paths are correct
- Ensure CSS files are in `assets/css/`
- Clear browser cache

## 📄 License

This portfolio template is free to use for personal and commercial projects.

## 👤 Author

**Vijay Saini**
- Email: vijaysainiprofessional@gmail.com
- LinkedIn: [linkedin.com/in/vijay-saini-10759a8b](https://linkedin.com/in/vijay-saini-10759a8b)
- StackOverflow: [stackoverflow.com/users/5881105/vijay](https://stackoverflow.com/users/5881105/vijay)

---

## 🎯 Quick Customization Checklist

- [ ] Update personal information in all HTML files
- [ ] Add your profile photo to `assets/images/`
- [ ] Update meta tags and SEO information
- [ ] Customize theme colors if desired
- [ ] Add your actual projects and experience
- [ ] Update contact form with backend integration
- [ ] Add favicon and social media images
- [ ] Update sitemap with your domain
- [ ] Test on multiple devices and browsers
- [ ] Deploy to hosting service

---

**Built with ❤️ using HTML, CSS, and JavaScript**
#   s c d s v d v s b a e r v e r g w e b v 
 
 #   s c d s v d v s b a e r v e r g w e b v 
 
 #   V i j a y S a i n i . c o m  
 