import React, { useRef, useEffect } from 'react';

/**
 * MagneticButton Component
 * Subtle, restrained magnetic pull on hover (clamped to max 5px).
 * Zero React state updates on mousemove for butter-smooth 60-120fps performance.
 * Restores smoothly to center on mouse leave.
 * Native browser cursor remains 100% visible and untouched.
 * Automatically disabled on touch screens and prefers-reduced-motion.
 */
export default function MagneticButton({
  children,
  strength = 0.2,
  maxOffset = 5,
  className = '',
  style = {},
  as = 'div',
  ...props
}) {
  const containerRef = useRef(null);
  const isTouchRef = useRef(false);
  const isReducedMotionRef = useRef(false);

  useEffect(() => {
    isTouchRef.current = window.matchMedia('(pointer: coarse)').matches;
    isReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchRef.current || isReducedMotionRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
    const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY));

    containerRef.current.style.transform = `translate3d(${clampedX.toFixed(1)}px, ${clampedY.toFixed(1)}px, 0)`;
    containerRef.current.style.transition = 'transform 0.1s cubic-bezier(0.22, 1, 0.36, 1)';
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.transform = 'translate3d(0px, 0px, 0)';
    containerRef.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  const Component = as;

  return (
    <Component
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        display: style.display || 'inline-block',
        transform: 'translate3d(0px, 0px, 0)',
        willChange: 'transform'
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
