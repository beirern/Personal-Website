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
      expect(Array.isArray(post.data.tags)).toBe(true);
    });
  });

  it('should load all poems correctly', async () => {
    const poems = await getCollection('poems');
    expect(poems.length).toBeGreaterThan(0);
    
    // Verify required frontmatter
    poems.forEach(poem => {
      expect(poem.data.title).toBeDefined();
      expect(poem.data.date).toBeInstanceOf(Date);
      expect(Array.isArray(poem.data.tags)).toBe(true);
    });
  });

  it('should have posts with proper tag structure', async () => {
    const posts = await getCollection('posts');
    const taggedPosts = posts.filter(post => post.data.tags.length > 0);
    
    expect(taggedPosts.length).toBeGreaterThan(0);
    
    taggedPosts.forEach(post => {
      post.data.tags.forEach(tag => {
        expect(typeof tag).toBe('string');
        expect(tag.length).toBeGreaterThan(0);
      });
    });
  });
});