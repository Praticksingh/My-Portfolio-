import React from 'react';
import MagneticButton from './MagneticButton';

function GithubIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function InstagramIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
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
        © {new Date().getFullYear()} Pratik Singh. Full-Stack &amp; AI/ML Developer | B.Tech ECE (3rd Year).
      </p>
      <p className="font-mono" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>
        Crafted with React, Vite, Canvas Angular Gaze Physics &amp; Production-Oriented Engineering.
      </p>
    </footer>
  );
}
