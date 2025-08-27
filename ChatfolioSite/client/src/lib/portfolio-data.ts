export const portfolioData = {
  profile: {
    name: "Arjun Kumar",
    title: "Full Stack Developer & AI Enthusiast",
    links: [
      { label: "GitHub", icon: "fab fa-github", url: "https://github.com" },
      { label: "LinkedIn", icon: "fab fa-linkedin", url: "https://linkedin.com" },
      { label: "Email", icon: "fas fa-envelope", url: "mailto:arjun@example.com" },
    ],
  },
  projects: [
    {
      id: "ai-interview-coach",
      title: "AI Interview Coach",
      description: "Interactive AI-powered interview preparation platform with real-time feedback and practice sessions.",
      image: "/assets/project1.jpg",
      technologies: ["React", "Node.js", "OpenAI"],
    },
    {
      id: "ecommerce-analytics",
      title: "E-commerce Analytics",
      description: "Comprehensive dashboard for tracking sales, inventory, and customer analytics with real-time updates.",
      image: "/assets/project2.jpg",
      technologies: ["Vue.js", "Python", "MongoDB"],
    },
    {
      id: "smart-task-manager",
      title: "Smart Task Manager",
      description: "Cross-platform mobile app with AI-powered task prioritization and team collaboration features.",
      image: "/assets/project3.jpg",
      technologies: ["React Native", "Firebase", "TensorFlow"],
    },
  ],
  skills: [
    {
      category: "Frontend Development",
      skills: [
        { name: "React.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Next.js", level: 88 },
      ],
    },
    {
      category: "Backend Development",
      skills: [
        { name: "Node.js", level: 92 },
        { name: "Python", level: 85 },
        { name: "PostgreSQL", level: 80 },
      ],
    },
    {
      category: "AI & Machine Learning",
      skills: [
        { name: "OpenAI API", level: 88 },
        { name: "TensorFlow", level: 75 },
        { name: "Langchain", level: 82 },
      ],
    },
  ],
  certificates: [
    {
      id: "aws-solutions-architect",
      title: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "March 2024",
      icon: "fas fa-certificate",
      iconGradient: "from-blue-500 to-blue-600",
      verifyUrl: "https://aws.amazon.com/verification",
    },
    {
      id: "google-cloud-professional",
      title: "Google Cloud Professional",
      issuer: "Google Cloud Platform",
      date: "January 2024",
      icon: "fas fa-trophy",
      iconGradient: "from-emerald-500 to-emerald-600",
      verifyUrl: "https://cloud.google.com/certification",
    },
    {
      id: "meta-frontend-developer",
      title: "Meta Frontend Developer",
      issuer: "Meta (Facebook)",
      date: "December 2023",
      icon: "fas fa-graduation-cap",
      iconGradient: "from-purple-500 to-purple-600",
      verifyUrl: "https://developers.facebook.com/certification",
    },
  ],
};
