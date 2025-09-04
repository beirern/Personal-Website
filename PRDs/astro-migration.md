# Astro Migration PRD

## Executive Summary

This PRD outlines the migration from our current Express.js/Pug blog to Astro, a modern static site generator. The migration will eliminate custom server logic while preserving all existing functionality and improving performance, developer experience, and maintainability.

## Current State Analysis

### Architecture
- **Framework**: Express.js with Pug templates
- **Content**: Markdown files with gray-matter frontmatter
- **Rendering**: Server-side with runtime parsing
- **Deployment**: Node.js server required
- **Build Process**: No build step, runtime content loading

### Features Inventory
- ✅ Blog posts in `/posts/*.md`
- ✅ Poems in `/poems/*.md`
- ✅ Draft/invisible content filtering (environment-based)
- ✅ Tag-based filtering and pages
- ✅ Code syntax highlighting (highlight.js)
- ✅ Responsive design
- ✅ Static assets (images, CSS)
- ✅ Navigation (Home, Poems, About, external links)

### Pain Points
- Custom server logic for content parsing
- Runtime file system operations
- Manual routing configuration
- No TypeScript support
- Manual code highlighting setup
- Server dependency for deployment

## Target State (Astro)

### Benefits
- **Performance**: Static generation, no JavaScript by default
- **Developer Experience**: Built-in markdown support, TypeScript, hot reload
- **Simplicity**: File-based routing, content collections
- **Modern**: Built-in optimizations, image processing, SEO
- **Deployment**: Static files, CDN-friendly

### Architecture
- **Framework**: Astro with TypeScript
- **Content**: Content collections (`src/content/`)
- **Rendering**: Static site generation
- **Deployment**: Static files
- **Build Process**: Optimized build pipeline

## Migration Plan

### Phase 1: Project Setup
**Estimated Time**: 2-3 hours

#### Tasks
1. Initialize Astro project with TypeScript template
2. Install required integrations:
   ```bash
   npm create astro@latest . -- --template=blog --typescript
   npm install @astrojs/mdx @astrojs/sitemap
   ```
3. Configure `astro.config.mjs`:
   - Enable content collections
   - Configure markdown options
   - Set up integrations

#### Success Criteria
- Astro development server runs successfully
- TypeScript compilation works
- Basic project structure established

### Phase 2: Content Migration
**Estimated Time**: 3-4 hours

#### Content Collections Setup
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().optional(),
    draft: z.boolean().default(false),
    invisible: z.boolean().default(false),
  }),
});

const poemsCollection = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().optional(),
    draft: z.boolean().default(false),
    invisible: z.boolean().default(false),
  }),
});

