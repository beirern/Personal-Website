---
title: If You Like this Website then Claude 3.7 Can Make It For You Too
date: 2025-03-26
tags: [AI]
excerpt: I try to use AI For the first time to see how it builds and designs a project from the beginning. Here are my takeaways and thoughts
---

## Some Background

For a while I've wanted to have a personal website where I can write about my projects and general thoughts. Whether the world needs this is questionable but this last week I've decided to do it. Mostly because I also decided I would leave my job and this website might help with a new one but that's a story for a different post. More pertinent is that I realized that this would be a great use of AI! I've worked on websites before and have experience deploying them so I understand how to design it and just need a worker to execute my vision: the perfect use case for AI!

My vision was pretty simple: A website that would just serve blog posts, use templates since it seemed to me that that would be an easy way to add more content and keep the look consistent, and not be built on React. Personal project to me should avoid complex optimizations and unnecessary complexity as much as possible. My projects tend to be worked on in spurts of inspiration/motivation/free time and the absolute worst thing that can happen is opening a project and it not working. I am proud that Lakubot has running for multiple years and everytime I open it up it's worked and I can just add features. In my experience React is overly complicated and will lead to problemns in the future though I'm also happy to concede that this might be a skill issue.

For historical reference at the time of writing my codebase looks is at this commit: https://github.com/beirern/Personal-Website/commit/bd719c165f4f00bd99f63a37e63392af8ecff332.

## First Pass

With my vision being laid out this was the first prompt I fed Claude 3.7 (I use ChatGPT a lot for general questions so wanted to try out Claude for the first time).

> I want to have a personal website about the projects that I code. This website will be like a blog. I want the website to use templates so that I can easily make new blog posts for myself. Each blog post can contain words and pictures and should support me writing in markdown. The blog posts will be written by me in the code so the website UI does not necessarily need to support writing a post.

Claude then responded with suggestions to use a framework (I am not opposed to frameworks)

> I'd recommend one of these popular static site generators:
>
>Hugo - Very fast, great for blogs, and has many templates
>
>Jekyll - Mature platform with GitHub Pages integration
>
>11ty (Eleventy) - Flexible, simple JavaScript-based system
>
>Next.js - React-based with static export capability
>
> Would you like me to create a simple template for any of these options? Or would you prefer a more detailed explanation of how to set up one of these systems?

At this point I poked around the frameworks and took a fancy to Hugo. The examples looked nice and it seemed to promise to be easy to get it going. I asked Claude for some themes and tried to set it up myself. This is where I started having a skill issue. I tried to use the [PaperMode](https://github.com/adityatelange/hugo-PaperMod) theme and could not get it to work for the life of me. I also noticed that there were `hugo` commands, a build pipeline of some kind, and git submodules. I tried to fix the errors but couldn't figure it out, so like a good engineer I went back to Claude for help. Of course I didn't tell Claude that I already tried to do this myself and pretended that I wanted it to do the work for me.

>Can you code up a website that uses PaperMod as the theme and write an example blog post. If I run hugo server I want to be able to see this website on my computer on whatever port Hugo decides to use


Claude then proceeded to make a bunch of files to do just this. I have to say I was very impressed, I hadn't seen ChatGPT have this kind of functionality and I then took all the files it had created and copied them over... and of course this also did not work

>I just get a blank page and no html when I go to localhost:1313

Claude and I proceeded to go back and forth trying to fix the issue but get no where. At this point I admit defeat. As I mentioned earlier what I value in personal projects is minimal complexity and being able to fully understand my codebase, so Hugo seemed like it wouldn't be a good choice (it definitely wasn't me being lazy and not wanting to dive into Hugo).

>Honestly I don't want to use something like Hugo because it's difficult for me to understand. I would rather just write the website without using heavy frameworks. Let's not even worry about a DB and just make a website that uses Node for the backend but otherwise isn't tied to a framework.

