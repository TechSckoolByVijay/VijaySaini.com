// Individual blog post page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Configure marked.js options
    marked.setOptions({
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(code, { language: lang }).value;
                } catch (err) {
                    console.error('Highlight error:', err);
                }
            }
            return code;
        },
        breaks: true,
        gfm: true
    });
    
    loadBlogPost();
});

async function loadBlogPost() {
    const blogContent = document.getElementById('blogPostContent');
    
    // Get slug from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    
    if (!slug) {
        showError('No blog post specified');
        return;
    }
    
    try {
        // Load blog metadata from JSON
        const metaResponse = await fetch('data/blogs.json');
        
        if (!metaResponse.ok) {
            throw new Error('Failed to load blog index');
        }
        
        const data = await metaResponse.json();
        const blog = data.blogs.find(b => b.slug === slug);
        
        if (!blog || !blog.published) {
            showError('Blog post not found');
            return;
        }
        
        // Load blog content from markdown file
        const contentResponse = await fetch(`content/blogs/${blog.mdFile}`);
        
        if (!contentResponse.ok) {
            throw new Error('Failed to load blog content');
        }
        
        let markdown = await contentResponse.text();
        
        // Remove frontmatter if present
        markdown = markdown.replace(/^---[\s\S]*?---\n/, '');
        
        // Update page title
        document.getElementById('pageTitle').textContent = `${blog.title} - Vijay`;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', blog.description);
        }
        
        // Render blog post
        const htmlContent = marked.parse(markdown);
        
        blogContent.innerHTML = `
            <header class="blog-post-header">
                <h1 class="blog-post-title">${escapeHtml(blog.title)}</h1>
                <div class="blog-post-meta">
                    <span class="blog-date">📅 ${formatDate(blog.date)}</span>
                    <span class="blog-read-time">⏱️ ${blog.readTime}</span>
                </div>
                <div class="blog-post-tags">
                    ${blog.tags.map(tag => `<span class="blog-tag">${escapeHtml(tag)}</span>`).join('')}
                </div>
            </header>
            <div class="blog-post-content">
                ${htmlContent}
            </div>
        `;
        
        // Highlight code blocks
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
        
        // Add copy buttons to code blocks
        addCopyButtons();
        
    } catch (error) {
        console.error('Error loading blog post:', error);
        showError('Unable to load blog post. Please try again later.');
    }
}

function showError(message) {
    const blogContent = document.getElementById('blogPostContent');
    blogContent.innerHTML = `
        <div class="error-state">
            <h2>⚠️ ${message}</h2>
            <p>Please return to the <a href="blog.html">blog listing</a> or <a href="contact.html">contact us</a> if you need assistance.</p>
        </div>
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach((block) => {
        const pre = block.parentElement;
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = '📋 Copy';
        copyButton.setAttribute('aria-label', 'Copy code to clipboard');
        
        copyButton.addEventListener('click', async () => {
            const code = block.textContent;
            try {
                await navigator.clipboard.writeText(code);
                copyButton.innerHTML = '✅ Copied!';
                setTimeout(() => {
                    copyButton.innerHTML = '📋 Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
                copyButton.innerHTML = '❌ Failed';
                setTimeout(() => {
                    copyButton.innerHTML = '📋 Copy';
                }, 2000);
            }
        });
        
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(copyButton);
        wrapper.appendChild(pre);
    });
}
