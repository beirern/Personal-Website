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
    technologies: ['Astro', 'TypeScript', 'GitHub Actions']
  },
  {
    id: 'aviation-docs-ai',
    title: 'AI RAG to query documents related to General Aviation',
    description: 'Website hosting a chat bot that uses Retrieval Augmented Generation (RAG) to answer questions about general aviation.',
    longDescription: 'Modern portfolio and blog built with Astro and TypeScript. Features include dark mode, responsive design, content collections, RSS feeds, and automated GitHub Pages deployment. This very site you\'re viewing!',    links: [
      {
        type: 'live',
        url: 'https://aviationdocs.net',
        label: 'Aviation Docs AI'
      }
    ],
    features: [
      'Upload and parse user uploaded PDF documents',
      'Chat and see sources used for answers'
    ],
    technologies: ['Python', 'Django', 'RAG AI', 'PostgreSQL', 'Docker', 'AWS', 'Vector DB']
  },
];

// Get preview projects for homepage (first 3 projects)
export const getProjectsPreview = () => projects.slice(0, 3);