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
  title: "Software Engineer",
  company: "Current Role",
  timeline: "Present",
  location: "Remote/Hybrid",
  description: "Passionate software developer focused on building scalable systems and meaningful software solutions. Currently working on various projects involving system architecture, containerization, and full-stack development.",
  achievements: [
    "Building and maintaining scalable web applications",
    "Implementing containerization strategies with Docker & Kubernetes",
    "System architecture design and optimization",
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
      "JavaScript/TypeScript",
      "Python",
      "C/C++",
      "HTML/CSS",
      "Astro",
      "React",
      "Node.js"
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
      "AWS/Cloud"
    ]
  },
  {
    name: "Databases & Data",
    skills: [
      "SQL",
      "PostgreSQL",
      "MongoDB",
      "Database Design",
      "Data Analysis"
    ]
  },
  {
    name: "Concepts & Practices",
    skills: [
      "System Architecture",
      "Microservices",
      "RESTful APIs",
      "Agile/Scrum",
      "Test-Driven Development"
    ]
  }
];

export const education: Education[] = [
  {
    title: "Computer Science Studies",
    institution: "University of Washington",
    timeline: "Academic Background",
    description: "Strong foundation in computer science principles, algorithms, and software engineering practices."
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
    description: "Flying planes (pilot experience)"
  },
  {
    category: "Philosophy",
    description: "Reading and thinking about life's big questions"
  },
  {
    category: "Location",
    description: "Previously based in San Francisco"
  }
];

// Get preview data for homepage
export const getWorkPreview = () => ({
  currentWork,
  topSkills: skillCategories[0].skills.slice(0, 4) // First 4 skills from first category
});