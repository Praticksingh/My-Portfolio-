import React from 'react';
import { 
  Code2, 
  Cpu, 
  Database, 
  Sparkles, 
  Server, 
  Layers, 
  Terminal 
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal';
import TiltCard from '../TiltCard';
import { skillCategories } from '../../data/skills';

const ICON_MAP = {
  Code2: <Code2 size={24} color="#f4d38c" />,
  Cpu: <Cpu size={24} color="#ffffff" />,
  Database: <Database size={24} color="#f4d38c" />,
  Terminal: <Terminal size={24} color="#ffffff" />,
  Layers: <Layers size={24} color="#f4d38c" />,
  Sparkles: <Sparkles size={24} color="#ffffff" />,
  Server: <Server size={24} color="#f4d38c" />
};

export default function SkillsSection() {
  return (
    <section
      id="skills"
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
              // TECHNICAL ARSENAL // SKILLS
            </span>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                fontWeight: 700,
                marginTop: '0.5rem'
              }}
            >
              Technical Skills
            </h2>
            <p style={{ maxWidth: '540px', color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
              Rigorous toolkit spanning programming languages, modern web frameworks, databases, agentic AI, DevOps pipelines, and digital strategy.
            </p>
          </div>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem'
          }}
        >
          {skillCategories.map((cat, idx) => (
            <ScrollReveal key={cat.category} delay={idx * 60} distance={20}>
              <TiltCard maxRotation={1.2} maxTranslate={4} scaleOnHover={1.015} style={{ borderRadius: '24px' }}>
                <div
                  className="interactive-hover"
                  style={{
                    padding: '2.5rem 2rem',
                    borderRadius: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.035)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    transition: 'all 0.3s ease',
                    height: '100%'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                    {ICON_MAP[cat.iconName] || <Code2 size={24} color="#f4d38c" />}
                    <h3
                      className="font-mono"
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#ffffff'
                      }}
                    >
                      {cat.category}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="skill-pill font-mono"
                        style={{
                          padding: '0.45rem 0.95rem',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(255, 255, 255, 0.07)',
                          border: '1px solid rgba(255, 255, 255, 0.14)',
                          fontSize: '0.82rem',
                          fontWeight: 500,
                          color: 'rgba(255, 255, 255, 0.92)'
                        }}
                      >
                        {skill}
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
