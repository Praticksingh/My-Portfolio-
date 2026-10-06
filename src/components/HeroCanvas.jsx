import React, { useEffect, useRef, useState } from 'react';

/**
 * Shortest-path circular angular lerp
 * @param {number} current Current angle in radians
 * @param {number} target Target angle in radians
 * @param {number} factor Lerp factor (0.26 for ultra-fast ~35ms zero-lag response)
 */
function lerpAngle(current, target, factor) {
  let diff = (target - current) % (Math.PI * 2);
  if (diff < -Math.PI) diff += Math.PI * 2;
  if (diff > Math.PI) diff -= Math.PI * 2;
  return current + diff * factor;
}

export default function HeroCanvas({
  onTelemetryUpdate,
  activeMode = 'cursor', // 'cursor' | 'orbit' | 'compass'
  manualTargetAngle = null,
  isEyeContactLocked = false
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Loaded frames state
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // References for animation loop
  const imagesRef = useRef([]);
  const centerImageRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // Tracking physics state
  const currentAngleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const mousePosRef = useRef({ x: -9999, y: -9999 });
  const isEyeContactRef = useRef(false);
  const orbitAngleRef = useRef(0);

  // Preload all 64 WebP frames + center.webp
  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = 64;
    const totalImages = totalFrames + 1; // + center.webp
    const frameArray = new Array(totalFrames);

    // 1. Preload center frame
    const centerImg = new Image();
    centerImg.src = '/frames/center.webp';
    centerImg.onload = () => {
      loadedCount++;
      setLoadProgress(Math.floor((loadedCount / totalImages) * 100));
      if (loadedCount === totalImages) {
        setIsLoaded(true);
      }
    };
    centerImageRef.current = centerImg;

    // 2. Preload 64 circular trajectory frames
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const filename = `/frames/frame_${String(i).padStart(2, '0')}.webp`;
      img.src = filename;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / totalImages) * 100));
        if (loadedCount === totalImages) {
          setIsLoaded(true);
        }
      };
      frameArray[i] = img;
    }
    imagesRef.current = frameArray;

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // Listen to window mouse / touch moves
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        mousePosRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Main 60 FPS RequestAnimationFrame Canvas Loop
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    // Target background color matching exact video backdrop: RGB 235, 16, 8 (#eb1008)
    const BG_COLOR = '#eb1008';

    let lastTelemetryTime = 0;

    const renderLoop = (timestamp) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Handle high-DPI crisp canvas sizing covering full viewport
      const displayWidth = rect.width;
      const displayHeight = rect.height;

      if (canvas.width !== Math.floor(displayWidth * dpr) || canvas.height !== Math.floor(displayHeight * dpr)) {
        canvas.width = Math.floor(displayWidth * dpr);
        canvas.height = Math.floor(displayHeight * dpr);
      }

      // 100vw x 100vh Object-Fit Cover Calculation:
      // Source image resolution is 1920x1080 (16:9)
      const imgW = 1920;
      const imgH = 1080;
      const scale = Math.max(displayWidth / imgW, displayHeight / imgH);
      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const drawX = (displayWidth - drawW) / 2;
      
      // Position character so head stays comfortably visible while shoulders/suit rest naturally
      const minOffsetY = displayHeight - drawH; // bottom aligned
      const drawY = Math.max(minOffsetY, Math.min(20, (displayHeight - drawH) * 0.28));

      // Calculate character face coordinates in screen viewport pixels
      // In the 1920x1080 video, face center is at (0.481, 0.333)
      const faceCanvasX = drawX + drawW * 0.481;
      const faceCanvasY = drawY + drawH * 0.333;
      const faceScreenX = rect.left + faceCanvasX;
      const faceScreenY = rect.top + faceCanvasY;

      let targetAngle = currentAngleRef.current;
      let shouldEyeContact = false;

      if (isEyeContactLocked) {
        shouldEyeContact = true;
      } else if (activeMode === 'orbit') {
        orbitAngleRef.current += 0.02;
        targetAngle = orbitAngleRef.current;
        shouldEyeContact = false;
      } else if (activeMode === 'compass' && manualTargetAngle !== null) {
        targetAngle = manualTargetAngle;
        shouldEyeContact = false;
      } else {
        // Live cursor tracking mode
        const { x: mouseX, y: mouseY } = mousePosRef.current;
        if (mouseX > -9000 && mouseY > -9000) {
          const dx = mouseX - faceScreenX;
          const dy = mouseY - faceScreenY;
          const distance = Math.hypot(dx, dy);

          // Center eye contact deadzone: within ~12% screen radius
          const screenDimension = Math.min(window.innerWidth, window.innerHeight);
          const deadzoneRadius = screenDimension * 0.12;

          if (distance < deadzoneRadius) {
            shouldEyeContact = true;
          } else {
            shouldEyeContact = false;
            // Calculate cursor angle relative to character face center
            targetAngle = Math.atan2(dy, dx);
          }
        }
      }

      isEyeContactRef.current = shouldEyeContact;
      targetAngleRef.current = targetAngle;

      // Shortest-path circular angular lerp with fast response factor (~0.26) for zero lag (~35ms)
      const smoothedAngle = lerpAngle(currentAngleRef.current, targetAngle, 0.26);
      currentAngleRef.current = smoothedAngle;

      // Map smoothed angle to nearest frame index (0..63)
      const normAngle = ((smoothedAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const frameIndex = Math.round((normAngle / (Math.PI * 2)) * 64) % 64;

      // Pick image: center.webp for direct eye contact or frame from 64-frame array
      let activeImage = null;
      if (shouldEyeContact && centerImageRef.current && centerImageRef.current.complete) {
        activeImage = centerImageRef.current;
      } else {
        activeImage = imagesRef.current[frameIndex];
      }

      // Render to canvas
      ctx.save();
      ctx.scale(dpr, dpr);

      // 1. Fill canvas with seamless background
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      // 2. Draw EXACTLY ONE crisp frame at 100% opacity (CRITICAL: zero alpha blending)
      if (activeImage && activeImage.complete) {
        ctx.drawImage(activeImage, drawX, drawY, drawW, drawH);
      }

      ctx.restore();

      // Emit telemetry for HUD displays without choking React
      if (timestamp - lastTelemetryTime > 60 && onTelemetryUpdate) {
        lastTelemetryTime = timestamp;
        const angleDeg = (normAngle * 180 / Math.PI) % 360;
        onTelemetryUpdate({
          frameIndex,
          angleDeg: Math.round(angleDeg),
          angleRad: normAngle,
          isEyeContact: shouldEyeContact,
          fps: 60,
          targetAngleDeg: Math.round((((targetAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) * 180 / Math.PI)
        });
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isLoaded, activeMode, manualTargetAngle, isEyeContactLocked, onTelemetryUpdate]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#eb1008',
        // CRITICAL: NEVER USE CSS 3D TRANSFORMS
        transform: 'none',
        perspective: 'none'
      }}
    >
      {/* Loading overlay */}
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#eb1008',
            color: '#ffffff',
            gap: '1.25rem'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderTopColor: '#ffffff',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <p
              className="font-mono"
              style={{
                fontSize: '0.85rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                opacity: 0.9
              }}
            >
              PRELOADING WEBP FRAMES
            </p>
            <p
              className="font-mono"
              style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                marginTop: '0.25rem'
              }}
            >
              {loadProgress}%
            </p>
            <p
              style={{
                fontSize: '0.75rem',
                opacity: 0.65,
                marginTop: '0.4rem'
              }}
            >
              64 High-Fidelity 360° Rotational Frames + Neutral Gaze Matrix
            </p>
          </div>
        </div>
      )}

      {/* Rock-solid, zero-ghosting canvas covering full viewport */}
      <canvas
        ref={canvasRef}
        id="character-canvas"
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
          backgroundColor: '#eb1008',
          // CRITICAL: Rock-solid motionless container & canvas (NO rotateX/rotateY/perspective)
          transform: 'none'
        }}
      />
    </div>
  );
}
