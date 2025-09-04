# GitHub Pages Deployment Setup

Your Astro blog is now ready for automatic GitHub Pages deployment! 🚀

## 📋 Setup Steps

### 1. Push to GitHub Repository
First, you need to push this code to your GitHub repository:

```bash
# If not already initialized
git init
git add .
git commit -m "Add Astro migration with GitHub Pages deployment"

# Add your GitHub repository as remote
git remote add origin https://github.com/beirern/Personal-Website.git

# Push to main branch
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub: `https://github.com/beirern/Personal-Website`
2. Click **Settings** tab
3. Scroll down to **Pages** section in left sidebar
4. Under **Source**, select: **GitHub Actions**
5. That's it! The workflow will run automatically.

### 3. Your Site Will Be Available At:
```
https://beirern.github.io/Personal-Website/
```

## 🔧 How It Works

### Automatic Deployment
- **Trigger**: Every push to the `main` branch
- **Process**: GitHub Actions builds your Astro site and deploys to GitHub Pages
- **Build Command**: `astro build` with proper GitHub Pages configuration
- **Deploy**: Static files uploaded to GitHub Pages hosting

### Configuration Files
- **`.github/workflows/deploy.yml`**: GitHub Actions workflow
- **`astro.config.mjs`**: Updated with GitHub Pages settings:
  ```js
  site: 'https://beirern.github.io',
  base: '/Personal-Website',
  ```

### Production Features
- ✅ Draft posts automatically excluded
- ✅ Static site generation (fast loading)
- ✅ Automatic sitemap generation
- ✅ CDN distribution via GitHub Pages
- ✅ HTTPS enabled by default

## 🎯 Next Steps

### Option 1: Use GitHub Pages URL
Keep using `https://beirern.github.io/Personal-Website/`

### Option 2: Custom Domain (Optional)
If you want to use your own domain:

1. In repository **Settings > Pages**
2. Add your **Custom domain**: `nicolabeirer.com`
3. Update `astro.config.mjs`:
   ```js
   site: 'https://nicolabeirer.com',
   base: '/', // Remove base path
   ```
4. Add CNAME record in your DNS: `nicolabeirer.com` → `beirern.github.io`

## 🚀 Deployment Status

After pushing to GitHub, you can monitor deployment:
1. Go to **Actions** tab in your repository
2. See the deployment progress
3. Once complete, your site will be live!

## 🔄 Making Updates

To update your blog:
1. Make changes to markdown files, components, etc.
2. Commit and push to `main` branch:
   ```bash
   git add .
   git commit -m "Update blog content"
   git push
   ```
3. GitHub Actions automatically rebuilds and deploys!

No more server management - just push and it's live! 🎉