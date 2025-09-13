// Work and experience data
export interface WorkItem {
  title: string;
  company: string;
  timeline: string;
  location?: string;
  description: string;
  achievements: string[];
  current?: boolean;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Education {
  title: string;
  institution: string;
  timeline: string;
  description: string;
}

export interface PersonalInterest {
  category: string;
  description: string;
}

export const currentWork: WorkItem = {
  title: "Site Reliability Engineer",
  company: "Cisco Meraki",
  timeline: "07/2022 - Present",
  location: "Remote & San Francisco, CA",
  description: "Focused on building solutions to keep CI/CD reliable and scalable for 2000+ engineers. Broad mix of responsibilities including firefighting, infrastructure management, and system design to ensure high availability and performance of critical CI/CD systems.",
  achievements: [
    "Building a canary system to deploy new versions to a cohort of customers before wider rollout",
    "Implementing pull based machine-by-machine deployments to improve reliability",
    "Mentored a intern",
    "Mentoring junior developers and code review"
  ],
  current: true
};

export const previousWork: WorkItem[] = [
  {
    title: "Software Development Projects",
    company: "Personal & Academic",
    timeline: "Ongoing",
    location: "Various",
    description: "Extensive experience with personal and academic software development projects, focusing on learning and implementing various technologies and best practices.",
    achievements: [
      "Developed basketball statistics scraping and analysis tools",
      "Created database management systems in C",
      "Built web applications with modern frameworks",
      "Participated in University of Washington projects"
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages & Frameworks",
    skills: [
      "JavaScript",
      "Nodejs",
      "Python",
      "Django",
      "Ruby",
      "Rails",
      "Java"
    ]
  },
  {
    name: "Infrastructure & Tools",
    skills: [
      "Docker",
      "Kubernetes",
      "Linux/Unix",
      "Git",
      "CI/CD",
      "AWS",
      "Ansible",
      "Terraform",
      "Jenkins",
      "Grafana",
      "Gitlab",
      "Prometheus",
      "GitHub Actions",
      "PostgreSQL"
    ]
  },
  {
    name: "Concepts & Practices",
    skills: [
      "System Architecture",
      "Microservices",
      "RESTful APIs",
      "Agile/Scrum"
    ]
  }
];

export const education: Education[] = [
  {
    title: "B.S.: Applied & Computational Math Sciences: Mathematical Economics and Quantitative Finance",
    institution: "University of Washington",
    timeline: "09/2018 - 06/2022",
    description: "Specialized in mathematics and quantitative finance, with coursework in algorithms, data structures, statistics, financial modeling, and machine learning."
  }
];

export const personalInterests: PersonalInterest[] = [
  {
    category: "Martial Arts",
    description: "Jiu-jitsu and Muay Thai training"
  },
  {
    category: "Athletics", 
    description: "Cycling and various sports"
  },
  {
    category: "Aviation",
    description: "Training for my Private Pilot License"
  },
  {
    category: "Philosophy",
    description: "Reading, thinking, and writing about life's big questions"
  },
  {
    category: "Traveling",
    description: "Trying to immerse in different cultures"
  }
];

// Get preview data for homepage
export const getWorkPreview = () => ({
  currentWork,
  topSkills: skillCategories[0].skills.slice(0, 4) // First 4 skills from first category
});