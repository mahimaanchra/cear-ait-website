"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  type: "sensor" | "relay" | "core";
  pulseOffset: number;
}

interface NeuralCanvasProps {
  className?: string;
  nodeCount?: number;
  interactive?: boolean;
  speed?: number;
  opacity?: number;
}

export function NeuralCanvas({
  className = "",
  nodeCount = 42,
  interactive = true,
  speed = 1,
  opacity = 0.85,
}: NeuralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null,
    y: null,
    radius: 150,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize nodes
    const nodes: Node[] = [];
    const types: ("sensor" | "relay" | "core")[] = ["sensor", "sensor", "relay", "core"];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4 * speed,
        vy: (Math.random() - 0.5) * 0.4 * speed,
        radius: Math.random() < 0.2 ? 3.2 : Math.random() < 0.6 ? 2.2 : 1.6,
        baseAlpha: Math.random() * 0.4 + 0.3,
        type: types[Math.floor(Math.random() * types.length)],
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const parent = canvas.parentElement;
    if (interactive && parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    let time = 0;
    const render = () => {
      time += 0.02 * speed;
      ctx.clearRect(0, 0, width, height);

      // Connect nearby nodes with delicate plum ink drafting lines
      const maxDistance = 115;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.16;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(36, 13, 43, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Occasional micro-packet pulse along line
            if (i % 7 === 0 && Math.sin(time * 2 + i) > 0.8) {
              const t = (Math.sin(time * 3 + i) + 1) / 2;
              const px = nodes[i].x + (nodes[j].x - nodes[i].x) * t;
              const py = nodes[i].y + (nodes[j].y - nodes[i].y) * t;
              ctx.beginPath();
              ctx.arc(px, py, 1.2, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(255, 107, 53, 0.75)";
              ctx.fill();
            }
          }
        }
      }

      // Connect to mouse cursor if within range
      const mouse = mouseRef.current;
      if (mouse.x !== null && mouse.y !== null) {
        // Draw delicate cursor target reticle
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 24, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 107, 53, 0.4)";
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 4]);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#ff6b35";
        ctx.fill();
        ctx.restore();

        for (let i = 0; i < nodes.length; i++) {
          const dx = mouse.x - nodes[i].x;
          const dy = mouse.y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 107, 53, ${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Gravitational pull toward mouse sensor reticle
            nodes[i].x += dx * 0.003;
            nodes[i].y += dy * 0.003;
          }
        }
      }

      // Update and draw each node
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Motion
        node.x += node.vx;
        node.y += node.vy;

        // Bounce gently off boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Harmonic pulsing
        const pulse = Math.sin(time + node.pulseOffset);
        const radius = node.radius + (pulse > 0 ? pulse * 0.6 : 0);

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);

        if (node.type === "core") {
          // Plum core node with glowing Tangerine center
          ctx.fillStyle = "#240d2b";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, radius * 0.55, 0, Math.PI * 2);
          ctx.fillStyle = "#ff6b35";
          ctx.fill();
        } else if (node.type === "relay") {
          // Radiant Tangerine relay node
          ctx.fillStyle = "#ff6b35";
          ctx.fill();
        } else {
          // Subtle Plum sensor node
          ctx.fillStyle = `rgba(36, 13, 43, ${node.baseAlpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      if (interactive && parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [nodeCount, interactive, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{ opacity }}
    />
  );
}

export default NeuralCanvas;
