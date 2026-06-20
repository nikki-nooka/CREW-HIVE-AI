import React, { useState, useEffect, useRef } from 'react';

// --- MOCK INITIAL DATABASE ---
const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "AI Interview Platform",
    domain: "Artificial Intelligence",
    description: "An automated system that processes candidate resumes, executes voice-based LLM interviews, and provides deep semantic analytical insights to recruiters.",
    techStack: ["Python", "OpenAI API", "AWS", "Docker"],
    roles: ["Backend Developer", "ML Engineer", "Frontend Dev"],
    teamSize: 4,
    membersCount: 2,
    commitment: "10 Hours / Week",
    isPrivate: true,
    ndaRequired: true,
    ownerName: "Alice"
  },
  {
    id: 2,
    title: "E-Commerce Platform Microservices",
    domain: "Web Development",
    description: "A high-performance transaction system comprising decentralized payment pipelines, order management components, and real-time Kafka messaging hubs.",
    techStack: ["Java", "Spring Boot", "Kafka", "Docker", "AWS"],
    roles: ["Backend Developer", "DevOps Engineer", "Database Architect"],
    teamSize: 5,
    membersCount: 3,
    commitment: "15 Hours / Week",
    isPrivate: false,
    ndaRequired: false,
    ownerName: "Bob"
  },
  {
    id: 3,
    title: "Decentralized Credential Ledger",
    domain: "Blockchain",
    description: "Verifying graduation degrees and university certificates on a secure blockchain ledger, allowing companies to search verified hashes directly.",
    techStack: ["Solidity", "Hardhat", "Ethers.js", "Vue.js"],
    roles: ["Smart Contract Aud", "Vue Developer"],
    teamSize: 3,
    membersCount: 1,
    commitment: "15 Hours / Week",
    isPrivate: true,
    ndaRequired: true,
    ownerName: "Charlie"
  },
  {
    id: 4,
    title: "Campus Ride Sharing App",
    domain: "Mobile Applications",
    description: "A peer-to-peer mobile app for college students to coordinate carpools, reducing parking congestion and carbon footprint on large campus areas.",
    techStack: ["Flutter", "Firebase", "Google Maps API"],
    roles: ["Mobile Developer", "Firebase Lead"],
    teamSize: 4,
    membersCount: 2,
    commitment: "10 Hours / Week",
    isPrivate: false,
    ndaRequired: false,
    ownerName: "Devon"
  }
];

