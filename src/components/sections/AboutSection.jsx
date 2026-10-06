import React from 'react';
import { Code2, Sparkles, Cpu, Layers, Terminal } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';
import TiltCard from '../TiltCard';
import StatusBadge from '../StatusBadge';

export default function AboutSection() {
  const highlightPillars = [
    {
      icon: <Cpu size={32} />,
      color: '#ffffff',
      title: 'Full-Stack Architecture',
      desc: 'Building end-to-end applications with React, TypeScript, Vite, Next.js, Node.js, Express, FastAPI, PostgreSQL, MongoDB, and Supabase with type-safe APIs.'
    },
    {
      icon: <Layers size={32} />,
      color: '#f4d38c',
      title: 'AI/ML & Multi-Agent Systems',
      desc: 'Designing multi-agent applications using LangGraph, orchestrator-domain-critic agent loops, and retrieval-grounded intelligence for predictive decision modeling.'
    },
    {
      icon: <Terminal size={32} />,
      color: '#ffffff',
      title: 'Production-Oriented Delivery',
      desc: 'From autonomous CI/CD failure diagnostics to emergency hospital queue routing, engineering robust solutions tested in hackathons and production environments.'
    }
  ];

  return (
    <>
      <section
        id="about"
        style={{
          padding: '7rem 2rem 5rem 2rem',
          backgroundColor: '#eb1008',
          color: '#ffffff',
          position: 'relative',
          zIndex: 30
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Real-time Status Badge */}
          <div style={{ marginBottom: '2.5rem' }}>
            <StatusBadge />
          </div>

          <ScrollReveal direction="up" distance={20}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <Code2 size={20} color="#ffffff" />
              <span
                className="font-mono"
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 700
                }}
              >
                // ABOUT // PERSONAL PROFILE
              </span>
            </div>

            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
                fontWeight: 700,
                maxWidth: '980px',
                lineHeight: 1.2,
                marginBottom: '2rem'
              }}
            >
              Third-Year B.Tech ECE Student Engineering Full-Stack &amp; AI/ML Systems.
            </h2>

            <p
              style={{
                maxWidth: '880px',
                fontSize: 'clamp(1rem, 1.35vw, 1.2rem)',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '3rem',
                fontWeight: 400
              }}
            >
              Third-year B.Tech ECE student building full-stack and AI/ML applications with React, TypeScript, Node.js, FastAPI and Python, from real-time CI/CD diagnostics to multi-agent LLM systems. Hackathon participant focused on problem solving and production-oriented software.
            </p>
          </ScrollReveal>

          {/* Compact Visual Summary Badges */}
          <ScrollReveal delay={60} direction="up" distance={18}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginBottom: '4rem'
              }}
            >
              {[
                'B.Tech ECE (3rd Year)',
                'Full-Stack Development',
                'AI/ML',
                'Agentic AI',
                'Production-Oriented Software',
                'Hackathons'
              ].map((badge) => (
                <span
                  key={badge}
                  className="interactive-hover font-mono skill-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 1.25rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.28)',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#ffffff'
                  }}
                >
                  <Sparkles size={14} color="#f4d38c" />
                  {badge}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* 3 Core Highlight Pillars */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}
          >
            {highlightPillars.map((pillar, idx) => (
              <ScrollReveal key={pillar.title} delay={Math.min(idx * 60, 120)} distance={20}>
                <TiltCard maxRotation={1.2} maxTranslate={4} scaleOnHover={1.015} style={{ borderRadius: '24px' }}>
                  <div
                    className="glass-panel"
                    style={{
                      padding: '2.5rem',
                      borderRadius: '24px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.22)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ color: pillar.color, marginBottom: '1.25rem' }}>
                      {pillar.icon}
                    </div>
                    <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                      {pillar.title}
                    </h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                      {pillar.desc}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Liquid Organic Section Divider: Vermilion to Obsidian */}
      <div className="liquid-divider" style={{ backgroundColor: '#eb1008', marginBottom: '-1px' }}>
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" style={{ fill: '#0c0b0b', width: '100%', height: '52px', display: 'block' }}>
          <path d="M0,0 C250,70 450,15 700,65 C950,115 1100,20 1200,50 L1200,80 L0,80 Z" />
        </svg>
      </div>
    </>
  );
}