Claude whipped up [this commit](https://github.com/beirern/Personal-Website/commit/6fc1351783bb4ce6cb546879db1f7e0d8cb2f2afv) (excuse the `node_modules` it did not include a `.gitignore`). This actually worked and rendered this website with 2 sample blog posts! I was extremely impressed as it had some styling and seemed responsive as well. So AI is amazing and I won't have a job right?

## AI Can Make Some Interesting Design Decisions

First off I will say that Claude did get something that worked, and something that I could use to create more blog posts. It is really impressive and really cool that in like 5 minutes I had a website and more impressively a website that wasn't created via a CLI tool that asked a bunch of y/n questions on what I wanted. It also went above and beyond and added tags, an "excerpt" concept where each post has a description or excerpt from it, and tags, and not only tags but you can filter on tags!! I didn't even ask for that yet **it works**. This website probably isn't super unique but Claude *more or less* built it the way I wanted it. However, it's worth taking a look at some of the weird or not great things that it decided to do. You'll probably notice a general theme.

### 1. Templating was done via `replace()`

When I had thought about templating I was thinking about files that are templated in some templating language (at this point I had really only used Jinja2 because of Ansible) and using some kind of package/logic to turn that into an HTML file. Claude had decided that what templating meant was having a variable in an HTML file wrapped in double brackets, e.g. `{{content}}`, and then *in javascript* taking HTML and using `.replace()` to replace `{{content}}` with the HTML. For example

```javascript
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
```

Like I guess this is templating? I never used a templating engine in JS so I thought maybe there wasn't one and this was actually proper, either way it worked so I noted this and kept poking.


### 2. Creating a directory it did not use

One of the first things I noticed when perusing the code was that there was a `views/` directory that was empty and I didn't notice the one time it was referenced. I [committed the directory](https://github.com/beirern/Personal-Website/commit/09fd3dcb66a972dc102e92e72d1aeb54305fcd6a) but had no idea why. If you understand templating in JS you might already know what was going on.

### 3. It set options in Express that it did not use

Related to the last point I eventually found where `views/` was referenced. 

```javascript
// Set view engine (using plain HTML)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('fs').readFileSync);
```

I never used these options in `express` before so I didn't know what they do. I ended up looking it up and found [documentation](https://expressjs.com/en/guide/using-template-engines.html) about view engines and at this point I realized what happened. I had heard that AI can frequently implement half-backed ideas into the code it writes and this was a prime example.

If it had properly used templates it would have set `app.set('view engine', 'pug');` and filled out `views/` with `.pug` files rather than using HTML files with `.replace()`. As far as I can tell it isn't valid to do `app.set('view engine', 'html')` and it doesn't even use this functionality anyways since all the endspoints use `res.send(<html-content>)`. So yea, prime example if it doing something completely half-baked.

### 4. (Nit) Read files each time an endpoint was hit instead of storing that information on startup

Based on how this project is setup we will need to read files, HTML or markdown to know what template to use and what posts exist. Claude wrote a great function to find this information.

```javascript
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
      categories: data.categories || [],
      excerpt: data.excerpt || content.slice(0, 200) + '...',
      content: content
    };
  });

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
```

However note that this is a function and not a variable. Each endpoint that needed this data would call this function which means everytime a user would hit one of these endpoints it would read files on disk that are not going to change. I/O is really slow and when I started using the website I noticed that it would take 1-2 seconds for a page to load. I'll discuss more what was changed below but I believe a big cause of that was reading files every time we hit an endpoint.

## Gong Back and Properly Implementing Templates

So at this point there were 2 things I wanted to fix

1. Using proper tempalates, e.g. `pug`, rather than `.replace()`ing HTML files
2. Try to speed up the endpoints since they were taking 1-2 seconds to render

I had used all the replies in one chat with Claude so I was on my own. I proceeded to add the copilot extension to VSCode as I wanted an AI that had context into my codebase. I asked it to take the HTML files and convert it to `.pug` files which it did quite well. I did some things on my own like create `common.pug` as some headers and footers were different if you were looking at a post vs looking at the Home and About page.

Copilot helped with making the `.pug` files and switching the endpoints to use `express` + `pug` to serve templates. This is now where we are at [now](https://github.com/beirern/Personal-Website/commit/bd719c165f4f00bd99f63a37e63392af8ecff332). 

To tackle the slowness I moved the logic to read blog posts to do it on startup rather than on each endpoint. That and the templating sped things up and now we get quite fast loading times of tenths of a millisecond.

## Final Thoughts

I think AI is really cool! It did really cool things like add tags and filter on tags without me asking and *everything just worked* ;). But it wasn't perfect but some of the general things I took away

* Be skeptical of the output of AI and have source control to go back
* It's harder to understand what the code is doing if you didn't write it
* Being specific in prompts leads to better outcomes
* AI with context in the codebase (Copilot vs Claude online) is really helpful for specific prompting and refactoring specific parts of the code