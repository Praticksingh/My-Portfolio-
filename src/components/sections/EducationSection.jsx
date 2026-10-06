import React from 'react';
import ScrollReveal from '../ScrollReveal';
import TiltCard from '../TiltCard';
import { educationList } from '../../data/education';

export default function EducationSection() {
  return (
    <>
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
            {educationList.map((edu, idx) => (
              <ScrollReveal key={edu.tag} delay={idx * 55} distance={20}>
                <TiltCard maxRotation={1.2} maxTranslate={edu.highlight ? 5 : 4} scaleOnHover={1.015} style={{ borderRadius: '24px' }}>
                  <div
                    className="interactive-hover"
                    style={{
                      padding: '2.5rem',
                      borderRadius: '24px',
                      backgroundColor: edu.highlight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.035)',
                      border: edu.highlight ? '1.5px solid rgba(244, 211, 140, 0.4)' : '1px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: edu.highlight ? '0 15px 35px rgba(0, 0, 0, 0.25)' : 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      height: '100%'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span 
                        className="font-mono" 
                        style={{ 
                          fontSize: '0.72rem', 
                          letterSpacing: '0.12em', 
                          color: edu.highlight ? '#f4d38c' : 'rgba(255, 255, 255, 0.65)', 
                          fontWeight: 700, 
                          textTransform: 'uppercase' 
                        }}
                      >
                        {edu.tag}
                      </span>
                      <span className="font-mono" style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                        {edu.period}
                      </span>
                    </div>

                    <h3 className="font-display" style={{ fontSize: edu.highlight ? '1.35rem' : '1.25rem', fontWeight: 700 }}>
                      {edu.institution}
                    </h3>
                    <p style={{ color: edu.highlight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.85)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                      {edu.degree}
                    </p>

                    {edu.location && (
                      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <span className="font-mono" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                          {edu.location}
                        </span>
                      </div>
                    )}
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Liquid Organic Section Divider: Obsidian to Contact */}
      <div className="liquid-divider" style={{ backgroundColor: '#111010', marginBottom: '-1px' }}>
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" style={{ fill: '#0c0b0b', width: '100%', height: '52px', display: 'block' }}>
          <path d="M0,0 C300,50 600,10 900,60 C1050,85 1150,20 1200,40 L1200,80 L0,80 Z" />
        </svg>
      </div>
    </>
  );
}
