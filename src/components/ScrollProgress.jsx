import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (barRef.current) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / totalHeight)) : 0;
            barRef.current.style.transform = `scaleX(${progress})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '2.5px',
        zIndex: 9999,
        pointerEvents: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.05)'
      }}
    >
      <div
        ref={barRef}
        style={{
          height: '100%',
          width: '100%',
          transformOrigin: '0 50%',
          transform: 'scaleX(0)',
          background: 'linear-gradient(90deg, #f4d38c 0%, #eb1008 100%)',
          boxShadow: '0 0 8px rgba(235, 16, 8, 0.7), 0 0 3px rgba(244, 211, 140, 0.5)',
          willChange: 'transform'
        }}
      />
    </div>
  );
}
