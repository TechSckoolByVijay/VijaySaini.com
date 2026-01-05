const fs = require('fs');
const path = require('path');

const BLOGS_DIR = path.join(__dirname, '..', 'content', 'blogs');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'blog-index.json');

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
        return { metadata: {}, content: content };
    }
    
    const frontmatterText = match[1];
    const markdownContent = match[2];
    
    const metadata = {};
    frontmatterText.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
            metadata[key] = value;
        }
    });
    
    return { metadata, content: markdownContent };
}

/**
 * Generate slug from filename
 */
function generateSlug(filename) {
    return filename.replace(/\.md$/, '');
}

/**
 * Extract excerpt from markdown content (first 200 characters)
 */
function extractExcerpt(content) {
    // Remove markdown headers
    const cleaned = content
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .trim();
    
    const excerpt = cleaned.substring(0, 200);
    return excerpt.length < cleaned.length ? excerpt + '...' : excerpt;
}

/**
 * Build blog index from markdown files
 */
function buildBlogIndex() {
    console.log('🔨 Building blog index...');
    
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`✅ Created output directory: ${OUTPUT_DIR}`);
    }
    
    // Check if blogs directory exists
    if (!fs.existsSync(BLOGS_DIR)) {
        console.error(`❌ Error: Blogs directory not found at ${BLOGS_DIR}`);
        process.exit(1);
    }
    
    // Read all markdown files
    const files = fs.readdirSync(BLOGS_DIR).filter(file => file.endsWith('.md'));
    
    if (files.length === 0) {
        console.warn('⚠️  No markdown files found in blogs directory');
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2));
        console.log('✅ Created empty blog index');
        return;
    }
    
    console.log(`📄 Found ${files.length} blog post(s)`);
    
    // Process each markdown file
    const blogs = files.map(filename => {
        const filePath = path.join(BLOGS_DIR, filename);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { metadata, content: markdownContent } = parseFrontmatter(content);
        
        const slug = generateSlug(filename);
        const blog = {
            slug,
            title: metadata.title || 'Untitled',
            date: metadata.date || new Date().toISOString().split('T')[0],
            author: metadata.author || 'Vijay Saini',
            tags: metadata.tags ? metadata.tags.split(',').map(t => t.trim()) : [],
            excerpt: extractExcerpt(markdownContent),
            content: markdownContent.trim()
        };
        
        console.log(`  ✓ ${blog.title} (${slug})`);
        return blog;
    });
    
    // Sort by date (newest first)
    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Write to JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(blogs, null, 2));
    
    console.log(`\n✅ Blog index generated successfully!`);
    console.log(`📁 Output: ${OUTPUT_FILE}`);
    console.log(`📊 Total posts: ${blogs.length}`);
}

// Run the script
try {
    buildBlogIndex();
} catch (error) {
    console.error('❌ Error building blog index:', error.message);
    process.exit(1);
}
