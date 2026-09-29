"use client";

import React, { useEffect, useRef } from "react";

export type BotType =
  | "joybot"      // Waving Chibi TV Bot with angled ball antennas & big happy smile
  | "ufobot"      // Floating cute flying saucer with dome, portholes & friendly alien face
  | "treadbot"    // Cute tank robot with big round eyes & 3 rolling wheels in tread
  | "domebot"     // Cute R2-style dome-head chibi with ear nubs, smile & stubby feet
  | "unibot"      // Cute monocycle bot balancing on a single big bouncy rolling wheel
  | "rocketbot"   // Cute cartoon rocket with porthole eye & side fin wings
  | "spiderchibi" // Cute marshmallow baby spider with sparkly anime eyes & stubby bouncy legs
  | "trapbot";    // Cute trapezoid robot with double-circle eyes & dual wheel pods

interface DoodleBot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: BotType;
  facing: 1 | -1;
  state: "moving" | "idle" | "happy";
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
  heartBubbleTimer: number; // For cute popup heart/sparkle when clicked
}

interface FloatingDoodleItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  size: number;
  type: "gear" | "wrench" | "nut" | "gauge" | "spring" | "plug" | "bubble";
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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupCanvasResolution();

    const handleResize = () => {
      setupCanvasResolution();
    };
    window.addEventListener("resize", handleResize);

    // Color Palette: Pure Dull Gray Sketchbook Ink (Warm, charming, monochrome)
    const INK_MAIN = "rgba(58, 64, 72, 0.78)";       // Muted charcoal-gray marker ink
    const INK_LIGHT = "rgba(105, 112, 122, 0.52)";   // Faint secondary sketch lines
    const FILL_PAPER = "rgba(255, 255, 255, 0.72)";  // Translucent paper body fill
    const FILL_SHADE = "rgba(222, 226, 232, 0.42)";  // Soft dull gray shading

    // Fleet of Super Cute Hand-Drawn Doodle Robots Roaming across the screen
    const bots: DoodleBot[] = [];
    const botTypes: BotType[] = [
      "joybot",
      "ufobot",
      "treadbot",
      "domebot",
      "unibot",
      "rocketbot",
      "spiderchibi",
      "trapbot",
    ];

    const botCount = 9;
    for (let i = 0; i < botCount; i++) {
      const type = botTypes[i % botTypes.length];
      const scale = 0.95 + (i % 3) * 0.12; // ~0.95, 1.07, 1.19
      const alpha = 0.76 + (i % 2) * 0.12;  // High visibility, crisp dull gray
      const speed = (0.50 + Math.random() * 0.30) * (type === "rocketbot" ? 1.3 : 1);

      let botY: number;
      if (type === "ufobot" || type === "rocketbot") {
        botY = Math.random() * (height * 0.28) + 60;
      } else if (type === "joybot") {
        botY = height * 0.24 + (i % 2) * (height * 0.32) + 20;
      } else if (type === "treadbot") {
        botY = height * 0.42 + (i % 2) * (height * 0.30) + 20;
      } else if (type === "spiderchibi") {
        botY = height * 0.54 + (i % 2) * (height * 0.32) + 20;
      } else {
        botY = height * 0.62 + (i % 2) * (height * 0.26) + 20;
      }

      botY = Math.max(70, Math.min(height - 85, botY));
      const facing = Math.random() > 0.5 ? 1 : -1;

      bots.push({
        x: Math.random() * (width - 200) + 100,
        y: botY,
        vx: facing * speed,
        vy: type === "ufobot" || type === "rocketbot" ? (Math.random() - 0.5) * 0.25 : 0,
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
        heartBubbleTimer: 0,
      });
    }

    // Floating Doodle Mechanical Accents (directly from reference image sheet)
    const floatingDoodles: FloatingDoodleItem[] = [];
    const doodleItemTypes: FloatingDoodleItem["type"][] = [
      "gear",
      "wrench",
      "nut",
      "gauge",
      "spring",
      "plug",
      "bubble",
    ];

    const floatCount = Math.max(10, Math.min(18, Math.floor(width / 100)));
    for (let i = 0; i < floatCount; i++) {
      floatingDoodles.push({
        x: Math.random() * width,
        y: Math.random() * (height - 100) + 50,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.22,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.015,
        size: Math.random() * 10 + 24,
        type: doodleItemTypes[i % doodleItemTypes.length],
        alpha: 0.42 + Math.random() * 0.25,
        floatPhase: Math.random() * Math.PI * 2,
      });
    }

    // Interactive Dropped Doodle Tokens (on click/tap)
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

      // Nearest bot turns towards click and does a cute celebration
      let nearestBot: DoodleBot | null = null;
      let minDistance = 380;

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
        nearestBot.state = "happy";
        nearestBot.stateTimer = 180;
        nearestBot.heartBubbleTimer = 120;
        nearestBot.facing = clientX > nearestBot.x ? 1 : -1;
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);

    // =========================================================================
    // HAND-DRAWN DOODLE SHAPE PRIMITIVES (Warm, organic, round line art)
    // =========================================================================

    const drawDoodleRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      r = 5,
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
      ctx.roundRect(x, y, w, h, r);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };

    const drawDoodleCircle = (
      x: number,
      y: number,
      r: number,
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
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };

    // Cute Hand-Drawn Heart Bubble for happy interaction
    const drawHeartBubble = (x: number, y: number, timer: number) => {
      const progress = 1 - timer / 120; // 0 to 1
      const floatY = y - 48 - progress * 26;
      const alpha = timer < 30 ? timer / 30 : 0.85;
      const pulse = 1 + Math.sin(progress * Math.PI * 3) * 0.15;

      ctx.save();
      ctx.translate(x, floatY);
      ctx.scale(pulse, pulse);
      ctx.globalAlpha = alpha;

      // Small speech bubble
      ctx.fillStyle = FILL_PAPER;
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.0;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.roundRect(-12, -12, 24, 20, 8);
      ctx.fill();
      ctx.stroke();

      // Bubble tail
      ctx.beginPath();
      ctx.moveTo(-3, 8);
      ctx.lineTo(-6, 14);
      ctx.lineTo(2, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Cute Little Heart inside
      ctx.fillStyle = INK_MAIN;
      ctx.beginPath();
      ctx.moveTo(0, 2);
      ctx.bezierCurveTo(-5, -3, -5, -8, 0, -8);
      ctx.bezierCurveTo(5, -8, 5, -3, 0, 2);
      ctx.fill();

      ctx.restore();
    };

    // =========================================================================
    // FLOATING DOODLE MECHANICAL ACCENTS (from reference doodle sheet)
    // =========================================================================

    // 1. Doodle Cartoon Gear
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
        const a1 = (i / teeth) * Math.PI * 2;
        const a2 = ((i + 0.35) / teeth) * Math.PI * 2;
        const a3 = ((i + 0.65) / teeth) * Math.PI * 2;
        const a4 = ((i + 1) / teeth) * Math.PI * 2;

        const rOuter = r * 1.15;
        const rInner = r * 0.85;

        if (i === 0) ctx.moveTo(Math.cos(a1) * rInner, Math.sin(a1) * rInner);
        else ctx.lineTo(Math.cos(a1) * rInner, Math.sin(a1) * rInner);

        ctx.lineTo(Math.cos(a2) * rOuter, Math.sin(a2) * rOuter);
        ctx.lineTo(Math.cos(a3) * rOuter, Math.sin(a3) * rOuter);
        ctx.lineTo(Math.cos(a4) * rInner, Math.sin(a4) * rInner);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Center hole
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.36, 0, Math.PI * 2);
      ctx.fillStyle = FILL_SHADE;
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    // 2. Doodle Open-End Wrench
    const drawDoodleWrench = (x: number, y: number, length: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = INK_MAIN;
      ctx.fillStyle = FILL_PAPER;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const hl = length * 0.5;
      const headR = length * 0.22;

      ctx.beginPath();
      // Handle
      ctx.rect(-3.5, -hl + headR, 7, length - headR * 2);
      ctx.fill();
      ctx.stroke();

      // Top jaw [c]
      ctx.beginPath();
      ctx.arc(0, -hl + headR, headR, 0.25 * Math.PI, 1.75 * Math.PI);
      ctx.lineTo(0, -hl + headR);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Bottom jaw [c]
      ctx.beginPath();
      ctx.arc(0, hl - headR, headR, 1.25 * Math.PI, 2.75 * Math.PI);
      ctx.lineTo(0, hl - headR);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

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

      // Center hole
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.48, 0, Math.PI * 2);
      ctx.fillStyle = FILL_SHADE;
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    // 4. Doodle Speedometer Gauge
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
      ctx.lineTo(r, 7);
      ctx.lineTo(-r, 7);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      for (let t = 0; t <= 5; t++) {
        const a = Math.PI + (t * Math.PI) / 5;
        const tx1 = Math.cos(a) * (r - 2);
        const ty1 = 4 + Math.sin(a) * (r - 2);
        const tx2 = Math.cos(a) * (r - 6);
        const ty2 = 4 + Math.sin(a) * (r - 6);
        ctx.beginPath();
        ctx.moveTo(tx1, ty1);
        ctx.lineTo(tx2, ty2);
        ctx.stroke();
      }

      const needleAngle = Math.PI * 1.25 + Math.sin(phase * 2) * 0.5;
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(0, 4);
      ctx.lineTo(Math.cos(needleAngle) * (r * 0.75), 4 + Math.sin(needleAngle) * (r * 0.75));
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 4, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = INK_MAIN;
      ctx.fill();

      ctx.restore();
    };

    // 5. Doodle Curly Spring (from reference image)
    const drawDoodleSpring = (x: number, y: number, phase: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.0;
      ctx.lineCap = "round";

      ctx.beginPath();
      for (let s = 0; s < 22; s++) {
        const t = s * 0.38;
        const rx = Math.sin(t + phase) * 7;
        const ry = t * 3.2;
        if (s === 0) ctx.moveTo(rx, ry);
        else ctx.lineTo(rx, ry);
      }
      ctx.stroke();
      ctx.restore();
    };

    // 6. Doodle Wall Plug (from reference image)
    const drawDoodlePlug = (x: number, y: number, phase: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = INK_MAIN;
      ctx.fillStyle = FILL_PAPER;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Prongs
      ctx.beginPath();
      ctx.moveTo(-4, -13);
      ctx.lineTo(-4, -6);
      ctx.moveTo(4, -13);
      ctx.lineTo(4, -6);
      ctx.stroke();

      drawDoodleRect(-9, -6, 18, 13, 4, FILL_PAPER, INK_MAIN, 2.2);

      // Wavy tail cord
      ctx.beginPath();
      ctx.moveTo(0, 7);
      ctx.bezierCurveTo(-7, 15, 7, 20, -3 + Math.sin(phase) * 3, 27);
      ctx.stroke();

      ctx.restore();
    };

    // 7. Cute Doodle Bubble / Sparkle
    const drawDoodleBubble = (x: number, y: number, size: number, phase: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha * 0.8;
      ctx.strokeStyle = INK_LIGHT;
      ctx.fillStyle = FILL_PAPER;
      ctx.lineWidth = 1.8;

      ctx.beginPath();
      ctx.arc(0, Math.sin(phase) * 3, size * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Highlight
      ctx.fillStyle = INK_LIGHT;
      ctx.beginPath();
      ctx.arc(-size * 0.12, Math.sin(phase) * 3 - size * 0.12, size * 0.08, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // =========================================================================
    // THE SUPER CUTE DOODLE BOTS (Directly matching reference image)
    // =========================================================================

    // 1. JOYBOT (The Happy Waving Chibi TV Bot)
    const drawJoyBot = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const walkBob = Math.abs(Math.sin(bot.walkCycle * 2.8)) * 3;
      ctx.translate(0, -walkBob);

      // Soft ground shadow
      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 26 + walkBob, 28, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Legs & cute rectangular shoes
      const legStep = Math.sin(bot.walkCycle * 2.8) * 6;
      [-8, 8].forEach((lx, i) => {
        const step = i === 0 ? legStep : -legStep;
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.4;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(lx, 15);
        ctx.lineTo(lx + step * 0.6, 22);
        ctx.stroke();

        // Cute rounded shoe
        drawDoodleRect(lx + step * 0.6 - 4, 21, 8, 5, 2.5, FILL_PAPER, INK_MAIN, 2.0);
      });

      // A-line trapezoid cute dress body
      ctx.beginPath();
      ctx.moveTo(-13, -7);
      ctx.lineTo(13, -7);
      ctx.lineTo(18, 15);
      ctx.lineTo(-18, 15);
      ctx.closePath();
      ctx.fillStyle = FILL_PAPER;
      ctx.fill();
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // 3 cute belly buttons [• • •]
      [ -1, 5, 11 ].forEach((by) => {
        drawDoodleCircle(0, by, 1.8, INK_MAIN, INK_MAIN, 1);
      });

      // Raised waving arms \o/
      const armWave = Math.sin(bot.walkCycle * 3.2) * 5;
      [-13, 13].forEach((ax, i) => {
        const dir = i === 0 ? -1 : 1;
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.2;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(ax, -4);
        ctx.lineTo(ax + dir * 10, -16 + (dir === 1 ? armWave : -armWave));
        ctx.stroke();

        // Cute open clamp hand
        ctx.beginPath();
        ctx.arc(
          ax + dir * 12,
          -18 + (dir === 1 ? armWave : -armWave),
          3.5,
          dir === 1 ? 0.8 * Math.PI : -0.2 * Math.PI,
          dir === 1 ? 1.8 * Math.PI : 0.8 * Math.PI
        );
        ctx.stroke();
      });

      // Small neck connector
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -7);
      ctx.lineTo(0, -12);
      ctx.stroke();

      // Rounded rectangular TV Head
      drawDoodleRect(-23, -36, 46, 25, 7, FILL_PAPER, INK_MAIN, 2.6);

      // Two cute angled ball antennas \o  o/
      const wobble = Math.sin(bot.walkCycle * 2.5) * 2;
      [
        { sx: -13, ex: -21 + wobble, ey: -46 },
        { sx: 13, ex: 21 + wobble, ey: -46 },
      ].forEach(({ sx, ex, ey }) => {
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(sx, -36);
        ctx.lineTo(ex, ey);
        ctx.stroke();

        drawDoodleCircle(ex, ey - 2, 3.5, FILL_PAPER, INK_MAIN, 2.0);
      });

      // Big cute round eyes & pupils
      [-10, 10].forEach((ex) => {
        drawDoodleCircle(ex, -24, 6, FILL_PAPER, INK_MAIN, 2.2);

        if (!bot.isBlinking) {
          // Cute dark pupil with shiny dot
          ctx.fillStyle = INK_MAIN;
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 1 : -1), -24, 2.8, 0, Math.PI * 2);
          ctx.fill();

          // White eye shine
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 0.5 : -1.5), -25, 1, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Cute happy curved closed eye ⌒
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.arc(ex, -23, 4, 1.1 * Math.PI, 1.9 * Math.PI);
          ctx.stroke();
        }
      });

      // Big happy smiling mouth ( ◕ ‿ ◕ )
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(0, -21, 6.5, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();

      // Cute blush dots
      [-17, 17].forEach((rx) => {
        ctx.fillStyle = INK_LIGHT;
        ctx.beginPath();
        ctx.arc(rx, -19, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      // Show floating heart/sparkle bubble if happy
      if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

    // 2. UFOBOT (The Cute Flying Saucer with Dome & Friendly Alien Robot)
    const drawUfoBot = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const hoverBob = Math.sin(bot.walkCycle * 2.2) * 6;
      const tilt = Math.sin(bot.walkCycle * 1.5) * 0.10;
      ctx.translate(0, hoverBob);
      ctx.rotate(tilt);

      // Ground shadow
      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 58 - hoverBob, 28, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Bottom pod
      ctx.beginPath();
      ctx.arc(0, 4, 18, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.fillStyle = FILL_SHADE;
      ctx.fill();
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Oval Saucer Rim
      ctx.beginPath();
      ctx.ellipse(0, 3, 38, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = FILL_PAPER;
      ctx.fill();
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 4 Cute Round Porthole Lights ( o o o o )
      [-23, -8, 8, 23].forEach((px) => {
        drawDoodleCircle(px, 3, 3.2, FILL_PAPER, INK_MAIN, 1.8);
      });

      // Clear Glass Bubble Dome
      ctx.beginPath();
      ctx.arc(0, -4, 18, Math.PI, 0);
      ctx.closePath();
      ctx.fillStyle = FILL_PAPER;
      ctx.fill();
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Top curly antenna with ball
      const antWobble = Math.sin(bot.walkCycle * 3) * 2;
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.quadraticCurveTo(antWobble, -30, antWobble * 0.5, -34);
      ctx.stroke();
      drawDoodleCircle(antWobble * 0.5, -36, 3.5, FILL_PAPER, INK_MAIN, 2.0);

      // Cute Little Robot Face inside dome ( • ‿ • )
      [-6, 6].forEach((ex) => {
        if (!bot.isBlinking) {
          ctx.fillStyle = INK_MAIN;
          ctx.beginPath();
          ctx.arc(ex, -12, 2.4, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(ex - 0.7, -12.7, 0.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(ex, -12, 2.5, 1.1 * Math.PI, 1.9 * Math.PI);
          ctx.stroke();
        }
      });

      // Smiling mouth
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.arc(0, -8.5, 4.0, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();

      ctx.restore();

      if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

    // 3. TREADBOT (The Cute Tank Robot with Big Round Eyes & Rolling Tread)
    const drawTreadBot = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const bob = Math.sin(bot.walkCycle * 3.5) * 1.5;
      ctx.translate(0, bob);

      // Shadow
      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 26, 32, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Rubber Tank Tread (Stadium rounded pill shape)
      drawDoodleRect(-28, 12, 56, 17, 8.5, FILL_PAPER, INK_MAIN, 2.6);

      // 3 Cute Rolling Wheels inside tread (O O O)
      const wheelRot = bot.walkCycle * 2.8;
      [-17, 0, 17].forEach((wx) => {
        ctx.save();
        ctx.translate(wx, 20.5);
        ctx.rotate(wheelRot);

        drawDoodleCircle(0, 0, 6.2, FILL_PAPER, INK_MAIN, 2.0);

        // Spokes
        ctx.beginPath();
        ctx.moveTo(-4.5, 0);
        ctx.lineTo(4.5, 0);
        ctx.moveTo(0, -4.5);
        ctx.lineTo(0, 4.5);
        ctx.stroke();

        ctx.fillStyle = INK_MAIN;
        ctx.beginPath();
        ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Torso with 2 square meter displays
      drawDoodleRect(-17, -9, 34, 21, 4, FILL_PAPER, INK_MAIN, 2.5);
      drawDoodleRect(-12, -4, 9, 9, 2, FILL_PAPER, INK_MAIN, 1.8);
      drawDoodleRect(3, -4, 9, 9, 2, FILL_PAPER, INK_MAIN, 1.8);

      // Neck
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(0, -9);
      ctx.lineTo(0, -14);
      ctx.stroke();

      // Wide Rounded Rectangle Head
      drawDoodleRect(-24, -36, 48, 22, 5, FILL_PAPER, INK_MAIN, 2.6);

      // Antenna with wobbly ball
      const antWobble = Math.sin(bot.walkCycle * 2.5) * 2;
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(0, -36);
      ctx.lineTo(antWobble, -47);
      ctx.stroke();
      drawDoodleCircle(antWobble, -49, 3.5, FILL_PAPER, INK_MAIN, 2.0);

      // Big Round Cartoon Eyes ((o) (o))
      [-11, 11].forEach((ex) => {
        drawDoodleCircle(ex, -25, 6.8, FILL_PAPER, INK_MAIN, 2.2);

        if (!bot.isBlinking) {
          ctx.fillStyle = INK_MAIN;
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 1 : -1), -25, 3.0, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 0.5 : -1.5), -26, 1.1, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.arc(ex, -24, 4.5, 1.1 * Math.PI, 1.9 * Math.PI);
          ctx.stroke();
        }
      });

      // Cute Little Grill Smile [|||||]
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.rect(-8, -19, 16, 4.5);
      ctx.stroke();

      [-5, -1.5, 2, 5].forEach((gx) => {
        ctx.beginPath();
        ctx.moveTo(gx, -19);
        ctx.lineTo(gx, -14.5);
        ctx.stroke();
      });

      ctx.restore();

      if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

    // 4. DOMEBOT (The Cute R2-style Dome Chibi with Waddle Feet)
    const drawDomeBot = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const waddle = Math.sin(bot.walkCycle * 3.0) * 0.08;
      const walkBob = Math.abs(Math.sin(bot.walkCycle * 3.0)) * 2.5;
      ctx.translate(0, -walkBob);
      ctx.rotate(waddle);

      // Shadow
      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 28 + walkBob, 26, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Two cute stubby waddling feet
      const footShift = Math.sin(bot.walkCycle * 3.0) * 4;
      [-13, 3].forEach((fx, i) => {
        const shift = i === 0 ? footShift : -footShift;
        drawDoodleRect(fx + shift * 0.5, 20, 10, 8, 4, FILL_PAPER, INK_MAIN, 2.2);
      });

      // Integrated Capsule Dome Body
      ctx.beginPath();
      ctx.arc(0, -10, 21, Math.PI, 0); // Dome head top
      ctx.lineTo(21, 20);              // Right side
      ctx.lineTo(-21, 20);             // Bottom
      ctx.closePath();
      ctx.fillStyle = FILL_PAPER;
      ctx.fill();
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // Cute ear nubs on sides
      [-24, 21].forEach((ex) => {
        drawDoodleRect(ex, -14, 3.5, 9, 1.8, FILL_PAPER, INK_MAIN, 2.0);
      });

      // Face Visor Screen
      drawDoodleRect(-15, -17, 30, 14, 6, FILL_PAPER, INK_MAIN, 2.2);

      // Happy curved eyes (^ ‿ ^)
      [-7, 7].forEach((ex) => {
        if (!bot.isBlinking) {
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.arc(ex, -9, 3.8, 1.1 * Math.PI, 1.9 * Math.PI);
          ctx.stroke();
        } else {
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.moveTo(ex - 3, -9);
          ctx.lineTo(ex + 3, -9);
          ctx.stroke();
        }
      });

      // Sweet smiling mouth
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.arc(0, -6, 3.5, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();

      // Belly vertical stripe vents [ ||| ]
      [-8, 0, 8].forEach((vx) => {
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(vx, 3);
        ctx.lineTo(vx, 14);
        ctx.stroke();
      });

      // Cute outstretched stick arms with round ball hands o---[ ]---o
      const armSway = Math.sin(bot.walkCycle * 3.0) * 4;
      [-21, 21].forEach((ax, i) => {
        const dir = i === 0 ? -1 : 1;
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(ax, 3);
        ctx.lineTo(ax + dir * 9, 3 + (dir === 1 ? armSway : -armSway));
        ctx.stroke();

        drawDoodleCircle(
          ax + dir * 11,
          3 + (dir === 1 ? armSway : -armSway),
          3.0,
          FILL_PAPER,
          INK_MAIN,
          2.0
        );
      });

      ctx.restore();

      if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

    // 5. UNIBOT (The Cute Monocycle Robot Bouncing on a Single Wheel)
    const drawUniBot = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const bounce = Math.abs(Math.sin(bot.walkCycle * 3.2)) * 4;
      ctx.translate(0, -bounce);

      // Shadow
      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 36 + bounce, 24, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Single Big Bouncy Wheel (O)
      const wheelRot = bot.walkCycle * 3.6;
      ctx.save();
      ctx.translate(0, 24);
      ctx.rotate(wheelRot);

      drawDoodleCircle(0, 0, 13, FILL_PAPER, INK_MAIN, 2.6);

      // Inner rim & spokes
      drawDoodleCircle(0, 0, 6.5, FILL_PAPER, INK_MAIN, 2.0);
      for (let s = 0; s < 4; s++) {
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, 6.5);
        ctx.lineTo(0, 13);
        ctx.stroke();
      }
      ctx.fillStyle = INK_MAIN;
      ctx.beginPath();
      ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Fork connector from body to wheel
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(0, 12);
      ctx.lineTo(0, 24);
      ctx.stroke();

      // Square chest torso
      drawDoodleRect(-17, -9, 34, 21, 4, FILL_PAPER, INK_MAIN, 2.5);

      // Chest meter & 3 horizontal stripes
      drawDoodleRect(-12, -4, 8, 8, 2, FILL_PAPER, INK_MAIN, 1.8);
      [ -3, 0, 3 ].forEach((sy) => {
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(3, sy);
        ctx.lineTo(12, sy);
        ctx.stroke();
      });

      // Waving clamp arms \ /
      const armWave = Math.sin(bot.walkCycle * 3.2) * 5;
      [-17, 17].forEach((ax, i) => {
        const dir = i === 0 ? -1 : 1;
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(ax, -4);
        ctx.lineTo(ax + dir * 9, -14 + (dir === 1 ? armWave : -armWave));
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(
          ax + dir * 11,
          -16 + (dir === 1 ? armWave : -armWave),
          3.5,
          dir === 1 ? 0.8 * Math.PI : -0.2 * Math.PI,
          dir === 1 ? 1.8 * Math.PI : 0.8 * Math.PI
        );
        ctx.stroke();
      });

      // Flexible accordion neck
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(-4, -11);
      ctx.lineTo(4, -11);
      ctx.moveTo(-5, -13);
      ctx.lineTo(5, -13);
      ctx.stroke();

      // Rounded CRT TV Head
      drawDoodleRect(-22, -37, 44, 24, 6, FILL_PAPER, INK_MAIN, 2.6);

      // Antenna on corner
      const antWobble = Math.sin(bot.walkCycle * 2.8) * 2;
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(-10, -37);
      ctx.lineTo(-14 + antWobble, -48);
      ctx.stroke();
      drawDoodleCircle(-14 + antWobble, -50, 3.5, FILL_PAPER, INK_MAIN, 2.0);

      // Big cute round eyes ( • ‿ • )
      [-9, 9].forEach((ex) => {
        drawDoodleCircle(ex, -25, 5.8, FILL_PAPER, INK_MAIN, 2.2);

        if (!bot.isBlinking) {
          ctx.fillStyle = INK_MAIN;
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 1 : -1), -25, 2.8, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 0.5 : -1.5), -26, 1.0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.arc(ex, -24, 4.0, 1.1 * Math.PI, 1.9 * Math.PI);
          ctx.stroke();
        }
      });

      // Happy open smile
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(0, -21, 6.0, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();

      ctx.restore();

      if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

    // 6. ROCKETBOT (The Cute Cartoon Rocket Ship with Porthole Eye & Fins)
    const drawRocketBot = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const floatBob = Math.sin(bot.walkCycle * 2.4) * 5;
      const tilt = Math.sin(bot.walkCycle * 1.8) * 0.08;
      ctx.translate(0, floatBob);
      ctx.rotate(tilt);

      // Ground shadow
      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 52 - floatBob, 26, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Delta Wings / Fins on sides
      [-15, 15].forEach((fx, i) => {
        const dir = i === 0 ? -1 : 1;
        ctx.beginPath();
        ctx.moveTo(fx, 0);
        ctx.lineTo(fx + dir * 14, 16);
        ctx.lineTo(fx, 13);
        ctx.closePath();
        ctx.fillStyle = FILL_PAPER;
        ctx.fill();
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.4;
        ctx.stroke();
      });

      // Rocket Fuselage (Rounded nose cone at top, curving down to flat base)
      ctx.beginPath();
      ctx.moveTo(0, -32);
      ctx.bezierCurveTo(10, -22, 17, -5, 15, 14);
      ctx.lineTo(-15, 14);
      ctx.bezierCurveTo(-17, -5, -10, -22, 0, -32);
      ctx.closePath();
      ctx.fillStyle = FILL_PAPER;
      ctx.fill();
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // Exhaust nozzle
      ctx.beginPath();
      ctx.moveTo(-6, 14);
      ctx.lineTo(-8, 20);
      ctx.lineTo(8, 20);
      ctx.lineTo(6, 14);
      ctx.closePath();
      ctx.fillStyle = FILL_SHADE;
      ctx.fill();
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Trailing cute smoke puffs o O o
      const puff = Math.sin(bot.walkCycle * 3.5) * 2;
      [-18, 1, 18].forEach((py, i) => {
        const pr = 3.5 + i * 1.5;
        drawDoodleCircle(puff * (i % 2 === 0 ? 1 : -1), 24 + py * 0.5, pr, FILL_PAPER, INK_LIGHT, 1.8);
      });

      // Center Big Porthole Window
      drawDoodleCircle(0, -7, 10.5, FILL_PAPER, INK_MAIN, 2.4);

      // Cute Little Cartoon Face looking out ( ◕ ‿ ◕ )
      if (!bot.isBlinking) {
        ctx.fillStyle = INK_MAIN;
        ctx.beginPath();
        ctx.arc(1, -8, 4.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(0, -9.5, 1.4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.arc(0, -7, 4.5, 1.1 * Math.PI, 1.9 * Math.PI);
        ctx.stroke();
      }

      ctx.restore();

      if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

    // 7. SPIDERCHIBI (The Adorable Baby Spider with Sparkly Anime Eyes & Stubby Legs)
    const drawSpiderChibi = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const pitterPatter = Math.abs(Math.sin(bot.walkCycle * 3.8)) * 3.5;
      ctx.translate(0, -pitterPatter);

      // Shadow
      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 22 + pitterPatter, 28, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // 4 Cute Stubby Puppy-like Legs that tip-toe playfully
      const legCycle = bot.walkCycle * 3.8;
      [-15, -6, 6, 15].forEach((lx, i) => {
        const swing = Math.sin(legCycle + i * 1.5) * 5;
        const lift = Math.max(0, -Math.cos(legCycle + i * 1.5)) * 4;

        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.4;
        ctx.lineCap = "round";

        const footX = lx + swing;
        const footY = 17 - lift;

        ctx.beginPath();
        ctx.moveTo(lx * 0.7, 4);
        ctx.quadraticCurveTo(lx * 1.2, 8, footX, footY);
        ctx.stroke();

        // Cute rounded foot tip
        drawDoodleCircle(footX, footY, 2.2, INK_MAIN, INK_MAIN, 1);
      });

      // Round Marshmallow/Macaron Body
      drawDoodleCircle(0, -2, 21, FILL_PAPER, INK_MAIN, 2.6);

      // Springy spiral antenna with cute ball
      const boing = Math.sin(bot.walkCycle * 3.5) * 3;
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(0, -23);
      ctx.quadraticCurveTo(boing, -32, boing * 0.5, -36);
      ctx.stroke();
      drawDoodleCircle(boing * 0.5, -38, 3.8, FILL_PAPER, INK_MAIN, 2.0);

      // Big Sparkly Kawaii Manga Eyes ( ◕ ‿ ◕ )
      [-8, 8].forEach((ex) => {
        drawDoodleCircle(ex, -4, 6.8, FILL_PAPER, INK_MAIN, 2.2);

        if (!bot.isBlinking) {
          // Large dark pupil
          ctx.fillStyle = INK_MAIN;
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 0.8 : -0.8), -4, 3.8, 0, Math.PI * 2);
          ctx.fill();

          // Big cute white shine sparkle ✨
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 0.2 : -1.4), -5.5, 1.4, 0, Math.PI * 2);
          ctx.fill();

          // Secondary small shine
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 2.0 : 0.4), -3.0, 0.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Cute smiling curve eye ⌒
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.arc(ex, -3, 4.5, 1.1 * Math.PI, 1.9 * Math.PI);
          ctx.stroke();
        }
      });

      // Sweet smiling mouth ‿
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(0, 2, 4.5, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();

      // Soft rosy cheek blush dots
      [-14, 14].forEach((rx) => {
        ctx.fillStyle = INK_LIGHT;
        ctx.beginPath();
        ctx.arc(rx, 1, 2.0, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

    // 8. TRAPBOT (The Cute Trapezoid Robot with Double-Circle Eyes & Dual Wheels)
    const drawTrapBot = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const bob = Math.sin(bot.walkCycle * 3.0) * 1.6;
      ctx.translate(0, bob);

      // Shadow
      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 26, 30, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Dual rolling wheels (O) ====== (O)
      const wheelRot = bot.walkCycle * 3.0;
      [-14, 14].forEach((wx) => {
        ctx.save();
        ctx.translate(wx, 18);
        ctx.rotate(wheelRot);

        drawDoodleCircle(0, 0, 9.0, FILL_PAPER, INK_MAIN, 2.4);

        // Cross spokes
        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.lineTo(6, 0);
        ctx.moveTo(0, -6);
        ctx.lineTo(0, 6);
        ctx.stroke();

        ctx.fillStyle = INK_MAIN;
        ctx.beginPath();
        ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Axle bar connecting wheels
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(-14, 18);
      ctx.lineTo(14, 18);
      ctx.stroke();

      // Trapezoid Torso (narrow at top, wide at base)
      ctx.beginPath();
      ctx.moveTo(-12, -8);
      ctx.lineTo(12, -8);
      ctx.lineTo(18, 12);
      ctx.lineTo(-18, 12);
      ctx.closePath();
      ctx.fillStyle = FILL_PAPER;
      ctx.fill();
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // 3 chest buttons
      [-6, 0, 6].forEach((bx) => {
        drawDoodleCircle(bx, 2, 2.0, INK_MAIN, INK_MAIN, 1);
      });

      // Neck
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(0, -8);
      ctx.lineTo(0, -13);
      ctx.stroke();

      // Rounded rectangular head
      drawDoodleRect(-21, -34, 42, 21, 5, FILL_PAPER, INK_MAIN, 2.5);

      // Antenna with ball
      const antWobble = Math.sin(bot.walkCycle * 2.8) * 2;
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(0, -34);
      ctx.lineTo(antWobble, -45);
      ctx.stroke();
      drawDoodleCircle(antWobble, -47, 3.5, FILL_PAPER, INK_MAIN, 2.0);

      // Double-Circle Eyes ((o)) ((o))
      [-10, 10].forEach((ex) => {
        drawDoodleCircle(ex, -24, 6.2, FILL_PAPER, INK_MAIN, 2.2);

        if (!bot.isBlinking) {
          drawDoodleCircle(ex + (bot.facing === 1 ? 0.6 : -0.6), -24, 3.2, FILL_PAPER, INK_MAIN, 1.8);
          ctx.fillStyle = INK_MAIN;
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 0.6 : -0.6), -24, 1.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.arc(ex, -23, 4.0, 1.1 * Math.PI, 1.9 * Math.PI);
          ctx.stroke();
        }
      });

      // Cute Grill Smile [ |||| ]
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.rect(-7, -18, 14, 4.0);
      ctx.stroke();
      [-3.5, 0, 3.5].forEach((gx) => {
        ctx.beginPath();
        ctx.moveTo(gx, -18);
        ctx.lineTo(gx, -14);
        ctx.stroke();
      });

      ctx.restore();

      if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

    // =========================================================================
    // MAIN ANIMATION LOOP
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
          case "bubble":
            drawDoodleBubble(item.x, item.y, item.size, item.floatPhase, item.alpha);
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

      // 3. Update & Render Prominent Super Cute Hand-Drawn Doodle Robots Roaming
      for (const bot of bots) {
        bot.stateTimer--;
        if (bot.heartBubbleTimer > 0) {
          bot.heartBubbleTimer--;
        }

        if (bot.stateTimer <= 0) {
          if (bot.state === "moving" || bot.state === "happy") {
            bot.state = "idle";
            bot.stateTimer = Math.random() * 80 + 50;
          } else {
            bot.state = "moving";
            bot.stateTimer = Math.random() * 240 + 160;
            bot.targetX = Math.random() * (width - 160) + 80;
            if (bot.type === "ufobot" || bot.type === "rocketbot") {
              bot.targetY = Math.random() * (height * 0.28) + 60;
            }
          }
        }

        if (bot.state === "moving" || bot.state === "happy") {
          const dx = bot.targetX - bot.x;
          if (Math.abs(dx) > 10) {
            const dir = Math.sign(dx);
            bot.vx = dir * bot.speed;
            bot.facing = dir as 1 | -1;
            bot.x += bot.vx;
            bot.walkCycle += 0.05 * (0.85 + bot.speed);
          } else if (bot.state !== "happy") {
            bot.state = "idle";
          }

          if (bot.type === "ufobot" || bot.type === "rocketbot") {
            const dy = bot.targetY - bot.y;
            if (Math.abs(dy) > 5) {
              bot.y += Math.sign(dy) * (bot.speed * 0.55);
            }
          }
        }

        bot.x = Math.max(45, Math.min(width - 45, bot.x));

        // Cute Blinking
        bot.blinkTimer--;
        if (bot.blinkTimer <= 0) {
          bot.isBlinking = !bot.isBlinking;
          bot.blinkTimer = bot.isBlinking ? 10 : Math.random() * 180 + 90;
        }

        switch (bot.type) {
          case "joybot":
            drawJoyBot(bot);
            break;
          case "ufobot":
            drawUfoBot(bot);
            break;
          case "treadbot":
            drawTreadBot(bot);
            break;
          case "domebot":
            drawDomeBot(bot);
            break;
          case "unibot":
            drawUniBot(bot);
            break;
          case "rocketbot":
            drawRocketBot(bot);
            break;
          case "spiderchibi":
            drawSpiderChibi(bot);
            break;
          case "trapbot":
            drawTrapBot(bot);
            break;
          default:
            drawJoyBot(bot);
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
