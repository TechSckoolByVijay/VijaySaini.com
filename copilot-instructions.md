# GitHub Copilot Instructions — Generate Responsive Multi-Page Personal Portfolio Website

**Goal:**  
Use the content from `data/resume.md` to automatically generate a complete, responsive, SEO-optimized multi-page personal portfolio website with clean HTML, CSS, and JavaScript. The website must look modern, professional, and follow current UI/UX trends.

---

## ✅ **Overall Requirements**
- Read and extract all resume text from:  
  **`data/resume.md`**
- Generate a **multi-page** static portfolio website:
  - **Home**
  - **About**
  - **Skills**
  - **Projects**
  - **Contact**
- Website must be:
  - Fully **responsive**
  - **SEO-optimized** (meta tags, structured headings, canonical links)
  - Built with **HTML, CSS, JavaScript**
  - Clean folder structure
  - Modern & trendy UI (glassmorphism OR neumorphism OR minimal dark theme)
  - With a **theme selector** (Light / Dark / Minimal / Neon)

---

## ✅ **Website Folder Structure**
Copilot, follow this exact folder layout:

project-root/
│
├── index.html                  # Home page
├── about.html                  # About page
├── skills.html                 # Skills page
├── projects.html               # Projects page
├── contact.html                # Contact page
│
├── data/
│   └── resume.md               # Source resume
│
├── assets/
│   ├── images/                 # Profile photo, background images, icons
│   ├── css/
│   │   ├── base.css            # Global styles, variables, resets
│   │   ├── layout.css          # Navbars, grids, typography, sections
│   │   ├── themes/
│   │   │   ├── light.css       # Light theme
│   │   │   ├── dark.css        # Dark theme
│   │   │   ├── minimal.css     # Minimal theme
│   │   │   └── neon.css        # Fancy neon / cyber theme
│   ├── js/
│   │   ├── main.js             # Interactions, animations
│   │   ├── theme.js            # Theme switching logic
│   │   └── resume-loader.js    # Loads content dynamically from resume.md
│
├── seo/
│   ├── sitemap.xml             # Auto-generate
│   ├── robots.txt              # SEO crawler instructions
│   └── meta.html               # Reusable meta tags & OG tags
│
└── README.md                   # Instructions for use

---

## ✅ **Portfolio Pages Description**

### **1. Home Page (`index.html`)**
- Hero banner with name, title, short intro from resume.
- CTA buttons: *View Projects*, *Download Resume*, *Contact Me*.
- Theme selector in top-right.

### **2. About Page**
- Convert “About me” or summary from resume.md into a clean section.
- Profile photo, timeline, career highlights.

### **3. Skills Page**
- Auto-extract skills from resume.
- Show as:
  - Category cards (Cloud, DevOps, Programming, Tools, etc.)
  - Skill bars or badges.
- Support dark/light theme contrast.

### **4. Projects Page**
- Extract all projects from resume.md.
- Display in responsive cards with:
  - Title
  - Description
  - Tech stack badges
  - Links (GitHub/demo)

### **5. Contact Page**
- Contact info from resume.md
- A working form (JavaScript frontend only)
- Add social links based on resume

---

## ✅ **Theme System Requirements**

**Themes to support:**
- **Light**
- **Dark**
- **Minimal (Pastel, clean)**
- **Neon (Glowing cyberpunk)**

**Theme Selector:**
- Put a toggle button in the navigation bar.
- Save the user’s choice in `localStorage`.
- Load theme CSS dynamically:

```js
document.getElementById("theme-selector").addEventListener("change", (e) => {
    const theme = e.target.value;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("selectedTheme", theme);
});
````

Use CSS variables so theme files override only colors, shadows, depth, borders, and typography.

---

## ✅ **SEO Requirements**

Copilot must insert:

### **Meta Tags**

* Title, meta description from resume.md
* Keywords based on skills + job role
* OpenGraph tags for sharing
* Canonical links on each page
* Schema.org JSON-LD:

  * Person
  * Portfolio
  * Website

### **Other SEO files**

* `seo/sitemap.xml`
* `seo/robots.txt`

### **Accessibility**

* Proper heading structure (`h1` → `h2` → `h3`)
* Alt text for all images
* High contrast in all themes

---

## ✅ **JavaScript Requirements**

* `resume-loader.js` reads `data/resume.md` and injects content dynamically.
* `theme.js` handles theme switching.
* `main.js` includes animations like fade-ins, scroll reveals.

---

## ✅ **Instructions for GitHub Copilot**

**Copilot, do all of the following:**

1. Read all text from `data/resume.md`.
2. Extract:

   * Name
   * Summary/About
   * Experience
   * Skills
   * Projects
   * Certifications
   * Contact details
3. Generate all HTML pages and place them in project root.
4. Generate CSS folder structure and files listed above.
5. Add JavaScript files:

   * `main.js`
   * `theme.js`
   * `resume-loader.js`
6. Add SEO folder contents.
7. Make the site responsive using CSS Flexbox/Grid.
8. Add a beautiful, modern, trending UI theme.
9. Add theme selector dropdown or toggle.
10. Ensure all content is auto-filled from resume.md.
11. Optimize for SEO and performance.
12. Use clean, semantic HTML.

---

## 🎯 Final Output

A **production-ready, responsive, SEO-optimized, multi-theme personal portfolio website** generated using content from `data/resume.md`.

Copilot should start generating the entire project structure and all files now.

