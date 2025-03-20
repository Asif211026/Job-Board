// This file contains mock data for development purposes
// Will be replaced with actual API data in production

// Mock Jobs
export const jobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'New York, NY',
    type: 'Full-time',
    experience: '3-5 years',
    salary: '$90,000 - $120,000',
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML'],
    description: 'TechCorp is seeking a Senior Frontend Developer to join our growing team. The ideal candidate will have strong experience with React and modern JavaScript frameworks.',
    responsibilities: [
      'Develop and maintain web applications using React and related technologies',
      'Work closely with designers and backend developers to implement features',
      'Write clean, maintainable, and efficient code',
      'Participate in code reviews and mentor junior developers'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3-5 years of experience in frontend development',
      'Strong proficiency in JavaScript, React, HTML, and CSS',
      'Experience with TypeScript, Redux, and modern frontend build tools',
      'Excellent problem-solving and communication skills'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Health, dental, and vision insurance',
      'Flexible work arrangements',
      '401(k) matching',
      'Professional development budget'
    ],
    postedDate: '2023-05-15',
    applicationDeadline: '2023-06-30',
    employer: '101'
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'DesignHub Creative',
    location: 'Remote',
    type: 'Full-time',
    experience: '2-4 years',
    salary: '$70,000 - $95,000',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping'],
    description: 'DesignHub Creative is looking for a talented UX/UI Designer to create beautiful, functional interfaces for our clients. You\'ll be working on a variety of projects from concept to implementation.',
    responsibilities: [
      'Create user-centered designs by understanding business requirements and user feedback',
      'Develop wireframes, prototypes, and high-fidelity mockups',
      'Collaborate with product managers and engineers to define and implement new features',
      'Conduct usability testing and iterate on designs'
    ],
    requirements: [
      'Bachelor\'s degree in Design, HCI, or related field',
      '2-4 years of experience in UX/UI design',
      'Proficiency in design tools like Figma and Adobe Creative Suite',
      'Strong understanding of user-centered design principles',
      'Portfolio demonstrating your design skills'
    ],
    benefits: [
      'Competitive salary',
      'Remote work flexibility',
      'Health insurance',
      'Paid time off',
      'Learning and development budget'
    ],
    postedDate: '2023-05-20',
    applicationDeadline: '2023-07-15',
    employer: '102'
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: 'InnovateTech',
    location: 'San Francisco, CA',
    type: 'Full-time',
    experience: '4-6 years',
    salary: '$100,000 - $140,000',
    skills: ['JavaScript', 'Node.js', 'React', 'MongoDB', 'AWS'],
    description: 'InnovateTech is seeking a Full Stack Developer to build scalable and maintainable web applications. You will work on all aspects of our platform, from user interfaces to backend systems.',
    responsibilities: [
      'Develop and maintain full-stack web applications',
      'Design and implement RESTful APIs',
      'Optimize applications for maximum speed and scalability',
      'Collaborate with cross-functional teams to define, design, and ship new features'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or equivalent experience',
      '4-6 years of full-stack development experience',
      'Proficiency in JavaScript, Node.js, and React',
      'Experience with database design and ORM technologies',
      'Knowledge of cloud services (AWS, Azure, or GCP)'
    ],
    benefits: [
      'Competitive salary and equity',
      'Comprehensive health benefits',
      'Flexible work hours',
      'Home office stipend',
      'Professional development opportunities'
    ],
    postedDate: '2023-05-10',
    applicationDeadline: '2023-07-01',
    employer: '103'
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'DataInsights Analytics',
    location: 'Boston, MA',
    type: 'Full-time',
    experience: '3-5 years',
    salary: '$95,000 - $130,000',
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics'],
    description: 'DataInsights Analytics is looking for a Data Scientist to help uncover insights from complex datasets. You will use statistical methods and machine learning to solve business problems.',
    responsibilities: [
      'Develop and implement data models and algorithms',
      'Analyze large datasets to identify patterns and trends',
      'Create data visualizations and reports',
      'Collaborate with engineering teams to deploy models into production'
    ],
    requirements: [
      'Master\'s or PhD in Statistics, Computer Science, or related field',
      '3-5 years of experience in data science or analytics',
      'Strong programming skills in Python and SQL',
      'Experience with machine learning frameworks (e.g., TensorFlow, PyTorch)',
      'Excellent communication and presentation skills'
    ],
    benefits: [
      'Competitive salary',
      'Health and dental coverage',
      'Flexible work arrangements',
      'Continued education support',
      'Wellness program'
    ],
    postedDate: '2023-05-18',
    applicationDeadline: '2023-07-10',
    employer: '104'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    location: 'Austin, TX',
    type: 'Full-time',
    experience: '3-6 years',
    salary: '$95,000 - $135,000',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Infrastructure as Code'],
    description: 'CloudTech Solutions is seeking a DevOps Engineer to help us build and maintain our cloud infrastructure. You will work closely with development teams to automate and optimize deployment processes.',
    responsibilities: [
      'Design and implement CI/CD pipelines',
      'Manage and optimize cloud infrastructure (AWS)',
      'Automate deployment and scaling processes',
      'Monitor systems and implement security best practices'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or equivalent experience',
      '3-6 years of experience in DevOps or system administration',
      'Strong experience with cloud platforms (preferably AWS)',
      'Knowledge of containerization technologies (Docker, Kubernetes)',
      'Experience with infrastructure as code tools (Terraform, CloudFormation)'
    ],
    benefits: [
      'Competitive salary',
      'Comprehensive health benefits',
      'Remote work options',
      '401(k) with matching',
      'Generous PTO policy'
    ],
    postedDate: '2023-05-22',
    applicationDeadline: '2023-07-20',
    employer: '105'
  }
];

