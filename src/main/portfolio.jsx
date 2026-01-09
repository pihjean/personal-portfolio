import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Download } from 'lucide-react';
import './portfolio.css';

// Import your images here - replace with your actual image files
import profilePhoto from '../assets/profile-photo.jpg';
import shsProject from '../assets/shs-project.png';
import shsProject2 from '../assets/shs-project2.png';
// import parishProject from './assets/parish-project.jpg';
// import parishProject2 from './assets/parish-project-2.jpg';
// import iotProject from './assets/iot-project.jpg';
// import iotProject2 from './assets/iot-project-2.jpg';

export default function Portfolio() {
  const [headingText, setHeadingText] = useState('');
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [currentJobText, setCurrentJobText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAboutSection, setIsAboutSection] = useState(false);
  const [isProjectsSection, setIsProjectsSection] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [aboutText1, setAboutText1] = useState('');
  const [aboutText2, setAboutText2] = useState('');
  const [isContactSection, setIsContactSection] = useState(false);
  const [hasTypedAbout, setHasTypedAbout] = useState(false);
  const [projectImages, setProjectImages] = useState({
    shs: 0,
    parish: 0,
    iot: 0
  });
  const [flippedCards, setFlippedCards] = useState({
    frontend: false,
    backend: false,
    mobile: false,
    tools: false
  });
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  
  const fullHeading = "Hi, I am Princess Jean Potes";
  const jobs = ["Web Developer", "Game Developer", "UI/UX Designer"];
  const aboutParagraph1 = "A Bachelor of Science in Information Technology student at Camarines Norte State College. Since 2024, I have been working as a freelance developer and have completed projects that show my skills in both backend and frontend development.";
  const aboutParagraph2 = "I enjoy building systems that are efficient and can grow easily. I am also interested in combining hardware and software for robotics projects. I know how to use technologies like React.js, Node.js, Flutter, and Arduino programming.";
  
  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Main heading typewriter
  useEffect(() => {
    if (isLoading) return;
    if (headingText.length < fullHeading.length) {
      const timeout = setTimeout(() => {
        setHeadingText(fullHeading.slice(0, headingText.length + 1));
      }, 50);
      
      return () => clearTimeout(timeout);
    }
  }, [headingText, isLoading]);
  
  // Job title typewriter
  useEffect(() => {
    if (headingText.length < fullHeading.length) return;
    
    const currentJob = jobs[currentJobIndex];
    
    if (!isDeleting && currentJobText.length < currentJob.length) {
      const timeout = setTimeout(() => {
        setCurrentJobText(currentJob.slice(0, currentJobText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentJobText.length === currentJob.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentJobText.length > 0) {
      const timeout = setTimeout(() => {
        setCurrentJobText(currentJob.slice(0, currentJobText.length - 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentJobText.length === 0) {
      setIsDeleting(false);
      setCurrentJobIndex((prev) => (prev + 1) % jobs.length);
    }
  }, [currentJobText, isDeleting, currentJobIndex, headingText]);

 // About and Projects section scroll detection
useEffect(() => {
  const handleScroll = () => {
    const homeSection = document.getElementById('home');
    const aboutSection = document.getElementById('about');
    const projectsSection = document.getElementById('projects');
    const skillsSection = document.getElementById('skills');
    const contactSection = document.getElementById('contact');
    
    if (homeSection && aboutSection && projectsSection && skillsSection && contactSection) {
      const homeTop = homeSection.offsetTop;
      const aboutTop = aboutSection.offsetTop;
      const projectsTop = projectsSection.offsetTop;
      const skillsTop = skillsSection.offsetTop;
      const contactTop = contactSection.offsetTop;
      const scrollPosition = window.scrollY + 100;
      
      // Check which section we're currently in based on scroll position
      if (scrollPosition >= contactTop) {
        // In Contact section (white background, black nav)
        setIsAboutSection(false);
        setIsProjectsSection(false);
        setIsContactSection(true);
      }
      else if (scrollPosition >= skillsTop) {
        // In Skills section (black background)
        setIsAboutSection(true);
        setIsProjectsSection(false);
        setIsContactSection(false);
        if (!hasTypedAbout) {
          setHasTypedAbout(true);
        }
      } 
      else if (scrollPosition >= projectsTop) {
        // In Projects section (white background)
        setIsAboutSection(false);
        setIsProjectsSection(true);
        setIsContactSection(false);
      }
      else if (scrollPosition >= aboutTop) {
        // In About section (black background)
        setIsAboutSection(true);
        setIsProjectsSection(false);
        setIsContactSection(false);
        if (!hasTypedAbout) {
          setHasTypedAbout(true);
        }
      }
      else {
        // In Home section (white background)
        setIsAboutSection(false);
        setIsProjectsSection(false);
        setIsContactSection(false);
      }
    }
  };

  // Run on mount and scroll
  handleScroll();
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [hasTypedAbout]);
  // About text typewriter effect
  useEffect(() => {
    if (!hasTypedAbout) return;

    if (aboutText1.length < aboutParagraph1.length) {
      const timeout = setTimeout(() => {
        setAboutText1(aboutParagraph1.slice(0, aboutText1.length + 1));
      }, 10);
      return () => clearTimeout(timeout);
    } else if (aboutText2.length < aboutParagraph2.length) {
      const timeout = setTimeout(() => {
        setAboutText2(aboutParagraph2.slice(0, aboutText2.length + 1));
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [aboutText1, aboutText2, hasTypedAbout]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleImageNav = (projectId, direction, e) => {
    e.preventDefault();
    e.stopPropagation();
    setProjectImages(prev => {
      const currentIndex = prev[projectId];
      let newIndex;
      
      if (direction === 'next') {
        // 0 = title card, 1 = first image, 2 = second image
        newIndex = currentIndex >= 2 ? 2 : currentIndex + 1;
      } else {
        newIndex = currentIndex <= 0 ? 0 : currentIndex - 1;
      }
      
      return {
        ...prev,
        [projectId]: newIndex
      };
    });
  };

  const handleCardFlip = (cardName) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardName]: !prev[cardName]
    }));
  };

  const handleContactChange = (e) => {
    setContactForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'princessjeanpotes000@gmail.com',
          subject: `Portfolio Contact from ${contactForm.name}`,
          text: `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setContactForm({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-icons">
          <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 18L22 12L16 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 6L2 12L8 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="black" strokeWidth="2"/>
            <path d="M9 9H15M9 12H15M9 15H12" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    );
  }

  return (
     <div className={`portfolio-container ${isAboutSection ? 'in-about-section' : ''} ${isProjectsSection ? 'in-projects-section' : ''} ${isContactSection ? 'in-contact-section' : ''}`}>
      <nav className="nav">
        <a href="#home">Home</a>
        <a href="#about">About Me</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact" className="contact-btn">Contact Me</a>
      </nav>

      <section id="home" className="home-section">
        <div className="home-content">
          <h1>
            {headingText.split('Princess Jean Potes')[0]}
            {headingText.includes('Princess Jean Potes') && (
              <span className="name">Princess Jean Potes</span>
            )}
          </h1>
          <p className="subtitle">
            Aspiring <span className="job-title">{currentJobText}</span>
          </p>
          <button className="download-btn">
            Get in Touch
            <ArrowRight size={20} />
          </button>
          <button className="view-my-work-btn">
            Download CV
            <Download size={20} />
          </button>
        </div>

        <div className="photo-container">
          <div className="photo-frame-outer"></div>
          <div className="photo-frame-inner">
            <div className="photo-placeholder">
              {/* Uncomment and use your actual image */}
              {<img src={profilePhoto} alt="Princess Jean Potes" />}
            </div>
          </div>
        </div>

        <button 
          onClick={scrollToAbout}
          className="arrow-button"
        >
          <ChevronDown size={40} />
        </button>
      </section>

      <section id="about" className="about-section">
        <div className="about-content">
          <div className="glowing-container">
            <h2 className="about-heading">ABOUT ME</h2>
            <p className="about-text">
              {aboutText1}
            </p>
            <p className="about-text">
              {aboutText2}
            </p>
            <div className="stats-container">
              <div className="stat-box">
                <div className="stat-number">5+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">1+</div>
                <div className="stat-label">Years of Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section">
        <div className="projects-content">
          <h2 className="projects-heading">MY PROJECTS</h2>
          
          <div className="projects-category">
            <h3 className="category-title">Web Development</h3>
            <div className="projects-grid">
              <a href="#" className="project-card">
                <div className="project-image-container">
                  {projectImages.shs === 0 ? (
                    <>
                      <div className="project-icon">🎓</div>
                      <h4 className="project-title">Senior High School Management System</h4>
                      <p className="project-description">A comprehensive system for managing students, teachers, and academic records</p>
                      <div className="tech-stack">
                        <span className="tech-tag">React</span>
                        <span className="tech-tag">JavaScript</span>
                        <span className="tech-tag">PHP</span>
                      </div>
                    </>
                  ) : projectImages.shs === 1 ? (
                    <div className="project-preview-image">
                      <div className="image-placeholder">
                        <img src={shsProject} alt="SHS Management System" />
                      </div>
                    </div>
                  ) : (
                    <div className="project-preview-image">
                      <div className="image-placeholder">
                        <img src={shsProject2} alt="SHS Management System" />
                      </div>
                    </div>
                  )}
                  <button 
                    className="nav-arrow left-arrow" 
                    onClick={(e) => handleImageNav('shs', 'prev', e)}
                    style={{ opacity: projectImages.shs === 0 ? 0.3 : 1 }}
                  >
                    ←
                  </button>
                  <button 
                    className="nav-arrow right-arrow" 
                    onClick={(e) => handleImageNav('shs', 'next', e)}
                    style={{ opacity: projectImages.shs === 2 ? 0.3 : 1 }}
                  >
                    →
                  </button>
                </div>
              </a>
              <a href="#" className="project-card">
                <div className="project-image-container">
                  {projectImages.parish === 0 ? (
                    <>
                      <div className="project-icon">⛪</div>
                      <h4 className="project-title">Parish Appointment System</h4>
                      <p className="project-description">Online booking system for church services and appointments</p>
                      <div className="tech-stack">
                        <span className="tech-tag">React</span>
                        <span className="tech-tag">JavaScript</span>
                        <span className="tech-tag">PHP</span>
                      </div>
                    </>
                  ) : projectImages.parish === 1 ? (
                    <div className="project-preview-image">
                      <div className="image-placeholder">
                        {/* <img src={parishProject} alt="Parish Appointment System" /> */}
                        First Screenshot
                      </div>
                    </div>
                  ) : (
                    <div className="project-preview-image">
                      <div className="image-placeholder">
                        {/* <img src={parishProject2} alt="Parish Appointment System Screenshot 2" /> */}
                        Second Screenshot
                      </div>
                    </div>
                  )}
                  <button 
                    className="nav-arrow left-arrow" 
                    onClick={(e) => handleImageNav('parish', 'prev', e)}
                    style={{ opacity: projectImages.parish === 0 ? 0.3 : 1 }}
                  >
                    ←
                  </button>
                  <button 
                    className="nav-arrow right-arrow" 
                    onClick={(e) => handleImageNav('parish', 'next', e)}
                    style={{ opacity: projectImages.parish === 2 ? 0.3 : 1 }}
                  >
                    →
                  </button>
                </div>
              </a>
            </div>
          </div>

          <div className="projects-category">
            <h3 className="category-title">Web Development with IoT</h3>
            <div className="projects-grid">
              <a href="#" className="project-card">
                <div className="project-image-container">
                  {projectImages.iot === 0 ? (
                    <>
                      <div className="project-icon">🧩</div>
                      <h4 className="project-title">Interactive Learning Tool for Autistic Children</h4>
                      <p className="project-description">An interactive IoT-based educational tool designed to help children with autism learn through engaging activities</p>
                      <div className="tech-stack">
                        <span className="tech-tag">React</span>
                        <span className="tech-tag">JavaScript</span>
                        <span className="tech-tag">PHP</span>
                        <span className="tech-tag">Arduino</span>
                        <span className="tech-tag">Firebase</span>
                      </div>
                    </>
                  ) : projectImages.iot === 1 ? (
                    <div className="project-preview-image">
                      <div className="image-placeholder">
                        {/* <img src={iotProject} alt="IoT Learning Tool" /> */}
                        First Screenshot
                      </div>
                    </div>
                  ) : (
                    <div className="project-preview-image">
                      <div className="image-placeholder">
                        {/* <img src={iotProject2} alt="IoT Learning Tool Screenshot 2" /> */}
                        Second Screenshot
                      </div>
                    </div>
                  )}
                  <button 
                    className="nav-arrow left-arrow" 
                    onClick={(e) => handleImageNav('iot', 'prev', e)}
                    style={{ opacity: projectImages.iot === 0 ? 0.3 : 1 }}
                  >
                    ←
                  </button>
                  <button 
                    className="nav-arrow right-arrow" 
                    onClick={(e) => handleImageNav('iot', 'next', e)}
                    style={{ opacity: projectImages.iot === 2 ? 0.3 : 1 }}
                  >
                    →
                  </button>
                </div>
              </a>
            </div>
          </div>

          <div className="projects-category">
            <h3 className="category-title">Other Projects</h3>
            <div className="projects-grid-four">
              <div className="project-card-static">
                <div className="project-icon">🎮</div>
                <h4 className="project-title">Exploration Game</h4>
                <p className="project-description">An adventure game with immersive exploration mechanics</p>
              </div>
              <div className="project-card-static">
                <div className="project-icon">📱</div>
                <h4 className="project-title">Mobile Application</h4>
                <p className="project-description">Cross-platform mobile app built with Flutter</p>
              </div>
              <div className="project-card-static">
                <div className="project-icon">🗄️</div>
                <h4 className="project-title">Database System</h4>
                <p className="project-description">Efficient database design and management solutions</p>
              </div>
              <div className="project-card-static">
                <div className="project-icon">💳</div>
                <h4 className="project-title">POS System</h4>
                <p className="project-description">Complete point of sale solution for retail businesses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="skills-section">
        <div className="skills-content">
          <h2 className="skills-heading">MY SKILLS</h2>
          
          <div className="skills-cards-container">
            {/* Frontend Development Card */}
            <div 
              className={`skill-category-card ${flippedCards.frontend ? 'flipped' : ''}`}
              onClick={() => handleCardFlip('frontend')}
            >
              <div className="card-inner">
                <div className="card-front">
                  <div className="category-icon">
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 14.5c1.38 0 2.5-1.12 2.5-2.5S13.38 9.5 12 9.5 9.5 10.62 9.5 12s1.12 2.5 2.5 2.5z"/>
                      <path d="M22 12c0-.17-.01-.33-.02-.5-.02-.31-.05-.61-.09-.91-.08-.53-.19-1.04-.33-1.53-.13-.47-.29-.92-.47-1.36-.19-.44-.4-.86-.64-1.27-.23-.41-.49-.8-.77-1.17-.28-.37-.58-.72-.9-1.05-.32-.33-.67-.63-1.04-.91-.37-.28-.76-.54-1.17-.77-.41-.24-.83-.45-1.27-.64-.44-.18-.89-.34-1.36-.47-.49-.14-1-.25-1.53-.33-.3-.04-.6-.07-.91-.09-.17-.01-.33-.02-.5-.02s-.33.01-.5.02c-.31.02-.61.05-.91.09-.53.08-1.04.19-1.53.33-.47.13-.92.29-1.36.47-.44.19-.86.4-1.27.64-.41.23-.8.49-1.17.77-.37.28-.72.58-1.05.9-.33.32-.63.67-.91 1.04-.28.37-.54.76-.77 1.17-.24.41-.45.83-.64 1.27-.18.44-.34.89-.47 1.36-.14.49-.25 1-.33 1.53-.04.3-.07.6-.09.91-.01.17-.02.33-.02.5s.01.33.02.5c.02.31.05.61.09.91.08.53.19 1.04.33 1.53.13.47.29.92.47 1.36.19.44.4.86.64 1.27.23.41.49.8.77 1.17.28.37.58.72.9 1.05.32.33.67.63 1.04.91.37.28.76.54 1.17.77.41.24.83.45 1.27.64.44.18.89.34 1.36.47.49.14 1 .25 1.53.33.3.04.6.07.91.09.17.01.33.02.5.02s.33-.01.5-.02c.31-.02.61-.05.91-.09.53-.08 1.04-.19 1.53-.33.47-.13.92-.29 1.36-.47.44-.19.86-.4 1.27-.64.41-.23.8-.49 1.17-.77.37-.28.72-.58 1.05-.9.33-.32.63-.67.91-1.04.28-.37.54-.76.77-1.17.24-.41.45-.83.64-1.27.18-.44.34-.89.47-1.36.14-.49.25-1 .33-1.53.04-.3.07-.6.09-.91.01-.17.02-.33.02-.5zm-10 6c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                    </svg>
                  </div>
                  <h3 className="category-name">Frontend Development</h3>
                  <p className="card-hint">Click to view skills</p>
                </div>
                <div className="card-back">
                  <h4 className="back-title">Frontend Development</h4>
                  <div className="tech-list">
                    <div className="tech-item">
                      <span className="tech-dot"></span>
                      <span>React.js</span>
                    </div>
                    <div className="tech-item">
                      <span className="tech-dot"></span>
                      <span>HTML/CSS</span>
                    </div>
                    <div className="tech-item">
                      <span className="tech-dot"></span>
                      <span>JavaScript</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Backend Development Card */}
            <div 
              className={`skill-category-card ${flippedCards.backend ? 'flipped' : ''}`}
              onClick={() => handleCardFlip('backend')}
            >
              <div className="card-inner">
                <div className="card-front">
                  <div className="category-icon">
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7.6 3.8L12 11.78 4.4 7.98 12 4.18zM4 9.21l7 3.5v7.11l-7-3.5V9.21zm9 10.61v-7.11l7-3.5v7.11l-7 3.5z"/>
                    </svg>
                  </div>
                  <h3 className="category-name">Backend Development</h3>
                  <p className="card-hint">Click to view skills</p>
                </div>
                <div className="card-back">
                  <h4 className="back-title">Backend Development</h4>
                  <div className="tech-list">
                    <div className="tech-item">
                      <span className="tech-dot"></span>
                      <span>Node.js</span>
                    </div>
                    <div className="tech-item">
                      <span className="tech-dot"></span>
                      <span>PHP</span>
                    </div>
                    <div className="tech-item">
                      <span className="tech-dot"></span>
                      <span>MySQL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile & IoT Card */}
            <div 
              className={`skill-category-card ${flippedCards.mobile ? 'flipped' : ''}`}
              onClick={() => handleCardFlip('mobile')}
            >
              <div className="card-inner">
                <div className="card-front">
                  <div className="category-icon">
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H7V4h10v16z"/>
                    </svg>
                  </div>
                  <h3 className="category-name">Mobile & IoT</h3>
                  <p className="card-hint">Click to view skills</p>
                </div>
                <div className="card-back">
                  <h4 className="back-title">Mobile & IoT</h4>
                  <div className="tech-list">
                    <div className="tech-item">
                      <span className="tech-dot"></span>
                      <span>Flutter</span>
                    </div>
                    <div className="tech-item">
                      <span className="tech-dot"></span>
                      <span>Arduino</span>
                    </div>
                    <div className="tech-item">
                      <span className="tech-dot"></span>
                      <span>Firebase</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools & Others Card */}
            <div 
              className={`skill-category-card ${flippedCards.tools ? 'flipped' : ''}`}
              onClick={() => handleCardFlip('tools')}
            >
              <div className="card-inner">
                <div className="card-front">
                  <div className="category-icon">
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                    </svg>
                  </div>
                  <h3 className="category-name">Tools & Others</h3>
                  <p className="card-hint">Click to view skills</p>
                </div>
                <div className="card-back">
                  <h4 className="back-title">Tools & Others</h4>
                  <div className="tech-list">
                    <div className="tech-item">
                      <span className="tech-dot"></span>
                      <span>Git</span>
                    </div>
                    <div className="tech-item">
                      <span className="tech-dot"></span>
                      <span>Figma</span>
                    </div>
                    <div className="tech-item">
                      <span className="tech-dot"></span>
                      <span>VS Code</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     <section id="contact" className="contact-section">
        <div className="contact-content">
          <h2 className="contact-heading">CONTACT ME</h2>
          
          <div className="contact-container">
            {/* Left Side - Contact Details */}
            <div className="contact-details">
              <div className="contact-item">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="black" strokeWidth="2"/>
                  <path d="M3 7L12 13L21 7" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="contact-text">princessjeanpotes000@gmail.com</span>
              </div>

              <div className="contact-item">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="7" y="2" width="10" height="20" rx="2" stroke="black" strokeWidth="2"/>
                  <line x1="7" y1="18" x2="17" y2="18" stroke="black" strokeWidth="2"/>
                </svg>
                <span className="contact-text">09061421473</span>
              </div>

              <div className="social-links">
                <a href="https://www.facebook.com/pihjean/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                <a href="https://www.linkedin.com/in/princesss-jean-potes-27208a3a5/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                <a href="https://github.com/pihjean" target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="vertical-divider"></div>

            {/* Right Side - Contact Form */}
            <div className="contact-form-container">
              <form onSubmit={handleContactSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    placeholder="Enter Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    placeholder="name123@gamil.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    placeholder="Enter message"
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>

                {submitStatus === 'success' && (
                  <p className="status-message success">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="status-message error">Failed to send message. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}