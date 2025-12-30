import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Download } from 'lucide-react';
import './portfolio.css';

// Import your images here - replace with your actual image files
// import profilePhoto from './assets/profile.jpg';
import shsProject from '../assets/shs-project.png';
// import shsProject2 from './assets/shs-project-2.jpg';
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
  const [isLoading, setIsLoading] = useState(true);
  const [aboutText1, setAboutText1] = useState('');
  const [aboutText2, setAboutText2] = useState('');
  const [hasTypedAbout, setHasTypedAbout] = useState(false);
  const [projectImages, setProjectImages] = useState({
    shs: 0,
    parish: 0,
    iot: 0
  });
  
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

  // About section scroll detection and typewriter
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      const skillsSection = document.getElementById('skills');
      
      if (aboutSection && skillsSection) {
        const aboutTop = aboutSection.offsetTop;
        const skillsTop = skillsSection.offsetTop;
        const skillsBottom = skillsTop + skillsSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        // Check if we're in the about section or skills section
        if ((scrollPosition >= aboutTop && scrollPosition < skillsTop) || 
            (scrollPosition >= skillsTop && scrollPosition < skillsBottom)) {
          setIsAboutSection(true);
          if (!hasTypedAbout) {
            setHasTypedAbout(true);
          }
        } else {
          setIsAboutSection(false);
        }
      }
    };

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
    <div className={`portfolio-container ${isAboutSection ? 'in-about-section' : ''}`}>
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
              {/* <img src={profilePhoto} alt="Princess Jean Potes" /> */}
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
                        {/* <img src={shsProject2} alt="SHS Management System Screenshot 2" /> */}
                        Second Screenshot
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
          <div className="skills-glowing-container">
            <h2 className="skills-heading">MY SKILLS</h2>
            
            <div className="skills-category-section">
              <h3 className="skills-category-title">Frontend Development</h3>
              <div className="skills-grid">
                <div className="skill-card">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 14.5c1.38 0 2.5-1.12 2.5-2.5S13.38 9.5 12 9.5 9.5 10.62 9.5 12s1.12 2.5 2.5 2.5z"/>
                      <path d="M22 12c0-.17-.01-.33-.02-.5-.02-.31-.05-.61-.09-.91-.08-.53-.19-1.04-.33-1.53-.13-.47-.29-.92-.47-1.36-.19-.44-.4-.86-.64-1.27-.23-.41-.49-.8-.77-1.17-.28-.37-.58-.72-.9-1.05-.32-.33-.67-.63-1.04-.91-.37-.28-.76-.54-1.17-.77-.41-.24-.83-.45-1.27-.64-.44-.18-.89-.34-1.36-.47-.49-.14-1-.25-1.53-.33-.3-.04-.6-.07-.91-.09-.17-.01-.33-.02-.5-.02s-.33.01-.5.02c-.31.02-.61.05-.91.09-.53.08-1.04.19-1.53.33-.47.13-.92.29-1.36.47-.44.19-.86.4-1.27.64-.41.23-.8.49-1.17.77-.37.28-.72.58-1.05.9-.33.32-.63.67-.91 1.04-.28.37-.54.76-.77 1.17-.24.41-.45.83-.64 1.27-.18.44-.34.89-.47 1.36-.14.49-.25 1-.33 1.53-.04.3-.07.6-.09.91-.01.17-.02.33-.02.5s.01.33.02.5c.02.31.05.61.09.91.08.53.19 1.04.33 1.53.13.47.29.92.47 1.36.19.44.4.86.64 1.27.23.41.49.8.77 1.17.28.37.58.72.9 1.05.32.33.67.63 1.04.91.37.28.76.54 1.17.77.41.24.83.45 1.27.64.44.18.89.34 1.36.47.49.14 1 .25 1.53.33.3.04.6.07.91.09.17.01.33.02.5.02s.33-.01.5-.02c.31-.02.61-.05.91-.09.53-.08 1.04-.19 1.53-.33.47-.13.92-.29 1.36-.47.44-.19.86-.4 1.27-.64.41-.23.8-.49 1.17-.77.37-.28.72-.58 1.05-.9.33-.32.63-.67.91-1.04.28-.37.54-.76.77-1.17.24-.41.45-.83.64-1.27.18-.44.34-.89.47-1.36.14-.49.25-1 .33-1.53.04-.3.07-.6.09-.91.01-.17.02-.33.02-.5zm-10 6c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                    </svg>
                  </div>
                  <h4 className="skill-name">React.js</h4>
                </div>
                <div className="skill-card">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3h18v18H3V3zm16.5 13.5h-13v-9h13v9z"/>
                    </svg>
                  </div>
                  <h4 className="skill-name">HTML/CSS</h4>
                </div>
                <div className="skill-card">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3h18v18H3V3zm16 13.92l-2.5-1v-2.65L18 12v1.92zm-2.5-5.42L18 10.08V8.5l-1.5 1v1.42zm-2 .5v2.5l-2 1v-2.5l2-1zm-2 6l-2-1v-2.5l2 1V18zm-2-3.5L9 13.58V11l1.5.92v2.58zM9 9.5v2.58L7.5 11V8.42L9 9.5zM6 12v-1.92l1.5 1v2.65L6 12z"/>
                    </svg>
                  </div>
                  <h4 className="skill-name">JavaScript</h4>
                </div>
              </div>
            </div>

            <div className="skills-category-section">
              <h3 className="skills-category-title">Backend Development</h3>
              <div className="skills-grid">
                <div className="skill-card">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7.6 3.8L12 11.78 4.4 7.98 12 4.18zM4 9.21l7 3.5v7.11l-7-3.5V9.21zm9 10.61v-7.11l7-3.5v7.11l-7 3.5z"/>
                    </svg>
                  </div>
                  <h4 className="skill-name">Node.js</h4>
                </div>
                <div className="skill-card">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="12" cy="12" rx="8" ry="3"/>
                      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>
                      <path d="M4 12v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4"/>
                    </svg>
                  </div>
                  <h4 className="skill-name">PHP</h4>
                </div>
                <div className="skill-card">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      <path d="M12 6c-3.31 0-6 2.69-6 6h2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2-3 3.75-3 6h2c0-1.5 3-3.75 3-6 0-3.31-2.69-6-6-6z"/>
                    </svg>
                  </div>
                  <h4 className="skill-name">MySQL</h4>
                </div>
              </div>
            </div>

            <div className="skills-category-section">
              <h3 className="skills-category-title">Mobile & IoT</h3>
              <div className="skills-grid">
                <div className="skill-card">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H7V4h10v16z"/>
                    </svg>
                  </div>
                  <h4 className="skill-name">Flutter</h4>
                </div>
                <div className="skill-card">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  <h4 className="skill-name">Arduino</h4>
                </div>
                <div className="skill-card">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                    </svg>
                  </div>
                  <h4 className="skill-name">Firebase</h4>
                </div>
              </div>
            </div>

            <div className="skills-category-section">
              <h3 className="skills-category-title">Tools & Others</h3>
              <div className="skills-grid">
                <div className="skill-card">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                    </svg>
                  </div>
                  <h4 className="skill-name">Git</h4>
                </div>
                <div className="skill-card">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V7h14v12z"/>
                    </svg>
                  </div>
                  <h4 className="skill-name">Figma</h4>
                </div>
                <div className="skill-card">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10z"/>
                    </svg>
                  </div>
                  <h4 className="skill-name">VS Code</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}