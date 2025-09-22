import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import './Portfolio.css';
import { emailService } from './services/emailService';
import Skills from "./components/Skills";

// Enhanced portfolio data with more comprehensive information
const DATA = {
  name: "Vaibhav Patil",
  title: "Full-Stack Software Engineer",
  tagline: "Crafting digital experiences with clean code and innovative solutions",
  summary: "Passionate software engineer with expertise in modern web technologies. I specialize in building scalable applications with React, Node.js, and cloud technologies. Currently pursuing my Bachelor's Degree at Siddhant College of Engineering, Pune, while actively contributing to open-source projects and freelance work.",
  photo: "https://placehold.co/300x300/6366f1/ffffff?text=VP",
  cvUrl: "https://drive.google.com/file/d/1sLDK1DDmRvUh0eOvxipBG687sPDhCv1s/view?usp=sharing",
  skills: {
    "Frontend Development": ["React", "Next.js", "TypeScript", "HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Material-UI"],
    "Backend Development": ["Node.js", "Express.js", "Python", "Django", "PHP", "Laravel"],
    "Database & Cloud": ["MySQL", "MongoDB", "PostgreSQL", "AWS", "Vercel", "Firebase"],
    "DevOps & Tools": ["Git", "Docker", "CI/CD", "Jest", "Webpack", "REST APIs"]
  },
  journey: [
    {
      type: "education",
      icon: "🎓",
      title: "SSC Maharashtra Board ",
      subtitle: "Sane Guruji Vidhya Mandir, Amalner",
      period: "2020 - 2021"
    },
    {
      type: "education",
      icon: "🎓",
      title: "Maharashtra State Board of Technical Education",
      subtitle: "SSVPS College of Polytechnic, Dhule",
      period: "2021 - 2024"
    },
    {
      type: "education",
      icon: "🎓",
      title: "Savitribai Phule Pune University ",
      subtitle: "Siddhant College of Engineering, Pune",
      period: "2024 - 2027"
    },
    {
      type: "work",
      icon: "💼",
      title: "Sumago Infotech Pvt. Ltd., Nashik",
      subtitle: "Web Developer Intern",
      period: "June 2023 – July 2023"
    },
    {
      type: "work",
      icon: "💼",
      title: "Ur Engineering Friend, Pune",
      subtitle: "Android Developer Intern",
      period: "Aug 2023 – Sept 2023"
    }
  ],
  
  projects: [
    {
      title: "Farm Equipment Rental Hub",
    //  desc: "A semantic search engine for educational content using NLP and vector databases. Features intelligent query processing and personalized learning paths.",
      tech: ["PHP", "JavaScript", "CSS", "MySQL"],
      repo: "https://github.com/VebsPatil/farmequipmentsrent",
    //  demo: "https://edusearch-demo.vercel.app",
      image: "https://placehold.co/400x250/6366f1/ffffff?text=Farm Equipment",
      featured: true
    },
    {
      title: "Bus-Reservation-System",
    //  desc: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      tech: ["PHP", "JavaScript", "CSS", "MySQL"],
      repo: "https://github.com/VebsPatil/Bus-Reservation-System",
     // demo: "https://ecommerce-demo.vercel.app",
      image: "https://placehold.co/400x250/f59e0b/ffffff?text=Bus-Reservation-System"
    },
    {
      title: "PPT-GestureControl",
    //  desc: "Collaborative task management application with real-time updates, team features, and progress tracking.",
      tech: ["Python", "Open CV", "MediaPipe"],
      repo: "https://github.com/VebsPatil/PPT-GestureControl",
      demo: "https://task-manager-demo.vercel.app",
      image: "https://placehold.co/400x250/ef4444/ffffff?text=PPT-GestureControl"
    },
    {
      title: "Stone Paper Scissors Game",
     // desc: "Modern, responsive portfolio website built with React and modern CSS techniques.",
      tech: ["JavaScript", "HTML", "CSS"],
      repo: "https://github.com/VebsPatil/Stone_Paper_Scissors_Game",
      demo: "https://your-portfolio.vercel.app",
      image: "https://placehold.co/400x250/8b5cf6/ffffff?text=Stone_Paper_Scissors_Game"
    }
  ],
  contactEmail: "vaibhavbpatil1210@gmail.com",
  socials: {
    github: "https://github.com/VebsPatil",
    linkedin: "https://www.linkedin.com/in/vaibhav-p-71950b227/",
    // twitter: "https://twitter.com/vaibhavpatil",
    email: "mailto:vaibhavbpatil1210@gmail.com"
  },
  stats: {
    projects: "10+",
    experience: "1+ years",
    // clients: "15+",
    contributions: "10+"
  }
};

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

