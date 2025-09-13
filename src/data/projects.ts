// Projects data
export interface ProjectLink {
  type: 'github' | 'live' | 'demo';
  url: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  features?: string[];
  links: ProjectLink[];
  technologies: string[];
  featured?: boolean;
  category: 'featured' | 'system-architecture' | 'academic' | 'experimental';
}

export const projects: Project[] = [
  {
    id: 'personal-website',
    title: 'Personal Website & Blog',
    description: 'Modern Astro-based blog and portfolio site with TypeScript, dark mode, and responsive design. Features content collections, RSS feeds, and automated deployments.',
    longDescription: 'Modern portfolio and blog built with Astro and TypeScript. Features include dark mode, responsive design, content collections, RSS feeds, and automated GitHub Pages deployment. This very site you\'re viewing!',
    features: [
      'Static site generation with Astro',
      'TypeScript for type safety',
      'Dark/light theme toggle with system preference detection',
      'Content collections for blog posts with frontmatter validation',
      'RSS feed generation',
      'Responsive design with CSS custom properties',
      'Automated deployment with GitHub Actions',
      'SEO optimization and sitemap generation'
    ],
    links: [
      {
        type: 'github',
        url: 'https://github.com/beirern/Personal-Website',
        label: 'GitHub'
      },
      {
        type: 'live',
        url: '/',
        label: 'Live Site'
      }
    ],
    technologies: ['Astro', 'TypeScript', 'CSS3', 'GitHub Actions'],
    featured: true,
    category: 'featured'
  },
  {
    id: 'basketball-scraper',
    title: 'Basketball Statistics Scraper',
    description: 'Data collection and analysis tool for NBA statistics. Scrapes player and team data from various sources, processes it for analysis, and provides insights into player performance trends.',
    links: [
      {
        type: 'github',
        url: 'https://github.com/beirern',
        label: 'GitHub'
      }
    ],
    technologies: ['Python', 'Web Scraping', 'Data Analysis', 'NBA API'],
    featured: true,
    category: 'featured'
  },
];

// Helper functions to get projects by category
export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: Project['category']) => 
  projects.filter(p => p.category === category);

// Get preview projects for homepage (top 3 featured/important)
export const getProjectsPreview = () => projects.slice(0, 3);