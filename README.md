# ✌️ Sign2Sub | Real-Time Sign Language Subtitles

> **Making conversations accessible for everyone.**  
> Sign2Sub translates continuous sign language gestures into real-time on-screen subtitles using computer vision — no special hardware required.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Page Sections](#page-sections)
- [JavaScript Modules](#javascript-modules)
- [Accessibility](#accessibility)
- [Awards & Recognition](#awards--recognition)
- [UN SDG Alignment](#un-sdg-alignment)
- [Team](#team)
- [Contact](#contact)

---

## Overview

Sign2Sub is an AI-powered web application that bridges the communication gap for the **430M+ people** worldwide who live with disabling hearing loss. By leveraging computer vision and a multi-head attention model, Sign2Sub translates continuous American Sign Language (ASL) gestures into real-time text subtitles — running entirely in the browser through a standard webcam.

**Key stats:**
| Metric | Value |
|---|---|
| Sign language users worldwide | 70M+ |
| Spatial landmarks tracked per frame | 147 |
| Extra hardware required | None |
| Peak recognition accuracy | 90% |
| ASL words recognized | 25 (initial model) |

---

## Features

- **One-Click Start** — Begin gesture detection instantly with a single click. No complex configuration.
- **Real-Time Subtitle Overlay** — Subtitles appear live on screen as gestures are detected, with low-latency AI inference.
- **Browser + Webcam Only** — No gloves, sensors, or proprietary devices. Works on any modern browser.
- **Continuous Signing Support** — Unlike isolated-word detectors, Sign2Sub is designed to handle continuous gesture sequences.
- **Privacy-Focused** — All processing happens client-side in the browser; no video is uploaded to external servers.
- **Responsive Design** — Fully optimized for desktop, tablet, and mobile viewports.
- **Demo Request Form** — Integrated Formspree-powered AJAX contact form with success state handling.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic elements) |
| Styling | Vanilla CSS (custom design system) |
| Scripting | Vanilla JavaScript (ES2020+) |
| Fonts | Google Fonts — Poppins (300–900) |
| Form Handling | [Formspree](https://formspree.io/) (AJAX, no backend required) |
| AI / ML Backend | Computer vision model with multi-head attention (separate inference service) |
| Animations | CSS transitions + IntersectionObserver scroll reveal |

> **No build tools, no bundlers, no frameworks.** The entire landing page is pure HTML/CSS/JS and opens directly in any browser.

---

## Project Structure

```
sign2sub/
├── index.html          # Main landing page (single-page, scroll-based)
├── css/
│   └── style.css       # Complete design system & all component styles (~33KB)
├── js/
│   └── main.js         # All interactive behaviour (navbar, modal, form, animations)
├── images/
│   ├── logo.png                # Brand logo (nav)
│   ├── favicon-v5.png          # Active favicon
│   ├── favicon.svg             # SVG favicon source
│   ├── hero.jpg                # Hero section background image
│   ├── problem.jpg             # Problem section illustration
│   ├── award-sealion.jpg       # SEA-LION / AISG award image
│   ├── award-youthfesta.jpg    # AI Youth Festa 2026 image
│   ├── team-ritheavatey.jpg    # Team member photo
│   ├── team-somanith.jpg       # Team member photo
│   ├── team-piseth.jpg         # Team member photo
│   └── team-sophea.jpg         # Team member photo
└── README.md           # This file
```

---

## Getting Started

Because Sign2Sub's landing page is a **plain static site**, there is no build step or package installation required.

### Option 1 — Open directly in the browser

```bash
open sign2sub/index.html
# or on Linux/Windows:
xdg-open sign2sub/index.html
start sign2sub/index.html
```

### Option 2 — Serve locally (recommended for full feature parity)

Using Python's built-in server:

```bash
cd sign2sub
python3 -m http.server 8080
# Then visit: http://localhost:8080
```

Using Node.js `serve`:

```bash
npx serve sign2sub
```

Using VS Code **Live Server** extension:
- Right-click `index.html` → **Open with Live Server**

> **Why a local server?** Some browsers block `file://` requests for assets like images from external URLs (SDG icons). A local server avoids this and better simulates production conditions.

---

## Page Sections

The landing page is a single scrollable document divided into seven anchor-linked sections:

| `#id` | Section | Description |
|---|---|---|
| `#home` | **Hero** | Headline, CTA buttons, key stats, hero image with floating AI chips |
| `#problem` | **The Problem** | Statistics on global hearing loss, cost of interpretation, AI audio bias |
| `#solution` | **Our Solution** | Three feature cards: instant activation, real-time subtitles, browser-only |
| `#sdg` | **SDG Alignment** | UN SDG 4 (Quality Education) and SDG 10 (Reduced Inequalities) panels |
| `#award` | **Awards** | SEA-LION / AISG Regional Innovation Award + AI Youth Festa 2026 finalist |
| `#team` | **Team** | Four founder cards with photos, roles, GitHub and LinkedIn links |
| `#contact` | **Footer / Contact** | Brand, quick links, key features list, email, and location |

---

## JavaScript Modules

All interactive logic lives in [`js/main.js`](js/main.js). It is loaded with `defer` and contains the following self-contained behaviours:

### Navbar Scroll Effect
```js
// Adds `.scrolled` class to #navbar when page is scrolled more than 40px
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });
```

### Mobile Navigation Toggle
Toggles the `.open` class on `#mobile-nav` and `#nav-toggle`, and updates `aria-expanded` / `aria-hidden` attributes for accessibility. Closes automatically when any mobile menu link is clicked.

### Demo Request Modal
- Opens on click of `#open-demo` (Hero CTA) or `#open-demo-cta` (bottom CTA banner)
- Closes on: close button click, backdrop click, or `Escape` key
- Locks `document.body` scroll while modal is open
- Resets form state 300ms after close (matches CSS transition duration)

### Formspree AJAX Submission
Intercepts the form's native `POST` submit, sends data via `fetch()` to Formspree, and:
- Shows a success confirmation state (hiding the form, showing `#form-success`)
- Displays an alert on network or server errors
- Restores the submit button state in the `finally` block

### Scroll Reveal (IntersectionObserver)
```js
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });
```
Observes all elements with classes `.reveal`, `.reveal-left`, `.reveal-right`. Once an element enters the viewport, `visible` is added (triggering a CSS animation) and it is unobserved — animations play exactly once.

### Smooth Anchor Scrolling
Overrides native `<a href="#...">` behaviour. Scrolls to the target element with a **72px offset** to account for the fixed navbar height.

### Hero Parallax
Applies a subtle vertical `translateY` to `.hero-content` as the user scrolls, capped to viewport height. Uses `{ passive: true }` for optimal scroll performance.

---

## Accessibility

Sign2Sub is built with accessibility as a first-class concern:

- **Semantic HTML** — Proper use of `<nav>`, `<section>`, `<footer>`, heading hierarchy (`h1` → `h2` → `h3`), and `<button>` vs `<a>` distinction.
- **ARIA attributes** — `role="navigation"`, `aria-label`, `aria-expanded`, `aria-hidden`, `role="dialog"`, `aria-modal`, `aria-labelledby` on the demo modal.
- **Keyboard navigation** — Modal closes on `Escape`; all interactive elements are natively focusable.
- **Alt text** — Every `<img>` has a descriptive `alt` attribute.
- **Lazy loading** — Below-the-fold images use `loading="lazy"`.
- **Passive event listeners** — All scroll handlers use `{ passive: true }` to avoid blocking the main thread.
- **Reduced motion** — Parallax and scroll animations respect system preferences via CSS `prefers-reduced-motion` (in `style.css`).

---

## Awards & Recognition

| Award | Details |
|---|---|
| 🏆 **Regional Innovation Award** | Winner — AI & Innovation Award for breakthrough computer vision accessibility tech (40–90% accuracy on 25 ASL words). Featured in the [official AISG / SEA-LION Case Study](https://sea-lion.ai/case-study/sign2sub/). |
| 🌏 **AI Youth Festa 2026** | Global Innovation Finalist — Competing at an international youth AI innovation showcase in the Philippines, November 2026. |

---

## UN SDG Alignment

Sign2Sub directly addresses two UN Sustainable Development Goals:

### SDG 4 — Quality Education
Sign2Sub removes communication barriers in educational settings across Southeast Asia, providing real-time subtitles in classrooms and reducing dependence on scarce human interpreters.

### SDG 10 — Reduced Inequalities
By delivering a free, browser-based tool that requires no specialized hardware, Sign2Sub ensures equal access to digital communication for people with hearing loss — particularly in underserved communities where 80% of those affected live.

---

## Team

| Name | Role | GitHub | LinkedIn |
|---|---|---|---|
| **Ritheavatey Chea** | Founder & CEO | [@CheaRitheavatey](https://github.com/CheaRitheavatey) | [LinkedIn](https://www.linkedin.com/in/ritheavatey-chea-74456a2b5/) |
| **Somanith Soun** | Co-founder & CTO | [@ManithSoun](https://github.com/ManithSoun) | [LinkedIn](https://www.linkedin.com/in/somanith-soun-1a8b7b296/) |
| **Piseth Dy** | Co-founder & COO | [@pisethdy](https://github.com/pisethdy) | [LinkedIn](https://www.linkedin.com/in/piseth-dy/) |
| **Sophea Vatey Heang** | Co-founder & CFO | [@sopheavatey](https://github.com/sopheavatey) | [LinkedIn](https://www.linkedin.com/in/sophea-vatey-heang/) |

A passionate team from **Phnom Penh, Cambodia**, building technology that bridges the communication gap for millions worldwide.

---

## Contact

- **Email:** [sign2sub@gmail.com](mailto:sign2sub@gmail.com)
- **Location:** Phnom Penh, Cambodia
- **Demo Request:** Use the **"Get a Quick Demo"** button on the landing page to submit a request directly to the team.

---

© 2026 Sign2Sub. All rights reserved.  
*Recognized by AISG · SEA-LION · AI Youth Festa 2026*
