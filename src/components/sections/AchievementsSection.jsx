import React from 'react';
import { Trophy, Code2, Sparkles } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';
import TiltCard from '../TiltCard';
import { leadershipRoles, hackathons, workshopsAndSports } from '../../data/achievements';

export default function AchievementsSection() {
  return (
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
                  {leadershipRoles.map((role) => (
                    <div key={role.title}>
                      <h4 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                        {role.title}
                      </h4>
                      <p className="font-mono" style={{ fontSize: '0.8rem', color: '#f4d38c', marginTop: '0.15rem' }}>
                        {role.subtitle}
                      </p>
                    </div>
                  ))}
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
                  {hackathons.map((h) => (
                    <div key={h.name}>
                      <h4 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                        {h.name}
                      </h4>
                      <p className="font-mono" style={{ fontSize: '0.8rem', color: h.org.includes('Guwahati') ? '#f4d38c' : 'rgba(255, 255, 255, 0.7)', marginTop: '0.15rem' }}>
                        {h.org}
                      </p>
                    </div>
                  ))}
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
                  {workshopsAndSports.map((item) => (
                    <div key={item.title}>
                      <span 
                        className="font-mono" 
                        style={{ 
                          fontSize: '0.72rem', 
                          color: item.type === 'SPORTS CHAMPIONSHIP' ? '#10b981' : '#f4d38c', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.1em' 
                        }}
                      >
                        {item.type}
                      </span>
                      <h4 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginTop: '0.2rem' }}>
                        {item.title}
                      </h4>
                      <p className="font-mono" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.15rem' }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
