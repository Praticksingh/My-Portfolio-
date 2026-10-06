import React, { useRef, useEffect } from 'react';

/**
 * TiltCard Component
 * Ultra-performant, 60-120fps hardware-accelerated subtle 3D card tilt & spotlight.
 * Zero React state updates on mousemove to completely eliminate reconciliation overhead.
 * - Clamped subtle rotation: max 1.2 degrees
 * - Subtle lift: max 4px
 * - Dynamic spotlight illumination via direct GPU styling
 * - Automatically disabled on touch screens and prefers-reduced-motion
 */
export default function TiltCard({
  children,
  className = '',
  style = {},
  maxRotation = 1.2,
  maxTranslate = 4,
  scaleOnHover = 1.015,
  glowColor = 'rgba(235, 16, 8, 0.22)',
  ...props
}) {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const isTouchRef = useRef(false);
  const isReducedMotionRef = useRef(false);

  useEffect(() => {
    isTouchRef.current = window.matchMedia('(pointer: coarse)').matches;
    isReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchRef.current || isReducedMotionRef.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2; // -1 to 1
    const normY = (y / rect.height - 0.5) * 2; // -1 to 1

    const rotX = -normY * maxRotation;
    const rotY = normX * maxRotation;
    const transX = normX * (maxTranslate * 0.5);
    const transY = -4 + normY * (maxTranslate * 0.3);

    cardRef.current.style.transform = `perspective(1000px) translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 0) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(${scaleOnHover}, ${scaleOnHover}, 1)`;
    cardRef.current.style.transition = 'transform 0.08s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s ease, border-color 0.25s ease';

    if (spotlightRef.current) {
      const posX = ((x / rect.width) * 100).toFixed(1);
      const posY = ((y / rect.height) * 100).toFixed(1);
      spotlightRef.current.style.background = `radial-gradient(350px circle at ${posX}% ${posY}%, ${glowColor}, transparent 70%)`;
      spotlightRef.current.style.opacity = '0.75';
    }
  };

  const handleMouseEnter = () => {
    if (isTouchRef.current || isReducedMotionRef.current) return;
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0.75';
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    cardRef.current.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease';

    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        position: 'relative',
        transform: 'perspective(1000px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
      {...props}
    >
      {/* Subtle radial illumination overlay on hover */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: style.borderRadius || '24px',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0,
          transition: 'opacity 0.25s ease'
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
