# CEAR Engineering Cadre — Contribution & Development Guidelines

Welcome to the **Centre of Excellence for AI & Robotics (CEAR)** development portal at the **Army Institute of Technology (AIT), Pune**. 

This document defines the engineering standards, hardware-software integration protocols, and contribution workflows for all cadets, researchers, and engineers working on the official CEAR portal, autonomous robotics fleet, and Wartech systems.

---

## 1. Laboratory & Engineering Cadres

Our work spans four primary disciplines operated out of **Lab 104 (CEAR Research Facility)**:
1. **Autonomous Flight & UAV Systems**: Quadcopters, long-range reconnaissance drones, and racing quads.
2. **Ground Autonomous Vehicles & Combat Robotics**: RoboSoccer omni-drive units, line followers, all-terrain rovers, and heavy-payload chassis.
3. **Marine Robotics & Undersea Vehicles**: Autonomous underwater vehicles (Jalpari) and acoustic telemetry modules.
4. **Mission Control & Cloud Software**: Web telemetry portals, dynamic content administration, and real-time fleet visualization.

---

## 2. Development Setup

### Prerequisites
- **Node.js**: v18.17+ or v20+ recommended
- **Package Manager**: `npm`
- **Git**: Configured with your official name and student/cadre email

### Installation
```bash
# Clone the repository
git clone https://github.com/mahimaanchra/cear-ait-website.git
cd cear-ait-website

# Install dependencies
npm install

# Start development server
npm run dev
```
Visit `http://localhost:3000` to preview the site locally.

---

## 3. Branching & Git Conventions

### Branch Naming
- `feature/<short-desc>`: New features, pages, or components
- `fix/<short-desc>`: Bug fixes and visual rectifications
- `hardware/<project-name>`: Hardware telemetry or project documentation updates
- `docs/<short-desc>`: Documentation, guides, or rulebook adjustments

### Commit Message Standards
Follow standard conventional commits:
- `feat(...)`: New user-facing feature or API endpoint
- `fix(...)`: Bug fix or styling correction
- `docs(...)`: Documentation updates
- `perf(...)`: Performance optimization
- `refactor(...)`: Code refactoring without behavioral alterations
- `chore(...)`: Routine dependency updates or tooling configurations

**Example**:
```bash
git commit -m "feat(fleet): add autonomous underwater vehicle Jalpari specifications"
```

---

## 4. Architectural Rules & Code Quality

1. **Next.js App Router**:
   - Keep page components lightweight and semantic.
   - Separate server data flows from dynamic client components using `'use client'`.
2. **Styling & Design System**:
   - Follow the Dark Tactical & Sandstone palette:
     - `#070b12` (Command Obsidian Background)
     - `#0d1321` (Tactical Deep Navy)
     - `#dcf836` (CEAR Signal Volt Accent)
     - `#131b2e` (Sub-panel Slate)
   - Do not hardcode arbitrary external fonts; rely on predefined font variables (`font-heading`, `font-body`, `font-mono`).
3. **Content Persistence**:
   - Dynamic fleet items, events, and cadre updates are managed through `SiteContentContext` with cloud database synchronization and resilient local fallback.
4. **Zero-Error Build Standard**:
   - Before opening a PR or pushing to `main`, verify:
     ```bash
     npm run build
     ```
   - All TypeScript types, ESLint rules, and image optimizations must pass with 0 errors.

---

## 5. Lab 104 Media & Asset Standards

- When uploading project blueprints or CAD renders, use modern compressed formats (`.webp`, `.png`, or `.svg`).
- High-resolution banners should maintain a 16:9 or 4:3 aspect ratio.
- Do not commit oversized raw assets (>2MB) directly to git; use the Admin Panel media uploader or external CDN storage.

---

## 6. Pre-Submission Checklist

- [ ] Code compiles without warnings (`npm run build`).
- [ ] No unescaped characters in JSX (use `&ldquo;` and `&rdquo;` for double quotes).
- [ ] Responsive design verified on mobile (375px), tablet (768px), and desktop (1280px+).
- [ ] Accessibility: All interactive buttons and inputs have discernible labels and hover feedback.
- [ ] Commit history is clean and clearly describes all functional changes.

---

**Army Institute of Technology, Pune**  
*Centre of Excellence for AI & Robotics (CEAR)*
