# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Astro development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run build:github` - Build for GitHub Pages deployment
- `npm test` - Run unit tests with Vitest
- `npm run test:e2e` - Run end-to-end tests with Playwright

## Architecture Overview

This is an Astro static site generator blog with TypeScript support, serving markdown-based content with modern web standards.

### Core Components

- **astro.config.mjs** - Main Astro configuration with integrations
- **Content Collections** - Type-safe markdown content in `/src/content/`
  - Posts in `/src/content/posts/*.md`
  - Poems in `/src/content/poems/*.md` (legacy structure)
- **Components** - Astro components in `/src/components/`
- **Layouts** - Reusable page layouts in `/src/layouts/`
- **Pages** - Route pages in `/src/pages/`
- **Styles** - Global CSS in `/src/styles/global.css`

### Content Structure

Content uses Astro Content Collections with TypeScript schema validation:
- `title` - Content title (string, required)
- `date` - Publication date (date, required)
- `tags` - Array of tags for filtering (string[], defaults to empty array)
- `draft` - Hide from production (boolean, defaults to false)
- `invisible` - Hide completely (boolean, defaults to false)  
- `excerpt` - Optional custom excerpt (string, optional)

### Environment Behavior

- **Development** (`import.meta.env.DEV`): Shows all content including drafts
- **Production**: Filters out `draft: true` and `invisible: true` content

### Content Loading

Content is loaded using Astro's `getCollection()` API from content collections, with automatic type safety and frontmatter validation.

### Route Structure

- `/` - Home page with blog posts list
- `/posts/[...slug]` - Individual blog post (dynamic route)
- `/tags/[tag]` - Posts filtered by tag (dynamic route)
- `/about` - About page
- Static pages generated at build time

### Key Dependencies

- `astro` - Static site generator framework
- `@astrojs/mdx` - MDX support for enhanced markdown
- `@astrojs/sitemap` - Automatic sitemap generation
- `@astrojs/rss` - RSS feed generation
- `sharp` - Image optimization
- `typescript` - Type safety and tooling