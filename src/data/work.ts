// Work and experience data
export interface WorkItem {
  title: string;
  company: string;
  companyUrl?: string;
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
  institutionUrl?: string;
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
  companyUrl: "https://meraki.cisco.com",
  timeline: "07/2022 - Present",
  location: "San Francisco, CA",
  description: "Site Reliability Engineer focused on building solutions to keep CI/CD reliable and scalable for 2000+ engineers. Proven track record delivering projects impactful across business units on time, whether for compliance regimes or enhancing developer happiness and productivity.",
  achievements: [
    "Redesigned CI/CD deployment pipeline for customer-facing applications, achieving 50% more frequent deployments without compromising quality",
    "Implemented targeted deployments for final customer validation through End-To-End Testing, reducing Sev1 incidents by 40%",
    "Introduced in-house deployment system that decreased deployment time from 80 minutes to 30 minutes, adopted across 100+ microservices",
    "Revamped GitLab self-hosted architecture into high availability solution using AWS resources (EC2, RDS, S3, ElastiCache) with Terraform and Ansible",
    "Developed automated process to scan Docker images for vulnerabilities, ensuring compliance with PCI and FedRAMP standards",
    "Mentored intern in designing and implementing CLI tool to track commit CI/CD status",
    "Presented key milestones to cross-functional teams, communicating with hundreds of engineers across the organization"
  ],
  current: true
};

export const previousWork: WorkItem[] = [
  {
    title: "Site Reliability Engineering Intern",
    company: "Cisco Meraki",
    companyUrl: "https://meraki.cisco.com",
    timeline: "06/2021 - 08/2021",
    location: "San Francisco, CA",
    description: "Internship focused on network infrastructure and automation to support remote development during COVID-19.",
    achievements: [
      "Configured network using VLANs and Site-to-Site VPN to allow 500 developer servers and 3000 developers to access development resources from home",
      "Automated network configuration and user provisioning with Ruby scripts and Ansible roles"
    ]
  },
  {
    title: "Software Development Engineering Intern",
    company: "Apptio Inc.",
    companyUrl: "https://www.apptio.com",
    timeline: "06/2020 - 09/2020",
    location: "Bellevue, WA",
    description: "Focused on migrating services to Kubernetes and automating AWS infrastructure management.",
    achievements: [
      "Transitioned API from Amazon ECS to in-house Kubernetes Platform, enabling autoscaling and observability via Grafana and Prometheus",
      "Cut deployment time by more than 2x through Kubernetes migration",
      "Engineered automation for AWS resources with Terraform and Python/boto3"
    ]
  },
  {
    title: "Full Stack Developer",
    company: "Avepass",
    companyUrl: "https://www.linkedin.com/company/takeoffapp",
    timeline: "04/2019 - 04/2022",
    location: "Seattle, WA",
    description: "Developed web application and mobile app features for restaurant ordering platform serving 200+ users.",
    achievements: [
      "Created Node.js endpoints for order fulfillment, payment processing, friend connections, and messaging",
      "Designed and deployed administration portal for restaurant owners using React Native",
      "Maintained and optimized React.js front-end improving user experience and performance"
    ]
  },
  {
    title: "Lifeguard & Swim Instructor",
    company: "YMCA of Greater Seattle",
    companyUrl: "https://www.seattleymca.org",
    timeline: "04/2016 - 08/2018",
    location: "Sammamish, WA",
    description: "Safety-focused role teaching swimming and ensuring facility safety for hundreds of visitors.",
    achievements: [
      "Taught hundreds of students ranging from preschoolers to adults how to swim",
      "Received CPR and Lifeguard training to ensure visitor safety and emergency response",
      "Participated in monthly safety trainings and safety audits",
      "Provided exceptional customer service to visiting families"
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      "Ruby",
      "Python",
      "Java",
      "JavaScript",
      "Node.js",
      "Bash",
      "SQL"
    ]
  },
  {
    name: "Infrastructure & Cloud",
    skills: [
      "AWS",
      "Terraform",
      "Ansible",
      "Docker",
      "Kubernetes",
      "Linux",
      "PostgreSQL",
      "ElastiCache (Redis)"
    ]
  },
  {
    name: "CI/CD & DevOps",
    skills: [
      "GitLab CI/CD",
      "Jenkins",
      "TeamCity",
      "GitHub Actions",
      "Git",
      "Prometheus",
      "Grafana"
    ]
  },
  {
    name: "Compliance & Security",
    skills: [
      "PCI Compliance",
      "FedRAMP Compliance",
      "SOC2",
      "Vulnerability Management",
      "Security Scanning"
    ]
  }
];

export const education: Education[] = [
  {
    title: "B.S.: Applied & Computational Math Sciences: Mathematical Economics and Quantitative Finance",
    institution: "University of Washington",
    institutionUrl: "https://www.washington.edu",
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