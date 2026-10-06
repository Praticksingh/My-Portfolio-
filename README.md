# Pratik Singh - Cinematic Developer Portfolio

> **B.Tech ECE (3rd Year) • Full-Stack & AI/ML Developer**  
> Live Interactive Portfolio featuring 96-frame WebP canvas gaze tracking, Lenis liquid smooth scrolling, 3D tilt cards, and motion performance optimizations.

---

## 🌟 Highlights & Features

- **Character Hero with Gaze Tracking:** 96-frame WebP canvas rendering responding to the user's real browser cursor using critically damped angular interpolation and direct eye-contact deadzone physics.
- **Pure Native Cursor:** 100% real browser cursor with zero fake cursor overlays, zero lag, and full accessibility.
- **Cinematic Entrance Sequence:** Choreographed, staggered reveal of navigation, character, typography, professional title, metrics, and magnetic CTA buttons.
- **Liquid Smooth Scrolling:** Powered by [Lenis](https://github.com/darkroomengineering/lenis) with custom exponential easing, auto-disabled on touch devices to preserve native 120Hz ProMotion touch inertia.
- **Hardware-Accelerated Micro-Interactions:**
  - `TiltCard`: Clamped 1.2° 3D tilt with dynamic radial spotlight illumination, zero React re-renders on mousemove.
  - `MagneticButton`: Restrained spring pull (clamped to max 5px) for primary action and social links.
  - `ScrollReveal`: Performant `IntersectionObserver` wrapper that unobserves on reveal to keep the main thread light.
- **Interactive Experience & Skills:**
  - Experience timeline with glowing milestone nodes and animated track.
  - 6 grouped technical skill categories with hover illumination pills.
- **Official Profiles:**
  - **GitHub:** [https://github.com/Praticksingh](https://github.com/Praticksingh)
  - **LinkedIn:** [https://www.linkedin.com/in/pratik-singh-0474382a0/](https://www.linkedin.com/in/pratik-singh-0474382a0/)
  - **Instagram:** [https://instagram.com/pratikclicks/](https://instagram.com/pratikclicks/) (Pratik Clicks)

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Vanilla CSS
- **Motion & Physics:** Lenis, Canvas 2D Context, RequestAnimationFrame, IntersectionObserver
- **Design Tokens:** Haute Vermilion (`#eb1008`), Obsidian (`#0c0b0b`), Titanium, Gold (`#f4d38c`)
- **Typography:** Cinzel, Syne, Plus Jakarta Sans, Space Mono
- **Icons:** Lucide React

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Praticksingh/My-Portfolio-.git

# Navigate to the project directory
cd My-Portfolio-

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
