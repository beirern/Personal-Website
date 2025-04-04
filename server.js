const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');
const matter = require('gray-matter');
const highlightjs = require('highlight.js');

console.time('Startup tasks');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up the marked renderer with code highlighting
marked.setOptions({
  highlight: function (code, lang) {
    return highlightjs.highlightAuto(code, [lang]).value;
  },
  langPrefix: 'hljs language-'
});

// Serve static files
app.use(express.static('public'));

// Set view engine (using plain HTML)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

console.timeEnd('Startup tasks');

console.time('Getting blog posts');
// Helper function to get all blog posts
function getBlogPosts() {
  const postsDirectory = path.join(__dirname, 'posts');
  const postFiles = fs.readdirSync(postsDirectory).filter(file =>
    file.endsWith('.md')
  );

  const posts = postFiles.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const excerpt = data.excerpt ? marked.parse(data.excerpt) : content.slice(0, 200) + '...';

    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      date: data.date,
      tags: data.tags || [],
      excerpt: excerpt,
      content: content
    };
  });

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
console.timeEnd('Getting blog posts');

// Read all files on startup to avoid doing it when trying to load a page
const blogPosts = getBlogPosts();

// Home page route
app.get('/', (req, res) => {
  res.render('home', {
    posts: blogPosts
  });
});

// Individual post route
app.get('/post/:slug', (req, res) => {
  const { slug } = req.params;
  const filePath = path.join(__dirname, 'posts', `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Post not found');
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  const htmlContent = marked.parse(content);

  res.render('post', {
    title: data.title,
    date: new Date(data.date).toLocaleDateString(),
    content: htmlContent,
    tags: (data.tags || []).map(tag =>
      `<span class="tag"><a href="/tag/${tag}">#${tag}</a></span>`
    ).join(' ')
  });
});

// Tag page route
app.get('/tag/:tag', (req, res) => {
  const { tag } = req.params;
  const posts = blogPosts.filter(post =>
    post.tags && post.tags.includes(tag)
  );

  res.render('home', {
    posts: posts,
    title: `Posts tagged with #${tag}`
  });
});

// About page route
app.get('/about', (req, res) => {
  res.render('about');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Blog server running at http://localhost:${PORT}`);
});