export const collections = {
  'posts': postsCollection,
  'poems': poemsCollection,
};
```

#### Migration Steps
1. Move `posts/*.md` → `src/content/posts/`
2. Move `poems/*.md` → `src/content/poems/`
3. Validate frontmatter compatibility
4. Create content collection schemas

#### Success Criteria
- All markdown files parse without errors
- Content collection validation passes
- Frontmatter fields preserved

### Phase 3: Template Migration
**Estimated Time**: 4-6 hours

#### Component Structure
```
src/
├── layouts/
│   ├── BaseLayout.astro
│   └── PostLayout.astro
├── components/
│   ├── Header.astro
│   ├── Navigation.astro
│   ├── PostPreview.astro
│   └── PoemPreview.astro
└── styles/
    └── global.css
```

#### Template Conversions
| Current (Pug) | Target (Astro) | Notes |
|---------------|----------------|--------|
| `common-layout.pug` | `BaseLayout.astro` | Base HTML structure |
| `home.pug` | `index.astro` | Posts listing |
| `post.pug` | `PostLayout.astro` | Individual post |
| `poems.pug` | `poems.astro` | Poems listing |
| `poem.pug` | `PoemLayout.astro` | Individual poem |
| `about.pug` | `about.astro` | Static about page |

#### Success Criteria
- All templates render correctly
- CSS styling preserved
- Component reusability maintained

### Phase 4: Routing & Pages
**Estimated Time**: 3-4 hours

#### Dynamic Routes
```
src/pages/
├── index.astro (home - posts listing)
├── about.astro (static about page)
├── poems.astro (poems listing)
├── posts/
│   └── [...slug].astro (dynamic post pages)
├── poems/
│   └── [...slug].astro (dynamic poem pages)
└── tags/
    └── [tag].astro (tag filtering pages)
```

#### Content Filtering Logic
```typescript
// Filter drafts/invisible in production
const isDev = import.meta.env.DEV;
const visiblePosts = allPosts.filter(post => 
  isDev || (!post.data.draft && !post.data.invisible)
);
```

#### Success Criteria
- All current URLs work correctly
- Draft/invisible filtering matches current behavior
- Tag filtering functionality preserved

### Phase 5: Static Assets
**Estimated Time**: 1-2 hours

#### Asset Migration
1. Move `public/css/style.css` → `src/styles/global.css`
2. Keep `public/images/` → `public/images/` (unchanged)
3. Preserve `public/favicon.ico`

#### Astro Optimizations
- Image optimization for blog images
- CSS processing and minification
- Asset bundling and fingerprinting

#### Success Criteria
- All images load correctly
- CSS styling identical to current
- Asset optimization working

## Testing Strategy

### 1. Visual Regression Testing

#### Setup Playwright
```bash
npm install -D @playwright/test
```

#### Screenshot Comparison Tests
```typescript
// tests/visual-regression.spec.ts
import { test, expect } from '@playwright/test';

const pages = [
  '/',
  '/about', 
  '/poems',
  '/posts/avepass',
  '/tags/startup'
];

for (const page of pages) {
  test(`Visual regression for ${page}`, async ({ page }) => {
    await page.goto(`http://localhost:3000${page}`);
    await expect(page).toHaveScreenshot(`${page.replace('/', '-')}.png`);
  });
}
```

### 2. Content Integrity Tests

#### Jest/Vitest Unit Tests
```typescript
// tests/content.test.ts
import { describe, it, expect } from 'vitest';
import { getCollection } from 'astro:content';

describe('Content Collections', () => {
  it('should load all posts correctly', async () => {
    const posts = await getCollection('posts');
    expect(posts.length).toBeGreaterThan(0);
    
    // Verify required frontmatter
    posts.forEach(post => {
      expect(post.data.title).toBeDefined();
      expect(post.data.date).toBeInstanceOf(Date);
    });
  });

  it('should filter drafts in production', async () => {
    // Mock production environment
    vi.mock('astro:env/client', () => ({
      DEV: false
    }));
    
    const posts = await getCollection('posts', ({ data }) => 
      !data.draft && !data.invisible
    );
    
    posts.forEach(post => {
      expect(post.data.draft).toBeFalsy();
      expect(post.data.invisible).toBeFalsy();
    });
  });

  it('should preserve tag functionality', async () => {
    const posts = await getCollection('posts');
    const taggedPosts = posts.filter(post => 
      post.data.tags?.includes('startup')
    );
    
    expect(taggedPosts.length).toBeGreaterThan(0);
  });
});
```

### 3. End-to-End Testing

#### Playwright E2E Tests
```typescript
// tests/e2e.spec.ts
import { test, expect } from '@playwright/test';

test('Navigation works correctly', async ({ page }) => {
  await page.goto('/');
  
  // Test navigation links
  await page.click('text=Poems');
  await expect(page).toHaveURL('/poems');
  
  await page.click('text=About');
  await expect(page).toHaveURL('/about');
  
  await page.click('text=Home');
  await expect(page).toHaveURL('/');
});

test('Post navigation and content', async ({ page }) => {
  await page.goto('/');
  
  // Click first post
  const firstPost = page.locator('.post-preview').first();
  await firstPost.locator('a').first().click();
  
  // Verify we're on a post page
  await expect(page.locator('.post-content')).toBeVisible();
  await expect(page.locator('h1')).toBeVisible();
});

test('Tag filtering works', async ({ page }) => {
  await page.goto('/tags/startup');
  
  // Should show filtered posts
  const posts = page.locator('.post-preview');
  await expect(posts).toHaveCountGreaterThan(0);
  
  // All posts should have the startup tag
  const tagLinks = page.locator('a[href="/tags/startup"]');
  await expect(tagLinks).toHaveCountGreaterThan(0);
});

test('404 handling', async ({ page }) => {
  const response = await page.goto('/nonexistent-page');
  expect(response?.status()).toBe(404);
});
```

### 4. Performance Testing

#### Lighthouse CI Configuration
```json
// .lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000/", "http://localhost:3000/about"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["warn", {"minScore": 0.9}],
        "categories:seo": ["warn", {"minScore": 0.9}]
      }
    }
  }
}
```

#### Bundle Size Analysis
```bash
# Compare bundle sizes
npm run build
du -sh dist/
# vs current (no bundle)
```

### 5. MCP Tools Integration

#### TypeScript Validation
```typescript
// After migration, use MCP to check for issues
// mcp__ide__getDiagnostics will catch TypeScript errors
```

### 6. Migration Validation Scripts

#### Content Audit Script
```bash
#!/bin/bash
# content-audit.sh

echo "=== Content Audit ==="
echo "Current posts: $(find posts -name "*.md" | wc -l)"
echo "Migrated posts: $(find src/content/posts -name "*.md" | wc -l)"
echo "Current poems: $(find poems -name "*.md" | wc -l)"  
echo "Migrated poems: $(find src/content/poems -name "*.md" | wc -l)"

echo -e "\n=== Draft Detection ==="
echo "Current drafts: $(grep -r "draft: true" posts poems | wc -l)"
echo "Migrated drafts: $(grep -r "draft: true" src/content | wc -l)"

echo -e "\n=== Frontmatter Validation ==="
# Verify all files have required frontmatter
find src/content -name "*.md" -exec grep -L "title:" {} \; | while read file; do
  echo "Missing title: $file"
done
```

## Success Criteria & Verification

### Functional Parity
- [ ] All current URLs accessible (/, /about, /poems, /posts/:slug, /poems/:slug, /tags/:tag)
- [ ] Draft/invisible filtering matches current behavior
- [ ] Tag filtering functionality preserved
- [ ] Navigation links work correctly
- [ ] External links (GitHub, LinkedIn) unchanged
- [ ] Code syntax highlighting functional
- [ ] Responsive design maintained

### Performance Improvements
- [ ] Lighthouse performance score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Bundle size optimized
- [ ] Static file serving benefits

### Content Integrity
- [ ] All posts migrated successfully
- [ ] All poems migrated successfully
- [ ] Frontmatter preserved correctly
- [ ] Images and assets working
- [ ] Internal links functional

### Developer Experience
- [ ] TypeScript compilation clean
- [ ] Hot reload working
- [ ] Build process successful
- [ ] No runtime errors
- [ ] MCP diagnostics clean

### Deployment Ready
- [ ] Static build generates correctly
- [ ] All assets included in build
- [ ] CDN deployment compatible
- [ ] No server dependencies

## Risk Assessment & Mitigation

### High Risk
| Risk | Impact | Mitigation |
|------|--------|------------|
| Content loss during migration | High | Backup files, validation scripts |
| SEO impact from URL changes | High | Maintain exact URL structure |
| Performance regression | Medium | Lighthouse CI, benchmarking |

### Medium Risk
| Risk | Impact | Mitigation |
|------|--------|------------|
| CSS/styling differences | Medium | Visual regression tests |
| Code highlighting issues | Medium | Test markdown rendering |
| Build complexity | Low | Comprehensive documentation |

### Low Risk
| Risk | Impact | Mitigation |
|------|--------|------------|
| TypeScript learning curve | Low | Gradual adoption, good docs |
| Deployment changes | Low | Static hosting simpler |

## Implementation Timeline

### Week 1: Foundation
- Days 1-2: Project setup and configuration
- Days 3-4: Content migration and validation
- Day 5: Initial template conversion

### Week 2: Development  
- Days 1-2: Complete template migration
- Days 3-4: Routing and dynamic pages
- Day 5: Static assets and styling

### Week 3: Testing & Polish
- Days 1-2: Comprehensive testing setup
- Days 3-4: Performance optimization
- Day 5: Documentation and deployment prep

## Rollback Strategy

### Prerequisites
- Complete backup of current codebase
- Current deployment maintained during migration
- Separate branch for migration work

### Rollback Process
1. Revert to main branch
2. Redeploy current Express.js version
3. DNS/routing unchanged (if domain used)
4. Investigate migration issues
5. Plan revised approach

## Post-Migration Benefits

### Immediate
- Static site deployment (faster, cheaper)
- Better developer experience (TypeScript, hot reload)
- Built-in optimizations (images, CSS, JS)
- No server maintenance required

### Long-term
- Modern toolchain adoption
- Better SEO and performance
- Easier content management
- Scalable architecture for future features

## Conclusion

This migration will modernize the blog architecture while preserving all existing functionality. The comprehensive testing strategy ensures content integrity and functional parity, while the phased approach minimizes risk. The end result will be a faster, more maintainable, and developer-friendly blog platform.