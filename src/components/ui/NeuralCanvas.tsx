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
}

export function NeuralCanvas({
  className = "",
  nodeCount = 38,
  interactive = true,
}: NeuralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null,
    y: null,
    radius: 140,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initialize nodes
    const nodes: Node[] = [];
    const types: ("sensor" | "relay" | "core")[] = ["sensor", "sensor", "relay", "core"];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() < 0.2 ? 3 : Math.random() < 0.6 ? 2 : 1.5,
        baseAlpha: Math.random() * 0.4 + 0.2,
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

    if (interactive && canvas.parentElement) {
      canvas.parentElement.addEventListener("mousemove", handleMouseMove);
      canvas.parentElement.addEventListener("mouseleave", handleMouseLeave);
    }

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Connect nearby nodes with delicate lines (Neural network / Swarm mesh)
      const maxDistance = 110;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.16;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Connect to mouse cursor if within range
      const mouse = mouseRef.current;
      if (mouse.x !== null && mouse.y !== null) {
        // Draw delicate cursor target reticle
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 22, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(37, 99, 235, 0.25)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(37, 99, 235, 0.6)";
        ctx.fill();
        ctx.restore();

        for (let i = 0; i < nodes.length; i++) {
          const dx = mouse.x - nodes[i].x;
          const dy = mouse.y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Very subtle gravitational attraction toward sensor probe
            nodes[i].x += dx * 0.003;
            nodes[i].y += dy * 0.003;
          }
        }
      }

      // Update and draw each node
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce gently off boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Subtle pulsing
        const pulse = Math.sin(time + node.pulseOffset);
        const radius = node.radius + (pulse > 0 ? pulse * 0.5 : 0);

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);

        if (node.type === "core") {
          // Blue core node with faint aura
          ctx.fillStyle = "rgba(37, 99, 235, 0.75)";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(37, 99, 235, 0.12)";
          ctx.fill();
        } else if (node.type === "relay") {
          // Cyan relay node
          ctx.fillStyle = "rgba(14, 165, 233, 0.7)";
          ctx.fill();
        } else {
          // Neutral slate sensor node
          ctx.fillStyle = "rgba(100, 116, 139, 0.55)";
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (interactive && canvas.parentElement) {
        canvas.parentElement.removeEventListener("mousemove", handleMouseMove);
        canvas.parentElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [nodeCount, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{ opacity: 0.85 }}
    />
  );
}

export default NeuralCanvas;
