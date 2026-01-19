# Blog Management Guide

## How to Add a New Blog Post

### Step 1: Create the Markdown File

1. Create a new `.md` file in `content/blogs/` directory
2. Name it with a descriptive slug (e.g., `my-new-blog-post.md`)
3. Add your content with optional frontmatter (frontmatter will be ignored, metadata comes from JSON)

Example:
```markdown
---
title: "My Blog Title"
date: 2026-01-19
author: Vijay
tags: Azure, DevOps
---

# My Blog Title

Your blog content here...
```

### Step 2: Update the blogs.json File

1. Open `data/blogs.json`
2. Add a new entry to the `blogs` array:

```json
{
  "id": "my-new-blog-post",
  "title": "My Awesome Blog Post Title",
  "slug": "my-new-blog-post",
  "description": "A brief description of your blog post that will appear in the listing and meta tags.",
  "author": "Vijay",
  "date": "2026-01-19",
  "tags": ["Azure", "DevOps", "Tutorial"],
  "readTime": "5 min read",
  "featured": false,
  "published": true
}
```

### Field Descriptions:

- **id**: Must match the markdown filename (without .md extension)
- **title**: The display title shown on blog listing and post page
- **slug**: URL-friendly identifier (use lowercase with hyphens)
- **description**: Brief excerpt for listing page and SEO
- **author**: Author name (typically "Vijay")
- **date**: Publication date in YYYY-MM-DD format
- **tags**: Array of relevant tags for categorization
- **readTime**: Estimated reading time (e.g., "5 min read")
- **featured**: Boolean - shows in featured section if true
- **published**: Boolean - only published posts are visible

### Step 3: Test Locally

1. Open `blog.html` in your browser
2. Verify your blog appears in the listing
3. Click to view the full post
4. Check formatting, code highlighting, and links

### Step 4: Commit and Push

```bash
git add content/blogs/my-new-blog-post.md
git add data/blogs.json
git commit -m "Add new blog post: My Awesome Blog Post Title"
git push origin main
```

## Updating an Existing Blog

### Update Title or Metadata

Simply edit the entry in `data/blogs.json` - no code changes needed!

### Update Content

Edit the corresponding `.md` file in `content/blogs/`

## Blog Ordering

Blogs are automatically sorted by date (newest first) on the listing page.

## Unpublishing a Blog

Set `"published": false` in `data/blogs.json` - the blog will be hidden but not deleted.

## Example blogs.json Structure

```json
{
  "blogs": [
    {
      "id": "blog-one",
      "title": "First Blog Post",
      "slug": "blog-one",
      "description": "Description here",
      "author": "Vijay",
      "date": "2026-01-19",
      "tags": ["Tag1", "Tag2"],
      "readTime": "5 min read",
      "featured": true,
      "published": true
    },
    {
      "id": "blog-two",
      "title": "Second Blog Post",
      "slug": "blog-two",
      "description": "Description here",
      "author": "Vijay",
      "date": "2026-01-18",
      "tags": ["Tag3"],
      "readTime": "3 min read",
      "featured": false,
      "published": true
    }
  ]
}
```

## Tips

- Keep `id` and `slug` consistent and URL-friendly
- Use descriptive titles and descriptions for better SEO
- Add relevant tags for better categorization
- Estimate read time: ~200 words per minute
- Test thoroughly before pushing to production
