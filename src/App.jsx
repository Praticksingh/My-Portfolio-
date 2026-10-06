import React, { useState, useEffect } from 'react';
import UnifiedHero from './components/UnifiedHero';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import SkillsSection from './components/sections/SkillsSection';
import CertificationsSection from './components/sections/CertificationsSection';
import AchievementsSection from './components/sections/AchievementsSection';
import EducationSection from './components/sections/EducationSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/Footer';
import ProjectArchitectureModal from './components/ProjectArchitectureModal';
import CommandPalette from './components/CommandPalette';
import { initSmoothScroll } from './utils/smoothScroll';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedArchitecture, setSelectedArchitecture] = useState(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Initialize Lenis smooth scroll, IntersectionObserver, and keyboard shortcuts
  useEffect(() => {
    const cleanupLenis = initSmoothScroll();

    const sections = [
      'hero', 
      'about', 
      'projects', 
      'experience', 
      'skills', 
      'certifications',
      'achievements', 
      'education', 
      'contact'
    ];

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

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (typeof cleanupLenis === 'function') {
        cleanupLenis();
      }
      observer.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#eb1008', minHeight: '100vh', color: '#ffffff', position: 'relative' }}>
      {/* Precision Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Floating Centered Glass Navigation Bar */}
      <Navbar 
        activeSection={activeSection} 
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} 
      />

      {/* Main Portfolio Sections */}
      <main>
        <UnifiedHero />
        <AboutSection />
        <ProjectsSection onSelectArchitecture={(proj) => setSelectedArchitecture(proj)} />
        <ExperienceSection />
        <SkillsSection />
        <CertificationsSection />
        <AchievementsSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Architectural Deep-Dive Interactive Modal */}
      <ProjectArchitectureModal 
        project={selectedArchitecture} 
        onClose={() => setSelectedArchitecture(null)} 
      />

      {/* Developer Quick-Search & Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
    </div>
  );
}
