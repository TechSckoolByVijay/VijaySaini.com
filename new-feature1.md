You are modifying an existing fully static website (HTML/CSS/JS) hosted on GitHub Pages.

GOAL:
Add a dynamic blog system powered by Markdown files, WITHOUT introducing any backend or server.

REQUIREMENTS:
1. Create a folder `/content/blogs/`
2. Blog posts will be written as Markdown files (example: `my-first-blog.md`)
3. At build time, generate `/public/data/blog-index.json` containing:
   - title
   - slug (from filename)
   - date (from frontmatter or file metadata)
   - raw markdown content
4. Use a Node.js script (`scripts/build-blog-index.js`) to scan markdown files and generate the JSON.
5. Use vanilla JavaScript on the frontend to:
   - Render a blog listing page (`blog.html`)
   - Render individual blog posts (`blog-post.html?slug=...`)
6. Use a Markdown parser (marked.js or similar) to render content.
7. Typography must be clean and readable:
   - max-width container
   - readable font size
   - code blocks styled
8. NO framework (no React, Vue, etc.)
9. Website must continue working on GitHub Pages.

DELIVERABLES:
- Node script to generate blog-index.json
- blog.html + blog-post.html
- JS logic to load and render blogs
- Minimal CSS improvements for readability

CONSTRAINTS:
- Static hosting only
- No server, no database
- Must work after GitHub Pages deployment
