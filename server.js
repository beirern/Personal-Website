const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');
const matter = require('gray-matter');
const highlightjs = require('highlight.js');

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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('fs').readFileSync);

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

    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      date: data.date,
      tags: data.tags || [],
      excerpt: data.excerpt || content.slice(0, 200) + '...',
      content: content
    };
  });

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Home page route
app.get('/', (req, res) => {
  const posts = getBlogPosts();
  const template = fs.readFileSync(path.join(__dirname, 'templates', 'home.html'), 'utf8');

  // Generate post HTML
  const postsHTML = posts.map(post => {
    return `
      <article class="post-preview">
        <h2><a href="/post/${post.slug}">${post.title}</a></h2>
        <div class="post-meta">
          <span class="date">${new Date(post.date).toLocaleDateString()}</span>
          ${post.tags.map(tag => `<span class="tag"><a href="/tag/${tag}">#${tag}</a></span>`).join(' ')}
        </div>
        <div class="excerpt">${post.excerpt}</div>
        <a href="/post/${post.slug}" class="read-more">Read More</a>
      </article>
    `;
  }).join('');

  // Replace template placeholders
  const html = template
    .replace('{{content}}', `
      <h1>My Coding Projects</h1>
      <div class="posts-container">
        ${postsHTML}
      </div>
    `);

  res.send(html);
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

  const template = fs.readFileSync(path.join(__dirname, 'templates', 'post.html'), 'utf8');
  const html = template
    .replace('{{title}}', data.title)
    .replace('{{date}}', new Date(data.date).toLocaleDateString())
    .replace('{{content}}', htmlContent)
    .replace('{{tags}}', (data.tags || []).map(tag =>
      `<span class="tag"><a href="/tag/${tag}">#${tag}</a></span>`
    ).join(' '));

  res.send(html);
});

// Tag page route
app.get('/tag/:tag', (req, res) => {
  const { tag } = req.params;
  const posts = getBlogPosts().filter(post =>
    post.tags && post.tags.includes(tag)
  );

  const template = fs.readFileSync(path.join(__dirname, 'templates', 'home.html'), 'utf8');

  // Generate post HTML
  const postsHTML = posts.map(post => {
    return `
      <article class="post-preview">
        <h2><a href="/post/${post.slug}">${post.title}</a></h2>
        <div class="post-meta">
          <span class="date">${new Date(post.date).toLocaleDateString()}</span>
          ${post.tags.map(t => `<span class="tag"><a href="/tag/${t}">#${t}</a></span>`).join(' ')}
        </div>
        <div class="excerpt">${post.excerpt}</div>
        <a href="/post/${post.slug}" class="read-more">Read More</a>
      </article>
    `;
  }).join('');

  // Replace template placeholders
  const html = template
    .replace('{{title}}', `Posts tagged with #${tag}`)
    .replace('{{content}}', `
      <h1>Posts tagged with #${tag}</h1>
      <div class="posts-container">
        ${postsHTML}
      </div>
    `);

  res.send(html);
});

// About page route
app.get('/about', (req, res) => {
  const template = fs.readFileSync(path.join(__dirname, 'templates', 'home.html'), 'utf8');

  const html = template
    .replace('{{title}}', 'About Me')
    .replace('{{content}}', `
      <h1>About Me</h1>
      <div class="about-content">
        <img src="/images/profile.jpg" alt="Profile Image" class="profile-img">
        <p>
          Hello! I'm a passionate developer who loves building things with code. This blog is where I share my projects, 
          what I've learned along the way, and helpful tutorials for other developers.
        </p>
        <p>
          My main areas of interest include:
        </p>
        <ul>
          <li>Frontend Development (JavaScript, React)</li>
          <li>Backend Development (Node.js, Express)</li>
          <li>Data Visualization</li>
          <li>Problem Solving & Algorithms</li>
        </ul>
        <p>
          When I'm not coding, you can find me hiking, reading, or experimenting with new technologies.
        </p>
        <p>
          Feel free to reach out if you want to collaborate or have any questions about my projects!
        </p>
      </div>
    `);

  res.send(html);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Blog server running at http://localhost:${PORT}`);
});
