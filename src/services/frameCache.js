/**
 * Staged Frame Preloader & In-Memory Decode Cache
 * Total frames: 96 directional frames (3.75° spacing) + center.webp
 */

const TOTAL_FRAMES = 96;
const CARDINAL_INDICES = [0, 12, 24, 36, 48, 60, 72, 84];

class FrameCacheManager {
  constructor() {
    this.frames = new Array(TOTAL_FRAMES).fill(null);
    this.centerFrame = null;
    this.loadedCount = 0;
    this.totalAssets = TOTAL_FRAMES + 1;
    this.isCenterReady = false;
    this.isFullyLoaded = false;
    this.listeners = new Set();
    this.loadingStarted = false;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener({
      loadedCount: this.loadedCount,
      totalAssets: this.totalAssets,
      isCenterReady: this.isCenterReady,
      isFullyLoaded: this.isFullyLoaded
    });
    return () => this.listeners.delete(listener);
  }

  notify() {
    const state = {
      loadedCount: this.loadedCount,
      totalAssets: this.totalAssets,
      isCenterReady: this.isCenterReady,
      isFullyLoaded: this.isFullyLoaded
    };
    for (const listener of this.listeners) {
      listener(state);
    }
  }

  async loadSingleImage(src) {
    const img = new Image();
    img.src = src;
    if ('decode' in img) {
      try {
        await img.decode();
        return img;
      } catch (e) {
        // Fallback for decode failure
      }
    }
    return new Promise((resolve) => {
      if (img.complete) {
        resolve(img);
      } else {
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
      }
    });
  }

  startPreload() {
    if (this.loadingStarted) return;
    this.loadingStarted = true;

    // Priority 1: Center frame (Immediate display)
    this.loadSingleImage('/frames/center.webp').then((img) => {
      if (img) {
        this.centerFrame = img;
        this.isCenterReady = true;
        this.loadedCount++;
        this.notify();
      }

      // Priority 2: 8 Cardinal compass frames for immediate rough tracking
      const cardinalPromises = CARDINAL_INDICES.map(async (idx) => {
        const padded = String(idx).padStart(3, '0');
        const imgCard = await this.loadSingleImage(`/frames/frame-${padded}.webp`);
        if (imgCard) {
          this.frames[idx] = imgCard;
          this.loadedCount++;
          this.notify();
        }
      });

      Promise.all(cardinalPromises).then(() => {
        // Priority 3: Remaining frames loaded in non-blocking batches
        this.loadRemainingFrames();
      });
    });
  }

  async loadRemainingFrames() {
    const remainingIndices = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (!CARDINAL_INDICES.includes(i)) {
        remainingIndices.push(i);
      }
    }

    // Load in chunks of 8 to avoid saturating network and CPU decoders
    const CHUNK_SIZE = 8;
    for (let i = 0; i < remainingIndices.length; i += CHUNK_SIZE) {
      const chunk = remainingIndices.slice(i, i + CHUNK_SIZE);
      await Promise.all(
        chunk.map(async (idx) => {
          const padded = String(idx).padStart(3, '0');
          const img = await this.loadSingleImage(`/frames/frame-${padded}.webp`);
          if (img) {
            this.frames[idx] = img;
            this.loadedCount++;
          }
        })
      );
      this.notify();
    }

    this.isFullyLoaded = true;
    this.notify();
  }

  /**
   * Fast retrieval of frame at index.
   * If exact frame is still loading, falls back to nearest loaded frame or center.
   */
  getFrame(index) {
    const exact = this.frames[index];
    if (exact && exact.complete) return exact;

    // Fallback: search nearest loaded frame
    for (let offset = 1; offset < TOTAL_FRAMES / 2; offset++) {
      const prev = (index - offset + TOTAL_FRAMES) % TOTAL_FRAMES;
      if (this.frames[prev] && this.frames[prev].complete) return this.frames[prev];

      const next = (index + offset) % TOTAL_FRAMES;
      if (this.frames[next] && this.frames[next].complete) return this.frames[next];
    }

    return this.centerFrame;
  }

  getCenterFrame() {
    return this.centerFrame;
  }
}

export const frameCache = new FrameCacheManager();
