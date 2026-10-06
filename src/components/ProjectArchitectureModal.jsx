import React, { useEffect } from 'react';
import { X, ArrowUpRight, Cpu, Layers, GitBranch, CheckCircle2 } from 'lucide-react';
import MagneticButton from './MagneticButton';

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function ProjectArchitectureModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project || !project.architecture) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        backgroundColor: 'rgba(7, 6, 6, 0.78)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        animation: 'heroFadeIn 0.3s ease both'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '840px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#0f0e0e',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '28px',
          padding: 'clamp(1.75rem, 4vw, 3rem)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(235, 16, 8, 0.15)',
          position: 'relative',
          color: '#ffffff'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close architecture drawer"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={20} />
        </button>

        {/* Header Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
          <span
            className="font-mono"
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#f4d38c',
              fontWeight: 700
            }}
          >
            // SYSTEM ARCHITECTURE DEEP-DIVE
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
          <span className="font-mono" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>
            PROJECT {project.id}
          </span>
        </div>

        <h2
          id="modal-title"
          className="font-serif"
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
            fontWeight: 700,
            marginBottom: '0.5rem',
            lineHeight: 1.2
          }}
        >
          {project.title}
        </h2>
        
        <p className="font-mono" style={{ fontSize: '0.85rem', color: '#eb1008', fontWeight: 600, marginBottom: '2rem' }}>
          Architecture Paradigm: {project.architecture.type}
        </p>

        {/* Pipeline Diagram Track */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3
            className="font-display"
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <GitBranch size={16} color="#f4d38c" />
            <span>End-to-End Data Pipeline</span>
          </h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '1.5rem'
            }}
          >
            {project.architecture.pipeline.map((step, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(235, 16, 8, 0.25)',
                    border: '1px solid rgba(235, 16, 8, 0.6)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 700
                  }}
                >
                  {idx + 1}
                </span>
                <span style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.5 }}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Trade-offs & Decisions */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3
            className="font-display"
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Cpu size={16} color="#10b981" />
            <span>Key Architectural Trade-offs &amp; Decisions</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {project.architecture.decisions.map((decision, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  padding: '1rem 1.25rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px'
                }}
              >
                <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6 }}>
                  {decision}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            flexWrap: 'wrap'
          }}
        >
          {project.github && (
            <MagneticButton maxOffset={5}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.35rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  transition: 'all 0.2s ease'
                }}
              >
                <GithubIcon size={14} />
                <span>View Source</span>
              </a>
            </MagneticButton>
          )}

          {project.live && (
            <MagneticButton maxOffset={5}>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.45rem',
                  borderRadius: '9999px',
                  backgroundColor: '#ffffff',
                  color: '#0b0a0a',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  boxShadow: '0 4px 15px rgba(235, 16, 8, 0.3)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>Launch Live Demo</span>
                <ArrowUpRight size={15} />
              </a>
            </MagneticButton>
          )}
        </div>
      </div>
    </div>
  );
}
