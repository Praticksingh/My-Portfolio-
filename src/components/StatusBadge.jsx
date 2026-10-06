import React, { useState, useEffect } from 'react';

export default function StatusBadge() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const istTime = new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        setTime(istTime);
      } catch {
        setTime('IST');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.45rem 1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '9999px',
        fontSize: '0.78rem',
        color: '#ffffff',
        fontFamily: 'var(--font-mono)'
      }}
    >
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
        <span className="ping-dot" style={{ backgroundColor: '#10b981', width: '7px', height: '7px' }} />
        <span style={{ fontWeight: 600, color: 'rgba(255, 255, 255, 0.95)' }}>
          Available for Internships &amp; Roles
        </span>
      </div>

      <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>•</span>

      <span style={{ color: '#f4d38c', fontWeight: 600 }}>
        Varanasi {time ? `• ${time}` : ''}
      </span>
    </div>
  );
}
