import React from 'react';
import { Award, Briefcase } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';
import TiltCard from '../TiltCard';
import { certifications, simulations } from '../../data/certifications';

export default function CertificationsSection() {
  return (
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
              Certifications &amp; Simulations
            </h2>
          </div>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {certifications.map((cert, idx) => (
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

          {simulations.map((sim, idx) => (
            <ScrollReveal key={sim.title} delay={150 + idx * 50} distance={20}>
              <TiltCard maxRotation={1.2} maxTranslate={4} scaleOnHover={1.015} style={{ borderRadius: '20px' }}>
                <div
                  className="interactive-hover"
                  style={{
                    padding: '2.25rem',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.025)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                    transition: 'all 0.3s ease',
                    height: '100%'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Briefcase size={26} color="#ffffff" />
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                      {sim.period}
                    </span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                    {sim.title}
                  </h3>
                  <p className="font-mono" style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                    {sim.issuer}
                  </p>
                  <span
                    style={{
                      alignSelf: 'flex-start',
                      fontSize: '0.72rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    Corporate Engineering Simulation
                  </span>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