export default function App() {
  // --- APPLICATION STATE ---
  const [showIntro, setShowIntro] = useState(true);
  const [theme, setTheme] = useState('dark');
  
  // Parse initial view from URL hash
  const [view, setView] = useState(() => {
    const hash = window.location.hash;
    if (hash === '#/login' || hash === '#login') return 'login';
    if (hash === '#/signup' || hash === '#signup') return 'signup';
    return 'home';
  });
  
  const [currentUser, setCurrentUser] = useState(null);

  // Helper function to update the URL hash path
  const navigateTo = (path) => {
    window.location.hash = '#/' + path;
  };
  
  // Projects State
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDomainFilter, setActiveDomainFilter] = useState('all');

  // Modals & Toast State
  const [showNDAModal, setShowNDAModal] = useState(false);
  const [activeNDAProjectId, setActiveNDAProjectId] = useState(null);
  const [ndaChecked, setNdaChecked] = useState(false);
  
  const [showWizardModal, setShowWizardModal] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);

  const [toast, setToast] = useState({ show: false, title: '', message: '' });

  // Simulator State: Tab Selector
  const [activeSimTab, setActiveSimTab] = useState('panel-visibility');
  
  // Simulator: Challenge 1 (Visibility Toggle)
  const [simVisibilityPrivate, setSimVisibilityPrivate] = useState(true);
  const [simNdaEnforced, setSimNdaEnforced] = useState(true);

  // Simulator: Challenge 2 (Reputation score metrics)
  const [simTasks, setSimTasks] = useState(6);
  const [simPrs, setSimPrs] = useState(4);
  const [simAttendance, setSimAttendance] = useState(90);

  // Simulator: Challenge 3 (Inactivity warnings)
  const [simInactiveDays, setSimInactiveDays] = useState(0);

  // Wizard input fields
  const [wizardTitle, setWizardTitle] = useState('');
  const [wizardDomain, setWizardDomain] = useState('Web Development');
  const [wizardDesc, setWizardDesc] = useState('');
  const [wizardTech, setWizardTech] = useState('');
  const [wizardRoles, setWizardRoles] = useState('');
  const [wizardSize, setWizardSize] = useState(4);
  const [wizardHours, setWizardHours] = useState('5 Hours / Week');
  const [wizardPrivate, setWizardPrivate] = useState(true);
  const [wizardNda, setWizardNda] = useState(true);

  // Auth fields
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  
  // Validation messages
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // DOM Refs
  const introCanvasRef = useRef(null);
  const pendingScrollTargetRef = useRef(null);

  // --- EFFECT: Play Canvas particles on load ---
  useEffect(() => {
    if (!showIntro) return;

    const canvas = introCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = 70;
    const connectionDistance = 110;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 2 + 1.5,
        charge: Math.random() * 0.012 + 0.005
      });
    }

    let animationTime = 0;
    let animationFrameId;

    const animate = () => {
      animationTime += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Hexagonal points coordinate attractors
      const attractors = [];
      for (let k = 0; k < 6; k++) {
        const angle = (k * Math.PI) / 3;
        attractors.push({ x: cx + 75 * Math.cos(angle), y: cy + 75 * Math.sin(angle) });
      }
      for (let k = 0; k < 12; k++) {
        const angle = (k * Math.PI) / 6;
        attractors.push({ x: cx + 140 * Math.cos(angle), y: cy + 140 * Math.sin(angle) });
      }
      attractors.push({ x: cx, y: cy });

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const target = attractors[i % attractors.length];

        const pull = Math.min(animationTime / 180, 1.2) * p1.charge;
        p1.vx += (target.x - p1.x) * pull;
        p1.vy += (target.y - p1.y) * pull;

        p1.vx *= 0.95;
        p1.vy *= 0.95;

        p1.x += p1.vx;
        p1.y += p1.vy;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 176, 0, 0.7)' : 'rgba(99, 102, 241, 0.7)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, `rgba(255, 176, 0, ${alpha})`);
            grad.addColorStop(1, `rgba(99, 102, 241, ${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Auto-transition after 3.2s
    const timer = setTimeout(() => {
      triggerSkipIntro();
    }, 3200);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
    };
  }, [showIntro]);

  // --- EFFECT: Toggle Theme ---
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // --- EFFECT: Listen to hash changes for routing ---
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/login' || hash === '#login') {
        setView('login');
      } else if (hash === '#/signup' || hash === '#signup') {
        setView('signup');
      } else {
        setView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    
    // Set initial hash if none exists
    if (!window.location.hash) {
      window.location.hash = '#/home';
    } else {
      handleHashChange();
    }
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // --- EFFECT: Coordinated view transitions & scrolling ---
  useEffect(() => {
    if (view === 'home' && pendingScrollTargetRef.current) {
      const target = pendingScrollTargetRef.current;
      pendingScrollTargetRef.current = null;
      const timer = setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [view]);

  // --- HELPER: Display Notification Toast ---
  const triggerToast = (title, message) => {
    setToast({ show: true, title, message });
    if (window.reactToastTimeout) {
      clearTimeout(window.reactToastTimeout);
    }
    window.reactToastTimeout = setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3200);
  };

  const triggerSkipIntro = () => {
    setShowIntro(false);
    triggerToast("Welcome to CrewHive", "Matching students with ideas to students with skills.");
  };

  // --- CONTROLLER: Apply to Project ---
  const handleApplyClick = (project) => {
    if (!currentUser) {
      triggerToast("Authentication Required", "Please log in or sign up to apply for projects.");
      navigateTo('login');
      return;
    }

    if (project.ndaRequired) {
      setActiveNDAProjectId(project.id);
      setNdaChecked(false);
      setShowNDAModal(true);
    } else {
      applyToProject(project.id);
    }
  };

  const applyToProject = (id) => {
    if (!currentUser) return;
    
    // Add project ID to user's applied list
    setCurrentUser(prev => ({
      ...prev,
      appliedProjects: [...prev.appliedProjects, id]
    }));

    // Update project metrics locally
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, membersCount: p.membersCount + 1 };
      }
      return p;
    }));

    triggerToast("Application Filed", "Project group owner notified. Badge portfolio submitted.");
  };

  const submitNDAJoin = () => {
    if (activeNDAProjectId) {
      applyToProject(activeNDAProjectId);
      setShowNDAModal(false);
      setActiveNDAProjectId(null);
    }
  };

  // --- CONTROLLER: Simulator Score Recalculator ---
  const calculateReputation = () => {
    const tasksWeight = (simTasks / 8) * 40;
    const prsWeight = (simPrs / 5) * 40;
    const meetWeight = (simAttendance / 100) * 20;
    return Math.round(tasksWeight + prsWeight + meetWeight);
  };

  // --- CONTROLLER: Project Wizard Creator ---
  const handleWizardPublish = () => {
    if (!wizardTitle || !wizardDesc || !wizardTech || !wizardRoles) {
      triggerToast("Missing Inputs", "Please complete title, summary description, stack tags, and roles.");
      return;
    }

    const newProj = {
      id: projects.length + 1,
      title: wizardTitle,
      domain: wizardDomain,
      description: wizardDesc,
      techStack: wizardTech.split(',').map(t => t.trim()),
      roles: wizardRoles.split(',').map(r => r.trim()),
      teamSize: parseInt(wizardSize),
      membersCount: 1,
      commitment: wizardHours,
      isPrivate: wizardPrivate,
      ndaRequired: wizardNda,
      ownerName: currentUser ? currentUser.name : "Anonymous"
    };

    setProjects([newProj, ...projects]);
    setShowWizardModal(false);
    triggerToast("Project Post Online", `'${wizardTitle}' added to the live directory!`);
    
    // Reset wizard
    setWizardTitle('');
    setWizardDesc('');
    setWizardTech('');
    setWizardRoles('');
    setWizardStep(1);
  };

  // --- CONTROLLER: Authentication ---
  const triggerAuthSubmit = (e, type) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!authEmail.includes('@')) {
      setEmailError('Please enter a valid university email address.');
      return;
    }
    if (authPassword.length < 6) {
      setPasswordError('Password must contain at least 6 characters.');
      return;
    }

    const displayName = type === 'login' 
      ? (authEmail.split('@')[0].charAt(0).toUpperCase() + authEmail.split('@')[0].slice(1))
      : authName;

    setCurrentUser({
      name: displayName || 'Collaborator',
      email: authEmail,
      appliedProjects: [],
      reputationScore: 92
    });

    triggerToast("Authenticated", `Welcome, ${displayName || 'User'}! Successfully logged in.`);
    navigateTo('home');
    setAuthEmail('');
    setAuthPassword('');
    setAuthName('');
  };

  const triggerOAuth = (provider) => {
    setCurrentUser({
      name: `${provider}Developer`,
      email: `oauth-${provider.toLowerCase()}@crewhive.edu`,
      appliedProjects: [],
      reputationScore: 95
    });
    triggerToast("OAuth Success", `Connected via ${provider} security token.`);
    navigateTo('home');
  };

  const handleLogout = () => {
    const doubleCheck = window.confirm("Are you sure you want to log out?");
    if (doubleCheck) {
      setCurrentUser(null);
      triggerToast("Logged Out", "Session terminated. Swapped to guest view.");
    }
  };

  // --- FILTERING LOGIC ---
  const filteredProjects = projects.filter(proj => {
    const matchesDomain = activeDomainFilter === 'all' || proj.domain === activeDomainFilter;
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      proj.domain.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div style={{ position: 'relative' }}>
      
      {/* ==========================================
           1. AMAZING INTRO ANIMATION SCREEN
           ========================================== */}
      {showIntro && (
        <div id="intro-overlay" style={{ opacity: 1 }}>
          <canvas ref={introCanvasRef} id="intro-canvas"></canvas>
          <div className="intro-content">
            <div className="logo-hexagon-container">
              <svg className="hex-border" viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,2.5 97.5,30 97.5,85 50,112.5 2.5,85 2.5,30" />
              </svg>
              <svg className="hex-glow-core" viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,2.5 97.5,30 97.5,85 50,112.5 2.5,85 2.5,30" />
              </svg>
            </div>
            
            <h1 className="intro-title">Crew<span>Hive</span></h1>
            <p className="intro-subtitle">Where Ideas Meet Skills</p>
            
            <div className="intro-progressbar-container">
              <div className="intro-progressbar"></div>
            </div>
            
            <button className="skip-intro-btn" onClick={triggerSkipIntro}>Skip Intro</button>
          </div>
        </div>
      )}

      {/* ==========================================
           2. MAIN APP SHELL
           ========================================== */}
      <div id="app-container" style={{ opacity: showIntro ? 0 : 1 }}>
        
        {/* NAVIGATION NAVBAR */}
        <nav className="navbar">
          <div className="nav-brand" onClick={() => {
            if (view === 'home') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigateTo('home');
            }
          }}>
            <svg className="brand-hexagon" viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg">
              <polygon points="50,2.5 97.5,30 97.5,85 50,112.5 2.5,85 2.5,30" />
            </svg>
            <div className="brand-name">Crew<span>Hive</span></div>
          </div>
          
          <ul className="nav-links">
            <li>
              <a 
                href="#/home" 
                className={`nav-link ${view === 'home' ? 'active' : ''}`}
                onClick={(e) => {
                  if (view === 'home') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                Home & Explore
              </a>
            </li>
            <li>
              <a 
                href="#features" 
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  if (view === 'home') {
                    document.getElementById('challenges-section')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    pendingScrollTargetRef.current = 'challenges-section';
                    navigateTo('home');
                  }
                }}
              >
                Features & Innovation
              </a>
            </li>
          </ul>
          
          <div className="nav-actions">
            <button 
              className="theme-toggle-btn" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle Theme"
            >
              <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
              </svg>
              <svg className="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            </button>
            
            {!currentUser ? (
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <button className="btn-secondary" onClick={() => navigateTo('login')}>Log In</button>
                <button className="btn-primary" onClick={() => navigateTo('signup')}>Sign Up</button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{currentUser.name}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--brand-gold)', fontWeight: 700 }}>
                    Score: {currentUser.reputationScore}%
                  </p>
                </div>
                <div 
                  className="scorecard-avatar" 
                  style={{ width: 40, height: 40, fontSize: '0.95rem', cursor: 'pointer' }}
                  onClick={handleLogout}
                  title="Click to Log Out"
                >
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* ==========================================
             VIEW ROUTER CONTROLLER
             ========================================== */}
        {view === 'home' ? (
          
          <main className="view-container">
            {/* HERO SECTION */}
            <section className="hero-section">
              <div className="hero-background-grid"></div>
              
              <div className="hero-floating-elements">
                <div className="floating-card f-card-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#FFB000" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  <div className="floating-card-info">
                    <h4>Spring Boot</h4>
                    <p>Verified through 5 projects</p>
                  </div>
                </div>
                <div className="floating-card f-card-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>
                  <div className="floating-card-info">
                    <h4>Rajni</h4>
                    <p>Reputation Score: 92%</p>
                  </div>
                </div>
                <div className="floating-card f-card-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <div className="floating-card-info">
                    <h4>NDA Agreement</h4>
                    <p>Visibility Controls Active</p>
                  </div>
                </div>
                <div className="floating-card f-card-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#FFB000" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <div className="floating-card-info">
                    <h4>5 hrs/week commitment</h4>
                    <p>No more free riders</p>
                  </div>
                </div>
              </div>
              
              <div className="hero-tagline">
                <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Empowering College Collaborations
              </div>
              
              <h1 className="hero-title">
                Students with <span className="accent-gradient">Ideas</span><br />Meet Students with <span className="accent-gradient">Skills</span>
              </h1>
              
              <p className="hero-subtitle">
                A unified ecosystem where creators find team members, developers build real-world portfolios, and contributions are backed by verified proof.
              </p>
              
              <div className="hero-actions">
                <button 
                  className="btn-primary" 
                  onClick={() => document.getElementById('explore-projects-anchor')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Projects
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={() => {
                    if (!currentUser) {
                      triggerToast("Authentication Required", "Please log in to post project ideas.");
                      navigateTo('login');
                    } else {
                      setWizardStep(1);
                      setShowWizardModal(true);
                    }
                  }}
                >
                  Share Project Idea
                </button>
              </div>
            </section>

            {/* PROBLEM VS SOLUTIONS SECTION */}
            <section className="section-wrapper" id="how-it-works">
              <div className="section-header">
                <span className="section-subtitle">The Ecosystem Gap</span>
                <h2 className="section-title">Why CrewHive is Different</h2>
              </div>
              
              <div className="problem-solution-container">
                <div className="pain-points-card">
                  <div className="card-heading-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 28, height: 28 }}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>
                  </div>
                  <h3 className="ps-title">Existing Obstacles</h3>
                  <ul className="ps-list">
                    <li className="ps-item">
                      <div className="ps-item-icon">✕</div>
                      <div className="ps-item-text">
                        <h4>Hackathon Abandonment</h4>
                        <p>Students join hackathons with high energy but struggle to find matching skillsets, leaving projects incomplete.</p>
                      </div>
                    </li>
                    <li className="ps-item">
                      <div className="ps-item-icon">✕</div>
                      <div className="ps-item-text">
                        <h4>No Central Contribution Showcase</h4>
                        <p>Graduating with stack certificates but lacking verified records of building real products collaboratively.</p>
                      </div>
                    </li>
                    <li className="ps-item">
                      <div className="ps-item-icon">✕</div>
                      <div className="ps-item-text">
                        <h4>Idea Theft & Free Riders</h4>
                        <p>Reluctance to share ideas due to plagiarism, alongside team members disappearing mid-development.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="solutions-card">
                  <div className="card-heading-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 28, height: 28 }}><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <h3 className="ps-title">CrewHive Solutions</h3>
                  <ul className="ps-list">
                    <li className="ps-item">
                      <div className="ps-item-icon">✓</div>
                      <div className="ps-item-text">
                        <h4>Skill-Matched Recruitment</h4>
                        <p>Project owners recruit specific developers using skill filters, GitHub analytics, and peer ratings.</p>
                      </div>
                    </li>
                    <li className="ps-item">
                      <div className="ps-item-icon">✓</div>
                      <div className="ps-item-text">
                        <h4>Verified Contribution Certificates</h4>
                        <p>Instead of simple titles, profiles showcase verified micro-contributions (e.g., Auth, Kafka Integration).</p>
                      </div>
                    </li>
                    <li className="ps-item">
                      <div className="ps-item-icon">✓</div>
                      <div className="ps-item-text">
                        <h4>Active Accountability Sandbox</h4>
                        <p>Incentivizing consistency using reputation scores, inactive trackers, commitment levels, and visibility controls.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* GAMIFICATION & CHALLENGES SIMULATOR */}
            <section className="section-wrapper" id="challenges-section">
              <div className="section-header">
                <span className="section-subtitle">Innovation Sandbox</span>
                <h2 className="section-title">Solving Collaboration Challenges</h2>
              </div>
              
              <div className="interactive-challenges-board">
                {/* Left Side Tab Navigation */}
                <div className="challenge-tab-list">
                  <button 
                    className={`challenge-tab-btn ${activeSimTab === 'panel-visibility' ? 'active-tab' : ''}`}
                    onClick={() => setActiveSimTab('panel-visibility')}
                  >
                    Visibility Control
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                  <button 
                    className={`challenge-tab-btn ${activeSimTab === 'panel-score' ? 'active-tab' : ''}`}
                    onClick={() => setActiveSimTab('panel-score')}
                  >
                    Contribution Scores
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                  <button 
                    className={`challenge-tab-btn ${activeSimTab === 'panel-inactive' ? 'active-tab' : ''}`}
                    onClick={() => setActiveSimTab('panel-inactive')}
                  >
                    Inactivity Detection
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                  <button 
                    className={`challenge-tab-btn ${activeSimTab === 'panel-benefits' ? 'active-tab' : ''}`}
                    onClick={() => setActiveSimTab('panel-benefits')}
                  >
                    Contributor Benefits
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
                
                {/* Right Side Panel Renderings */}
                <div className="challenge-tab-panels">
                  
                  {/* PANEL 1: Visibility Controls */}
                  {activeSimTab === 'panel-visibility' && (
                    <div className="challenge-panel active-panel">
                      <div className="panel-header">
                        <div className="panel-title">
                          <h3>Challenge 1: Idea Theft</h3>
                          <p>Protecting proprietary system concepts while attracting skilled student contributors.</p>
                        </div>
                        <div className="challenge-tag">Security</div>
                      </div>
                      
                      <div className="visibility-sandbox">
                        <div className="sandbox-settings">
                          <h4>Configure Idea Settings</h4>
                          <div className="toggle-group">
                            <label htmlFor="visibility-toggle">Set Project Visibility:</label>
                            <span className="switch-control">
                              <input 
                                type="checkbox" 
                                id="visibility-toggle" 
                                checked={simVisibilityPrivate} 
                                onChange={(e) => setSimVisibilityPrivate(e.target.checked)}
                              />
                              <span className="slider-round"></span>
                            </span>
                          </div>
                          <div className="nda-agreement-checkbox">
                            <input 
                              type="checkbox" 
                              id="nda-toggle" 
                              checked={simNdaEnforced} 
                              onChange={(e) => {
                                setSimNdaEnforced(e.target.checked);
                                triggerToast("NDA Requirement Toggled", e.target.checked ? "Students must sign an NDA before viewing secret concepts." : "Anyone can apply and see details immediately.");
                              }}
                            />
                            <label htmlFor="nda-toggle">Enforce Student Non-Disclosure Agreement (NDA)</label>
                          </div>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                            Private projects hide detailed stack layouts, problem statements, and APIs until you accept their join request.
                          </p>
                        </div>
                        
                        <div className="sandbox-preview">
                          <div>
                            <span className={`preview-badge ${simVisibilityPrivate ? 'p-badge-private' : 'p-badge-public'}`}>
                              {simVisibilityPrivate ? 'Private' : 'Public'}
                            </span>
                            <h4 style={{ marginBottom: 12, fontSize: '1.1rem' }}>AI Interview Platform</h4>
                          </div>
                          <div className="project-preview-details">
                            <div className="preview-field">
                              <label>Domain</label>
                              <p>Artificial Intelligence</p>
                            </div>
                            <div className={`preview-field ${simVisibilityPrivate ? 'blur-effect' : ''}`}>
                              <label>Problem Statement</label>
                              <p>Building automated LLM agent workflows that analyze student resume uploads and generate real-time voice interviews.</p>
                            </div>
                            <div className={`preview-field ${simVisibilityPrivate ? 'blur-effect' : ''}`}>
                              <label>Core Secrets / Architecture</label>
                              <p>Python, OpenAI API, WebRTC connection logs</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PANEL 2: Contribution Score */}
                  {activeSimTab === 'panel-score' && (
                    <div className="challenge-panel active-panel">
                      <div className="panel-header">
                        <div className="panel-title">
                          <h3>Challenge 2: Free Riders</h3>
                          <p>Rewarding active contributors and holding idle team members accountable.</p>
                        </div>
                        <div className="challenge-tag">Gamification</div>
                      </div>
                      
                      <div className="score-sandbox">
                        <div className="range-slider-group">
                          <h4>Simulate Weekly Metrics</h4>
                          <div className="slider-container">
                            <div className="slider-header">
                              <span>Tasks Completed</span>
                              <span>{simTasks} / 8</span>
                            </div>
                            <input 
                              type="range" min="0" max="8" value={simTasks} 
                              className="range-input" onChange={(e) => setSimTasks(parseInt(e.target.value))}
                            />
                          </div>
                          <div className="slider-container">
                            <div className="slider-header">
                              <span>GitHub Pull Requests Merged</span>
                              <span>{simPrs} / 5</span>
                            </div>
                            <input 
                              type="range" min="0" max="5" value={simPrs} 
                              className="range-input" onChange={(e) => setSimPrs(parseInt(e.target.value))}
                            />
                          </div>
                          <div className="slider-container">
                            <div className="slider-header">
                              <span>Team Meeting Attendance</span>
                              <span>{simAttendance}%</span>
                            </div>
                            <input 
                              type="range" min="0" max="100" step="5" value={simAttendance} 
                              className="range-input" onChange={(e) => setSimAttendance(parseInt(e.target.value))}
                            />
                          </div>
                        </div>
                        
                        <div className="reputation-scorecard-preview">
                          <div className="scorecard-header">
                            <div className="scorecard-avatar">R</div>
                            <div className="scorecard-name">
                              <h4>Rajni Kant (Frontend Lead)</h4>
                              <p>Reputational Grade: Gold Developer</p>
                            </div>
                          </div>
                          <div className="scorecard-grid">
                            <div className="scorecard-metric highlight">
                              <label>Contribution Score</label>
                              <p style={{ color: calculateReputation() >= 80 ? '#10B981' : calculateReputation() >= 50 ? 'var(--brand-gold)' : '#EF4444' }}>
                                {calculateReputation()}%
                              </p>
                            </div>
                            <div className="scorecard-metric">
                              <label>Team Rating</label>
                              <p>4.8 ★</p>
                            </div>
                            <div className="scorecard-metric">
                              <label>Completed Projects</label>
                              <p>12</p>
                            </div>
                            <div className="scorecard-metric">
                              <label>Endorsements</label>
                              <p>32</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PANEL 3: Inactivity Detection */}
                  {activeSimTab === 'panel-inactive' && (
                    <div className="challenge-panel active-panel">
                      <div className="panel-header">
                        <div className="panel-title">
                          <h3>Challenge 3: Team Abandonment</h3>
                          <p>Automatic triggers that alert leaders before a project loses momentum.</p>
                        </div>
                        <div className="challenge-tag">Automation</div>
                      </div>
                      
                      <div className="inactive-sandbox">
                        <div className="alert-timeline">
                          <div className="timeline-step active-step">
                            <div className="timeline-line">
                              <div className="t-dot"></div>
                              <div className="t-line"></div>
                            </div>
                            <div className="timeline-text">
                              <h4>Day 1 - 7: Offline State</h4>
                              <p>Student has made zero commits and completed no tasks.</p>
                            </div>
                          </div>
                          <div className={`timeline-step ${simInactiveDays >= 10 ? 'active-step' : ''}`}>
                            <div className="timeline-line">
                              <div className="t-dot"></div>
                              <div className="t-line"></div>
                            </div>
                            <div className="timeline-text">
                              <h4>Day 10: System Warning</h4>
                              <p>Personal notification urges updates on weekly milestones.</p>
                            </div>
                          </div>
                          <div className={`timeline-step ${simInactiveDays >= 14 ? 'active-step' : ''}`}>
                            <div className="timeline-line">
                              <div className="t-dot"></div>
                            </div>
                            <div className="timeline-text">
                              <h4>Day 14: Team Alert</h4>
                              <p>Project owner is notified to check commitment levels.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="auto-detector-simulator">
                          <div className="detector-status">
                            <span className={`status-badge ${
                              simInactiveDays === 0 ? 'sb-active' : simInactiveDays === 10 ? 'sb-warning' : 'sb-inactive'
                            }`}>
                              {simInactiveDays === 0 ? 'Active' : simInactiveDays === 10 ? 'Warning Alert' : 'Inactive'}
                            </span>
                            <h4>{simInactiveDays} Days Inactive</h4>
                            <p>
                              {simInactiveDays === 0 && "Rahul is actively pushing commits this week."}
                              {simInactiveDays === 10 && "Warning notification dispatched to Rahul's inbox."}
                              {simInactiveDays === 14 && "Project owner notified. Team removal lock activated."}
                            </p>
                          </div>
                          
                          <div className="simulator-controls">
                            <button 
                              className={simInactiveDays === 0 ? 'active-sim-btn' : ''}
                              onClick={() => setSimInactiveDays(0)}
                            >
                              Active
                            </button>
                            <button 
                              className={simInactiveDays === 10 ? 'active-sim-btn' : ''}
                              onClick={() => {
                                setSimInactiveDays(10);
                                triggerToast("System Warning Dispatched", "User alerted due to zero commits over 10 days.");
                              }}
                            >
                              10 Days
                            </button>
                            <button 
                              className={simInactiveDays === 14 ? 'active-sim-btn' : ''}
                              onClick={() => {
                                setSimInactiveDays(14);
                                triggerToast("Owner Alert Sent", "Developer flagged as inactive. Replacement matches prioritized.");
                              }}
                            >
                              14 Days
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PANEL 4: Contributor Benefits */}
                  {activeSimTab === 'panel-benefits' && (
                    <div className="challenge-panel active-panel">
                      <div className="panel-header">
                        <div className="panel-title">
                          <h3>Challenge 4: What's in it for me?</h3>
                          <p>Incentivizing collaborators with verifiable portfolio proofs and skills verification.</p>
                        </div>
                        <div className="challenge-tag">Rewards</div>
                      </div>
                      
                      <div className="benefits-sandbox">
                        <div className="certificate-card-mockup">
                          <div className="cert-seal">VERIFIED</div>
                          <div className="cert-header">
                            <h4>CrewHive Collaboration Proof</h4>
                            <h2>Verified Contribution</h2>
                          </div>
                          <div className="cert-body">
                            This certifies that <span>{currentUser ? currentUser.name : 'Rajni'}</span> has successfully collaborated as a <span>Frontend Developer</span> on the project <span>AI Interview Platform</span>.
                          </div>
                          <div className="cert-details">
                            <label>Completed Micro-Services & Contributions</label>
                            <ul className="cert-contributions">
                              <li>Designed Interview Simulation HUD (Glassmorphism layout)</li>
                              <li>Integrated WebRTC Real-Time Stream connections</li>
                              <li>Parsed OpenAI prompt response JSON trees</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="badges-gallery">
                          <h4>Earn Gamified Badges</h4>
                          <div className="badge-grid">
                            <div className="badge-item-display" onClick={() => triggerToast("Java Badge Earned", "Automatically endorsed by 5 peers.")}>
                              <div className="badge-icon-wrap">☕</div>
                              <p>Java Expert</p>
                            </div>
                            <div className="badge-item-display" onClick={() => triggerToast("Docker Badge Earned", "Verified via project deployments.")}>
                              <div className="badge-icon-wrap">📦</div>
                              <p>Docker Practitioner</p>
                            </div>
                            <div className="badge-item-display" onClick={() => triggerToast("Spring Boot Badge Earned", "Linked with 12 completed PR merges.")}>
                              <div className="badge-icon-wrap">⚡</div>
                              <p>Spring Boot Builder</p>
                            </div>
                          </div>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginTop: 10 }}>
                            Skills are automatically verified by parsing your team's GitHub repository and getting positive peer endorsements.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </section>

            {/* DYNAMIC EXPLORE PROJECTS SECTION */}
            <section className="section-wrapper explore-projects-section" id="explore-projects-anchor">
              <div className="section-header">
                <span className="section-subtitle">Live Directory</span>
                <h2 className="section-title">Explore Collaborations</h2>
              </div>
              
              {/* Filter Bar */}
              <div className="board-filters-bar">
                <div className="search-input-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  <input 
                    type="text" 
                    placeholder="Search tech, roles, or domains..." 
                    className="search-field"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="filter-pills-container">
                  {['all', 'Web Development', 'Artificial Intelligence', 'Blockchain', 'Mobile Applications'].map(dom => (
                    <span 
                      key={dom}
                      className={`filter-pill ${activeDomainFilter === dom ? 'active-pill' : ''}`}
                      onClick={() => setActiveDomainFilter(dom)}
                    >
                      {dom === 'all' ? 'All Domains' : dom === 'Web Development' ? 'Web Dev' : dom === 'Artificial Intelligence' ? 'AI / ML' : dom === 'Blockchain' ? 'Web3' : 'Mobile Apps'}
                    </span>
                  ))}
                </div>
                
                <div className="project-action-trigger">
                  <button 
                    className="btn-primary" 
                    onClick={() => {
                      if (!currentUser) {
                        triggerToast("Authentication Required", "Please log in to post project cards.");
                        navigateTo('login');
                      } else {
                        setWizardStep(1);
                        setShowWizardModal(true);
                      }
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 16, height: 16 }}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Post Project
                  </button>
                </div>
              </div>
              
              {/* Project Cards Grid */}
              <div className="project-cards-grid">
                {filteredProjects.length === 0 ? (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
                    <span style={{ fontSize: '3rem', marginBottom: 16, display: 'block' }}>🔍</span>
                    <h3>No Collaboration Matches Found</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Try altering tags, domains, or search terms.</p>
                  </div>
                ) : (
                  filteredProjects.map(proj => {
                    const isApplied = currentUser && currentUser.appliedProjects.includes(proj.id);
                    
                    // Hide description details if private and not owned or applied
                    const isPrivateLocked = proj.isPrivate && !isApplied && (!currentUser || currentUser.name !== proj.ownerName);
                    const displayDesc = isPrivateLocked 
                      ? "🔒 Detailed problem statement and technical architecture locked under Student NDA. Join this project team to view specification documents."
                      : proj.description;

                    return (
                      <div className="project-card" key={proj.id}>
                        <div>
                          <div className="p-card-top">
                            <span className="p-card-domain">{proj.domain}</span>
                            <span className={`visibility-indicator ${proj.isPrivate ? 'indicator-private' : 'indicator-public'}`}>
                              {proj.isPrivate ? '🔒 NDA Private' : '🔓 Public Concept'}
                            </span>
                          </div>
                          <div className="p-card-body">
                            <h3>
                              {proj.title}
                              {proj.isPrivate && <span style={{ fontSize: '0.85rem', color: 'var(--brand-gold)', marginLeft: 8 }}>[Private]</span>}
                            </h3>
                            <p className="p-card-desc">{displayDesc}</p>
                            <div className="p-card-tech">
                              {proj.techStack.map(t => (
                                <span className="tech-tag" key={t}>{t}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-card-bottom">
                          <div className="p-card-roles">
                            <label>Roles Needed</label>
                            <div className="roles-group">
                              {proj.roles.map(r => (
                                <span className="role-badge" key={r}>{r}</span>
                              ))}
                            </div>
                          </div>
                          <button 
                            className="apply-action-btn"
                            disabled={isApplied}
                            style={isApplied ? { background: 'var(--border-color)', cursor: 'default', boxShadow: 'none', border: '1px solid var(--border-color)' } : {}}
                            onClick={() => handleApplyClick(proj)}
                          >
                            {isApplied ? 'Applied ✓' : 'Apply to Join'}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          </main>
          
        ) : (
          
          /* ==========================================
               VIEW 2: AUTH VIEW (LOGIN & SIGNUP)
               ========================================== */
          <div className="view-container">
            <div className="auth-page-container">
              <div className="auth-card">
                
                {/* Left Presentation Side */}
                <div className="auth-graphic-side">
                  <div className="graphic-header">
                    <svg className="brand-hexagon" viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="50,2.5 97.5,30 97.5,85 50,112.5 2.5,85 2.5,30" />
                    </svg>
                    <div className="graphic-brand-name">CrewHive</div>
                  </div>
                  
                  <div className="graphic-carousel">
                    <div className="carousel-slide-item">
                      <h3>Students with <br /><span>Ideas Meet Skills</span></h3>
                      <p>Join a network built specifically for college innovators. Find partners, align commits, and develop scalable products with verified proof.</p>
                    </div>
                  </div>
                  
                  <div className="graphic-footer">
                    <div className="rep-item">
                      <span className="rep-icon">🛡️</span>
                      <p>Ensure project integrity with <span>Visibility Controls</span></p>
                    </div>
                    <div className="rep-item">
                      <span className="rep-icon">🏆</span>
                      <p>Build reputation with <span>Verified Certificates</span></p>
                    </div>
                  </div>
                </div>

                {/* Right Form Side */}
                <div className="auth-form-side">
                  
                  {/* PANEL A: LOGIN VIEW */}
                  {view === 'login' ? (
                    <div className="active-panel">
                      <div className="auth-form-header">
                        <h2>Welcome Back</h2>
                        <p>Don't have an account? <a href="#/signup">Sign up for free</a></p>
                      </div>
                      
                      <div className="social-auth-row">
                        <button className="social-auth-btn google-btn" onClick={() => triggerOAuth('Google')}>
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>
                          Google
                        </button>
                        <button className="social-auth-btn github-btn" onClick={() => triggerOAuth('GitHub')}>
                          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                          GitHub
                        </button>
                      </div>
                      
                      <div className="auth-separator">OR LOGIN WITH EMAIL</div>
                      
                      <form onSubmit={(e) => triggerAuthSubmit(e, 'login')}>
                        <div className="auth-form-fields">
                          <div className="floating-form-group">
                            <div className="input-container-wrap">
                              <input 
                                type="email" id="login-email" className="form-input-element" placeholder=" " required
                                value={authEmail} onChange={(e) => setAuthEmail(e.target.value)}
                              />
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                              <label htmlFor="login-email" className="floating-label">Email Address</label>
                            </div>
                            {emailError && <span className="field-error-msg">{emailError}</span>}
                          </div>
                          
                          <div className="floating-form-group">
                            <div className="input-container-wrap">
                              <input 
                                type="password" id="login-password" className="form-input-element" placeholder=" " required
                                value={authPassword} onChange={(e) => setAuthPassword(e.target.value)}
                              />
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>
                              <label htmlFor="login-password" className="floating-label">Password</label>
                            </div>
                            {passwordError && <span className="field-error-msg">{passwordError}</span>}
                          </div>
                        </div>
                        
                        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: 10 }}>
                          Log In to Dashboard
                        </button>
                      </form>
                    </div>
                  ) : (
                    
                    /* PANEL B: SIGNUP VIEW */
                    <div className="active-panel">
                      <div className="auth-form-header">
                        <h2>Create Account</h2>
                        <p>Already have an account? <a href="#/login">Log in here</a></p>
                      </div>
                      
                      <div className="social-auth-row">
                        <button className="social-auth-btn google-btn" onClick={() => triggerOAuth('Google')}>
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>
                          Google
                        </button>
                        <button className="social-auth-btn github-btn" onClick={() => triggerOAuth('GitHub')}>
                          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                          GitHub
                        </button>
                      </div>
                      
                      <div className="auth-separator">OR SIGN UP WITH EMAIL</div>
                      
                      <form onSubmit={(e) => triggerAuthSubmit(e, 'signup')}>
                        <div className="auth-form-fields">
                          <div className="floating-form-group">
                            <div className="input-container-wrap">
                              <input 
                                type="text" id="signup-name" className="form-input-element" placeholder=" " required
                                value={authName} onChange={(e) => setAuthName(e.target.value)}
                              />
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                              <label htmlFor="signup-name" className="floating-label">Full Name</label>
                            </div>
                          </div>
                          
                          <div className="floating-form-group">
                            <div className="input-container-wrap">
                              <input 
                                type="email" id="signup-email" className="form-input-element" placeholder=" " required
                                value={authEmail} onChange={(e) => setAuthEmail(e.target.value)}
                              />
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                              <label htmlFor="signup-email" className="floating-label">University Email</label>
                            </div>
                            {emailError && <span className="field-error-msg">{emailError}</span>}
                          </div>
                          
                          <div className="floating-form-group">
                            <div className="input-container-wrap">
                              <input 
                                type="password" id="signup-password" className="form-input-element" placeholder=" " required
                                value={authPassword} onChange={(e) => setAuthPassword(e.target.value)}
                              />
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>
                              <label htmlFor="signup-password" className="floating-label">Password</label>
                            </div>
                            {passwordError && <span className="field-error-msg">{passwordError}</span>}
                          </div>
                        </div>
                        
                        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: 10 }}>
                          Register & Join Hive
                        </button>
                      </form>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ==========================================
           3. MODAL COMPONENT STRUCTURES
           ========================================== */}
      
      {/* NDA MODAL */}
      {showNDAModal && (
        <div className="modal-overlay">
          <div className="modal-content-card">
            <button className="modal-close-btn" onClick={() => setShowNDAModal(false)}>&times;</button>
            <div className="modal-header">
              <h3>
                {projects.find(p => p.id === activeNDAProjectId)?.title}
                <span style={{ fontSize: '0.9rem', color: 'var(--brand-gold)', marginLeft: 8 }}>[NDA Required]</span>
              </h3>
              <p>Confidentiality confirmation is required to inspect details and request joins.</p>
            </div>
            
            <div className="modal-body">
              <div className="nda-modal-agreement-text">
                <p><strong>1. Confidentiality:</strong> I agree that all concepts, designs, schemas, and credentials associated with this project are confidential. I will not distribute, copy, or share project assets without explicit permission from the project owner.</p>
                <p><strong>2. Commitment:</strong> I agree to dedicate the agreed-upon hours per week as detailed in the project specification and participate in milestone meetings.</p>
                <p><strong>3. Records:</strong> I consent to having my contributions (commits, completed tasks) logged by CrewHive to verify contribution certificates.</p>
              </div>
              <div className="nda-agreement-checkbox">
                <input 
                  type="checkbox" id="modal-nda-confirm" 
                  checked={ndaChecked} onChange={(e) => setNdaChecked(e.target.checked)}
                />
                <label htmlFor="modal-nda-confirm"><strong>I accept the terms of collaboration.</strong></label>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button className="btn-secondary" onClick={() => setShowNDAModal(false)}>Cancel</button>
              <button 
                className="btn-primary" 
                disabled={!ndaChecked}
                onClick={submitNDAJoin}
              >
                Agree & Request Join
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT CREATOR WIZARD MODAL */}
      {showWizardModal && (
        <div className="modal-overlay">
          <div className="modal-content-card">
            <button className="modal-close-btn" onClick={() => setShowWizardModal(false)}>&times;</button>
            <div className="modal-header">
              <h3>Post New Project Idea</h3>
              <p>Step {wizardStep} of 3: {
                wizardStep === 1 ? 'Project Concept' : wizardStep === 2 ? 'Roles & Stack' : 'Commitment & Security'
              }</p>
            </div>
            
            <div className="modal-body" style={{ minHeight: 280 }}>
              
              {/* Wizard Step 1 */}
              {wizardStep === 1 && (
                <div className="wizard-step active-wizard-step">
                  <div className="auth-form-fields">
                    <div className="floating-form-group">
                      <div className="input-container-wrap">
                        <input 
                          type="text" id="w-title" className="form-input-element" placeholder=" " required
                          value={wizardTitle} onChange={(e) => setWizardTitle(e.target.value)}
                        />
                        <label htmlFor="w-title" className="floating-label">Project Title</label>
                      </div>
                    </div>
                    <div className="floating-form-group">
                      <label htmlFor="w-domain" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                        Project Domain
                      </label>
                      <select 
                        id="w-domain" className="form-input-element" style={{ paddingLeft: 16, cursor: 'pointer' }}
                        value={wizardDomain} onChange={(e) => setWizardDomain(e.target.value)}
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="Artificial Intelligence">Artificial Intelligence / ML</option>
                        <option value="Blockchain">Blockchain / Web3</option>
                        <option value="Mobile Applications">Mobile Applications</option>
                      </select>
                    </div>
                    <div className="floating-form-group">
                      <div className="input-container-wrap">
                        <textarea 
                          id="w-desc" className="form-input-element" style={{ paddingLeft: 16, height: 80, resize: 'none' }} placeholder=" " required
                          value={wizardDesc} onChange={(e) => setWizardDesc(e.target.value)}
                        ></textarea>
                        <label htmlFor="w-desc" className="floating-label">Problem Statement / Slogan</label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Step 2 */}
              {wizardStep === 2 && (
                <div className="wizard-step active-wizard-step">
                  <div className="auth-form-fields">
                    <div className="floating-form-group">
                      <div className="input-container-wrap">
                        <input 
                          type="text" id="w-tech" className="form-input-element" placeholder=" " required
                          value={wizardTech} onChange={(e) => setWizardTech(e.target.value)}
                        />
                        <label htmlFor="w-tech" className="floating-label">Tech Stack (comma-separated, e.g. React, Node.js)</label>
                      </div>
                    </div>
                    <div className="floating-form-group">
                      <div className="input-container-wrap">
                        <input 
                          type="text" id="w-roles" className="form-input-element" placeholder=" " required
                          value={wizardRoles} onChange={(e) => setWizardRoles(e.target.value)}
                        />
                        <label htmlFor="w-roles" className="floating-label">Roles Needed (comma-separated, e.g. Designer, Backend Dev)</label>
                      </div>
                    </div>
                    <div className="floating-form-group">
                      <div className="input-container-wrap">
                        <input 
                          type="number" id="w-size" min="2" max="10" className="form-input-element" placeholder=" " required
                          value={wizardSize} onChange={(e) => setWizardSize(e.target.value)}
                        />
                        <label htmlFor="w-size" className="floating-label">Total Team Size Limit</label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Step 3 */}
              {wizardStep === 3 && (
                <div className="wizard-step active-wizard-step">
                  <div className="auth-form-fields">
                    <div className="floating-form-group">
                      <label htmlFor="w-hours" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                        Commitment Level
                      </label>
                      <select 
                        id="w-hours" className="form-input-element" style={{ paddingLeft: 16, cursor: 'pointer' }}
                        value={wizardHours} onChange={(e) => setWizardHours(e.target.value)}
                      >
                        <option value="5 Hours / Week">5 Hours / Week</option>
                        <option value="10 Hours / Week">10 Hours / Week</option>
                        <option value="15 Hours / Week">15 Hours / Week</option>
                      </select>
                    </div>
                    
                    <div className="toggle-group" style={{ borderBottom: 'none', padding: '10px 0' }}>
                      <label htmlFor="w-private">Set Project to Private (Blur concepts to public)</label>
                      <span className="switch-control">
                        <input 
                          type="checkbox" id="w-private" 
                          checked={wizardPrivate} onChange={(e) => setWizardPrivate(e.target.checked)}
                        />
                        <span className="slider-round"></span>
                      </span>
                    </div>

                    <div className="nda-agreement-checkbox">
                      <input 
                        type="checkbox" id="w-nda" 
                        checked={wizardNda} onChange={(e) => setWizardNda(e.target.checked)}
                      />
                      <label htmlFor="w-nda">Require Student Non-Disclosure Agreement (NDA)</label>
                    </div>
                  </div>
                </div>
              )}

            </div>
            
            <div className="wizard-footer">
              <div className="wizard-dots">
                <span className={`w-dot ${wizardStep === 1 ? 'w-dot-active' : ''}`}></span>
                <span className={`w-dot ${wizardStep === 2 ? 'w-dot-active' : ''}`}></span>
                <span className={`w-dot ${wizardStep === 3 ? 'w-dot-active' : ''}`}></span>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {wizardStep > 1 && (
                  <button className="btn-secondary" onClick={() => setWizardStep(prev => prev - 1)}>Back</button>
                )}
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    if (wizardStep < 3) {
                      setWizardStep(prev => prev + 1);
                    } else {
                      handleWizardPublish();
                    }
                  }}
                >
                  {wizardStep === 3 ? 'Publish Project' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
           4. GLOBAL TOAST TO NOTIFY ACTIONS
           ========================================== */}
      {toast.show && (
        <div id="notification-toast">
          <div className="toast-icon">✓</div>
          <div className="toast-text">
            <h4>{toast.title}</h4>
            <p>{toast.message}</p>
          </div>
        </div>
      )}

    </div>
  );
}
