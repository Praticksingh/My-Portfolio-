import React from 'react';
import { Briefcase } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';
import TiltCard from '../TiltCard';
import { experiences } from '../../data/experience';
import { simulations } from '../../data/certifications';

export default function ExperienceSection() {
  return (
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
        
        <ScrollReveal direction="up" distance={20}>
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
              // CAREER MILESTONES // WORK HISTORY
            </span>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                fontWeight: 700,
                marginTop: '0.5rem'
              }}
            >
              Experience
            </h2>
            <p style={{ maxWidth: '520px', color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
              Hands-on industry internships spanning ERP operations, growth strategy, software engineering simulations, and product testing.
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
          {experiences.map((exp, index) => (
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

                <TiltCard maxRotation={1.2} maxTranslate={4} scaleOnHover={1.012} style={{ borderRadius: '20px' }}>
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
                      <h3 className="font-display" style={{ fontSize: '1.28rem', fontWeight: 700, marginBottom: '0.35rem', lineHeight: 1.35 }}>
                        {exp.role}
                      </h3>
                      <p className="font-mono" style={{ fontSize: '0.88rem', color: '#ffffff', opacity: 0.85 }}>
                        {exp.company}
                      </p>
                    </div>

                    <p style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '0.94rem', lineHeight: 1.65 }}>
                      {exp.desc}
                    </p>
                  </div>
                </TiltCard>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Corporate Job Simulations */}
        <ScrollReveal delay={120} distance={20}>
          <div style={{ marginTop: '5rem', paddingTop: '3.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <span
              className="font-mono"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#f4d38c',
                fontWeight: 700,
                display: 'block',
                marginBottom: '1.5rem'
              }}
            >
              // CORPORATE SIMULATIONS // FORAGE
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {simulations.map((sim, idx) => (
                <TiltCard key={idx} maxRotation={1.2} maxTranslate={4} scaleOnHover={1.015} style={{ borderRadius: '18px' }}>
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
                        {sim.title}
                      </h4>
                      <p className="font-mono" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                        {sim.issuer}
                      </p>
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.55)' }}>
                        {sim.period}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
