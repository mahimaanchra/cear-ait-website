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
   - `CircuitDivider.tsx`: Architectural vector datum divider with animated laser pulses, dynamic scanning beacons, and frosted glass node stamps (`NODE // ROS2`, `BUS // 915MHz`, `SYS // PWR`).
   - `AutonomousStatusWidget.tsx`: Persistent diagnostics dock with dynamic `requestAnimationFrame` FPS counter, link latency jitter simulation (`18ms–24ms`), 4 subsystem diagnostic views (`Overview`, `ROS2 Nodes`, `RF Link`, `Power BMS`), and 1-click clipboard telemetry stream export.
   - `GlassCard.tsx`: Reusable 3D cursor spotlight glare card with spring physics.
   - `EventSpotlightCard.tsx`: Featured event card with live T-minus countdown ticker and track pre-selection.
   - `RulebookModal.tsx`: Comprehensive multi-track rulebook viewer with directive search, citation copy, and text export.
   - `RegistrationModal.tsx`: Dual-track registration modal (Wartech & Inductions) with auto-generated receipt passes and confetti feedback.
   - `NeuralCanvas.tsx`: Multi-agent neural simulation matrix with interactive telemetry tuning dock.

3. **API Endpoints & Cloud Architecture (`src/app/api/`)**:
   - `GET /api/health`: Telemetry diagnostic endpoint reporting runtime stats, platform architecture, Node.js version, memory heap allocations, and live Supabase cloud ping latency.
   - `POST /api/register`: Submits Wartech or Induction candidate profiles with Supabase cloud storage and local JSON fallback (`src/data/registrations.json`).
   - `GET /api/register`: Authenticated endpoint (requires `x-admin-passcode`) used by the Admin Panel for candidate roster review and CSV exports.
   - `PATCH /api/register`: Authenticated endpoint for updating application status (`approved`, `shortlisted`, `rejected`) in Supabase or local storage.
   - `POST /api/contact`: Handles campus inquiries and collaboration proposals with automatic input validation and persistence.
   - `GET /api/contact`: Authenticated endpoint (requires `x-admin-passcode`) for retrieving inquiry transmissions history.
   - `PATCH /api/contact`: Authenticated endpoint for updating inquiry status (`unread`, `responded`, `archived`) with Supabase cloud sync and local JSON fallback.
   - `DELETE /api/contact`: Authenticated endpoint for permanently purging resolved inquiries.
   - `GET /api/content` & `POST /api/content`: Dynamic content synchronization with cloud Supabase and local JSON fallback for live site updates.
   - `POST /api/upload`: Multipart image upload gateway targeting Supabase Storage bucket (`cear-media`) with resilient base64 fallback.

4. **Environment Variables Configuration**:
   ```bash
   # Supabase Cloud Database & Storage (Optional for local dev, fallback to JSON)
   NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."
   SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..."

   # Admin Passcode (Defaults to 'cear-admin-2026' if unspecified)
   ADMIN_PASSCODE="your-secure-admin-passcode"
   ```

5. **Admin Panel (`/admin`)**:
   - Passcode-secured portal with tabs for Cadre Cadets, Events & Timeline, Robotics Fleet, Lab 104 Media, Track Record Accolades, Registrations Roster (with status management and CSV download), Inquiries Inbox (live unread counter, status toggles, mailto reply generator, and CSV audit export), and System Backups.

---

## 5. UI Architecture & Interactive Component Protocols

The CEAR front-end adheres to a glassmorphic, high-contrast tactical aesthetic designed for high information density and responsive accessibility:

1. **Wartech Rulebook Engine (`RulebookModal.tsx`)**:
   - **Multi-Tab Live Search**: Real-time keyword filtering across all 4 rulebook domains: 8 Track Arenas, General Directives, Safety & Kill-Switch, and Protests & Scoring FAQ.
   - **Match Counter Badges**: Dynamic chip counts on each tab strip to immediately indicate matching regulation counts.
   - **Keyboard Navigability**: Accessible `Escape` shortcut to dismiss modal and `/` or `Ctrl/Cmd+K` keyboard shortcut to autofocus the directive search query.
   - **Citation & Rule Copy**: One-click clipboard citations and complete track arena regulation extraction for competitors.

2. **Interactive Strategic Timeline (`About.tsx`)**:
   - **Telemetry Dossiers**: Milestone inspection mode linking the 2020 (Genesis), 2022 (Expansion), 2024 (National Arena), and 2026 (Frontier) roadmap nodes to an interactive mission dossier.
   - **Verified Breakthroughs**: Displays deployment proving grounds, strategic mission targets, and quantitative telemetry benchmarks (e.g. `< 14ms` edge inference, `3m` hydrostatic seals).

3. **Platform Datasheet Exporter (`ProjectsShowcase.tsx`)**:
   - **Multi-Axis Filtering**: Dynamic categorization by robotics discipline (Autonomous, Manipulation, Aquatics, Robotics, Aerial) and operational status (`Active R&D`, `Operational`, `Podium Winner`, `Completed`).
   - **Datasheet Generator**: Client-side generation of standardized engineering specification briefs (`.TXT`) containing complete kinematic envelopes, compute stacks, and hardware telemetry parameters.

4. **Vector Logo Resilience (`CearLogo.tsx`)**:
   - **Dynamic Asset Synchronization**: Reactive `src` synchronization supporting dynamic themes and custom emblems.
   - **High-Tech Geometric Fallback**: Self-contained SVG hex vector mark providing zero-layout-shift resilience even during network interruptions or missing raster assets.

---

## 6. Hardware-Software Telemetry Integration

For engineers working on robotic payloads in Lab 104:
- **ROS2 Distribution**: ROS2 Humble Hawksbill / Iron Irwini running on Jetson Orin Nano / Raspberry Pi 4.
- **Micro-XRCE-DDS**: Bridges STM32 / ESP32 flight and motor controllers with the onboard companion computer.
- **RF Telemetry**: 915 MHz SiK / LoRa radios mapped via UART baudrate 57600 for air-to-ground telemetry.
- **Power Architecture**: 4S LiPo (14.8V nominal, 16.8V peak) with INA219 / INA226 voltage and current telemetry sensors.

---

## 7. Branching & Git Conventions

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
git commit -m "feat(telemetry): add multi-tab telemetry HUD with real-time FPS and RF diagnostic stream"
```

---

## 8. Pre-Submission Checklist

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

