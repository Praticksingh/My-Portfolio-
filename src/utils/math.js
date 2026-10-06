/**
 * Precision Math Utilities for 60/120/144 FPS Animation
 */

/**
 * Critically damped / delta-time exponential smoothing
 * Consistent behavior across 60 FPS, 90 FPS, 120 FPS, 144 FPS
 * @param {number} current Current value
 * @param {number} target Target value
 * @param {number} speed Responsiveness coefficient (higher = faster)
 * @param {number} dt Delta time in seconds
 */
export function expSmooth(current, target, speed, dt) {
  // Clamped dt to prevent instability during tab switching or frame drops
  const clampedDt = Math.min(Math.max(dt, 0.001), 0.1);
  const alpha = 1 - Math.exp(-speed * clampedDt);
  return current + (target - current) * alpha;
}

/**
 * Shortest-path circular angular lerp
 * Correctly wraps across the -PI / +PI boundary without rotational flips
 * @param {number} current Current angle in radians
 * @param {number} target Target angle in radians
 * @param {number} alpha Lerp factor [0..1]
 */
export function lerpAngle(current, target, alpha) {
  const delta = ((target - current + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
  return current + delta * alpha;
}

/**
 * Maps an angle in radians to nearest frame index [0..totalFrames-1]
 * @param {number} angleRad Angle in radians
 * @param {number} totalFrames Total frames (e.g. 96)
 */
export function angleToFrameIndex(angleRad, totalFrames = 96) {
  const normalized = ((angleRad % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const step = (Math.PI * 2) / totalFrames;
  const index = Math.round(normalized / step) % totalFrames;
  return index;
}