// Mock Applications
export const applications = [
  {
    id: '1',
    job: {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions'
    },
    status: 'pending',
    appliedDate: '2023-05-20',
    resume: 'resume-link-1.pdf',
    coverLetter: 'Brief cover letter content...',
    user: '201'
  },
  {
    id: '2',
    job: {
      id: '2',
      title: 'UX/UI Designer',
      company: 'DesignHub Creative'
    },
    status: 'reviewed',
    appliedDate: '2023-05-22',
    resume: 'resume-link-2.pdf',
    coverLetter: 'Brief cover letter content...',
    user: '201'
  },
  {
    id: '3',
    job: {
      id: '3',
      title: 'Full Stack Developer',
      company: 'InnovateTech'
    },
    status: 'interviewed',
    appliedDate: '2023-05-15',
    resume: 'resume-link-3.pdf',
    coverLetter: 'Brief cover letter content...',
    user: '202'
  },
  {
    id: '4',
    job: {
      id: '4',
      title: 'Data Scientist',
      company: 'DataInsights Analytics'
    },
    status: 'offered',
    appliedDate: '2023-05-18',
    resume: 'resume-link-4.pdf',
    coverLetter: 'Brief cover letter content...',
    user: '202'
  },
  {
    id: '5',
    job: {
      id: '5',
      title: 'DevOps Engineer',
      company: 'CloudTech Solutions'
    },
    status: 'rejected',
    appliedDate: '2023-05-25',
    resume: 'resume-link-5.pdf',
    coverLetter: 'Brief cover letter content...',
    user: '203'
  }
];

// Mock Users (Job Seekers and Employers)
export const users = [
  {
    id: '101',
    name: 'TechCorp Solutions',
    email: 'hr@techcorp.com',
    company: 'TechCorp Solutions',
    location: 'New York, NY',
    phone: '(212) 555-1234',
    website: 'www.techcorp.com',
    role: 'employer',
    about: 'TechCorp Solutions is a leading software development company specializing in enterprise solutions.',
    joinedDate: '2023-01-15'
  },
  {
    id: '102',
    name: 'DesignHub Creative',
    email: 'careers@designhub.com',
    company: 'DesignHub Creative',
    location: 'Remote',
    phone: '(415) 555-2345',
    website: 'www.designhub.com',
    role: 'employer',
    about: 'DesignHub Creative is a design agency focused on creating beautiful, user-centered digital experiences.',
    joinedDate: '2023-02-10'
  },
  {
    id: '201',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(415) 555-3456',
    location: 'San Francisco, CA',
    role: 'jobseeker',
    skills: ['JavaScript', 'React', 'CSS', 'HTML', 'Node.js'],
    experience: [
      {
        title: 'Frontend Developer',
        company: 'Web Solutions Inc.',
        years: '2020-2023'
      },
      {
        title: 'Junior Developer',
        company: 'Tech Startup',
        years: '2018-2020'
      }
    ],
    education: [
      {
        degree: 'B.S. Computer Science',
        institution: 'University of California',
        year: '2018'
      }
    ],
    joinedDate: '2023-04-01'
  },
  {
    id: '202',
    name: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    phone: '(617) 555-4567',
    location: 'Boston, MA',
    role: 'jobseeker',
    skills: ['Python', 'Data Analysis', 'Machine Learning', 'SQL', 'Tableau'],
    experience: [
      {
        title: 'Data Analyst',
        company: 'Finance Corp',
        years: '2019-2023'
      },
      {
        title: 'Research Assistant',
        company: 'University Research Lab',
        years: '2017-2019'
      }
    ],
    education: [
      {
        degree: 'M.S. Data Science',
        institution: 'Boston University',
        year: '2017'
      },
      {
        degree: 'B.S. Statistics',
        institution: 'MIT',
        year: '2015'
      }
    ],
    joinedDate: '2023-03-15'
  }
];

// Mock Saved Jobs
export const savedJobs = [
  {
    id: '1',
    userId: '201',
    jobId: '3'
  },
  {
    id: '2',
    userId: '201',
    jobId: '5'
  },
  {
    id: '3',
    userId: '202',
    jobId: '1'
  }
];

// Export mock data getter functions
export const getMockJobs = () => jobs;
export const getMockApplications = () => applications;
export const getMockUsers = () => users;
export const getMockSavedJobs = () => savedJobs;

// Setup mock data in local storage or mock API for development
export const setupMockData = () => {
  // Initialize mock data in local storage if needed
  if (!localStorage.getItem('jobs')) {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }
  
  if (!localStorage.getItem('applications')) {
    localStorage.setItem('applications', JSON.stringify(applications));
  }
  
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  if (!localStorage.getItem('savedJobs')) {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }
  
  console.log('Mock data initialized for development');
  
  return {
    jobs,
    applications,
    users,
    savedJobs
  };
}; 