function Header({ darkMode, toggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`header ${isScrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className="logo"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {DATA.name}
      </motion.div>
      <nav className="nav">
        <motion.a 
          href="#hero" 
          className="nav-link"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          Home
        </motion.a>
        <motion.a 
          href="#about" 
          className="nav-link"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          About
        </motion.a>
        <motion.a 
          href="#career" 
          className="nav-link"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          Career
        </motion.a>
        <motion.a 
          href="#skills" 
          className="nav-link"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          Skills
        </motion.a>
        <motion.a 
          href="#projects" 
          className="nav-link"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          Projects
        </motion.a>
        {/* <motion.a 
          href="#hanuman-chalisa" 
          className="nav-link"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          Wisdom
        </motion.a> */}
        <motion.a 
          href="#contact" 
          className="nav-link contact-btn"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Contact
        </motion.a>
        <motion.button 
          onClick={toggleDarkMode} 
          className="theme-toggle"
          whileHover={{ scale: 1.1, rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          {darkMode ? '☀️' : '🌙'}
        </motion.button>
      </nav>
    </motion.header>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <motion.section 
      id="hero" 
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="hero-content"
        style={{ y }}
      >
        <motion.div 
          className="hero-text"
          variants={fadeInLeft}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            👋 Welcome to my portfolio
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Hi, I'm <span className="highlight">{DATA.name}</span>
            <br />
            <span className="title">{DATA.title}</span>
          </motion.h1>
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {DATA.tagline}
          </motion.p>
          <motion.div 
            className="hero-stats"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {Object.entries(DATA.stats).map(([key, value]) => (
              <motion.div 
                key={key} 
                className="stat"
                variants={scaleIn}
              >
                <span className="stat-number">{value}</span>
                <span className="stat-label">{key}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.a 
              href="#projects" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              View Projects
              <span className="btn-icon">→</span>
            </motion.a>
            {/* <motion.a 
              href={`mailto:${DATA.contactEmail}`} 
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Get In Touch
            </motion.a> */}
            <motion.a 
              href={DATA.cvUrl}
              className="btn btn-secondary"
              download
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Download CV
              <span className="btn-icon">⬇</span>
            </motion.a>
          </motion.div>
          <motion.div 
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {Object.entries(DATA.socials).map(([platform, url], index) => (
              <motion.a 
                key={platform}
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label={platform}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                {platform === 'github' && '📱'}
                {platform === 'linkedin' && '💼'}
                {platform === 'twitter' && '🐦'}
                {platform === 'email' && '✉️'}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        <motion.div 
          className="hero-image"
          variants={fadeInRight}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="profile-container"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img 
              src={DATA.photo} 
              alt="Vaibhav Patil" 
              className="profile-pic"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
            />
            <motion.div 
              className="profile-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span className="badge-text">Available for work</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section 
      id="about" 
      className="about"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
      <h2>About Me</h2>
        <p className="section-subtitle">Get to know me better</p>
      </motion.div>
      <motion.div 
        className="about-content"
        variants={staggerContainer}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
      >
        <motion.div 
          className="about-text"
          variants={fadeInUp}
        >
      <p>{DATA.summary}</p>
          <motion.div 
            className="about-highlights"
            variants={staggerContainer}
          >
            {[
              // {
              //   icon: "🎓",
              //   title: "Education",
              //   desc: "Bachelor's in Computer Engineering\nSiddhant College of Engineering, Pune"
              // },
              {
                icon: "💻",
                title: "Specialization",
                desc: "Full-Stack Development\nReact, Node.js, Cloud Technologies"
              },
              {
                icon: "🔬",
                title: "Interests",
                desc: "AI/ML, Open Source\nEmerging Technologies"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="highlight-item"
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <span className="highlight-icon">{item.icon}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function Career() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id="career"
      className="career"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2>Career</h2>
        <p className="section-subtitle">My journey across education and roles</p>
      </motion.div>

      {/* Education rail */}
      <div className="career-group">
        <h3 className="career-group-title">Education</h3>
        <motion.div
          className="career-timeline education"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
        >
          {DATA.journey.filter(j => j.type === 'education').map((step, index) => (
            <motion.div
              key={`career-edu-${index}`}
              className="career-step"
              variants={fadeInUp}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`step-marker education`}>
                <span className="step-emoji">{step.icon}</span>
              </div>
              <div className="step-content">
                <h4 className="step-title">{step.title}</h4>
                {step.subtitle && <div className="step-subtitle">{step.subtitle}</div>}
                <div className="step-period">{step.period}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Experience rail */}
      <div className="career-group">
        <h3 className="career-group-title">Experience</h3>
        <motion.div
          className="career-timeline experience"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
        >
          {DATA.journey.filter(j => j.type === 'work').map((step, index) => (
            <motion.div
              key={`career-work-${index}`}
              className="career-step"
              variants={fadeInUp}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`step-marker work`}>
                <span className="step-emoji">💼</span>
              </div>
              <div className="step-content">
                <h4 className="step-title">{step.title}</h4>
                {step.subtitle && <div className="step-subtitle">{step.subtitle}</div>}
                <div className="step-period">{step.period}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// removed separate Journey and Experience sections in favor of a combined Career section

function Projects() {
  const [filter, setFilter] = useState('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredProjects = filter === 'all' 
    ? DATA.projects 
    : DATA.projects.filter(p => p.featured);

  return (
    <motion.section 
      id="projects" 
      className="projects"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2>Featured Projects</h2>
        <p className="section-subtitle">Some of my recent work</p>
      </motion.div>
      <motion.div 
        className="project-filters"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          All Projects
        </motion.button>
        <motion.button 
          className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
          onClick={() => setFilter('featured')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Featured
        </motion.button>
      </motion.div>
      <motion.div 
        className="projects-grid"
        variants={staggerContainer}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
      >
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.title} 
              className={`project-card ${project.featured ? 'featured' : ''}`}
              variants={fadeInUp}
              layout
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="project-image"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src={project.image} alt={project.title} />
                {project.featured && (
                  <motion.span 
                    className="featured-badge"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    Featured
                  </motion.span>
                )}
              </motion.div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span 
                      key={techIndex} 
                      className="tech-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.3 + techIndex * 0.1, duration: 0.3 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
            <div className="project-links">
                  <motion.a 
                    href={project.repo} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-secondary"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Project</span>
                    <span className="btn-icon">↗</span>
                  </motion.a>
                  {/* <motion.a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Live Demo</span>
                    <span className="btn-icon">→</span>
                  </motion.a> */}
            </div>
          </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}

function HanumanChalisa() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  return (
    <motion.section 
      id="hanuman-chalisa" 
      className="hanuman-chalisa"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Video/Image */}
      <div className="background-media">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className={`background-video ${videoLoaded ? 'loaded' : ''}`}
          poster="https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
        >
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          <source src="https://cdn.pixabay.com/vimeo/3287147/abstract-23804.mp4?width=1280&hash=8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c" type="video/mp4" />
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="background-overlay"></div>
      </div>

      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2>श्री हनुमान चालीसा</h2>
        <p className="section-subtitle">Divine Wisdom & Motivation</p>
      </motion.div>
      
      <motion.div 
        className="chalisa-single"
        variants={fadeInUp}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
      >
        <motion.div 
          className="chalisa-card-single"
          whileHover={{ y: -10, scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <div className="chalisa-category">
            <span className="category-badge">{DATA.hanumanChalisa[0].category}</span>
          </div>
          <div className="chalisa-content">
            <h3 className="sanskrit-text">{DATA.hanumanChalisa[0].line}</h3>
            <p className="english-meaning">{DATA.hanumanChalisa[0].meaning}</p>
          </div>
          <div className="chalisa-icon">
            <span className="hanuman-icon">🕉️</span>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="chalisa-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <p>"जय श्री राम 🙏"</p>
        <p>May the divine wisdom guide your path</p>
      </motion.div>
    </motion.section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Use the email service to send the message
      const result = await emailService.sendEmail(formData);
      
      if (result.success) {
        // Reset form
        setFormData({ name: '', email: '', message: '' });
        setSubmitStatus('success');
        console.log(`Email sent successfully via ${result.method}`);
      } else {
        throw new Error('Failed to send message via all methods');
      }
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.section 
      id="contact" 
      className="contact"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2>Get In Touch</h2>
        <p className="section-subtitle">Let's work together on your next project</p>
      </motion.div>
      <motion.div 
        className="contact-content-centered"
        variants={fadeInUp}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
      >
        <motion.form 
          action="https://formsubmit.co/vaibhavbpatil1210@gmail.com"
          method="POST"
          onSubmit={handleSubmit} 
          className="contact-form-centered"
          variants={fadeInUp}
        >
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          {/* Hidden fields for FormSubmit.co configuration */}
          <input type="hidden" name="_subject" value="New Contact Form Message" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value={window.location.href} />
          <motion.button 
            type="submit" 
            className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
            whileHover={!isSubmitting ? { scale: 1.05, y: -2 } : {}}
            whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            transition={{ duration: 0.2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner"></span>
                Sending...
              </>
            ) : (
              <>
                Send Message
                <span className="btn-icon">→</span>
              </>
            )}
          </motion.button>
          
          {submitStatus === 'success' && (
            <motion.div 
              className="success-message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              ✅ Message sent successfully! I'll get back to you soon.
            </motion.div>
          )}
          
          {submitStatus === 'error' && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              ❌ Failed to send message. Please try again or contact me directly at vaibhavbpatil1210@gmail.com
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </motion.section>
  );
}

function Footer() {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="footer-content">
        <div className="footer-section">
          <h3>{DATA.name}</h3>
          <p>Full-Stack Software Engineer</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="footer-socials">
            {Object.entries(DATA.socials).map(([platform, url]) => (
              <motion.a 
                key={platform} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {platform}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {DATA.name}. All rights reserved.</p>
        <p>Built with ❤️ using React</p>
      </div>
    </motion.footer>
  );
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  useEffect(() => {
    // Apply dark mode by default
    document.body.classList.add('dark-mode');
    
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, []);

  return (
    <div className={`portfolio ${darkMode ? 'dark-mode' : ''}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <About />
        <Career />
        <Skills skills={DATA.skills} />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}