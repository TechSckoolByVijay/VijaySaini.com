// Blog listing page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    loadBlogList();
});

async function loadBlogList() {
    const blogList = document.getElementById('blogList');
    
    try {
        const response = await fetch('public/data/blog-index.json');
        
        if (!response.ok) {
            throw new Error('Failed to load blog index');
        }
        
        const blogs = await response.json();
        
        if (blogs.length === 0) {
            blogList.innerHTML = `
                <div class="empty-state">
                    <h3>No blog posts yet</h3>
                    <p>Check back soon for new content!</p>
                </div>
            `;
            return;
        }
        
        // Render blog posts
        blogList.innerHTML = blogs.map(blog => `
            <article class="blog-card fade-in">
                <div class="blog-card-header">
                    <h2 class="blog-card-title">
                        <a href="blog-post.html?slug=${blog.slug}">${escapeHtml(blog.title)}</a>
                    </h2>
                    <div class="blog-card-meta">
                        <span class="blog-date">📅 ${formatDate(blog.date)}</span>
                        <span class="blog-author">✍️ ${escapeHtml(blog.author)}</span>
                    </div>
                </div>
                <p class="blog-card-excerpt">${escapeHtml(blog.excerpt)}</p>
                <div class="blog-card-footer">
                    <div class="blog-tags">
                        ${blog.tags.map(tag => `<span class="blog-tag">${escapeHtml(tag)}</span>`).join('')}
                    </div>
                    <a href="blog-post.html?slug=${blog.slug}" class="btn btn-outline btn-small">Read More →</a>
                </div>
            </article>
        `).join('');
        
        // Trigger fade-in animations
        const cards = blogList.querySelectorAll('.blog-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
        
    } catch (error) {
        console.error('Error loading blog posts:', error);
        blogList.innerHTML = `
            <div class="error-state">
                <h3>⚠️ Unable to load blog posts</h3>
                <p>Please try again later or contact us if the problem persists.</p>
            </div>
        `;
    }
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
