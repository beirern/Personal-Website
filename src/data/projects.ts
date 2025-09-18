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
    longDescription: 'AI-powered chatbot that uses Retrieval Augmented Generation (RAG) to answer questions about general aviation documents. Users can upload PDF documents and interact with an intelligent chat interface that provides sourced answers from the uploaded content.',
    links: [
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
  {
    id: 'lla-database',
    title: 'LLA Database Project',
    description: 'File-based employee database built from scratch in C as part of Low Level Academy course. Demonstrates systems programming fundamentals.',
    longDescription: 'A complete file-based database implementation in C for managing employee information. Features binary file format with custom headers, CRUD operations, and robust error handling using return values instead of exceptions. Built as a learning project to understand low-level programming concepts.',
    features: [
      'Complete CRUD operations for employee records',
      'Custom binary file format with validation headers',
      'Magic number verification for file integrity',
      'Error handling as return values (C-style)',
      'Manual memory management and resource handling',
      'Custom build system with shell scripts'
    ],
    links: [
      {
        type: 'github',
        url: 'https://github.com/beirern/LLA-DB-Project',
        label: 'GitHub'
      },
      {
        type: 'demo',
        url: '/posts/c-db-project',
        label: 'Blog Post'
      }
    ],
    technologies: ['C', 'File I/O', 'Systems Programming', 'Memory Management']
  },
  {
    id: 'basketball-scrapper',
    title: 'Basketball Reference Team Stats Scrapper',
    description: 'Java web scraper that extracted 30+ years of NBA team statistics from Basketball Reference, published as a Kaggle dataset.',
    longDescription: 'My first major programming project - a Java application that scraped comprehensive NBA team statistics spanning 30+ years from Basketball Reference. Used HTML parsing and regex to extract data, generating hundreds of CSV files. The resulting dataset was published on Kaggle and received positive community feedback.',
    features: [
      'HTML parsing and data extraction with regex',
      'Multi-year historical data collection (1976-2018)',
      'CSV file generation for structured data output',
      'Kaggle dataset publication with community engagement',
      'Command-line interface for data processing',
      'Robust error handling for web scraping challenges'
    ],
    links: [
      {
        type: 'github',
        url: 'https://github.com/beirern/Basketball-Reference-Team-Stats-Scrapper',
        label: 'GitHub'
      },
      {
        type: 'demo',
        url: '/posts/basketball-scrapper-project',
        label: 'Blog Post'
      },
      {
        type: 'live',
        url: 'https://www.kaggle.com/datasets/nick127/basketball-reference-team-page-stats',
        label: 'Kaggle Dataset'
      }
    ],
    technologies: ['Java', 'Web Scraping', 'HTML Parsing', 'Data Processing', 'Regex']
  },
  {
    id: 'lakubot',
    title: 'Lakubot Discord Bot',
    description: 'Long-running Discord bot passion project with community features and ChatGPT integration for interactive storytelling.',
    longDescription: 'My first and longest-running passion project - a Discord bot that has evolved over years of development. Features comprehensive community management tools and recent ChatGPT API integration for generating and narrating interactive stories from user prompts. Represents continuous learning and iteration in bot development.',
    features: [
      'Multi-year continuous development and maintenance',
      'Community management and moderation tools',
      'ChatGPT API integration for story generation',
      'Interactive storytelling with AI narration',
      'Custom command system and user interactions',
      'Database integration for persistent data storage'
    ],
    links: [
      {
        type: 'github',
        url: 'https://github.com/beirern/Sno-Bot',
        label: 'Reference Code (Sno-Bot)'
      }
    ],
    technologies: ['Discord.js', 'Node.js', 'ChatGPT API', 'Database', 'Bot Development']
  },
  {
    id: 'pathfinding-visualization',
    title: 'Pathfinding Visualization',
    description: 'Interactive pathfinding visualization implementing A* algorithm with GUI level builder, showcasing optimization learning journey.',
    longDescription: 'An interactive pathfinding project that implements the A* algorithm with a custom GUI level builder. Initially attempted pixel-perfect pathfinding but learned valuable optimization lessons, leading to an efficient waypoint-based system. Features visual debugging and demonstrates algorithmic problem-solving evolution.',
    features: [
      'A* pathfinding algorithm implementation',
      'Interactive GUI level builder and editor',
      'Visual path generation and debugging',
      'Waypoint-based optimization (learned from performance issues)',
      'Player and enemy movement systems',
      'Save/load functionality for custom levels'
    ],
    links: [
      {
        type: 'github',
        url: 'https://github.com/beirern/Pathfinding',
        label: 'GitHub'
      }
    ],
    technologies: ['Python', 'A* Algorithm', 'GUI Development', 'Game Development', 'Optimization']
  },
  {
    id: 'simple-game',
    title: 'Simple Game',
    description: 'Interactive browser-based game built with HTML5 Canvas and JavaScript, hosted on nicolagameoflife.click.',
    longDescription: 'A simple yet engaging browser-based game developed to explore game development fundamentals using HTML5 Canvas and vanilla JavaScript. Features interactive gameplay mechanics and demonstrates core game programming concepts.',
    links: [
      {
        type: 'github',
        url: 'https://github.com/beirern/Simple-Game',
        label: 'GitHub'
      },
      {
        type: 'live',
        url: 'https://nicolagameoflife.click',
        label: 'Play Game'
      }
    ],
    technologies: ['JavaScript', 'HTML5 Canvas', 'Game Development', 'Web Technologies']
  }
];

// Get preview projects for homepage (first 3 projects)
export const getProjectsPreview = () => projects.slice(0, 3);