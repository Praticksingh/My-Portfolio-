import React, { useEffect, useRef, useState, memo } from 'react';
import { frameCache } from '../services/frameCache';
import { expSmooth, lerpAngle, angleToFrameIndex } from '../utils/math';
import { ArrowUpRight, Download, MessageSquare, Eye, ChevronDown } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { smoothScrollTo } from '../utils/smoothScroll';

const BG_COLOR = '#eb1008';
const DEBUG = false;

export default function UnifiedHero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // Direct DOM Telemetry refs (Only used when DEBUG === true)
  const telemetryAngleRef = useRef(null);
  const telemetryFrameRef = useRef(null);
  const telemetryFpsRef = useRef(null);

  // Mode and interactivity controls (infrequent React state)
  const [activeMode, setActiveMode] = useState('cursor'); // 'cursor' | 'orbit' | 'compass'
  const [isEyeContactLocked, setIsEyeContactLocked] = useState(false);
  const [compassTarget, setCompassTarget] = useState(null);

  // Loading state (only for initial center frame readiness)
  const [isCenterReady, setIsCenterReady] = useState(false);

  // Mutable Physics & Pointer State (Zero React overhead)
  const stateRef = useRef({
    // Window / Canvas dimensions & cached positions
    width: 0,
    height: 0,
    dpr: 1,
    drawX: 0,
    drawY: 0,
    drawW: 0,
    drawH: 0,
    faceScreenX: 0,
    faceScreenY: 0,
    heroRadius: 500,

    // Pointer coordinates
    targetX: -9999,
    targetY: -9999,
    hasPointer: false,
    
    // Gaze (Eye) interpolation - faster response
    gazeX: 0,
    gazeY: 0,
    
    // Head orientation interpolation - slightly damped natural follow
    headX: 0,
    headY: 0,
    headAngle: 0,
    targetAngle: 0,

    // Deadzone state with hysteresis
    isEyeContact: false,
    
    // Automated orbit
    orbitAngle: 0,

    // Performance & time tracking
    lastTime: 0,
    fpsHistory: [],
    lastTelemetryUpdate: 0,
    rafId: null,

    // Mode mirrors for RAF access
    activeMode: 'cursor',
    isEyeContactLocked: false,
    compassTarget: null,
    isReducedMotion: false,
    isTouchDevice: false
  });

  // Keep stateRef mirrors in sync with React controls
  useEffect(() => {
    stateRef.current.activeMode = activeMode;
    stateRef.current.isEyeContactLocked = isEyeContactLocked;
    stateRef.current.compassTarget = compassTarget;
  }, [activeMode, isEyeContactLocked, compassTarget]);

  // Preloader subscription
  useEffect(() => {
    frameCache.startPreload();
    const unsubscribe = frameCache.subscribe((status) => {
      if (status.isCenterReady && !isCenterReady) {
        setIsCenterReady(true);
      }
    });
    return unsubscribe;
  }, [isCenterReady]);

  // Main Lifecycle: Layout caching, pointer events, unified RAF loop
  useEffect(() => {
    const s = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    // Check accessibility & device capabilities
    s.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    s.isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

    // Cache layout & dimensions outside RAF (NO getBoundingClientRect inside RAF!)
    const updateDimensions = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Intelligent DPI clamp

      s.width = w;
      s.height = h;
      s.dpr = dpr;

      // Resize canvas buffer only when displayed size changes
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }

      // Compute 100vw x 100vh Object-Fit Cover parameters (1280x720 source)
      const imgW = 1280;
      const imgH = 720;
      const scale = Math.max(w / imgW, h / imgH);
      s.drawW = imgW * scale;
      s.drawH = imgH * scale;
      s.drawX = (w - s.drawW) / 2;

      // Position character comfortably with shoulders anchored naturally
      const minOffsetY = h - s.drawH;
      s.drawY = Math.max(minOffsetY, Math.min(20, (h - s.drawH) * 0.28));

      // Exact face center in viewport coordinates
      s.faceScreenX = s.drawX + s.drawW * 0.481;
      s.faceScreenY = s.drawY + s.drawH * 0.333;
      s.heroRadius = Math.min(w, h);

      // Initialize resting coordinates
      if (!s.hasPointer) {
        s.targetX = s.faceScreenX;
        s.targetY = s.faceScreenY;
        s.gazeX = s.faceScreenX;
        s.gazeY = s.faceScreenY;
        s.headX = s.faceScreenX;
        s.headY = s.faceScreenY;
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions, { passive: true });

    // Unified Pointer Tracking (Passive listeners, zero setState!)
    const handlePointerMove = (e) => {
      s.hasPointer = true;
      s.targetX = e.clientX;
      s.targetY = e.clientY;
    };

    const handlePointerLeave = () => {
      s.hasPointer = false;
      // Gently return gaze towards center
      s.targetX = s.faceScreenX;
      s.targetY = s.faceScreenY;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);

    // Touch support: smoothly follow touch and return to center on release
    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        s.hasPointer = true;
        s.targetX = e.touches[0].clientX;
        s.targetY = e.touches[0].clientY;
      }
    };
    const handleTouchEnd = () => {
      s.hasPointer = false;
      s.targetX = s.faceScreenX;
      s.targetY = s.faceScreenY;
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Hero visibility tracking: pause canvas RAF loop when offscreen
    let isHeroVisible = true;
    const heroObserver = new IntersectionObserver(([entry]) => {
      isHeroVisible = entry.isIntersecting;
      if (isHeroVisible && !s.rafId) {
        s.lastTime = 0;
        s.rafId = requestAnimationFrame(renderLoop);
      }
    }, { threshold: 0.01 });

    if (containerRef.current) {
      heroObserver.observe(containerRef.current);
    }

    // =========================================================================
    // THE SINGLE UNIFIED REQUESTANIMATIONFRAME LOOP
    // Manages: Gaze & Head interpolation, Frame Selection, Canvas Render
    // =========================================================================
    const renderLoop = (timestamp) => {
      if (!isHeroVisible) {
        s.rafId = null;
        return;
      }

      if (!s.lastTime) s.lastTime = timestamp;
      const dt = (timestamp - s.lastTime) / 1000;
      s.lastTime = timestamp;

      // Handle prefers-reduced-motion (render static center frame and halt expensive calculations)
      if (s.isReducedMotion) {
        const centerImg = frameCache.getCenterFrame();
        if (centerImg && centerImg.complete) {
          ctx.save();
          ctx.scale(s.dpr, s.dpr);
          ctx.fillStyle = BG_COLOR;
          ctx.fillRect(0, 0, s.width, s.height);
          ctx.drawImage(centerImg, s.drawX, s.drawY, s.drawW, s.drawH);
          ctx.restore();
        }
        s.rafId = requestAnimationFrame(renderLoop);
        return;
      }

      // 1. POINTER INTERPOLATION (Critically damped exponential smoothing)
      // Fast Eye Gaze (speed = 22.0) leads, followed naturally by Head (speed = 8.5)
      s.gazeX = expSmooth(s.gazeX, s.targetX, 22.0, dt);
      s.gazeY = expSmooth(s.gazeY, s.targetY, 22.0, dt);

      s.headX = expSmooth(s.headX, s.targetX, 8.5, dt);
      s.headY = expSmooth(s.headY, s.targetY, 8.5, dt);

      // 2. DIRECTION & DEADZONE CALCULATION
      let desiredAngle = s.headAngle;
      let isDeadzone = false;

      if (s.isEyeContactLocked) {
        isDeadzone = true;
      } else if (s.activeMode === 'orbit') {
        s.orbitAngle += 1.25 * dt; // Smooth continuous 360° orbit
        desiredAngle = s.orbitAngle;
        isDeadzone = false;
      } else if (s.activeMode === 'compass' && s.compassTarget !== null) {
        desiredAngle = s.compassTarget;
        isDeadzone = false;
      } else {
        // Cursor tracking
        const dx = s.headX - s.faceScreenX;
        const dy = s.headY - s.faceScreenY;
        const distance = Math.hypot(s.targetX - s.faceScreenX, s.targetY - s.faceScreenY);

        // Responsive Deadzone with Hysteresis (8.5% inner, 12.5% outer)
        const innerDeadzone = s.heroRadius * 0.085;
        const outerDeadzone = s.heroRadius * 0.125;

        if (s.isEyeContact) {
          // Inside deadzone: stay until cursor moves beyond outer threshold
          if (distance > outerDeadzone && s.hasPointer) {
            s.isEyeContact = false;
          }
        } else {
          // Outside deadzone: lock when cursor gets closer than inner threshold
          if (distance < innerDeadzone || !s.hasPointer) {
            s.isEyeContact = true;
          }
        }

        isDeadzone = s.isEyeContact;
        if (!isDeadzone) {
          // Target angle derived from lead gaze
          desiredAngle = Math.atan2(dy, dx);
        }
      }

      // 3. SHORTEST-PATH ANGULAR LERP (Fast, seamless boundary wrapping)
      const angularAlpha = 1 - Math.exp(-14.0 * Math.min(dt, 0.1));
      s.headAngle = lerpAngle(s.headAngle, desiredAngle, angularAlpha);

      // 4. FRAME SELECTION (Pick exactly 1 crisp frame from 96-frame array or center)
      const frameIndex = angleToFrameIndex(s.headAngle, 96);
      let activeImage = null;

      if (isDeadzone) {
        activeImage = frameCache.getCenterFrame();
      } else {
        activeImage = frameCache.getFrame(frameIndex);
      }

      // 5. CANVAS RENDER (Zero alpha blending, globalAlpha = 1, rock-solid motionless canvas)
      ctx.save();
      ctx.scale(s.dpr, s.dpr);
      ctx.imageSmoothingEnabled = true;

      // Fill seamless background
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, s.width, s.height);

      // Draw exactly one crisp frame with subtle micro-depth (clamped to max 2px, zero container rotation)
      if (activeImage && activeImage.complete) {
        ctx.globalAlpha = 1.0;
        const depthX = s.isReducedMotion ? 0 : Math.max(-2.5, Math.min(2.5, (s.headX - s.faceScreenX) * 0.0025));
        const depthY = s.isReducedMotion ? 0 : Math.max(-2.5, Math.min(2.5, (s.headY - s.faceScreenY) * 0.0025));
        ctx.drawImage(activeImage, s.drawX + depthX, s.drawY + depthY, s.drawW, s.drawH);
      }
      ctx.restore();

      // 6. DIRECT DOM TELEMETRY (Only in debug mode)
      if (DEBUG && timestamp - s.lastTelemetryUpdate > 120) {
        s.lastTelemetryUpdate = timestamp;
        const normAngle = ((s.headAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const deg = Math.round((normAngle * 180) / Math.PI);
        const fps = Math.round(1 / Math.max(dt, 0.001));

        if (telemetryAngleRef.current) {
          telemetryAngleRef.current.textContent = `${deg}°`;
        }
        if (telemetryFrameRef.current) {
          telemetryFrameRef.current.textContent = isDeadzone
            ? 'center.webp (Direct Eye Contact)'
            : `frame-${String(frameIndex).padStart(3, '0')}.webp`;
        }
        if (telemetryFpsRef.current) {
          telemetryFpsRef.current.textContent = `${Math.min(fps, 144)} FPS`;
        }
      }

      s.rafId = requestAnimationFrame(renderLoop);
    };

    s.rafId = requestAnimationFrame(renderLoop);

    return () => {
      heroObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (s.rafId) cancelAnimationFrame(s.rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: BG_COLOR,
        // CRITICAL: NEVER USE CSS 3D TRANSFORMS
        transform: 'none',
        perspective: 'none'
      }}
    >
      {/* Rock-solid, zero-ghosting canvas covering full viewport */}
      <canvas
        ref={canvasRef}
        id="character-canvas"
        className="anim-hero-canvas"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100vw',
          height: '100vh',
          display: 'block',
          backgroundColor: BG_COLOR,
          // CRITICAL: Rock-solid motionless container & canvas (NO rotateX/rotateY/perspective)
          transform: 'none'
        }}
      />

      {/* Floating Top-Right Engine Telemetry HUD (Only displayed when DEBUG === true) */}
      {DEBUG && (
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2.5rem',
            zIndex: 40,
            pointerEvents: 'auto'
          }}
        >
          <div
            className="interactive-hover font-mono"
            style={{
              padding: '0.75rem 1.15rem',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '16px',
              fontSize: '0.72rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
              minWidth: '220px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '0.12em' }}>ENGINE STATUS</span>
              <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700 }}>
                <span className="ping-dot" />
                <span ref={telemetryFpsRef}>60 FPS</span>
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Gaze Angle:</span>
              <span ref={telemetryAngleRef} style={{ fontWeight: 700 }}>0°</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Frame:</span>
              <span ref={telemetryFrameRef} style={{ fontWeight: 700, color: '#f4d38c' }}>
                center.webp (Direct Eye Contact)
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Ghosting:</span>
              <span style={{ fontWeight: 700, color: '#10b981' }}>0.00% (Crisp)</span>
            </div>
          </div>
        </div>
      )}

      {/* Hero Typography (Bottom-Left) */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(2.5rem, 6vh, 4.5rem)',
          left: 'clamp(2rem, 5vw, 4.5rem)',
          zIndex: 40,
          pointerEvents: 'auto',
          maxWidth: '460px'
        }}
      >
        {/* "Hi, I'm" in clean, spaced modern sans-serif */}
        <p
          className="anim-hero-hi font-display"
          style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.25rem)',
            fontWeight: 600,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '0.25rem'
          }}
        >
          Hi, I'm
        </p>

        {/* Name in large, elegant cursive script with soft drop shadow */}
        <h1
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(3.5rem, 7vw, 6.2rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            color: '#ffffff',
            textShadow: '0 6px 28px rgba(0, 0, 0, 0.35)',
            margin: '0 0 0.5rem 0',
            letterSpacing: '0.02em',
            userSelect: 'none'
          }}
        >
          <span className="anim-hero-name-first">Pratik</span>{' '}
          <span className="anim-hero-name-last">Singh</span>
        </h1>

        {/* Professional Title */}
        <div
          className="anim-hero-title font-mono"
          style={{
            fontSize: 'clamp(0.82rem, 1.1vw, 0.98rem)',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#f4d38c',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span>Full-Stack &amp; AI/ML Developer</span>
        </div>

        {/* Supporting copy */}
        <p
          className="anim-hero-desc"
          style={{
            maxWidth: '390px',
            fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.92)',
            marginBottom: '1.85rem',
            fontWeight: 400,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.25)'
          }}
        >
          Third-year B.Tech ECE student building full-stack and AI/ML applications with React, TypeScript, Node.js, FastAPI and Python — from real-time CI/CD diagnostics to multi-agent LLM systems and production-oriented software.
        </p>

        {/* Two stylish pill buttons wrapped with magnetic spring interactions */}
        <div className="anim-hero-buttons" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <MagneticButton maxOffset={7}>
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
                padding: '0.85rem 1.85rem',
                backgroundColor: '#ffffff',
                color: '#0b0a0a',
                borderRadius: '9999px',
                fontFamily: 'var(--font-display)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f4d38c';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.25)';
              }}
            >
              <span>Download Resume</span>
              <Download size={16} strokeWidth={2.5} />
            </a>
          </MagneticButton>

          <MagneticButton maxOffset={7}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('#contact');
              }}
              className="interactive-hover"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.85rem 1.85rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(255, 255, 255, 0.7)',
                color: '#ffffff',
                borderRadius: '9999px',
                fontFamily: 'var(--font-display)',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)';
                e.currentTarget.style.borderColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.7)';
              }}
            >
              <span>Let's Talk</span>
              <MessageSquare size={15} />
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Floating Bottom-Right Controls */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(2.5rem, 6vh, 4.5rem)',
          right: 'clamp(2rem, 5vw, 4.5rem)',
          zIndex: 40,
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.85rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '9999px',
            padding: '0.4rem 0.6rem'
          }}
        >
          <button
            onClick={() => {
              setActiveMode('cursor');
              setIsEyeContactLocked(false);
            }}
            className="interactive-hover"
            style={{
              border: 'none',
              backgroundColor: activeMode === 'cursor' && !isEyeContactLocked ? '#ffffff' : 'transparent',
              color: activeMode === 'cursor' && !isEyeContactLocked ? '#0b0a0a' : '#ffffff',
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Cursor
          </button>

          <button
            onClick={() => {
              setActiveMode('orbit');
              setIsEyeContactLocked(false);
            }}
            className="interactive-hover"
            style={{
              border: 'none',
              backgroundColor: activeMode === 'orbit' ? '#ffffff' : 'transparent',
              color: activeMode === 'orbit' ? '#0b0a0a' : '#ffffff',
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            360° Orbit
          </button>

          <button
            onClick={() => setIsEyeContactLocked(v => !v)}
            className="interactive-hover"
            style={{
              border: 'none',
              backgroundColor: isEyeContactLocked ? '#f4d38c' : 'transparent',
              color: isEyeContactLocked ? '#0b0a0a' : '#ffffff',
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Eye size={13} />
            <span>Eye Contact</span>
          </button>
        </div>

        {/* Quick Compass Snapping (Only displayed when DEBUG === true) */}
        {DEBUG && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '9999px',
              padding: '0.35rem 0.5rem'
            }}
          >
            <span className="font-mono" style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.6)', paddingLeft: '0.35rem' }}>
              SNAP:
            </span>
            {[
              { label: 'N', rad: (3 * Math.PI) / 2 },
              { label: 'E', rad: 0 },
              { label: 'S', rad: Math.PI / 2 },
              { label: 'W', rad: Math.PI }
            ].map(dir => (
              <button
                key={dir.label}
                onClick={() => {
                  setActiveMode('compass');
                  setIsEyeContactLocked(false);
                  setCompassTarget(dir.rad);
                }}
                className="interactive-hover"
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  backgroundColor: activeMode === 'compass' && compassTarget === dir.rad ? '#ffffff' : 'transparent',
                  color: activeMode === 'compass' && compassTarget === dir.rad ? '#0b0a0a' : '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {dir.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Subtle Scroll Indicator */}
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          smoothScrollTo('#about');
        }}
        className="anim-hero-controls interactive-hover"
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.25rem',
          color: 'rgba(255, 255, 255, 0.65)',
          textDecoration: 'none',
          fontSize: '0.68rem',
          letterSpacing: '0.15em',
          fontFamily: 'var(--font-mono)'
        }}
      >
        <span>EXPLORE</span>
        <ChevronDown size={14} className="animate-pulse-subtle" />
      </a>
    </div>
  );
}
