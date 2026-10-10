# CEAR Engineering Cadre — Contribution & Development Guidelines

Welcome to the **Centre of Excellence for AI & Robotics (CEAR)** development portal at the **Army Institute of Technology (AIT), Pune**. 

This document defines the engineering standards, hardware-software integration protocols, design tokens, and contribution workflows for all cadets, researchers, and engineers working on the official CEAR portal, autonomous robotics fleet, and Wartech systems.

---

## 1. Laboratory & Engineering Cadres

Our work spans four primary disciplines operated out of **Lab 104 (CEAR Research Facility)**:
1. **Autonomous Flight & UAV Systems**: Quadcopters, long-range reconnaissance drones, and racing quads with 3D LED air gate navigation.
2. **Ground Autonomous Vehicles & Combat Robotics**: RoboSoccer omni-drive units, 15kg combat robots, line followers, all-terrain rovers, and heavy-payload chassis.
3. **Marine Robotics & Undersea Vehicles**: Autonomous underwater vehicles (Jalpari AUV) and sub-surface telemetry modules.
4. **Mission Control & Cloud Software**: Web telemetry portals, dynamic content administration, and real-time fleet visualization.

---

## 2. Development Setup

### Prerequisites
- **Node.js**: v18.17+ or v20+ recommended
- **Package Manager**: `npm`
- **Git**: Configured with your official name and student/cadre email

### Installation & Local Run
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

## 3. Design System & Aesthetics Tokens

All components must adhere strictly to the CEAR Sandstone & Terracotta glassmorphism palette:

| Token | Value | Role |
|---|---|---|
| **Canvas Background** | `#f6f3ee` | Sandstone neutral light canvas base |
| **Primary Structure** | `#240d2b` | Deep Tactical Aubergine for headings, text, and command elements |
| **Brand Accent** | `#ff6b35` | Signal Terracotta / International Orange for CTAs, active highlights, and indicators |
| **Frosted Glass Panels** | `bg-white/80` | High-blur glass surfaces (`backdrop-blur-2xl` with `border-white/80`) |
| **Inner Bevel Highlights**| `inset-x-0 top-0 h-px` | Specular inner top highlight (`bg-gradient-to-r from-transparent via-white to-transparent`) |
| **Shadow Tokens** | `shadow-[0_20px_50px_-15px_rgba(36,13,43,0.1)]` | Deep ambient aubergine contact elevation |

### Typography & Fonts
- **Display Headings**: `font-display` (Syne)
- **Body Text**: `font-body` (Outfit)
- **Telemetry & Directives**: `font-mono` (Space Mono / JetBrains Mono)
- **Tactical UI (Admin)**: `font-tech` (Chakra Petch)

---

## 4. Architectural Rules & Component Conventions

1. **Next.js App Router**:
   - Keep page components lightweight and semantic (`src/app/`).
   - Separate server data flows from dynamic client components using `'use client'`.
2. **Interactive UI Components (`src/components/ui/`)**:
   - `GlassCard.tsx`: Reusable 3D cursor spotlight glare card with spring physics.
   - `EventSpotlightCard.tsx`: Featured event card with live T-minus countdown ticker and track pre-selection.
   - `RulebookModal.tsx`: Comprehensive multi-track rulebook viewer with directive search, citation copy, and text export.
   - `RegistrationModal.tsx`: Dual-track registration modal (Wartech & Inductions) with auto-generated receipt passes and confetti feedback.
   - `AutonomousStatusWidget.tsx`: Persistent diagnostics dock monitoring ROS2 nodes, FPS, and telemetry status.
   - `NeuralCanvas.tsx`: Multi-agent neural simulation matrix with interactive telemetry tuning dock.
3. **API Endpoints & Cloud Synchronization (`src/app/api/`)**:
   - `POST /api/register`: Submits Wartech or Induction candidate profiles with Supabase cloud storage and local JSON fallback (`src/data/registrations.json`).
   - `GET /api/register`: Authenticated endpoint (requires `x-admin-passcode`) used by the Admin Panel for candidate roster review and CSV exports.
   - `POST /api/contact`: Handles campus inquiries and collaboration proposals.
   - `GET /api/content` & `POST /api/content`: Dynamic content synchronization with cloud Supabase and local JSON fallback.
4. **Admin Panel (`/admin`)**:
   - Passcode-secured portal with tabs for Cadre Cadets, Events & Timeline, Robotics Fleet, Lab 104 Media, Track Record Accolades, Registrations Roster (with CSV download), and System Backups.

---

## 5. Branching & Git Conventions

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
git commit -m "feat(events): add interactive spotlight countdown card and arena filter"
```

---

## 6. Pre-Submission Checklist

Before committing or pushing to `main`:
- [ ] Code compiles with **zero errors and warnings**:
  ```bash
  npm run build
  ```
- [ ] No unescaped characters in JSX (use `&ldquo;`, `&rdquo;`, and `&apos;`).
- [ ] Responsive design verified on mobile (375px), tablet (768px), and desktop (1280px+).
- [ ] Accessibility: All interactive buttons and inputs have discernible labels, title tooltips, and hover feedback.
- [ ] All API endpoints have resilient fallbacks for offline or unconfigured environments.

---

**Army Institute of Technology, Pune**  
*Centre of Excellence for AI & Robotics (CEAR) &bull; Lab 104*
