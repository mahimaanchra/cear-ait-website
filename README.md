# CEAR AIT — Centre of Excellence for AI & Robotics

Official website and web portal for the **Centre of Excellence for AI & Robotics (CEAR)** at **Army Institute of Technology (AIT), Pune**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Ready-3ECF8E?style=flat&logo=supabase)

---

## ⚡ Overview

CEAR is an interdisciplinary research and engineering initiative at AIT Pune, focusing on defense mechatronics, autonomous robotics, embedded intelligence, and aerial/aquatic systems.

This modern web application showcases CEAR's:
* **Robotics Platforms & Fleets**: Cerberus UGV, Autonomous Quadrotor, Robotic Arm Manipulators, AUV Aquatics.
* **Wartech Arena**: Inter-college robotics tournament, combat tracks, and rules.
* **Cadre Directory**: Faculty In-Charge, Secretaries, Joint Secretaries, and Core Contributors.
* **Timeline & Events**: Upcoming workshops, hackathons, and induction drives.
* **Workshop & Lab 104 Archive**: Interactive high-resolution photography showcase and lightbox.
* **Built-in Admin Panel (`/admin`)**: Interactive CMS for adding/editing members, events, and projects with drag-and-drop image uploads.

---

## 🛠 Tech Stack

* **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
* **Library**: [React 19](https://react.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Cloud Storage & Database**: [Supabase](https://supabase.com/) (with offline local fallback)

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/mahimaanchra/cear-ait-website.git
cd cear-ait-website
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

### 3. Production Build & Validation
```bash
npm run build
npm run start
```

---

## 🛡 Built-in Admin Panel (`/admin`)

The website comes with an embedded content management system at `/admin`:
* **URL**: `http://localhost:3000/admin`
* **Default Passcode**: `cear@2026`
* **Features**:
  * Upload member photos, event posters, and platform pictures via drag & drop.
  * Add, edit, and reorder cadre profiles, workshops, and robotics platforms.
  * Instant offline persistence (`public/uploads/` & `customContent.json`) + 1-click cloud sync.

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import `cear-ait-website`.
4. (Optional) In **Environment Variables**, add:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
5. Click **Deploy**. Vercel will automatically build and publish your site with global edge caching.

---

## 📁 Project Structure

```
├── public/                 # Static assets, logos, and uploaded media
├── src/
│   ├── app/
│   │   ├── page.tsx        # Main CEAR landing page
│   │   ├── admin/          # Admin Control Panel & CMS
│   │   ├── api/            # Serverless endpoints (/api/content, /api/upload)
│   │   ├── projects/       # Complete projects gallery
│   │   ├── team/           # Full cadre directory
│   │   └── wartech/        # Wartech tournament page
│   ├── components/         # Modular UI & section components
│   ├── context/            # SiteContentContext provider & state
│   ├── data/               # Default static data archives
│   └── lib/                # Supabase client & utilities
└── tailwind.config.ts      # Custom theme tokens & typography
```

---

## 📜 License & Credits

Maintained by **Centre of Excellence for AI & Robotics (CEAR)**, Army Institute of Technology, Pune.
