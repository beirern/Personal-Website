# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with nodemon (watches .js, .pug, .md files)
- `npm start` - Start production server

## Architecture Overview

This is a lightweight Node.js blog built with Express and Pug templates, serving markdown-based content without heavy frameworks.

### Core Components

- **server.js** - Main application entry point with all routes and logic
- **Content System** - Markdown files with gray-matter frontmatter parsing
  - Posts in `/posts/*.md` 
  - Poems in `/poems/*.md`
- **Templates** - Pug views in `/views/` with shared layouts (`common-layout.pug`)
- **Static Assets** - CSS and images served from `/public/`

### Content Structure

All content files use frontmatter with these fields:
- `title` - Content title
- `date` - Publication date
- `tags` - Array of tags for filtering
- `draft` - Hide from production (shown in development)
- `invisible` - Hide completely (like draft but explicit)
- `excerpt` - Optional custom excerpt (otherwise auto-generated)

### Environment Behavior

- **Development** (`NODE_ENV=development`): Shows all content including drafts
- **Production**: Filters out `draft: true` and `invisible: true` content

### Content Loading

Content is loaded once at startup and cached in memory for performance. The server reads all markdown files and sorts by date (newest first).

### Route Structure

- `/` - Home page with blog posts list
- `/post/:slug` - Individual blog post
- `/poems` - Poems listing page  
- `/poem/:slug` - Individual poem
- `/tag/:tag` - Posts filtered by tag
- `/about` - About page
- `/404` - 404 error page

### Key Dependencies

- `marked` - Markdown parsing with highlight.js for code blocks
- `gray-matter` - Frontmatter parsing
- `pug` - Template engine
- `express` - Web framework
- `fs-extra` - File system utilities