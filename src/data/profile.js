export const PROFILE = {
  site: {
    name: 'Harshitha Devina Anto',
    tagline: 'Software Development • Artificial Intelligence • Machine Learning',
    email: 'harshitha5anto@gmail.com',
    githubUsername: 'HarshithaDA',
    github: 'https://github.com/HarshithaDA',
    linkedin: 'https://www.linkedin.com/in/harshitha-devina-anto-9068401ba/',
    avatar: '/avatar.jpg' // Put your photo in /public/avatar.jpg
  },
  about: {
    points: [
      'Graduate student in Computer Science at UT Dallas specializing in Intelligent Systems',
      'Passionate about AI-powered automation, Machine Learning, and building innovative solutions',
      'Experience in Software Development, ML/AI Research, and Full-Stack Engineering'
    ]
  },
  experience: [
    {
      company: 'Coventus',
      role: 'Software Developer',
      location: 'Dallas, TX',
      dates: 'Jan 2025 – Present',
      highlights: [
        'Developing scalable web applications using modern frameworks and cloud technologies',
        'Implementing AI-driven features to enhance user experience and automation',
        'Collaborating with cross-functional teams to deliver high-quality software solutions'
      ]
    },
    {
      company: 'Eleviant (Example)',
      role: 'AI/ML Engineering Intern',
      location: 'Dallas, TX (Hybrid)',
      dates: 'May 2024 – Aug 2024',
      highlights: [
        'Developed AI-assisted web automation with Playwright + LLM-driven selectors',
        'Integrated LlamaIndex + embeddings to extract policy documents from portals',
        'Improved selector accuracy with synthetic datasets and semantic chunking'
      ]
    }
  ],
  education: [
    {
      school: 'The University of Texas at Dallas',
      degree: 'M.S. Computer Science (Intelligent Systems)',
      years: '2024 – 2026',
      location: 'Richardson, TX',
      details: [
        'Relevant Coursework: Artificial Intelligence, Natural Language Processing, Machine Learning, Computer Vision',
        'Research focus on AI agents, LLMs, and intelligent automation systems',
        'GPA: 4.0/4.0'
      ]
    },
    {
      school: 'Vellore Institute of Technology',
      degree: 'B.Tech Computer Science & Engineering (AI & Robotics)',
      years: '2020 – 2024',
      location: 'Vellore, India',
      details: [
        'Specialized in AI, Machine Learning, Robotics, and Intelligent Systems',
        'Published research in AI and Machine Learning conferences',
        'Active member of technical clubs and hackathon winner'
      ]
    }
  ],
  publications: [
    {
      title: 'Deep Learning Approaches for Automated Medical Diagnosis',
      venue: 'IEEE Conference on AI in Healthcare',
      year: '2023',
      link: 'https://example.com/publication1',
      image: 'https://placehold.co/600x400?text=Medical+Diagnosis'
    },
    {
      title: 'Enhancing NLP Models with Transfer Learning Techniques',
      venue: 'International Journal of Machine Learning',
      year: '2023',
      link: 'https://example.com/publication2',
      image: 'https://placehold.co/600x400?text=NLP+Models'
    }
  ],
  certifications: [
    { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2024', image: 'https://placehold.co/400x400?text=AWS' },
    { name: 'Deep Learning Specialization', issuer: 'Coursera', year: '2023', image: 'https://placehold.co/400x400?text=Deep+Learning' },
    { name: 'Machine Learning Engineer', issuer: 'Google Cloud', year: '2023', image: 'https://placehold.co/400x400?text=ML+Engineer' },
    { name: 'Full Stack Web Development', issuer: 'freeCodeCamp', year: '2022', image: 'https://placehold.co/400x400?text=Full+Stack' }
  ],
  workshops: [
    { name: 'Advanced Machine Learning Workshop', organizer: 'Stanford University', year: '2024', image: 'https://placehold.co/600x400?text=ML+Workshop' },
    { name: 'Cloud Architecture & DevOps', organizer: 'AWS Training', year: '2023', image: 'https://placehold.co/600x400?text=Cloud+Workshop' },
    { name: 'Natural Language Processing with Transformers', organizer: 'Hugging Face', year: '2023', image: 'https://placehold.co/600x400?text=NLP+Workshop' },
    { name: 'React & Modern Web Development', organizer: 'Meta Developers', year: '2022', image: 'https://placehold.co/600x400?text=React+Workshop' }
  ],
  clubs: [
    {
      role: 'President',
      org: 'AI & Robotics Club',
      years: '2023-2024',
      note: 'Led 50+ members in AI/ML workshops and hackathons',
      image: 'https://placehold.co/600x400?text=AI+Club'
    },
    {
      role: 'Teaching Assistant',
      org: 'Computer Science Department',
      years: '2023',
      note: 'Assisted in Machine Learning and Data Structures courses',
      image: 'https://placehold.co/600x400?text=Assistant'
    }
  ],
  volunteering: [
    {
      role: 'Volunteer Developer',
      org: 'Code for Good Initiative',
      years: '2022-2024',
      note: 'Built web apps for non-profits and social impact projects',
      image: 'https://placehold.co/600x400?text=Volunteering'
    }
  ],
  // Manual projects (these will show before auto-fetched GitHub repos)
  manualProjects: [
    {
      name: 'AI-Powered Portfolio Analyzer',
      description: 'ML system that analyzes portfolios and provides intelligent recommendations using GPT-4 and custom embeddings',
      url: 'https://github.com/yourusername/portfolio-analyzer',
      demo: 'https://portfolio-analyzer-demo.com',
      image: 'https://placehold.co/600x400?text=Portfolio+Analyzer',
      tags: ['Python', 'OpenAI', 'FastAPI', 'React', 'Machine Learning']
    }
  ],
  // Hackathon projects - these will show in a separate section
  hackathonProjects: [
    {
      name: 'MedAI Assistant',
      description: '🏆 1st Place - Built an AI chatbot for medical diagnosis assistance using LangChain and medical datasets',
      url: 'https://github.com/yourusername/medai',
      demo: 'https://medai-demo.com',
      image: 'https://placehold.co/600x400?text=MedAI',
      tags: ['Python', 'LangChain', 'Healthcare', 'NLP', 'Winner']
    },
    {
      name: 'EcoTrack',
      description: '🥈 2nd Place - Sustainability tracker using IoT sensors and ML models to optimize energy consumption',
      url: 'https://github.com/yourusername/ecotrack',
      image: 'https://placehold.co/600x400?text=EcoTrack',
      tags: ['IoT', 'Machine Learning', 'Sustainability', 'Runner-up']
    },
    {
      name: 'CodeCollab',
      description: 'Real-time collaborative coding platform with AI code suggestions and peer programming features',
      url: 'https://github.com/yourusername/codecollab',
      demo: 'https://codecollab-demo.com',
      image: 'https://placehold.co/600x400?text=CodeCollab',
      tags: ['WebRTC', 'React', 'Node.js', 'AI', 'Collaboration']
    }
  ],
  contact: {
    message: 'Open to AI/ML Engineering, Software Development, and Automation roles. Please reach out if you\'d like to collaborate on projects/research - or are just looking for a hackathon teammate - I\'d be happy to connect!'
  }
}