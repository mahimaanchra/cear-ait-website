"use client";

import React, { useEffect, useRef } from "react";

export type BotType =
  | "spiderbot"
  | "drone"
  | "linetracer"
  | "racer"
  | "sumobot"
  | "boxbot";

interface DoodleBot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: BotType;
  facing: 1 | -1;
  state: "moving" | "idle" | "inspecting";
  stateTimer: number;
  walkCycle: number;
  blinkTimer: number;
  isBlinking: boolean;
  targetX: number;
  targetY: number;
  scale: number;
  alpha: number;
  speed: number;
  antennaWobble: number;
}

interface FloatingDoodleItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  size: number;
  type: "gear" | "wrench" | "nut" | "gauge" | "spring" | "plug";
  alpha: number;
  floatPhase: number;
}

interface DroppedDoodleToken {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  radius: number;
  type: "nut" | "washer" | "gear" | "screw";
  bounces: number;
  settled: boolean;
  alpha: number;
  life: number;
}

export function CearRoboticsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasResolution = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    setupCanvasResolution();

    const handleResize = () => {
      setupCanvasResolution();
    };
    window.addEventListener("resize", handleResize);

    // Color Palette: Pure Dull Gray Sketchbook Ink (No bright colors)
    const INK_MAIN = "rgba(65, 70, 78, 0.72)";      // Muted charcoal-gray marker ink
    const INK_LIGHT = "rgba(100, 105, 115, 0.50)";   // Faint secondary sketch lines
    const FILL_PAPER = "rgba(255, 255, 255, 0.62)";  // Translucent paper body fill
    const FILL_SHADE = "rgba(220, 222, 226, 0.38)";  // Soft dull gray shading

    // Fleet of Prominent Hand-Drawn Doodle Robots Roaming across the screen
    const bots: DoodleBot[] = [];
    const botTypes: BotType[] = [
      "spiderbot",
      "drone",
      "linetracer",
      "racer",
      "sumobot",
      "boxbot",
    ];

    const botCount = 8;
    for (let i = 0; i < botCount; i++) {
      const type = botTypes[i % botTypes.length];
      const scale = 0.92 + (i % 3) * 0.14; // ~0.92, 1.06, 1.20
      const alpha = 0.75 + (i % 2) * 0.12;  // High visibility, crisp dull gray
      const speed = (0.55 + Math.random() * 0.35) * (type === "racer" ? 1.4 : 1);

      let botY: number;
      if (type === "drone") {
        botY = Math.random() * (height * 0.28) + 60;
      } else if (type === "spiderbot") {
        botY = height * 0.22 + (i % 2) * (height * 0.35) + 30;
      } else if (type === "linetracer") {
        botY = height * 0.38 + (i % 2) * (height * 0.32) + 20;
      } else if (type === "racer") {
        botY = height * 0.52 + (i % 2) * (height * 0.34) + 30;
      } else {
        botY = height * 0.60 + (i % 2) * (height * 0.28) + 20;
      }

      botY = Math.max(70, Math.min(height - 85, botY));
      const facing = Math.random() > 0.5 ? 1 : -1;

      bots.push({
        x: Math.random() * (width - 200) + 100,
        y: botY,
        vx: facing * speed,
        vy: type === "drone" ? (Math.random() - 0.5) * 0.3 : 0,
        type,
        facing,
        state: "moving",
        stateTimer: Math.random() * 240 + 160,
        walkCycle: Math.random() * 30,
        blinkTimer: Math.random() * 120 + 80,
        isBlinking: false,
        targetX: Math.random() * width,
        targetY: botY,
        scale,
        alpha,
        speed,
        antennaWobble: Math.random() * Math.PI,
      });
    }

    // Floating Doodle Mechanical Accents (from reference image)
    const floatingDoodles: FloatingDoodleItem[] = [];
    const doodleItemTypes: FloatingDoodleItem["type"][] = [
      "gear",
      "wrench",
      "nut",
      "gauge",
      "spring",
      "plug",
    ];

    const floatCount = Math.max(9, Math.min(16, Math.floor(width / 110)));
    for (let i = 0; i < floatCount; i++) {
      floatingDoodles.push({
        x: Math.random() * width,
        y: Math.random() * (height - 100) + 50,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.25,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.015,
        size: Math.random() * 10 + 26,
        type: doodleItemTypes[i % doodleItemTypes.length],
        alpha: 0.45 + Math.random() * 0.25,
        floatPhase: Math.random() * Math.PI * 2,
      });
    }

    // Interactive Dropped Doodle Items (on click/tap)
    const droppedTokens: DroppedDoodleToken[] = [];

    const spawnDoodleTokens = (x: number, y: number, count = 2) => {
      const types: DroppedDoodleToken["type"][] = ["nut", "gear", "washer", "screw"];
      for (let i = 0; i < count; i++) {
        droppedTokens.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 5,
          vy: -Math.random() * 4 - 2.5,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 3 + 11,
          type: types[i % types.length],
          bounces: 0,
          settled: false,
          alpha: 0.8,
          life: 340,
        });
      }
    };

    // User Click Interaction
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      spawnDoodleTokens(clientX, clientY, 2);

      // Nearest bot turns towards click
      let nearestBot: DoodleBot | null = null;
      let minDistance = 350;

      for (const bot of bots) {
        const dx = bot.x - clientX;
        const dy = bot.y - clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDistance) {
          minDistance = dist;
          nearestBot = bot;
        }
      }

      if (nearestBot) {
        nearestBot.targetX = clientX + (Math.random() - 0.5) * 40;
        nearestBot.state = "inspecting";
        nearestBot.stateTimer = 160;
        nearestBot.facing = clientX > nearestBot.x ? 1 : -1;
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);

    // =========================================================================
    // HAND-DRAWN DOODLE SHAPE PRIMITIVES (Organic, sketch line art)
    // =========================================================================

    const drawDoodleRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      r = 4,
      fill = FILL_PAPER,
      stroke = INK_MAIN,
      lineWidth = 2.4
    ) => {
      ctx.save();
      ctx.fillStyle = fill;
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();

      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };

    const drawDoodleCircle = (
      x: number,
      y: number,
      radius: number,
      fill = FILL_PAPER,
      stroke = INK_MAIN,
      lineWidth = 2.4
    ) => {
      ctx.save();
      ctx.fillStyle = fill;
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };

    // =========================================================================
    // DOODLE MECHANICAL ACCENTS (from Reference Image)
    // =========================================================================

    // 1. Doodle Gear
    const drawDoodleGear = (x: number, y: number, r: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = INK_MAIN;
      ctx.fillStyle = FILL_PAPER;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const teeth = 8;
      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const angle = (i * Math.PI * 2) / teeth;
        const nextAngle = ((i + 1) * Math.PI * 2) / teeth;
        const midAngle = (angle + nextAngle) / 2;

        const x1 = Math.cos(angle) * (r * 0.75);
        const y1 = Math.sin(angle) * (r * 0.75);
        const x2 = Math.cos(angle + 0.12) * r;
        const y2 = Math.sin(angle + 0.12) * r;
        const x3 = Math.cos(midAngle) * r;
        const y3 = Math.sin(midAngle) * r;
        const x4 = Math.cos(nextAngle - 0.12) * (r * 0.75);
        const y4 = Math.sin(nextAngle - 0.12) * (r * 0.75);

        if (i === 0) ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, r * 0.35, 0, Math.PI * 2);
      ctx.stroke();

      for (let s = 0; s < 4; s++) {
        ctx.rotate((Math.PI * 2) / 4);
        ctx.beginPath();
        ctx.moveTo(r * 0.35, 0);
        ctx.lineTo(r * 0.65, 0);
        ctx.stroke();
      }

      ctx.restore();
    };

    // 2. Doodle Wrench
    const drawDoodleWrench = (x: number, y: number, len: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = INK_MAIN;
      ctx.fillStyle = FILL_PAPER;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const half = len / 2;
      ctx.beginPath();
      ctx.rect(-half + 8, -3.5, len - 16, 7);
      ctx.fill();
      ctx.stroke();

      [-half + 6, half - 6].forEach((hx, i) => {
        ctx.save();
        ctx.translate(hx, 0);
        if (i === 1) ctx.rotate(Math.PI);
        ctx.beginPath();
        ctx.arc(0, 0, 7.5, 0.7, Math.PI * 2 - 0.7);
        ctx.lineTo(-2, -3.5);
        ctx.lineTo(-2, 3.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      ctx.restore();
    };

    // 3. Doodle Hex Nut
    const drawDoodleNut = (x: number, y: number, r: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = INK_MAIN;
      ctx.fillStyle = FILL_PAPER;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, r * 0.5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    };

    // 4. Doodle Gauge
    const drawDoodleGauge = (x: number, y: number, r: number, phase: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = INK_MAIN;
      ctx.fillStyle = FILL_PAPER;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.arc(0, 4, r, Math.PI, 0);
      ctx.lineTo(r, 8);
      ctx.lineTo(-r, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      for (let t = 0; t <= 6; t++) {
        const a = Math.PI + (t * Math.PI) / 6;
        const tx1 = Math.cos(a) * (r - 2);
        const ty1 = 4 + Math.sin(a) * (r - 2);
        const tx2 = Math.cos(a) * (r - 6);
        const ty2 = 4 + Math.sin(a) * (r - 6);
        ctx.beginPath();
        ctx.moveTo(tx1, ty1);
        ctx.lineTo(tx2, ty2);
        ctx.stroke();
      }

      const needleAngle = Math.PI * 1.25 + Math.sin(phase * 2) * 0.55;
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.lineTo(Math.cos(needleAngle) * (r * 0.75), 4 + Math.sin(needleAngle) * (r * 0.75));
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 4, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = INK_MAIN;
      ctx.fill();

      ctx.restore();
    };

    // 5. Doodle Spring
    const drawDoodleSpring = (x: number, y: number, phase: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.0;
      ctx.lineCap = "round";

      ctx.beginPath();
      for (let s = 0; s < 25; s++) {
        const t = s * 0.35;
        const rx = Math.sin(t + phase) * 7;
        const ry = t * 3.5;
        if (s === 0) ctx.moveTo(rx, ry);
        else ctx.lineTo(rx, ry);
      }
      ctx.stroke();
      ctx.restore();
    };

    // 6. Doodle Plug
    const drawDoodlePlug = (x: number, y: number, phase: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = INK_MAIN;
      ctx.fillStyle = FILL_PAPER;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-4, -14);
      ctx.lineTo(-4, -6);
      ctx.moveTo(4, -14);
      ctx.lineTo(4, -6);
      ctx.stroke();

      drawDoodleRect(-9, -6, 18, 14, 4, FILL_PAPER, INK_MAIN, 2.2);

      ctx.beginPath();
      ctx.moveTo(0, 8);
      ctx.bezierCurveTo(-8, 16, 8, 22, -4 + Math.sin(phase) * 3, 30);
      ctx.stroke();

      ctx.restore();
    };

    // =========================================================================
    // THE DOODLE BOTS ROAMING ACROSS THE SCREEN
    // =========================================================================

    // 1. SPIDERBOT
    const drawSpiderbot = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 26, 32, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      const legPhase = bot.walkCycle * 2.2;
      [-18, 0, 18].forEach((lx, i) => {
        const swing = Math.sin(legPhase + i * 1.2) * 8;
        const kneeLift = Math.max(0, -Math.cos(legPhase + i * 1.2)) * 6;

        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const kneeX = lx + swing * 0.7;
        const kneeY = -8 - kneeLift;
        const footX = lx + swing + (lx >= 0 ? 12 : -12);
        const footY = 24 - kneeLift * 0.5;

        ctx.beginPath();
        ctx.moveTo(lx * 0.6, 2);
        ctx.lineTo(kneeX, kneeY);
        ctx.lineTo(footX, footY);
        ctx.stroke();

        ctx.fillStyle = INK_MAIN;
        ctx.beginPath();
        ctx.arc(kneeX, kneeY, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(footX, footY, 3, 2, 0, 0, Math.PI * 2);
        ctx.stroke();
      });

      drawDoodleRect(-22, -14, 44, 28, 9, FILL_PAPER, INK_MAIN, 2.5);

      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.lineTo(0, -22);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -26, 4, 0, Math.PI * 2);
      ctx.fillStyle = FILL_PAPER;
      ctx.fill();
      ctx.stroke();

      [-8, 8].forEach((ex) => {
        drawDoodleCircle(ex, -3, 6, FILL_PAPER, INK_MAIN, 2.2);

        if (!bot.isBlinking) {
          ctx.fillStyle = INK_MAIN;
          ctx.beginPath();
          ctx.arc(ex + 1, -3, 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.moveTo(ex - 4, -3);
          ctx.lineTo(ex + 4, -3);
          ctx.stroke();
        }
      });

      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.arc(0, 5, 5, 0.2, Math.PI - 0.2);
      ctx.stroke();

      [-14, 14].forEach((rx) => {
        ctx.fillStyle = INK_LIGHT;
        ctx.beginPath();
        ctx.arc(rx, 8, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    // 2. DRONE
    const drawDrone = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const hoverBob = Math.sin(bot.walkCycle * 2.0) * 5;
      ctx.translate(0, hoverBob);

      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 65 - hoverBob, 26, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      const propPositions = [-28, 28];
      propPositions.forEach((px, i) => {
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.2;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(px, -4);
        ctx.lineTo(px, -12);
        ctx.stroke();

        ctx.save();
        ctx.translate(px, -12);
        const spin = bot.walkCycle * 12 * (i === 0 ? 1 : -1);
        ctx.rotate(spin);
        ctx.beginPath();
        ctx.ellipse(0, 0, 14, 3.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = FILL_PAPER;
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = INK_MAIN;
        ctx.beginPath();
        ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      ctx.beginPath();
      ctx.ellipse(0, 2, 34, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = FILL_PAPER;
      ctx.fill();
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.4;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -2, 17, Math.PI, 0);
      ctx.closePath();
      ctx.fillStyle = FILL_PAPER;
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -19);
      ctx.lineTo(0, -29);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -32, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = FILL_PAPER;
      ctx.fill();
      ctx.stroke();

      drawDoodleCircle(0, -9, 6.5, FILL_PAPER, INK_MAIN, 2.0);
      if (!bot.isBlinking) {
        ctx.fillStyle = INK_MAIN;
        ctx.beginPath();
        ctx.arc(1.5, -9, 2.8, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = INK_MAIN;
        ctx.beginPath();
        ctx.moveTo(-4, -9);
        ctx.lineTo(4, -9);
        ctx.stroke();
      }

      [-22, -11, 0, 11, 22].forEach((rx) => {
        ctx.beginPath();
        ctx.arc(rx, 3, 2, 0, Math.PI * 2);
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      });

      ctx.restore();
    };

    // 3. LINE TRACER
    const drawLineTracer = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      ctx.strokeStyle = INK_LIGHT;
      ctx.lineWidth = 3.0;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(-50, 18);
      ctx.lineTo(50, 18);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 18, 36, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      const wheelRot = bot.walkCycle * 2.8;
      [-16, 12].forEach((wx) => {
        ctx.save();
        ctx.translate(wx, 12);
        ctx.rotate(wheelRot);
        drawDoodleCircle(0, 0, 9.5, FILL_PAPER, INK_MAIN, 2.4);

        ctx.beginPath();
        ctx.moveTo(-7, 0);
        ctx.lineTo(7, 0);
        ctx.moveTo(0, -7);
        ctx.lineTo(0, 7);
        ctx.stroke();

        ctx.fillStyle = INK_MAIN;
        ctx.beginPath();
        ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      drawDoodleRect(-26, -10, 48, 22, 6, FILL_PAPER, INK_MAIN, 2.5);
      drawDoodleRect(-12, -15, 18, 6, 2, FILL_PAPER, INK_MAIN, 2.0);

      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(22, 0);
      ctx.lineTo(34, 0);
      ctx.lineTo(34, 14);
      ctx.stroke();

      drawDoodleRect(28, 12, 12, 6, 2, FILL_PAPER, INK_MAIN, 1.8);
      [31, 34, 37].forEach((sx) => {
        ctx.fillStyle = INK_MAIN;
        ctx.beginPath();
        ctx.arc(sx, 15, 1.3, 0, Math.PI * 2);
        ctx.fill();
      });

      drawDoodleCircle(10, -2, 6, FILL_PAPER, INK_MAIN, 2.0);
      if (!bot.isBlinking) {
        ctx.fillStyle = INK_MAIN;
        ctx.beginPath();
        ctx.arc(11.5, -2, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      [-16, -11, -6].forEach((vx) => {
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(vx, -4);
        ctx.lineTo(vx, 4);
        ctx.stroke();
      });

      ctx.restore();
    };

    // 4. RACER
    const drawRacer = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const bob = Math.sin(bot.walkCycle * 4.0) * 1.8;
      ctx.translate(0, bob);

      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 18, 42, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      const tireRot = bot.walkCycle * 3.5;
      const wheelSpecs = [
        { x: -24, y: 11, r: 13 },
        { x: 22, y: 12, r: 10 },
      ];

      wheelSpecs.forEach(({ x, y, r }) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(tireRot);

        drawDoodleCircle(0, 0, r, FILL_PAPER, INK_MAIN, 2.6);

        for (let k = 0; k < 6; k++) {
          ctx.rotate((Math.PI * 2) / 6);
          ctx.beginPath();
          ctx.moveTo(r - 2, 0);
          ctx.lineTo(r + 2, 0);
          ctx.stroke();
        }

        drawDoodleCircle(0, 0, r * 0.5, FILL_PAPER, INK_MAIN, 1.8);
        ctx.restore();
      });

      ctx.strokeStyle = INK_MAIN;
      ctx.fillStyle = FILL_PAPER;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-28, 6);
      ctx.lineTo(-24, -8);
      ctx.lineTo(-6, -16);
      ctx.lineTo(14, -16);
      ctx.lineTo(32, 2);
      ctx.lineTo(34, 10);
      ctx.lineTo(-28, 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-4, -13);
      ctx.lineTo(12, -13);
      ctx.lineTo(20, -2);
      ctx.lineTo(-2, -2);
      ctx.closePath();
      ctx.fillStyle = FILL_SHADE;
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-22, -6);
      ctx.lineTo(-26, -18);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-34, -20);
      ctx.lineTo(-18, -20);
      ctx.lineWidth = 3.0;
      ctx.stroke();

      ctx.fillStyle = INK_MAIN;
      ctx.font = "800 9px 'Space Grotesk', system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("01", -2, 6);

      [-2, 4].forEach((sy) => {
        ctx.strokeStyle = INK_LIGHT;
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(-34, sy);
        ctx.lineTo(-44, sy);
        ctx.stroke();
      });

      ctx.restore();
    };

    // 5. SUMO BOT
    const drawSumoBot = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 18, 38, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.translate(-14, 10);
      ctx.rotate(bot.walkCycle * 2.2);
      drawDoodleCircle(0, 0, 11, FILL_PAPER, INK_MAIN, 2.6);
      ctx.beginPath();
      ctx.moveTo(-7, 0);
      ctx.lineTo(7, 0);
      ctx.moveTo(0, -7);
      ctx.lineTo(0, 7);
      ctx.stroke();
      ctx.restore();

      drawDoodleRect(-26, -12, 38, 22, 5, FILL_PAPER, INK_MAIN, 2.6);

      ctx.beginPath();
      ctx.moveTo(10, -12);
      ctx.lineTo(34, 14);
      ctx.lineTo(10, 14);
      ctx.closePath();
      ctx.fillStyle = FILL_PAPER;
      ctx.fill();
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.6;
      ctx.stroke();

      for (let h = 14; h <= 28; h += 5) {
        ctx.beginPath();
        ctx.moveTo(h, -2 + (h - 10) * 0.7);
        ctx.lineTo(h - 5, 12);
        ctx.strokeStyle = INK_LIGHT;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      [-4, 4].forEach((sy) => {
        drawDoodleCircle(8, -4 + sy, 4.5, FILL_PAPER, INK_MAIN, 2.0);
        ctx.fillStyle = INK_MAIN;
        ctx.beginPath();
        ctx.arc(8, -4 + sy, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      [
        { x: -21, y: -7 },
        { x: 7, y: -7 },
      ].forEach((bp) => {
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = INK_MAIN;
        ctx.fill();
      });

      ctx.restore();
    };

    // 6. BOX BOT
    const drawBoxBot = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const legSwing = Math.sin(bot.walkCycle * 2.5) * 6;

      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 26, 22, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      [-7, 7].forEach((lx, i) => {
        const swing = i === 0 ? legSwing : -legSwing;
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.4;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(lx, 14);
        ctx.lineTo(lx + swing * 0.5, 22);
        ctx.stroke();

        drawDoodleRect(lx + swing * 0.5 - 4, 21, 8, 4, 2, FILL_PAPER, INK_MAIN, 2.0);
      });

      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.lineTo(0, -1);
      ctx.stroke();

      drawDoodleRect(-14, -1, 28, 16, 4, FILL_PAPER, INK_MAIN, 2.5);
      [-6, 0, 6].forEach((sx) => {
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(sx, 3);
        ctx.lineTo(sx, 10);
        ctx.stroke();
      });

      drawDoodleRect(-16, -26, 32, 20, 5, FILL_PAPER, INK_MAIN, 2.5);

      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(0, -26);
      ctx.quadraticCurveTo(-4, -34, -2, -38);
      ctx.stroke();

      drawDoodleCircle(-2, -39, 3.5, FILL_PAPER, INK_MAIN, 2.0);

      [-7, 7].forEach((ex) => {
        drawDoodleCircle(ex, -18, 5, FILL_PAPER, INK_MAIN, 2.0);
        if (!bot.isBlinking) {
          ctx.fillStyle = INK_MAIN;
          ctx.beginPath();
          ctx.arc(ex, -18, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.beginPath();
      ctx.rect(-9, -11, 18, 5);
      ctx.stroke();
      for (let g = -5; g <= 5; g += 3.5) {
        ctx.beginPath();
        ctx.moveTo(g, -11);
        ctx.lineTo(g, -6);
        ctx.stroke();
      }

      const armWave = Math.sin(bot.walkCycle * 2.5) * 5;
      [-14, 14].forEach((ax, i) => {
        const dir = i === 0 ? -1 : 1;
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(ax, 3);
        ctx.lineTo(ax + dir * 8, 4 + armWave * dir);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ax + dir * 11, 4 + armWave * dir, 3.5, 0.4 * Math.PI, 1.6 * Math.PI, dir === 1);
        ctx.stroke();
      });

      ctx.restore();
    };

    // =========================================================================
    // MAIN LOOP
    // =========================================================================
    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render Floating Background Doodle Accents
      for (const item of floatingDoodles) {
        item.rotation += item.vRot;
        item.floatPhase += 0.02;
        item.x += item.vx + Math.sin(item.floatPhase) * 0.15;
        item.y += item.vy + Math.cos(item.floatPhase) * 0.15;

        if (item.x < -50) item.x = width + 50;
        if (item.x > width + 50) item.x = -50;
        if (item.y < -50) item.y = height + 50;
        if (item.y > height + 50) item.y = -50;

        switch (item.type) {
          case "gear":
            drawDoodleGear(item.x, item.y, item.size, item.rotation, item.alpha);
            break;
          case "wrench":
            drawDoodleWrench(item.x, item.y, item.size * 1.5, item.rotation, item.alpha);
            break;
          case "nut":
            drawDoodleNut(item.x, item.y, item.size * 0.7, item.rotation, item.alpha);
            break;
          case "gauge":
            drawDoodleGauge(item.x, item.y, item.size * 0.8, item.floatPhase, item.alpha);
            break;
          case "spring":
            drawDoodleSpring(item.x, item.y, item.floatPhase, item.alpha);
            break;
          case "plug":
            drawDoodlePlug(item.x, item.y, item.floatPhase, item.alpha);
            break;
        }
      }

      // 2. Render Dropped Interactive Doodle Tokens
      const floorY = height - 25;
      for (let i = droppedTokens.length - 1; i >= 0; i--) {
        const tok = droppedTokens[i];
        tok.life--;

        if (tok.life < 50) {
          tok.alpha = (tok.life / 50) * 0.8;
        }

        if (tok.life <= 0) {
          droppedTokens.splice(i, 1);
          continue;
        }

        if (!tok.settled) {
          tok.vy += 0.38;
          tok.x += tok.vx;
          tok.y += tok.vy;
          tok.rotation += tok.vRot;

          if (tok.y >= floorY) {
            tok.y = floorY;
            tok.vy = -tok.vy * 0.45;
            tok.vx *= 0.8;
            tok.vRot *= 0.7;
            tok.bounces++;

            if (Math.abs(tok.vy) < 0.8 && tok.bounces >= 3) {
              tok.settled = true;
              tok.vy = 0;
              tok.vx = 0;
            }
          }
        }

        drawDoodleNut(tok.x, tok.y, tok.radius, tok.rotation, tok.alpha);
      }

      // 3. Update & Render Prominent Hand-Drawn Doodle Robots Roaming
      for (const bot of bots) {
        bot.stateTimer--;
        if (bot.stateTimer <= 0) {
          if (bot.state === "moving") {
            bot.state = "idle";
            bot.stateTimer = Math.random() * 80 + 50;
          } else {
            bot.state = "moving";
            bot.stateTimer = Math.random() * 240 + 160;
            bot.targetX = Math.random() * (width - 160) + 80;
            if (bot.type === "drone") {
              bot.targetY = Math.random() * (height * 0.28) + 60;
            }
          }
        }

        if (bot.state === "moving" || bot.state === "inspecting") {
          const dx = bot.targetX - bot.x;
          if (Math.abs(dx) > 10) {
            const dir = Math.sign(dx);
            bot.vx = dir * bot.speed;
            bot.facing = dir as 1 | -1;
            bot.x += bot.vx;
            bot.walkCycle += 0.05 * (0.85 + bot.speed);
          } else {
            bot.state = "idle";
          }

          if (bot.type === "drone") {
            const dy = bot.targetY - bot.y;
            if (Math.abs(dy) > 5) {
              bot.y += Math.sign(dy) * (bot.speed * 0.55);
            }
          }
        }

        bot.x = Math.max(45, Math.min(width - 45, bot.x));

        bot.blinkTimer--;
        if (bot.blinkTimer <= 0) {
          bot.isBlinking = !bot.isBlinking;
          bot.blinkTimer = bot.isBlinking ? 10 : Math.random() * 180 + 90;
        }

        switch (bot.type) {
          case "spiderbot":
            drawSpiderbot(bot);
            break;
          case "drone":
            drawDrone(bot);
            break;
          case "linetracer":
            drawLineTracer(bot);
            break;
          case "racer":
            drawRacer(bot);
            break;
          case "sumobot":
            drawSumoBot(bot);
            break;
          case "boxbot":
            drawBoxBot(bot);
            break;
          default:
            drawBoxBot(bot);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      <canvas ref={canvasRef} className="block w-full h-full touch-none" />
    </div>
  );
}

export default CearRoboticsBackground;
