# Simple Code Blog

A lightweight blog for your coding projects, built with Node.js and Express, without any heavy frameworks.

## Features

- Simple, clean design
- Markdown support for blog posts
- Syntax highlighting for code snippets
- Tag-based post filtering
- No database required (file-based)
- Mobile-responsive layout

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Visit `http://localhost:3000` in your browser

## Adding New Blog Posts

1. Create a new Markdown file in the `posts` directory
2. Add frontmatter at the top of your file:
   ```
   ---
   title: Your Post Title
   date: 2025-03-22
   tags: [tag1, tag2]
   ---
   ```
3. Write your post content in Markdown format
4. Save the file with a descriptive slug as the filename, e.g., `my-new-project.md`
5. Your post will automatically appear on the home page

## Customization

- Edit `templates/home.html` and `templates/post.html` to change the layout
- Modify `public/css/style.css` to update the styles
- Update the navigation links in the templates to add more pages

## Deployment

This blog can be easily deployed to platforms like:
- Heroku
- Vercel
- Render
- Digital Ocean
- Any server with Node.js installed

## License

MIT
