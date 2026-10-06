import React, { useState, useEffect } from 'react';
import UnifiedHero from './components/UnifiedHero';
import ScrollProgress from './components/ScrollProgress';
import ScrollReveal from './components/ScrollReveal';
import MagneticButton from './components/MagneticButton';
import TiltCard from './components/TiltCard';
import { initSmoothScroll, smoothScrollTo } from './utils/smoothScroll';
import { 
  ArrowUpRight, 
  Send, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  Layers, 
  Terminal, 
  Sparkles, 
  Database, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Trophy, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  GitBranch,
  Server
} from 'lucide-react';

// Crisp inline SVGs for branded icons
function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function App() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Initialize Lenis smooth scroll and active section IntersectionObserver
  useEffect(() => {
    const cleanupLenis = initSmoothScroll();

    const sections = ['hero', 'about', 'projects', 'experience', 'skills', 'achievements', 'education', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-25% 0px -55% 0px',
        threshold: 0.05
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      if (typeof cleanupLenis === 'function') {
        cleanupLenis();
      }
      observer.disconnect();
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4500);
  };

  const navItems = [
    { label: 'HOME', href: '#hero', id: 'hero' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'PROJECTS', href: '#projects', id: 'projects' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'SKILLS', href: '#skills', id: 'skills' },
    { label: 'ACHIEVEMENTS', href: '#achievements', id: 'achievements' },
    { label: 'EDUCATION', href: '#education', id: 'education' },
    { label: 'CONTACT', href: '#contact', id: 'contact' }
  ];

  return (
    <div style={{ backgroundColor: '#eb1008', minHeight: '100vh', color: '#ffffff', position: 'relative' }}>
      {/* Subtle Luxury Scroll Progress Bar at very top */}
      <ScrollProgress />

      {/* =========================================================================
          1. FLOATING FROSTED-GLASS NAVIGATION PILL (CENTERED AT TOP)
          ========================================================================= */}
      <header
        className="anim-nav-entrance"
        style={{
          position: 'fixed',
          top: '1.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          pointerEvents: 'auto',
          maxWidth: '96vw'
        }}
      >
        <nav
          className="interactive-hover"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            padding: '0.45rem 0.65rem',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '9999px',
            boxShadow: '0 12px 35px -8px rgba(0, 0, 0, 0.35)',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'none'
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo(item.href);
              }}
              className={`interactive-hover ${activeSection === item.id ? 'nav-link-active' : ''}`}
              style={{
                display: 'inline-block',
                padding: '0.45rem 0.95rem',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-display)',
                borderRadius: '9999px',
                transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
              onMouseEnter={(e) => {
                if (activeSection !== item.id) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              [{item.label}]
            </a>
          ))}

          <MagneticButton maxOffset={5}>
            <a
              href="/Pratik-Singh-Resume.pdf"
              download="Pratik-Singh-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.95rem',
                backgroundColor: '#ffffff',
                color: '#0b0a0a',
                textDecoration: 'none',
                fontSize: '0.74rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-display)',
                borderRadius: '9999px',
                transition: 'all 0.25s ease',
                marginLeft: '0.2rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f4d38c';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span>CV</span>
              <Download size={12} strokeWidth={2.5} />
            </a>
          </MagneticButton>
        </nav>
      </header>

      {/* =========================================================================
          2. UNIFIED HERO SECTION (100vw, 100vh, SINGLE RAF LOOP, ZERO GHOSTING)
          ========================================================================= */}
      <section id="hero" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <UnifiedHero />
      </section>

      {/* =========================================================================
          3. ABOUT SECTION (Profile & Core Narrative)
          ========================================================================= */}
      <section
        id="about"
        style={{
          padding: '7rem 2rem 5rem 2rem',
          backgroundColor: '#eb1008',
          color: '#ffffff',
          position: 'relative',
          zIndex: 30
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <ScrollReveal direction="up" distance={28}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <Code2 size={20} color="#ffffff" />
              <span
                className="font-mono"
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 700
                }}
              >
                // ABOUT // PERSONAL PROFILE
              </span>
            </div>

            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
                fontWeight: 700,
                maxWidth: '980px',
                lineHeight: 1.2,
                marginBottom: '2rem'
              }}
            >
              Third-Year B.Tech ECE Student Engineering Full-Stack &amp; AI/ML Systems.
            </h2>

            <p
              style={{
                maxWidth: '880px',
                fontSize: 'clamp(1rem, 1.35vw, 1.2rem)',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '3rem',
                fontWeight: 400
              }}
            >
              Third-year B.Tech ECE student building full-stack and AI/ML applications with React, TypeScript, Node.js, FastAPI and Python, from real-time CI/CD diagnostics to multi-agent LLM systems. Hackathon participant focused on problem solving and production-oriented software.
            </p>
          </ScrollReveal>

          {/* Compact Visual Summary Badges */}
          <ScrollReveal delay={120} direction="up" distance={20}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginBottom: '4rem'
              }}
            >
              {[
                'B.Tech ECE (3rd Year)',
                'Full-Stack Development',
                'AI/ML',
                'Agentic AI',
                'Production-Oriented Software',
                'Hackathons'
              ].map((badge) => (
                <span
                  key={badge}
                  className="interactive-hover font-mono skill-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 1.25rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.28)',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#ffffff'
                  }}
                >
                  <Sparkles size={14} color="#f4d38c" />
                  {badge}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* 3 Core Highlight Pillars */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}
          >
            {[
              {
                icon: <Cpu size={32} />,
                color: '#ffffff',
                title: 'Full-Stack Architecture',
                desc: 'Building end-to-end applications with React, TypeScript, Vite, Next.js, Node.js, Express, FastAPI, PostgreSQL, MongoDB, and Supabase with type-safe APIs.'
              },
              {
                icon: <Layers size={32} />,
                color: '#f4d38c',
                title: 'AI/ML & Multi-Agent Systems',
                desc: 'Designing multi-agent applications using LangGraph, orchestrator-domain-critic agent loops, and retrieval-grounded intelligence for predictive decision modeling.'
              },
              {
                icon: <Terminal size={32} />,
                color: '#ffffff',
                title: 'Production-Oriented Delivery',
                desc: 'From autonomous CI/CD failure diagnostics to emergency hospital queue routing, engineering robust solutions tested in hackathons and production environments.'
              }
            ].map((pillar, idx) => (
              <ScrollReveal key={pillar.title} delay={Math.min(idx * 60, 120)} distance={20}>
                <TiltCard maxRotation={1.4} maxTranslate={6} scaleOnHover={1.018} style={{ borderRadius: '24px' }}>
                  <div
                    className="glass-panel"
                    style={{
                      padding: '2.5rem 2rem',
                      borderRadius: '24px',
                      height: '100%'
                    }}
                  >
                    <div style={{ color: pillar.color, marginBottom: '1.25rem' }}>
                      {pillar.icon}
                    </div>
                    <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                      {pillar.title}
                    </h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                      {pillar.desc}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Liquid Organic Section Divider: Vermilion to Obsidian */}
      <div className="liquid-divider" style={{ backgroundColor: '#eb1008', marginBottom: '-1px' }}>
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" style={{ fill: '#0c0b0b', width: '100%', height: '52px', display: 'block' }}>
          <path d="M0,0 C250,70 450,15 700,65 C950,115 1100,20 1200,50 L1200,80 L0,80 Z" />
        </svg>
      </div>

      {/* =========================================================================
          4. PROJECTS SECTION (All 5 Resume Projects)
          ========================================================================= */}
      <section
        id="projects"
        style={{
          padding: '8rem 2rem',
          backgroundColor: '#0c0b0b',
          color: '#ffffff',
          position: 'relative',
          zIndex: 30
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <ScrollReveal direction="up" distance={28}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
              <div>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.8rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#eb1008',
                    fontWeight: 700
                  }}
                >
                  // PORTFOLIO INDEX // SELECTED WORK
                </span>
                <h2
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                    fontWeight: 700,
                    marginTop: '0.5rem'
                  }}
                >
                  Featured Engineering
                </h2>
              </div>
              
              <p style={{ maxWidth: '440px', color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.95rem', lineHeight: 1.65 }}>
                Production-oriented full-stack software, autonomous developer tools, multi-agent AI platforms, and real-time operational systems.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {[
              {
                id: '01',
                title: 'AutoHeal AI',
                subtitle: 'Autonomous CI/CD Diagnostics Platform',
                description: 'Built a full-stack platform for repository analysis, CI/CD failure detection and automated fix workflows, pinpointing affected files and lines via the GitHub API.',
                details: 'Implemented real-time progress tracking, from repository cloning to pipeline completion, with React, TypeScript, Express.js, Socket.IO and MongoDB. Configured Vercel and Docker/Railway deployment with shared types and environment-based configuration.',
                tech: ['React', 'TypeScript', 'Express.js', 'Socket.IO', 'MongoDB', 'GitHub API', 'Docker', 'Vercel', 'Railway'],
                capabilities: [
                  'Repository analysis & CI/CD failure detection',
                  'File & line-level error pinpointing via GitHub API',
                  'Real-time progress tracking from clone to completion',
                  'Shared types with environment-based configuration'
                ],
                github: 'https://github.com/Praticksingh',
                live: 'https://autoheal-ai-main-b5lsqdqsh-praticksinghs-projects.vercel.app/'
              },
              {
                id: '02',
                title: 'OPDFlow AI',
                subtitle: 'Government Hospital OPD Queue Command Center',
                description: 'Built an OPD queue platform for government hospitals with AI-assisted triage, priority-aware queues, digital QR passes and real-time congestion management.',
                details: 'Implemented offline-first sync, multilingual accessibility, live display broadcast, wait-time forecasting, and Code Blue workflows. Designed patient and staff workflows with staff allocation and audit reporting.',
                tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
                capabilities: [
                  'AI-assisted triage & priority-aware queues',
                  'Digital QR passes & real-time congestion management',
                  'Offline-first synchronization & multilingual accessibility',
                  'Live display broadcast, wait-time forecasting & Code Blue workflows',
                  'Staff allocation workflows & audit reporting'
                ],
                github: 'https://github.com/Praticksingh/SmartMedAI',
                live: 'https://smart-med-ai-beryl.vercel.app/'
              },
              {
                id: '03',
                title: 'TRINETRA: Severe Weather Nowcasting',
                subtitle: 'Spatiotemporal Deep Learning Nowcasting System',
                description: 'TRINETRA is an AI-powered severe weather nowcasting system that uses real-time weather data, satellite/NWP observations, terrain information, and a Conv3D spatiotemporal deep-learning model to predict threats such as thunderstorms, cloudbursts, and flash floods 2–6 hours in advance.',
                details: 'It provides location-based risk levels, explanations of the major risk drivers, and map-based alerts to support faster disaster preparedness and response.',
                tech: ['Next.js', 'FastAPI', 'PyTorch', 'Conv3D', 'Supabase', 'PostGIS', 'MapLibre', 'Leaflet', 'Vercel'],
                capabilities: [
                  'Conv3D spatiotemporal deep-learning prediction model',
                  '2–6 hour lead-time forecasts for thunderstorms & flash floods',
                  'Location-based risk levels & major risk driver explanations',
                  'Map-based interactive spatial alerts with MapLibre & Leaflet'
                ],
                github: 'https://github.com/Praticksingh/TRINETRA',
                live: 'https://trinetra-web-nu.vercel.app/'
              },
              {
                id: '04',
                title: 'Anamnesis AI',
                subtitle: 'Multi-Agent Decision-Intelligence Platform',
                description: 'Built a multi-agent application that simulates alternate histories and future scenarios across economy, society, governance, sustainability, and technology.',
                details: 'Designed orchestrator, domain and critic agents with LangGraph, grounding reasoning in real-world datasets through retrieval. Evaluates risk and feasibility while producing structured impact reports.',
                tech: ['Next.js', 'FastAPI', 'LangGraph', 'Chart.js', 'D3.js', 'Docker'],
                capabilities: [
                  'Orchestrator, domain & critic multi-agent system',
                  'Simulations across economy, society, governance, sustainability, tech',
                  'Retrieval-grounded reasoning from real-world datasets',
                  'Risk & feasibility evaluation with structured impact reports'
                ],
                github: 'https://github.com/Praticksingh/Anamnesis-AI',
                live: 'https://anamnesis-8hztziosu-praticksinghs-projects.vercel.app/'
              },
              {
                id: '05',
                title: 'Cyber Fraud Detection Platform',
                subtitle: 'Full-Stack ML System',
                description: 'Built an end-to-end machine-learning platform for phone-number and behavioral risk analysis.',
                details: 'Built a secure React frontend for real-time investigation with FastAPI backend, SQLAlchemy ORM, and cloud deployment across Render and Vercel.',
                tech: ['FastAPI', 'Machine Learning', 'SQLAlchemy', 'React', 'Render', 'Vercel'],
                capabilities: [
                  'Phone-number & behavioral fraud risk scoring',
                  'Secure React frontend for real-time investigation',
                  'FastAPI microservice backend with SQLAlchemy',
                  'Cloud production deployment on Render & Vercel'
                ],
                github: 'https://github.com/Praticksingh',
                live: 'https://cyber-fraud-detection-platform.vercel.app/login'
              }
            ].map((project, idx) => (
              <ScrollReveal key={project.id} delay={Math.min(idx * 40, 100)} distance={20}>
                <TiltCard maxRotation={1.2} maxTranslate={4} scaleOnHover={1.015} style={{ borderRadius: '24px' }}>
                  <div
                    className="interactive-hover"
                    style={{
                      padding: '3rem',
                      borderRadius: '24px',
                      backgroundColor: 'rgba(255, 255, 255, 0.035)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.75rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                          <span className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f4d38c' }}>
                            PROJECT {project.id}
                          </span>
                          <span className="font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)' }}>
                            {project.subtitle}
                          </span>
                        </div>
                        <h3 className="font-serif" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.35rem)', fontWeight: 700, maxWidth: '820px', lineHeight: 1.25, wordBreak: 'break-word' }}>
                          {project.title}
                        </h3>
                      </div>

                      {/* Project Action Links */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {project.github && (
                          <MagneticButton maxOffset={5}>
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${project.title} source code on GitHub`}
                              className="interactive-hover"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.6rem 1.15rem',
                                borderRadius: '9999px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.25)',
                                color: '#ffffff',
                                fontSize: '0.76rem',
                                fontWeight: 700,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                fontFamily: 'var(--font-display)',
                                textDecoration: 'none',
                                transition: 'all 0.25s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)';
                                e.currentTarget.style.borderColor = '#ffffff';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                              }}
                            >
                              <GithubIcon size={14} />
                              <span>GitHub</span>
                            </a>
                          </MagneticButton>
                        )}

                        {project.live && (
                          <MagneticButton maxOffset={5}>
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View live demo of ${project.title}`}
                              className="interactive-hover"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.45rem',
                                padding: '0.6rem 1.25rem',
                                borderRadius: '9999px',
                                backgroundColor: '#ffffff',
                                color: '#0b0a0a',
                                fontSize: '0.76rem',
                                fontWeight: 700,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                fontFamily: 'var(--font-display)',
                                textDecoration: 'none',
                                transition: 'all 0.25s ease',
                                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f4d38c';
                                const arrow = e.currentTarget.querySelector('.demo-arrow');
                                if (arrow) arrow.style.transform = 'translate(1.5px, -1.5px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#ffffff';
                                const arrow = e.currentTarget.querySelector('.demo-arrow');
                                if (arrow) arrow.style.transform = 'translate(0, 0)';
                              }}
                            >
                              <span>Live Demo</span>
                              <ArrowUpRight
                                size={14}
                                className="demo-arrow"
                                style={{
                                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                                  display: 'inline-block'
                                }}
                              />
                            </a>
                          </MagneticButton>
                        )}
                      </div>
                    </div>

                    <p style={{ color: 'rgba(255, 255, 255, 0.88)', fontSize: '1rem', lineHeight: 1.65 }}>
                      {project.description}
                    </p>

                    {project.details && (
                      <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                        {project.details}
                      </p>
                    )}

                    {/* Key Capabilities */}
                    <div>
                      <span className="font-mono" style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f4d38c', marginBottom: '0.65rem', fontWeight: 700 }}>
                        KEY CAPABILITIES:
                      </span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.5rem' }}>
                        {project.capabilities.map((cap, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.86rem' }}>
                            <span style={{ color: '#10b981', marginTop: '2px' }}>✓</span>
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technology Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono skill-pill"
                          style={{
                            padding: '0.35rem 0.85rem',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.14)',
                            fontSize: '0.75rem',
                            color: 'rgba(255, 255, 255, 0.9)'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. EXPERIENCE SECTION (Exact Resume Timeline & Programs)
          ========================================================================= */}
      <section
        id="experience"
        style={{
          padding: '8rem 2rem',
          backgroundColor: '#111010',
          color: '#ffffff',
          position: 'relative',
          zIndex: 30
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <ScrollReveal direction="up" distance={28}>
            <div style={{ marginBottom: '4rem' }}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#eb1008',
                  fontWeight: 700
                }}
              >
                // CAREER TIMELINE // EXPERIENCE
              </span>
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                  fontWeight: 700,
                  marginTop: '0.5rem'
                }}
              >
                Professional Experience
              </h2>
              <p style={{ maxWidth: '520px', color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
                Track record across ERP operations, product experience insights, web development, and digital marketing execution.
              </p>
            </div>
          </ScrollReveal>

          {/* Interactive Timeline Track with glowing milestone nodes */}
          <div
            style={{
              position: 'relative',
              borderLeft: '2px solid rgba(255, 255, 255, 0.15)',
              paddingLeft: 'clamp(1.2rem, 3vw, 2.5rem)',
              marginLeft: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem'
            }}
          >
            {[
              {
                role: 'Social Media Growth Manager; Catalogue & ERP Operations Intern',
                company: 'Quickcartics Private Limited (Aryix)',
                period: 'Sep 2026 – Nov 2026',
                type: 'Fixed-term contract, Hybrid',
                desc: 'Two-month contract across social media growth and catalogue & ERP operations for Aryix. Worked with company accounts, catalogue and store data under manager guidance and confidentiality policies.'
              },
              {
                role: 'Social Media Marketing Intern',
                company: 'Suvidha Mahila Mandal (NGO)',
                period: 'Jul 2026 – Sep 2026',
                type: 'Remote',
                desc: 'Remote six-day-a-week social media marketing internship with daily Google Meet meetings.'
              },
              {
                role: 'Social Media Manager Intern',
                company: 'The Social Era Digital Pvt. Ltd.',
                period: 'Apr 2026 – Present',
                type: 'Internship',
                desc: 'Managed client accounts across Instagram, Facebook, LinkedIn, and Google Business Profiles. Built content strategies, content calendars, and engagement campaigns. Performed competitor and trend analysis while collaborating directly with design, video, and content teams.'
              },
              {
                role: 'Web Development Intern',
                company: 'Pinnacle Labs Pvt Ltd',
                period: 'Nov 2025 – Dec 2025',
                type: 'One-month program',
                desc: 'One-month web engineering program focused on practical frontend web architecture and component implementation.'
              },
              {
                role: 'Product Experience Intern',
                company: 'Ai+ Technologies',
                period: 'Oct 2025 – Mar 2026',
                type: 'Internship',
                desc: 'Tested the Ai+ smartphone ecosystem and provided feature experience insights to refine user interfaces and product performance.'
              }
            ].map((exp, index) => (
              <ScrollReveal key={index} delay={Math.min(index * 50, 150)} distance={20}>
                <div style={{ position: 'relative' }}>
                  {/* Glowing Milestone Node */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 'calc(-1 * clamp(1.2rem, 3vw, 2.5rem) - 7px)',
                      top: '2.2rem',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: '#eb1008',
                      border: '2px solid #ffffff',
                      boxShadow: '0 0 12px rgba(235, 16, 8, 0.85)'
                    }}
                  />

                  <TiltCard maxRotation={1.2} maxTranslate={5} scaleOnHover={1.012} style={{ borderRadius: '20px' }}>
                    <div
                      className="interactive-hover"
                      style={{
                        padding: '2.5rem',
                        borderRadius: '20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.035)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem',
                        alignItems: 'flex-start',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                          <span className="font-mono" style={{ fontSize: '0.8rem', color: '#f4d38c', fontWeight: 700 }}>
                            {exp.period}
                          </span>
                          <span
                            className="font-mono"
                            style={{
                              fontSize: '0.68rem',
                              letterSpacing: '0.1em',
                              padding: '0.2rem 0.65rem',
                              borderRadius: '9999px',
                              backgroundColor: 'rgba(255, 255, 255, 0.08)',
                              color: 'rgba(255, 255, 255, 0.7)'
                            }}
                          >
                            {exp.type}
                          </span>
                        </div>
                        <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                          {exp.role}
                        </h3>
                        <p className="font-mono" style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                          {exp.company}
                        </p>
                      </div>

                      <div>
                        <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.94rem', lineHeight: 1.65 }}>
                          {exp.desc}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Industry Programs */}
          <ScrollReveal delay={180} distance={20}>
            <div style={{ marginTop: '3.5rem' }}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#f4d38c',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '1rem'
                }}
              >
                INDUSTRY PROGRAMS &amp; SIMULATIONS
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                <TiltCard maxRotation={1.2} maxTranslate={4} scaleOnHover={1.015} style={{ borderRadius: '18px' }}>
                  <div
                    className="glass-panel"
                    style={{
                      padding: '1.75rem 2rem',
                      borderRadius: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.25rem',
                      height: '100%'
                    }}
                  >
                    <div style={{ color: '#ffffff' }}>
                      <Briefcase size={26} />
                    </div>
                    <div>
                      <h4 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                        IBM SkillBuild Data Analytics
                      </h4>
                      <span className="font-mono" style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                        2025
                      </span>
                    </div>
                  </div>
                </TiltCard>

                <TiltCard maxRotation={1.2} maxTranslate={4} scaleOnHover={1.015} style={{ borderRadius: '18px' }}>
                  <div
                    className="glass-panel"
                    style={{
                      padding: '1.75rem 2rem',
                      borderRadius: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.25rem',
                      height: '100%'
                    }}
                  >
                    <div style={{ color: '#f4d38c' }}>
                      <Briefcase size={26} />
                    </div>
                    <div>
                      <h4 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                        Deloitte Job Simulation via Forage
                      </h4>
                      <span className="font-mono" style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                        Jun 2025
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* =========================================================================
          6. TECHNICAL SKILLS SECTION (6 Exact Resume Categories)
          ========================================================================= */}
      <section
        id="skills"
        style={{
          padding: '8rem 2rem',
          backgroundColor: '#0c0b0b',
          color: '#ffffff',
          position: 'relative',
          zIndex: 30
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <ScrollReveal direction="up" distance={28}>
            <div style={{ marginBottom: '4rem' }}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#eb1008',
                  fontWeight: 700
                }}
              >
                // TECHNICAL ARSENAL // SKILLS
              </span>
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                  fontWeight: 700,
                  marginTop: '0.5rem'
                }}
              >
                Technical Skills
              </h2>
              <p style={{ maxWidth: '520px', color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
                Rigorous toolkit spanning programming languages, modern web frameworks, databases, agentic AI, DevOps pipelines, and digital strategy.
              </p>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2rem'
            }}
          >
            {[
              {
                category: 'PROGRAMMING',
                icon: <Code2 size={24} color="#f4d38c" />,
                skills: ['Python', 'JavaScript', 'TypeScript', 'C', 'SQL', 'HTML']
              },
              {
                category: 'WEB / FULL-STACK',
                icon: <Cpu size={24} color="#ffffff" />,
                skills: ['React', 'Next.js', 'Node.js', 'Express.js', 'FastAPI', 'Vite', 'Tailwind CSS', 'REST APIs', 'Chart.js', 'D3.js']
              },
              {
                category: 'DATABASES',
                icon: <Database size={24} color="#f4d38c" />,
                skills: ['PostgreSQL', 'MongoDB', 'Supabase', 'SQLAlchemy']
              },
              {
                category: 'AI / ML',
                icon: <Sparkles size={24} color="#ffffff" />,
                skills: ['Machine Learning', 'Agentic AI', 'Multi-Agent Systems', 'LangGraph', 'LLM Applications', 'AI Orchestration']
              },
              {
                category: 'DEVOPS / TOOLS',
                icon: <Server size={24} color="#f4d38c" />,
                skills: ['Git', 'GitHub', 'GitHub API', 'Docker', 'Socket.IO', 'Vercel', 'Railway', 'Render', 'Power BI']
              },
              {
                category: 'MARKETING & CREATIVE',
                icon: <Layers size={24} color="#ffffff" />,
                skills: ['Social Media & Digital Marketing', 'Content Strategy', 'SEO Fundamentals', 'Canva', 'CapCut']
              }
            ].map((cat, idx) => (
              <ScrollReveal key={cat.category} delay={idx * 75} distance={20}>
                <TiltCard maxRotation={1.2} maxTranslate={4} scaleOnHover={1.015} style={{ borderRadius: '24px' }}>
                  <div
                    className="interactive-hover"
                    style={{
                      padding: '2.5rem 2rem',
                      borderRadius: '24px',
                      backgroundColor: 'rgba(255, 255, 255, 0.035)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      transition: 'all 0.3s ease',
                      height: '100%'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                      {cat.icon}
                      <h3
                        className="font-mono"
                        style={{
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: '#ffffff'
                        }}
                      >
                        {cat.category}
                      </h3>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="skill-pill font-mono"
                          style={{
                            padding: '0.45rem 0.95rem',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(255, 255, 255, 0.07)',
                            border: '1px solid rgba(255, 255, 255, 0.14)',
                            fontSize: '0.82rem',
                            fontWeight: 500,
                            color: 'rgba(255, 255, 255, 0.92)'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. CERTIFICATIONS SECTION
          ========================================================================= */}
      <section
        id="certifications"
        style={{
          padding: '6rem 2rem',
          backgroundColor: '#111010',
          color: '#ffffff',
          position: 'relative',
          zIndex: 30
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <ScrollReveal direction="up" distance={28}>
            <div style={{ marginBottom: '3.5rem' }}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#eb1008',
                  fontWeight: 700
                }}
              >
                // CREDENTIALS // CERTIFICATIONS
              </span>
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
                  fontWeight: 700,
                  marginTop: '0.5rem'
                }}
              >
                Certifications
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {[
              {
                id: '01',
                title: 'Internet of Things (IoT)',
                issuer: 'Samsung Innovation Campus',
                period: 'Jul 2025 – Sep 2025',
                badge: 'IoT & Hardware-Software Interfaces'
              },
              {
                id: '02',
                title: 'Digital Marketing',
                issuer: 'HubSpot Academy',
                period: 'Valid until Jan 2027',
                badge: 'Industry Certified'
              },
              {
                id: '03',
                title: 'Social Media Marketing',
                issuer: 'Semrush Academy',
                period: 'Crash Course',
                badge: 'Strategic Execution'
              }
            ].map((cert, idx) => (
              <ScrollReveal key={cert.id} delay={Math.min(idx * 50, 100)} distance={20}>
                <TiltCard maxRotation={1.2} maxTranslate={4} scaleOnHover={1.015} style={{ borderRadius: '20px' }}>
                  <div
                    className="interactive-hover"
                    style={{
                      padding: '2.25rem',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.035)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem',
                      transition: 'all 0.3s ease',
                      height: '100%'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Award size={28} color="#f4d38c" />
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                        {cert.period}
                      </span>
                    </div>
                    <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                      {cert.title}
                    </h3>
                    <p className="font-mono" style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                      {cert.issuer}
                    </p>
                    <span
                      style={{
                        alignSelf: 'flex-start',
                        fontSize: '0.72rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        color: '#f4d38c',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {cert.badge}
                    </span>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. ACHIEVEMENTS & LEADERSHIP SECTION
          ========================================================================= */}
      <section
        id="achievements"
        style={{
          padding: '8rem 2rem',
          backgroundColor: '#0c0b0b',
          color: '#ffffff',
          position: 'relative',
          zIndex: 30
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <ScrollReveal direction="up" distance={28}>
            <div style={{ marginBottom: '4rem' }}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#eb1008',
                  fontWeight: 700
                }}
              >
                // LEADERSHIP &amp; RECOGNITION
              </span>
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                  fontWeight: 700,
                  marginTop: '0.5rem'
                }}
              >
                Achievements &amp; Leadership
              </h2>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2rem'
            }}
          >
            {/* Leadership Column */}
            <ScrollReveal delay={0} distance={24}>
              <TiltCard maxRotation={1.2} maxTranslate={5} scaleOnHover={1.015} style={{ borderRadius: '24px' }}>
                <div
                  className="interactive-hover"
                  style={{
                    padding: '2.5rem',
                    borderRadius: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.035)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    height: '100%'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                    <Trophy size={24} color="#f4d38c" />
                    <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                      Leadership Roles
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <h4 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                        Secretary, TechSphere
                      </h4>
                      <p className="font-mono" style={{ fontSize: '0.8rem', color: '#f4d38c', marginTop: '0.15rem' }}>
                        Promoted from Social Media Head
                      </p>
                    </div>

                    <div>
                      <h4 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                        Co-Coordinator
                      </h4>
                      <p className="font-mono" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.15rem' }}>
                        Programming &amp; DBMS, IET TechSphere
                      </p>
                    </div>

                    <div>
                      <h4 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                        Anchor
                      </h4>
                      <p className="font-mono" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.15rem' }}>
                        ARAMBH 1.0
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Hackathons & Competitions */}
            <ScrollReveal delay={60} distance={20}>
              <TiltCard maxRotation={1.2} maxTranslate={4} scaleOnHover={1.015} style={{ borderRadius: '24px' }}>
                <div
                  className="interactive-hover"
                  style={{
                    padding: '2.5rem',
                    borderRadius: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.035)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    height: '100%'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                    <Code2 size={24} color="#ffffff" />
                    <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                      Hackathons &amp; Case Storms
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <h4 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                        RIFT '26
                      </h4>
                      <p className="font-mono" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.15rem' }}>
                        Physics Wallah
                      </p>
                    </div>

                    <div>
                      <h4 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                        Paranox 2.0
                      </h4>
                      <p className="font-mono" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.15rem' }}>
                        TechXNinjas
                      </p>
                    </div>

                    <div>
                      <h4 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                        Python Hackathon
                      </h4>
                      <p className="font-mono" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.15rem' }}>
                        IIT BHU
                      </p>
                    </div>

                    <div>
                      <h4 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                        Strategy Storm 2026 (Case Competition)
                      </h4>
                      <p className="font-mono" style={{ fontSize: '0.8rem', color: '#f4d38c', marginTop: '0.15rem' }}>
                        IIT Guwahati
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Workshops & Sports */}
            <ScrollReveal delay={110} distance={20}>
              <TiltCard maxRotation={1.2} maxTranslate={5} scaleOnHover={1.015} style={{ borderRadius: '24px' }}>
                <div
                  className="interactive-hover"
                  style={{
                    padding: '2.5rem',
                    borderRadius: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.035)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    height: '100%'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                    <Sparkles size={24} color="#f4d38c" />
                    <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                      Workshops &amp; Sports
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                    <div>
                      <span className="font-mono" style={{ fontSize: '0.72rem', color: '#f4d38c', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        WORKSHOP
                      </span>
                      <h4 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginTop: '0.2rem' }}>
                        Product Management
                      </h4>
                      <p className="font-mono" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.15rem' }}>
                        NextLeap x IIT Roorkee • 2025
                      </p>
                    </div>

                    <div>
                      <span className="font-mono" style={{ fontSize: '0.72rem', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        SPORTS CHAMPIONSHIP
                      </span>
                      <h4 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginTop: '0.2rem' }}>
                        1st Rank, Volleyball &amp; Cricket
                      </h4>
                      <p className="font-mono" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.15rem' }}>
                        DDU Engineering Premier League • Feb 2025
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* =========================================================================
          9. EDUCATION SECTION (Current B.Tech, Class XII, Class X)
          ========================================================================= */}
      <section
        id="education"
        style={{
          padding: '8rem 2rem 5rem 2rem',
          backgroundColor: '#111010',
          color: '#ffffff',
          position: 'relative',
          zIndex: 30
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <ScrollReveal direction="up" distance={28}>
            <div style={{ marginBottom: '4rem' }}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#eb1008',
                  fontWeight: 700
                }}
              >
                // ACADEMIC BACKGROUND // EDUCATION
              </span>
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                  fontWeight: 700,
                  marginTop: '0.5rem'
                }}
              >
                Education
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* CURRENT: B.Tech ECE */}
            <ScrollReveal delay={0} distance={24}>
              <TiltCard maxRotation={1.2} maxTranslate={5} scaleOnHover={1.015} style={{ borderRadius: '24px' }}>
                <div
                  className="interactive-hover"
                  style={{
                    padding: '2.5rem',
                    borderRadius: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1.5px solid rgba(244, 211, 140, 0.4)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    height: '100%'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#f4d38c', fontWeight: 700, textTransform: 'uppercase' }}>
                      CURRENT // 3RD YEAR
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                      2024 – 2028
                    </span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 700 }}>
                    IET DDU Gorakhpur University
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.96rem', lineHeight: 1.6 }}>
                    B.Tech in Electronics &amp; Communication Engineering (Currently 3rd Year)
                  </p>
                  <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                      Gorakhpur, Uttar Pradesh
                    </span>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* CLASS XII */}
            <ScrollReveal delay={60} distance={20}>
              <TiltCard maxRotation={1.2} maxTranslate={4} scaleOnHover={1.015} style={{ borderRadius: '24px' }}>
                <div
                  className="interactive-hover"
                  style={{
                    padding: '2.5rem',
                    borderRadius: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.035)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    height: '100%'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 700, textTransform: 'uppercase' }}>
                      INTERMEDIATE
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                      2023 – 2024
                    </span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                    S.T KC Memorial English School
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                    Intermediate (Class XII)
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* CLASS X */}
            <ScrollReveal delay={110} distance={20}>
              <TiltCard maxRotation={1.2} maxTranslate={5} scaleOnHover={1.015} style={{ borderRadius: '24px' }}>
                <div
                  className="interactive-hover"
                  style={{
                    padding: '2.5rem',
                    borderRadius: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.035)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    height: '100%'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 700, textTransform: 'uppercase' }}>
                      HIGH SCHOOL
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                      2022 – 2023
                    </span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                    Sushila Singh Public School
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                    High School (Class X)
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* Liquid Organic Section Divider: Obsidian to Contact */}
      <div className="liquid-divider" style={{ backgroundColor: '#111010', marginBottom: '-1px' }}>
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" style={{ fill: '#0c0b0b', width: '100%', height: '52px', display: 'block' }}>
          <path d="M0,0 C300,50 600,10 900,60 C1050,85 1150,20 1200,40 L1200,80 L0,80 Z" />
        </svg>
      </div>

      {/* =========================================================================
          10. CONTACT SECTION (Let's build something impactful)
          ========================================================================= */}
      <section
        id="contact"
        style={{
          padding: '8rem 2rem',
          backgroundColor: '#0c0b0b',
          color: '#ffffff',
          position: 'relative',
          zIndex: 30
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          
          <ScrollReveal direction="up" distance={28}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.3em',
                  color: '#eb1008',
                  textTransform: 'uppercase',
                  fontWeight: 700
                }}
              >
                // INITIATE DIALOGUE // CONTACT
              </span>
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                  fontWeight: 700,
                  marginTop: '0.75rem',
                  marginBottom: '1rem'
                }}
              >
                Let's build something impactful.
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
                Interested in building full-stack, AI/ML and production-oriented software. Reach out for collaborations, engineering opportunities, or technical inquiries.
              </p>
            </div>
          </ScrollReveal>

          {/* Contact Details Grid */}
          <ScrollReveal delay={40} distance={18}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3.5rem'
              }}
            >
              <a
                href="mailto:pratiksingh111204@gmail.com"
                className="interactive-hover"
                style={{
                  padding: '1.75rem 1.5rem',
                  borderRadius: '18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }}
              >
                <div style={{ color: '#eb1008' }}>
                  <Mail size={24} />
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <span className="font-mono" style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '0.1em' }}>
                    EMAIL
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, wordBreak: 'break-all' }}>
                    pratiksingh111204@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="tel:+918127406133"
                className="interactive-hover"
                style={{
                  padding: '1.75rem 1.5rem',
                  borderRadius: '18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }}
              >
                <div style={{ color: '#eb1008' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <span className="font-mono" style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '0.1em' }}>
                    PHONE
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                    +91 81274 06133
                  </span>
                </div>
              </a>

              <div
                className="interactive-hover"
                style={{
                  padding: '1.75rem 1.5rem',
                  borderRadius: '18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ color: '#eb1008' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <span className="font-mono" style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '0.1em' }}>
                    LOCATION
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                    Varanasi, Uttar Pradesh
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Action Buttons: Let's Talk, View GitHub, LinkedIn, Pratik Clicks, Download Resume */}
          <ScrollReveal delay={80} distance={18}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '4rem'
              }}
            >
              <MagneticButton maxOffset={6}>
                <a
                  href="mailto:pratiksingh111204@gmail.com"
                  className="interactive-hover"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.9rem 2rem',
                    backgroundColor: '#ffffff',
                    color: '#0b0a0a',
                    borderRadius: '9999px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f4d38c';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                  }}
                >
                  <Send size={16} />
                  <span>Let's Talk</span>
                </a>
              </MagneticButton>

              <MagneticButton maxOffset={6}>
                <a
                  href="https://github.com/Praticksingh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-hover social-icon-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.9rem 2rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.28)',
                    color: '#ffffff',
                    borderRadius: '9999px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
                    e.currentTarget.style.borderColor = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.28)';
                  }}
                >
                  <GithubIcon size={16} />
                  <span>View GitHub</span>
                </a>
              </MagneticButton>

              <MagneticButton maxOffset={6}>
                <a
                  href="https://www.linkedin.com/in/pratik-singh-0474382a0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-hover social-icon-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.9rem 2rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.28)',
                    color: '#ffffff',
                    borderRadius: '9999px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
                    e.currentTarget.style.borderColor = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.28)';
                  }}
                >
                  <LinkedinIcon size={16} />
                  <span>LinkedIn</span>
                </a>
              </MagneticButton>

              <MagneticButton maxOffset={6}>
                <a
                  href="https://instagram.com/pratikclicks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-hover social-icon-btn"
                  title="Pratik Clicks"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.9rem 2rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.28)',
                    color: '#ffffff',
                    borderRadius: '9999px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
                    e.currentTarget.style.borderColor = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.28)';
                  }}
                >
                  <InstagramIcon size={16} />
                  <span>Pratik Clicks</span>
                </a>
              </MagneticButton>

              <MagneticButton maxOffset={6}>
                <a
                  href="/Pratik-Singh-Resume.pdf"
                  download="Pratik-Singh-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-hover"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.9rem 2rem',
                    backgroundColor: '#f4d38c',
                    color: '#0b0a0a',
                    borderRadius: '9999px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 8px 25px rgba(244, 211, 140, 0.2)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(244, 211, 140, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f4d38c';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(244, 211, 140, 0.2)';
                  }}
                >
                  <Download size={16} strokeWidth={2.5} />
                  <span>Download Resume</span>
                </a>
              </MagneticButton>
            </div>
          </ScrollReveal>

          {/* Interactive Message Form */}
          <ScrollReveal delay={100} distance={18}>
            <form
              onSubmit={handleFormSubmit}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: '24px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.75rem'
              }}
            >
              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Recruiters, Engineering Leads, Collaborators"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@organization.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  MESSAGE
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your project, engineering role, or collaboration idea..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <MagneticButton maxOffset={5}>
                <button
                  type="submit"
                  className="interactive-hover"
                  style={{
                    padding: '1rem 2.5rem',
                    backgroundColor: formSubmitted ? '#10b981' : '#ffffff',
                    color: '#0b0a0a',
                    border: 'none',
                    borderRadius: '9999px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.65rem',
                    transition: 'all 0.3s ease',
                    marginTop: '0.5rem',
                    alignSelf: 'flex-start'
                  }}
                >
                  {formSubmitted ? (
                    <>
                      <CheckCircle2 size={18} />
                      <span>Message Sent Successfully</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </MagneticButton>
            </form>
          </ScrollReveal>

        </div>
      </section>

      {/* =========================================================================
          11. FOOTER
          ========================================================================= */}
      <footer
        style={{
          padding: '4rem 2rem 3rem 2rem',
          backgroundColor: '#070606',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.65)',
          fontSize: '0.85rem',
          position: 'relative',
          zIndex: 30
        }}
      >
        {/* Official Interactive Social Links */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <MagneticButton maxOffset={4}>
            <a
              href="https://github.com/Praticksingh"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn interactive-hover"
              style={{ color: 'rgba(255, 255, 255, 0.75)', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', textDecoration: 'none', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}
            >
              <GithubIcon size={15} />
              <span>GitHub</span>
            </a>
          </MagneticButton>

          <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>•</span>

          <MagneticButton maxOffset={4}>
            <a
              href="https://www.linkedin.com/in/pratik-singh-0474382a0/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn interactive-hover"
              style={{ color: 'rgba(255, 255, 255, 0.75)', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', textDecoration: 'none', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}
            >
              <LinkedinIcon size={15} />
              <span>LinkedIn</span>
            </a>
          </MagneticButton>

          <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>•</span>

          <MagneticButton maxOffset={4}>
            <a
              href="https://instagram.com/pratikclicks/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn interactive-hover"
              title="Pratik Clicks"
              style={{ color: 'rgba(255, 255, 255, 0.75)', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', textDecoration: 'none', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}
            >
              <InstagramIcon size={15} />
              <span>Pratik Clicks</span>
            </a>
          </MagneticButton>
        </div>

        <p style={{ marginBottom: '0.4rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)' }}>
          © 2026 Pratik Singh. Full-Stack &amp; AI/ML Developer | B.Tech ECE (3rd Year).
        </p>
        <p className="font-mono" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>
          Crafted with React, Vite, Canvas Angular Gaze Physics &amp; Production-Oriented Engineering.
        </p>
      </footer>

    </div>
  );
}
