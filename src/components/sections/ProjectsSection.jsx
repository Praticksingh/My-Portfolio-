import React from 'react';
import { ArrowUpRight, CheckCircle2, Cpu } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';
import TiltCard from '../TiltCard';
import MagneticButton from '../MagneticButton';
import { projects } from '../../data/projects';

function GithubIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function ProjectsSection({ onSelectArchitecture }) {
  return (
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
        <ScrollReveal direction="up" distance={20}>
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
          {projects.map((project, idx) => (
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
                      <h3
                        className="font-serif"
                        style={{
                          fontSize: 'clamp(1.75rem, 3vw, 2.35rem)',
                          fontWeight: 700,
                          maxWidth: '820px',
                          lineHeight: 1.25,
                          wordBreak: 'break-word'
                        }}
                      >
                        {project.title}
                      </h3>
                    </div>

                    {/* Project Action Links */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
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

                      {/* Technical Architecture Deep-Dive Button */}
                      {project.architecture && (
                        <MagneticButton maxOffset={5}>
                          <button
                            onClick={() => onSelectArchitecture(project)}
                            aria-label={`Explore technical architecture of ${project.title}`}
                            className="interactive-hover"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.45rem',
                              padding: '0.6rem 1.15rem',
                              borderRadius: '9999px',
                              backgroundColor: 'rgba(255, 255, 255, 0.08)',
                              border: '1px solid rgba(244, 211, 140, 0.45)',
                              color: '#f4d38c',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              fontFamily: 'var(--font-display)',
                              cursor: 'pointer',
                              transition: 'all 0.25s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(244, 211, 140, 0.18)';
                              e.currentTarget.style.borderColor = '#f4d38c';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                              e.currentTarget.style.borderColor = 'rgba(244, 211, 140, 0.45)';
                            }}
                          >
                            <Cpu size={14} />
                            <span>System Architecture</span>
                          </button>
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

                  <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    {project.details}
                  </p>

                  {/* Core Capabilities */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
                    {project.capabilities.map((cap, cIdx) => (
                      <div key={cIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <CheckCircle2 size={16} color="#f4d38c" style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                          {cap}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono skill-pill"
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.35rem 0.85rem',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: 'rgba(255, 255, 255, 0.85)'
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
  );
}
