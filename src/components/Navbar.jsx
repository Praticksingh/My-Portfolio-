import React from 'react';
import { Download, Search } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { smoothScrollTo } from '../utils/smoothScroll';

export default function Navbar({ activeSection, onOpenCommandPalette }) {
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
          >
            [{item.label}]
          </a>
        ))}

        {/* Cmd+K Quick Search Trigger */}
        <button
          onClick={onOpenCommandPalette}
          aria-label="Open Command Palette (Cmd+K)"
          title="Press Cmd+K or Ctrl+K to search"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.42rem 0.75rem',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '0.7rem',
            fontWeight: 600,
            fontFamily: 'var(--font-mono)',
            borderRadius: '9999px',
            cursor: 'pointer',
            marginLeft: '0.2rem',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
          }}
        >
          <Search size={12} />
          <span>⌘K</span>
        </button>

        {/* CV Download Button */}
        <MagneticButton maxOffset={5}>
          <a
            href="/Pratik-Singh-Resume.pdf"
            download="Pratik-Singh-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Pratik Singh Curriculum Vitae"
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
  );
}
