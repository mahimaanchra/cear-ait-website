"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  pulseSpeed: number;
  alpha: number;
  highlighted: boolean;
}

export function CyberMatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouseX = -1000;
    let mouseY = -1000;

    const setupResolution = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupResolution();

    const handleResize = () => {
      setupResolution();
      initNodes();
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };
    window.addEventListener("mouseleave", handleMouseLeave);

    // Grid nodes configuration
    const nodes: Node[] = [];
    const GRID_SPACING = 64; // Distance between cyber grid lines

    const initNodes = () => {
      nodes.length = 0;
      const cols = Math.ceil(width / GRID_SPACING) + 2;
      const rows = Math.ceil(height / GRID_SPACING) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Select subset of intersections to have illuminated telemetry nodes
          if ((i + j) % 2 === 0 && Math.random() < 0.6) {
            const x = (i - 1) * GRID_SPACING;
            const y = (j - 1) * GRID_SPACING;
            nodes.push({
              x,
              y,
              baseX: x,
              baseY: y,
              vx: 0,
              vy: 0,
              radius: Math.random() < 0.25 ? 2.5 : 1.6,
              pulsePhase: Math.random() * Math.PI * 2,
              pulseSpeed: 0.02 + Math.random() * 0.03,
              alpha: 0.25 + Math.random() * 0.35,
              highlighted: false,
            });
          }
        }
      }
    };

    initNodes();

    // Laser scanline sweeping across the matrix
    let scanlineY = 0;
    const scanlineSpeed = 1.2;

    // Ambient floating cyber particles (fine dust telemetry)
    interface TelemetryParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      maxAlpha: number;
    }

    const particles: TelemetryParticle[] = [];
    const particleCount = Math.min(30, Math.floor(width / 50));
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.15 - Math.random() * 0.25,
        size: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.4 + 0.1,
        maxAlpha: Math.random() * 0.4 + 0.2,
      });
    }

    // Animation Loop
    const render = () => {
      // 1. Deep Obsidian Base
      ctx.fillStyle = "#060911";
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle Radial Vignette Gradient (Centered High-Tech Illumination)
      const grad = ctx.createRadialGradient(
        width / 2,
        height * 0.35,
        50,
        width / 2,
        height * 0.45,
        Math.max(width, height) * 0.85
      );
      grad.addColorStop(0, "rgba(10, 24, 46, 0.45)");
      grad.addColorStop(0.5, "rgba(8, 14, 26, 0.25)");
      grad.addColorStop(1, "rgba(5, 7, 12, 0.95)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 3. Cyber Matrix Grid Lines (Sleek, low-contrast blueprint grid)
      ctx.strokeStyle = "rgba(56, 189, 248, 0.055)"; // Subtle cyan-tinted wireframe
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x <= width + GRID_SPACING; x += GRID_SPACING) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= height + GRID_SPACING; y += GRID_SPACING) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 4. Sweeping Laser Scanline
      scanlineY += scanlineSpeed;
      if (scanlineY > height + 100) {
        scanlineY = -60;
      }

      const scanGrad = ctx.createLinearGradient(0, scanlineY - 40, 0, scanlineY + 40);
      scanGrad.addColorStop(0, "rgba(0, 240, 255, 0)");
      scanGrad.addColorStop(0.5, "rgba(0, 240, 255, 0.065)");
      scanGrad.addColorStop(1, "rgba(0, 240, 255, 0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanlineY - 40, width, 80);

      // Laser thin bright center pulse
      ctx.strokeStyle = "rgba(0, 240, 255, 0.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, scanlineY);
      ctx.lineTo(width, scanlineY);
      ctx.stroke();

      // 5. Ambient Telemetry Dust Particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 6. Interactive Telemetry Nodes at Grid Intersections
      for (const node of nodes) {
        node.pulsePhase += node.pulseSpeed;
        const pulse = 1 + Math.sin(node.pulsePhase) * 0.35;

        // Mouse Proximity Interaction
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const mouseDist = Math.hypot(dx, dy);
        const mouseRange = 160;

        if (mouseDist < mouseRange) {
          node.highlighted = true;
          const force = (1 - mouseDist / mouseRange) * 12;
          const angle = Math.atan2(dy, dx);
          // Gentle deflection
          node.x = node.baseX - Math.cos(angle) * force;
          node.y = node.baseY - Math.sin(angle) * force;

          // Tracer laser line connecting mouse to node
          const lineAlpha = (1 - mouseDist / mouseRange) * 0.28;
          ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        } else {
          node.highlighted = false;
          node.x += (node.baseX - node.x) * 0.08;
          node.y += (node.baseY - node.y) * 0.08;
        }

        // Check if scanline passed over this node
        const scanDist = Math.abs(node.y - scanlineY);
        let scanBoost = 0;
        if (scanDist < 50) {
          scanBoost = (1 - scanDist / 50) * 0.4;
        }

        const currentAlpha = Math.min(1, (node.alpha + scanBoost) * (node.highlighted ? 1.6 : 1));

        // Outer soft glow for larger nodes
        if (node.radius > 2 || node.highlighted) {
          const glowGrad = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            node.radius * 4.5 * pulse
          );
          glowGrad.addColorStop(0, `rgba(0, 240, 255, ${currentAlpha * 0.35})`);
          glowGrad.addColorStop(1, "rgba(0, 240, 255, 0)");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 4.5 * pulse, 0, Math.PI * 2);
          ctx.fill();
        }

        // Inner glowing core
        ctx.fillStyle = node.highlighted
          ? "#00f0ff"
          : `rgba(0, 240, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * (node.highlighted ? 1.4 : 1), 0, Math.PI * 2);
        ctx.fill();
      }

      // 7. Corner HUD Telemetry Coordinates (Subtle Futuristic Framing)
      ctx.fillStyle = "rgba(56, 189, 248, 0.25)";
      ctx.font = "10px 'Space Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText("GRID_SYS // 0x4A17_NODE", 24, 24);
      ctx.textAlign = "right";
      ctx.fillText("LIDAR_SCAN: NOMINAL", width - 24, 24);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

export default CyberMatrixBackground;
