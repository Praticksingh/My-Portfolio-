import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal';
import TiltCard from '../TiltCard';
import MagneticButton from '../MagneticButton';

function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      // Use Web3Forms endpoint or mailto fallback
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: 'e39a3f9e-64d1-4be0-8e1c-5d9c223a7bbd', // Public portfolio inbox access key
          name: formState.name,
          email: formState.email,
          message: formState.message,
          from_name: `${formState.name} via Pratik Singh Portfolio`,
          subject: `Portfolio Message from ${formState.name} (${formState.email})`
        })
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setFormSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        // Direct graceful mailto trigger fallback
        window.location.href = `mailto:pratiksingh111204@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message + '\n\nFrom: ' + formState.name + ' (' + formState.email + ')')}`;
        setFormSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      }
    } catch {
      // Offline / network fallback: open default mail client with prefilled fields
      window.location.href = `mailto:pratiksingh111204@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message + '\n\nFrom: ' + formState.name + ' (' + formState.email + ')')}`;
      setFormSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    } finally {
      setSubmitting(false);
      setTimeout(() => {
        setFormSubmitted(false);
      }, 6000);
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: '8rem 2rem',
        backgroundColor: '#0c0b0b',
        color: '#ffffff',
        position: 'relative',
        zIndex: 30
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <ScrollReveal direction="up" distance={28}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span
              className="font-mono"
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.3em',
                color: '#eb1008',
                textTransform: 'uppercase',
                fontWeight: 700
              }}
            >
              // INITIATE DIALOGUE // CONTACT
            </span>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                fontWeight: 700,
                marginTop: '0.75rem',
                marginBottom: '1rem'
              }}
            >
              Let's build something impactful.
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
              Interested in building full-stack, AI/ML and production-oriented software. Reach out for collaborations, engineering opportunities, or technical inquiries.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Details Grid */}
        <ScrollReveal delay={40} distance={18}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3.5rem'
            }}
          >
            <a
              href="mailto:pratiksingh111204@gmail.com"
              className="interactive-hover"
              style={{
                padding: '1.75rem 1.5rem',
                borderRadius: '18px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              }}
            >
              <div style={{ color: '#eb1008' }}>
                <Mail size={24} />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <span className="font-mono" style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '0.1em' }}>
                  EMAIL
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, wordBreak: 'break-all' }}>
                  pratiksingh111204@gmail.com
                </span>
              </div>
            </a>

            <a
              href="tel:+918127406133"
              className="interactive-hover"
              style={{
                padding: '1.75rem 1.5rem',
                borderRadius: '18px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              }}
            >
              <div style={{ color: '#eb1008' }}>
                <Phone size={24} />
              </div>
              <div>
                <span className="font-mono" style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '0.1em' }}>
                  PHONE
                </span>
                <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                  +91 81274 06133
                </span>
              </div>
            </a>

            <div
              className="interactive-hover"
              style={{
                padding: '1.75rem 1.5rem',
                borderRadius: '18px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{ color: '#eb1008' }}>
                <MapPin size={24} />
              </div>
              <div>
                <span className="font-mono" style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '0.1em' }}>
                  LOCATION
                </span>
                <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                  Varanasi, Uttar Pradesh
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Action Buttons: Let's Talk, View GitHub, LinkedIn, Pratik Clicks, Download Resume */}
        <ScrollReveal delay={80} distance={18}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '4rem'
            }}
          >
            <MagneticButton maxOffset={6}>
              <a
                href="mailto:pratiksingh111204@gmail.com"
                className="interactive-hover"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.9rem 2rem',
                  backgroundColor: '#ffffff',
                  color: '#0b0a0a',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f4d38c';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                }}
              >
                <Send size={16} />
                <span>Let's Talk</span>
              </a>
            </MagneticButton>

            <MagneticButton maxOffset={6}>
              <a
                href="https://github.com/Praticksingh"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-hover social-icon-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.9rem 2rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.28)',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
                  e.currentTarget.style.borderColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.28)';
                }}
              >
                <GithubIcon size={16} />
                <span>View GitHub</span>
              </a>
            </MagneticButton>

            <MagneticButton maxOffset={6}>
              <a
                href="https://www.linkedin.com/in/pratik-singh-0474382a0/"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-hover social-icon-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.9rem 2rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.28)',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
                  e.currentTarget.style.borderColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.28)';
                }}
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
              </a>
            </MagneticButton>

            <MagneticButton maxOffset={6}>
              <a
                href="https://instagram.com/pratikclicks/"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-hover social-icon-btn"
                title="Pratik Clicks"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.9rem 2rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.28)',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
                  e.currentTarget.style.borderColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.28)';
                }}
              >
                <InstagramIcon size={16} />
                <span>Pratik Clicks</span>
              </a>
            </MagneticButton>

            <MagneticButton maxOffset={6}>
              <a
                href="/Pratik-Singh-Resume.pdf"
                download="Pratik-Singh-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-hover"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.9rem 2rem',
                  backgroundColor: '#f4d38c',
                  color: '#0b0a0a',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 8px 25px rgba(244, 211, 140, 0.2)',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(244, 211, 140, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f4d38c';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(244, 211, 140, 0.2)';
                }}
              >
                <Download size={16} strokeWidth={2.5} />
                <span>Download Resume</span>
              </a>
            </MagneticButton>
          </div>
        </ScrollReveal>

        {/* Interactive Message Form */}
        <ScrollReveal delay={100} distance={18}>
          <form
            onSubmit={handleFormSubmit}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '24px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem'
            }}
          >
            <div>
              <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                YOUR NAME
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Recruiters, Engineering Leads, Collaborators"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                placeholder="your.email@organization.com"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                MESSAGE
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tell me about your project, engineering role, or collaboration idea..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            {errorMessage && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', fontSize: '0.85rem' }}>
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <MagneticButton maxOffset={5}>
              <button
                type="submit"
                disabled={submitting}
                className="interactive-hover"
                style={{
                  padding: '1rem 2.5rem',
                  backgroundColor: formSubmitted ? '#10b981' : '#ffffff',
                  color: '#0b0a0a',
                  border: 'none',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: submitting ? 'wait' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  transition: 'all 0.3s ease',
                  marginTop: '0.5rem',
                  alignSelf: 'flex-start'
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : formSubmitted ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Message Sent Successfully</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Direct Message</span>
                  </>
                )}
              </button>
            </MagneticButton>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
