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
    "Reduced deployment time of main application by 62 percent, from 80 minutes to 30 minutes, by migrating to an in-house deployment system and evangelizing its adoption across 100+ microservices (Ruby, Python, Scala) company-wide through effective stakeholder communication, comprehensive on-call documentation, and clear leadership alignment",
    "Reduced high severity incidents by 40% in one month by designing and implementing a canary deployment system with a rotating Deploy Coordinator role, automated End-To-End (E2E) test execution, and Sentry monitoring for error detection with automatic rollback capabilities",
    "Enabled true Continuous Delivery by automating deployments to run hourly once CI pipelines passed, increasing deployment frequency from manual on-demand releases to 24+ automated deployments daily",
    "Scanned 100+ production container images daily across 100+ microservices by building a system using ElasticSearch to inventory running containers and Artifactory Xray for vulnerability scanning, which automatically created JIRA tickets for teams with remediation timelines based on CVE score to comply with PCI and FEDRAMP standards",
    "Implemented a commit message enforcement system across two source control platforms (Gitlab and Gerrit) using a FastAPI (Python) server with Prometheus monitoring and built compliance dashboards to track adoption metrics, ensuring all commits were linked to JIRA tickets for PCI, SOC2, and FEDRAMP audits",
    "Mentored an intern in designing and implementing a CLI tool to track a commit's CI/CD status across multiple platforms, reducing team debugging time by 80%. That intern later received a job offer as a software engineer at Palo Alto Networks",
    "Migrated a single Gitlab server to a High Availability deployment using the Gitlab Environment Toolkit, automating creation of AWS resources (EC2, RDS, ElastiCache, S3, VPC, IAM) via Terraform and provisioning via Ansible, with a phased migration approach to minimize downtime",
    "Built an automated flaky test detection system that would rerun failed CI builds, identify tests with non-deterministic behavior, and flag them for correction, improving build reliability for a test suite of 80,000+ tests growing at 5,000 tests per month",
    "Contributed to the open-source Gitlab Environment Toolkit (GET) by submitting a commit that resolved an environment-specific issue, enabling smoother adoption of Gitlab's recommended deployment patterns",
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
      "Allowed all 2000+ developers to connect to in-office lab resources that were inaccessible during COVID shutdown via a Site-to-Site VPN built on Meraki routers",
      "Automated the VLAN configuration on lab machines using Ruby scripts and Ansible roles which allowed connectivity to out of lab machines"
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
      "Transitioned the API of one of the products from deploying in Amazon ECS to in-house Kubernetes Platform",
      "Moving to Kubernetes resulted in enabling autoscaling as well as observability via Grafana and alerting via Prometheus and cut deployment time by more than 2x",
      "Engineered automation for creation and deployment of AWS resources (EC2/ECS) using python/boto3"
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
      "Built endpoints to facilitate order management, social connections, messaging, and payment processing for 200 users using Node.js",
      "Authored React Native components in a mobile app for restaurant owners to manage menus, incorporating user feedback to improve the interface and functionality",
      "Created AWS infrastructure to host server and facilitate automated deployments via python/boto3",
      "Marketed app on University of Washington's campus to grow user base from 20 users to over 200",
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