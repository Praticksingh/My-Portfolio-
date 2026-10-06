import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Download, Mail, ExternalLink, Terminal, Code2, Briefcase, Award, GraduationCap, X } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const actions = [
    {
      category: 'NAVIGATION',
      icon: <Code2 size={16} />,
      label: 'Jump to: Projects',
      shortcut: '#projects',
      run: () => { smoothScrollTo('#projects'); onClose(); }
    },
    {
      category: 'NAVIGATION',
      icon: <Briefcase size={16} />,
      label: 'Jump to: Experience Timeline',
      shortcut: '#experience',
      run: () => { smoothScrollTo('#experience'); onClose(); }
    },
    {
      category: 'NAVIGATION',
      icon: <Terminal size={16} />,
      label: 'Jump to: Technical Skills',
      shortcut: '#skills',
      run: () => { smoothScrollTo('#skills'); onClose(); }
    },
    {
      category: 'NAVIGATION',
      icon: <Award size={16} />,
      label: 'Jump to: Certifications & Leadership',
      shortcut: '#achievements',
      run: () => { smoothScrollTo('#achievements'); onClose(); }
    },
    {
      category: 'NAVIGATION',
      icon: <GraduationCap size={16} />,
      label: 'Jump to: Education',
      shortcut: '#education',
      run: () => { smoothScrollTo('#education'); onClose(); }
    },
    {
      category: 'NAVIGATION',
      icon: <Mail size={16} />,
      label: 'Jump to: Contact & Inquiries',
      shortcut: '#contact',
      run: () => { smoothScrollTo('#contact'); onClose(); }
    },
    {
      category: 'LIVE DEMOS',
      icon: <ExternalLink size={16} color="#f4d38c" />,
      label: 'Launch: AutoHeal AI (CI/CD Diagnostics)',
      shortcut: 'DEMO 01',
      run: () => { window.open('https://autoheal-ai-main-b5lsqdqsh-praticksinghs-projects.vercel.app/', '_blank'); onClose(); }
    },
    {
      category: 'LIVE DEMOS',
      icon: <ExternalLink size={16} color="#f4d38c" />,
      label: 'Launch: OPDFlow AI (Hospital Command Center)',
      shortcut: 'DEMO 02',
      run: () => { window.open('https://smart-med-ai-beryl.vercel.app/', '_blank'); onClose(); }
    },
    {
      category: 'LIVE DEMOS',
      icon: <ExternalLink size={16} color="#f4d38c" />,
      label: 'Launch: TRINETRA (Weather Nowcasting)',
      shortcut: 'DEMO 03',
      run: () => { window.open('https://trinetra-web-nu.vercel.app/', '_blank'); onClose(); }
    },
    {
      category: 'LIVE DEMOS',
      icon: <ExternalLink size={16} color="#f4d38c" />,
      label: 'Launch: Anamnesis AI (Multi-Agent Simulation)',
      shortcut: 'DEMO 04',
      run: () => { window.open('https://anamnesis-8hztziosu-praticksinghs-projects.vercel.app/', '_blank'); onClose(); }
    },
    {
      category: 'LIVE DEMOS',
      icon: <ExternalLink size={16} color="#f4d38c" />,
      label: 'Launch: Cyber Fraud Detection Platform',
      shortcut: 'DEMO 05',
      run: () => { window.open('https://cyber-fraud-detection-platform.vercel.app/login', '_blank'); onClose(); }
    },
    {
      category: 'ACTIONS',
      icon: <Download size={16} color="#10b981" />,
      label: 'Download Resume (PDF)',
      shortcut: 'PDF',
      run: () => { window.open('/Pratik-Singh-Resume.pdf', '_blank'); onClose(); }
    },
    {
      category: 'ACTIONS',
      icon: <Mail size={16} color="#10b981" />,
      label: 'Copy Email Address (pratiksingh111204@gmail.com)',
      shortcut: 'COPY',
      run: () => {
        navigator.clipboard?.writeText('pratiksingh111204@gmail.com');
        setCopied(true);
        setTimeout(() => { setCopied(false); onClose(); }, 800);
      }
    },
    {
      category: 'EXTERNAL',
      icon: <ExternalLink size={16} />,
      label: 'Open GitHub Profile',
      shortcut: 'GITHUB',
      run: () => { window.open('https://github.com/Praticksingh', '_blank'); onClose(); }
    },
    {
      category: 'EXTERNAL',
      icon: <ExternalLink size={16} />,
      label: 'Open LinkedIn Profile',
      shortcut: 'LINKEDIN',
      run: () => { window.open('https://www.linkedin.com/in/pratik-singh-0474382a0/', '_blank'); onClose(); }
    }
  ];

  const filteredActions = actions.filter((action) =>
    action.label.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase()) ||
    action.shortcut.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredActions.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % Math.max(1, filteredActions.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].run();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 'clamp(3rem, 12vh, 8rem)',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        backgroundColor: 'rgba(7, 6, 6, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        animation: 'heroFadeIn 0.25s ease both'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: '#0d0c0c',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(235, 16, 8, 0.2)',
          color: '#ffffff'
        }}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            padding: '1.15rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          <Search size={20} color="rgba(255, 255, 255, 0.5)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands, projects, live demos..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '1rem',
              fontFamily: 'var(--font-display)'
            }}
          />
          <button
            onClick={onClose}
            aria-label="Close command palette"
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.45)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.2rem'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Action List */}
        <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '0.65rem' }}>
          {filteredActions.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
              No matching commands or projects found.
            </div>
          ) : (
            filteredActions.map((action, idx) => (
              <div
                key={action.label}
                onClick={action.run}
                onMouseEnter={() => setSelectedIndex(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1.15rem',
                  borderRadius: '12px',
                  backgroundColor: idx === selectedIndex ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <span style={{ color: idx === selectedIndex ? '#f4d38c' : 'rgba(255, 255, 255, 0.65)' }}>
                    {action.icon}
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>
                    {action.label}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.68rem',
                      letterSpacing: '0.08em',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: 'rgba(255, 255, 255, 0.6)'
                    }}
                  >
                    {action.shortcut}
                  </span>
                  {idx === selectedIndex && <ArrowRight size={14} color="#f4d38c" />}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div
          style={{
            padding: '0.75rem 1.25rem',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.74rem',
            color: 'rgba(255, 255, 255, 0.5)',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <span>Use ↑↓ to navigate • ↵ to select • ESC to close</span>
          {copied && <span style={{ color: '#10b981', fontWeight: 700 }}>✓ Copied to clipboard!</span>}
        </div>
      </div>
    </div>
  );
}
