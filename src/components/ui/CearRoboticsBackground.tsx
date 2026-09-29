"use client";

import React, { useEffect, useRef } from "react";

export type BotType =
  | "boxchibi"    // Classic Square Bot with walking legs & top antenna (No face, monochrome)
  | "towerchibi"  // Tall Cuboid Bot with dual sensor pegs & walking legs (No face, monochrome)
  | "visorchibi"  // Wide Box Bot with horizontal sensor slit & walking legs (No face, monochrome)
  | "minichibi"   // Compact Cube Bot with sensor peg & walking legs (No face, monochrome)
  | "treadbot"    // Square-body tank rover with 3 rolling wheels in tread (No face, monochrome)
  | "ufobot"      // Floating sleek saucer drone with dome & antenna (No face, monochrome)
  | "spiderchibi" // Compact quad-leg walking bot (No face, monochrome)
  | "unibot";     // Box-body monocycle bot on single rolling wheel (No face, monochrome)

interface SpeechBubble {
  text: string;
  timer: number;
  maxTimer: number;
}

interface DoodleBot {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: BotType;
  facing: 1 | -1;
  state: "moving" | "idle" | "chatting" | "inspecting";
  stateTimer: number;
  walkCycle: number;
  targetX: number;
  targetY: number;
  scale: number;
  alpha: number;
  speed: number;
  antennaWobble: number;
  speechBubble?: SpeechBubble;
  chatPartnerId?: number;
  alertBubbleTimer: number; // Clean monochrome [ ! ] alert bubble
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
  type: "gear" | "nut" | "washer";
  bounces: number;
  settled: boolean;
  alpha: number;
  life: number;
}

// Clean robotics status dialogue (Monochrome aesthetic, no cartoons)
const BOT_PHRASES = [
  "System nominal",
  "LiDAR online 📡",
  "Wartech 2026",
  "Telemetry verified",
  "Route calculated",
  "Sensors calibrated",
  "Battery: 100%",
  "All circuits OK",
  "Autonomous fleet",
  "Scanning perimeter",
  "RoboRace ready",
  "Firmware synced",
  "Target acquired 🎯",
];

const SOCIAL_REPLIES = [
  "Affirmative",
  "All circuits nominal",
  "Synchronizing data",
  "Ready for deployment",
  "Telemetry confirmed",
  "Roger that",
];

const DROP_REACTIONS = [
  "Hardware drop!",
  "Parts detected",
  "Resource logged",
  "Inspecting hardware",
];

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

    // Smooth Dynamic Zoom & Camera State (dontlookup.app zoom in & out)
    let currentZoom = 1.0;
    let targetZoom = 1.0;
    let baseZoomPhase = 0;
    let cameraPanX = 0;
    let cameraPanY = 0;
    let targetPanX = 0;
    let targetPanY = 0;
    let clickZoomTimer = 0;

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

    const handleWheel = (e: WheelEvent) => {
      targetZoom = Math.max(0.75, Math.min(1.45, targetZoom - e.deltaY * 0.0008));
    };
    window.addEventListener("wheel", handleWheel, { passive: true });

    // Pure Monochrome Color Palette: Dull Gray / Charcoal Ink & Warm Paper (No Colors)
    const INK_MAIN = "rgba(42, 46, 54, 0.86)";       // Dense charcoal-black marker ink
    const INK_LIGHT = "rgba(95, 102, 112, 0.55)";   // Secondary sketch lines
    const FILL_PAPER = "rgba(255, 255, 255, 0.85)";  // Solid paper body fill
    const FILL_SHADE = "rgba(215, 220, 228, 0.45)";  // Soft dull gray paper shadow

    // Crowd of Square Shape Bots with Legs (Strictly Monochrome, No Faces)
    const bots: DoodleBot[] = [];
    const botTypes: BotType[] = [
      "boxchibi",
      "boxchibi",
      "towerchibi",
      "visorchibi",
      "minichibi",
      "boxchibi",
      "towerchibi",
      "visorchibi",
      "boxchibi",
      "treadbot",
      "ufobot",
      "spiderchibi",
      "unibot",
      "boxchibi",
      "minichibi",
      "towerchibi",
      "visorchibi",
      "boxchibi",
    ];

    const botCount = 18;
    for (let i = 0; i < botCount; i++) {
      const type = botTypes[i % botTypes.length];
      const scale = 0.92 + (i % 3) * 0.12;
      const alpha = 0.82 + (i % 2) * 0.10;
      const speed = 0.48 + Math.random() * 0.32;

      const rowY = (i / botCount) * (height - 180) + 90;
      const botY = Math.max(75, Math.min(height - 95, rowY + (Math.random() - 0.5) * 40));
      const facing = Math.random() > 0.5 ? 1 : -1;

      bots.push({
        id: i + 1,
        x: Math.random() * (width - 240) + 120,
        y: botY,
        vx: facing * speed,
        vy: type === "ufobot" ? (Math.random() - 0.5) * 0.25 : (Math.random() - 0.5) * 0.15,
        type,
        facing,
        state: "moving",
        stateTimer: Math.random() * 240 + 160,
        walkCycle: Math.random() * 30,
        targetX: Math.random() * width,
        targetY: botY,
        scale,
        alpha,
        speed,
        antennaWobble: Math.random() * Math.PI,
        alertBubbleTimer: 0,
      });
    }

    // Floating Doodle Mechanical Accents (Pure Monochrome Dull Gray)
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
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.20,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.015,
        size: Math.random() * 10 + 24,
        type: doodleItemTypes[i % doodleItemTypes.length],
        alpha: 0.38 + Math.random() * 0.22,
        floatPhase: Math.random() * Math.PI * 2,
      });
    }

    // Interactive Dropped Tokens (Pure Monochrome Hardware: Gears, Nuts, Washers)
    const droppedTokens: DroppedDoodleToken[] = [];

    const spawnDoodleTokens = (worldX: number, worldY: number, count = 3) => {
      const types: DroppedDoodleToken["type"][] = ["gear", "nut", "washer"];
      for (let i = 0; i < count; i++) {
        droppedTokens.push({
          x: worldX,
          y: worldY,
          vx: (Math.random() - 0.5) * 6,
          vy: -Math.random() * 5 - 3.5,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.22,
          radius: Math.random() * 4 + 11,
          type: types[i % types.length],
          bounces: 0,
          settled: false,
          alpha: 0.95,
          life: 400,
        });
      }
    };

    // Click / Tap: Spawns Hardware Tokens & Smoothly Zooms Camera In
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const cx = width / 2;
      const cy = height / 2;
      const worldX = (clientX - cx) / currentZoom + cx + cameraPanX;
      const worldY = (clientY - cy) / currentZoom + cy + cameraPanY;

      spawnDoodleTokens(worldX, worldY, 3);

      targetZoom = 1.25;
      clickZoomTimer = 220;
      targetPanX = (worldX - cx) * 0.35;
      targetPanY = (worldY - cy) * 0.35;

      const sortedBots = [...bots].sort((a, b) => {
        const da = Math.hypot(a.x - worldX, a.y - worldY);
        const db = Math.hypot(b.x - worldX, b.y - worldY);
        return da - db;
      });

      if (sortedBots.length > 0) {
        const nearest = sortedBots[0];
        const dist = Math.hypot(nearest.x - worldX, nearest.y - worldY);
        if (dist < 460) {
          nearest.targetX = worldX + (Math.random() - 0.5) * 45;
          nearest.targetY = worldY + (Math.random() - 0.5) * 30;
          nearest.state = "inspecting";
          nearest.stateTimer = 220;
          nearest.alertBubbleTimer = 160;
          nearest.facing = worldX > nearest.x ? 1 : -1;

          const reaction = DROP_REACTIONS[Math.floor(Math.random() * DROP_REACTIONS.length)];
          nearest.speechBubble = { text: reaction, timer: 150, maxTimer: 150 };
        }
      }

      for (let k = 1; k < Math.min(4, sortedBots.length); k++) {
        const other = sortedBots[k];
        const dist = Math.hypot(other.x - worldX, other.y - worldY);
        if (dist < 420) {
          other.targetX = worldX + (Math.random() - 0.5) * 75;
          other.targetY = worldY + (Math.random() - 0.5) * 40;
          other.state = "inspecting";
          other.stateTimer = 190;
          other.facing = worldX > other.x ? 1 : -1;
        }
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);

    // =========================================================================
    // HAND-DRAWN TACTILE SHAPE PRIMITIVES (Monochrome, No Colors)
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

    // =========================================================================
    // TACTILE SPEECH BUBBLE (Monochrome, dontlookup.app style, continuous tail)
    // =========================================================================
    const drawSpeechBubble = (
      x: number,
      y: number,
      text: string,
      alpha: number
    ) => {
      ctx.save();
      ctx.globalAlpha = Math.min(1, Math.max(0, alpha));
      ctx.font = "700 11px 'Space Grotesk', system-ui, sans-serif";

      const metrics = ctx.measureText(text);
      const textW = metrics.width;
      const padX = 9;
      const bubbleW = Math.max(textW + padX * 2, 40);
      const bubbleH = 22;
      const bubbleX = x - bubbleW / 2;
      const bubbleY = y - 44;

      // Hard offset paper shadow
      ctx.fillStyle = "rgba(20, 20, 15, 0.28)";
      ctx.beginPath();
      ctx.roundRect(bubbleX + 2, bubbleY + 2.5, bubbleW, bubbleH, 6);
      ctx.fill();

      // Paper white background
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.roundRect(bubbleX, bubbleY, bubbleW, bubbleH, 6);
      ctx.fill();
      ctx.stroke();

      // Continuous tail
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(x - 5, bubbleY + bubbleH - 0.5);
      ctx.lineTo(x, bubbleY + bubbleH + 6);
      ctx.lineTo(x + 5, bubbleY + bubbleH - 0.5);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x - 5, bubbleY + bubbleH - 0.5);
      ctx.lineTo(x, bubbleY + bubbleH + 6);
      ctx.lineTo(x + 5, bubbleY + bubbleH - 0.5);
      ctx.stroke();

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(x - 4, bubbleY + bubbleH - 0.5);
      ctx.lineTo(x + 4, bubbleY + bubbleH - 0.5);
      ctx.stroke();

      // Text in dense charcoal ink
      ctx.fillStyle = INK_MAIN;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, x, bubbleY + bubbleH / 2);

      ctx.restore();
    };

    // Monochrome Alert / Ping Bubble [ ! ]
    const drawAlertBubble = (x: number, y: number, timer: number) => {
      const progress = 1 - timer / 160;
      const floatY = y - 40 - progress * 20;
      const alpha = timer < 30 ? timer / 30 : 0.90;
      const pulse = 1 + Math.sin(progress * Math.PI * 3) * 0.12;

      ctx.save();
      ctx.translate(x, floatY);
      ctx.scale(pulse, pulse);
      ctx.globalAlpha = alpha;

      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.0;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.roundRect(-9, -10, 18, 17, 5);
      ctx.fill();
      ctx.stroke();

      // Tail
      ctx.beginPath();
      ctx.moveTo(-2.5, 7);
      ctx.lineTo(-4, 11);
      ctx.lineTo(1.5, 7);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Exclamation Mark [ ! ] in dark ink
      ctx.fillStyle = INK_MAIN;
      ctx.font = "800 11px 'Space Grotesk', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("!", 0, -1);

      ctx.restore();
    };

    // =========================================================================
    // SQUARE SHAPE BOTS WITH WALKING LEGS (NO FACES, NO COLORS)
    // =========================================================================

    // 1. CLASSIC SQUARE SHAPE BOT WITH LEGS (Clean geometric architectural body, NO face)
    const drawBoxChibi = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      // Realistic walking gait & bobbing
      const stepPhase = bot.walkCycle * 3.4;
      const walkBob = Math.abs(Math.sin(stepPhase)) * 3;
      const legSwing = Math.sin(stepPhase) * 7;
      ctx.translate(0, -walkBob);

      // Ground shadow
      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 24 + walkBob, 22, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // TWO CUTE WALKING LEGS WITH SHOES
      [-7, 7].forEach((lx, i) => {
        const swing = i === 0 ? legSwing : -legSwing;
        const lift = Math.max(0, -Math.cos(stepPhase + (i === 0 ? 0 : Math.PI))) * 3.5;

        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.4;
        ctx.lineCap = "round";

        const footX = lx + swing * 0.7;
        const footY = 20 - lift;

        ctx.beginPath();
        ctx.moveTo(lx, 12);
        ctx.lineTo(footX, footY);
        ctx.stroke();

        // Rectangular foot pad
        drawDoodleRect(footX - 3.5, footY - 1, 7.5, 4.5, 2, FILL_PAPER, INK_MAIN, 2.0);
      });

      // CLEAN SQUARE BODY (NO FACE: Architectural Mechatronic Panel)
      const bodyW = 28;
      const bodyH = 26;
      drawDoodleRect(-bodyW / 2, -14, bodyW, bodyH, 4, FILL_PAPER, INK_MAIN, 2.5);

      // Clean horizontal division seam / panel line
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-bodyW / 2, -2);
      ctx.lineTo(bodyW / 2, -2);
      ctx.stroke();

      // Minimalist hardware indicator slits / rivets (Tech details, NOT a face)
      [-6, 6].forEach((rx) => {
        ctx.beginPath();
        ctx.moveTo(rx - 2, -7);
        ctx.lineTo(rx + 2, -7);
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.0;
        ctx.stroke();
      });

      // Lower panel rivet dots
      [-6, 6].forEach((bx) => {
        drawDoodleCircle(bx, 5, 1.4, INK_MAIN, INK_MAIN, 1);
      });

      // Side pipe arms that swing with stride
      const armSwing = Math.sin(stepPhase) * 6;
      [-14, 14].forEach((ax, i) => {
        const dir = i === 0 ? -1 : 1;
        const swing = i === 0 ? -armSwing : armSwing;
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.2;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(ax, 0);
        ctx.lineTo(ax + dir * 7, 7 + swing);
        ctx.stroke();

        // Clean clamp hand
        ctx.beginPath();
        ctx.arc(
          ax + dir * 9,
          7 + swing,
          3.0,
          dir === 1 ? 0.7 * Math.PI : -0.3 * Math.PI,
          dir === 1 ? 1.7 * Math.PI : 0.7 * Math.PI
        );
        ctx.stroke();
      });

      // Top Sensor Antenna with Ball
      const wobble = Math.sin(bot.walkCycle * 2.8) * 2.5;
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.lineTo(wobble, -25);
      ctx.stroke();
      drawDoodleCircle(wobble, -27, 3.5, FILL_PAPER, INK_MAIN, 2.0);

      ctx.restore();

      if (bot.speechBubble && bot.speechBubble.timer > 0) {
        drawSpeechBubble(
          bot.x,
          bot.y - 28 * bot.scale,
          bot.speechBubble.text,
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1
        );
      } else if (bot.alertBubbleTimer > 0) {
        drawAlertBubble(bot.x, bot.y, bot.alertBubbleTimer);
      }
    };

    // 2. TALL CUBOID BOT WITH WALKING LEGS (NO FACE)
    const drawTowerChibi = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const stepPhase = bot.walkCycle * 3.2;
      const walkBob = Math.abs(Math.sin(stepPhase)) * 3;
      const legSwing = Math.sin(stepPhase) * 6;
      ctx.translate(0, -walkBob);

      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 25 + walkBob, 20, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Walking legs
      [-7, 7].forEach((lx, i) => {
        const swing = i === 0 ? legSwing : -legSwing;
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(lx, 14);
        ctx.lineTo(lx + swing * 0.7, 21);
        ctx.stroke();
        drawDoodleRect(lx + swing * 0.7 - 3.5, 20, 7.5, 4.5, 2, FILL_PAPER, INK_MAIN, 2.0);
      });

      // Tall cuboid body
      drawDoodleRect(-13, -18, 26, 32, 4, FILL_PAPER, INK_MAIN, 2.5);

      // Clean horizontal seam
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-13, -4);
      ctx.lineTo(13, -4);
      ctx.stroke();

      // Sensor meter slits (NO FACE)
      drawDoodleRect(-7, -13, 14, 5, 1.5, FILL_SHADE, INK_MAIN, 1.6);
      drawDoodleRect(-7, 3, 14, 5, 1.5, FILL_PAPER, INK_MAIN, 1.6);

      // Dual corner sensor pegs
      const antWobble = Math.sin(bot.walkCycle * 2.5) * 2;
      [-7, 7].forEach((ax, i) => {
        const dir = i === 0 ? -1 : 1;
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(ax, -18);
        ctx.lineTo(ax + dir * 4 + antWobble, -27);
        ctx.stroke();
        drawDoodleCircle(ax + dir * 4 + antWobble, -29, 2.8, FILL_PAPER, INK_MAIN, 1.8);
      });

      ctx.restore();

      if (bot.speechBubble && bot.speechBubble.timer > 0) {
        drawSpeechBubble(
          bot.x,
          bot.y - 32 * bot.scale,
          bot.speechBubble.text,
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1
        );
      } else if (bot.alertBubbleTimer > 0) {
        drawAlertBubble(bot.x, bot.y, bot.alertBubbleTimer);
      }
    };

    // 3. WIDE BOX BOT WITH HORIZONTAL SENSOR SLIT & LEGS (NO FACE)
    const drawVisorChibi = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const stepPhase = bot.walkCycle * 3.2;
      const walkBob = Math.abs(Math.sin(stepPhase)) * 2.5;
      const legSwing = Math.sin(stepPhase) * 6;
      ctx.translate(0, -walkBob);

      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 23 + walkBob, 24, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Walking legs
      [-8, 8].forEach((lx, i) => {
        const swing = i === 0 ? legSwing : -legSwing;
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(lx, 11);
        ctx.lineTo(lx + swing * 0.7, 19);
        ctx.stroke();
        drawDoodleRect(lx + swing * 0.7 - 4, 18, 8, 4.5, 2, FILL_PAPER, INK_MAIN, 2.0);
      });

      // Wide box body
      drawDoodleRect(-17, -13, 34, 24, 4, FILL_PAPER, INK_MAIN, 2.5);

      // Side ear brackets
      [-20, 17].forEach((nx) => {
        drawDoodleRect(nx, -5, 3.5, 8, 1.8, FILL_PAPER, INK_MAIN, 2.0);
      });

      // Sleek horizontal sensor optical band (LiDAR / optical slit, NOT a face)
      drawDoodleRect(-12, -7, 24, 5, 2, FILL_SHADE, INK_MAIN, 1.8);
      ctx.fillStyle = INK_MAIN;
      ctx.beginPath();
      ctx.arc(0, -4.5, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Top antenna
      const antWobble = Math.sin(bot.walkCycle * 2.8) * 2;
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(0, -13);
      ctx.lineTo(antWobble, -23);
      ctx.stroke();
      drawDoodleCircle(antWobble, -25, 3.2, FILL_PAPER, INK_MAIN, 2.0);

      ctx.restore();

      if (bot.speechBubble && bot.speechBubble.timer > 0) {
        drawSpeechBubble(
          bot.x,
          bot.y - 28 * bot.scale,
          bot.speechBubble.text,
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1
        );
      } else if (bot.alertBubbleTimer > 0) {
        drawAlertBubble(bot.x, bot.y, bot.alertBubbleTimer);
      }
    };

    // 4. COMPACT CUBE BOT WITH WALKING LEGS (NO FACE)
    const drawMiniChibi = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const stepPhase = bot.walkCycle * 4.2;
      const walkBob = Math.abs(Math.sin(stepPhase)) * 2.5;
      const legSwing = Math.sin(stepPhase) * 5;
      ctx.translate(0, -walkBob);

      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 18 + walkBob, 16, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      [-5, 5].forEach((lx, i) => {
        const swing = i === 0 ? legSwing : -legSwing;
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(lx, 9);
        ctx.lineTo(lx + swing * 0.6, 15);
        ctx.stroke();
        drawDoodleRect(lx + swing * 0.6 - 3, 14, 6, 3.5, 1.5, FILL_PAPER, INK_MAIN, 1.8);
      });

      // Compact cube body
      drawDoodleRect(-11, -11, 22, 20, 3.5, FILL_PAPER, INK_MAIN, 2.4);

      // Clean tech panel lines (NO FACE)
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(-11, -1);
      ctx.lineTo(11, -1);
      ctx.stroke();

      drawDoodleCircle(0, -6, 1.8, INK_MAIN, INK_MAIN, 1);

      // Single sensor pin
      const curl = Math.sin(bot.walkCycle * 3.5) * 2;
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(0, -11);
      ctx.lineTo(curl, -20);
      ctx.stroke();
      drawDoodleCircle(curl, -21, 2.5, FILL_PAPER, INK_MAIN, 1.8);

      ctx.restore();

      if (bot.speechBubble && bot.speechBubble.timer > 0) {
        drawSpeechBubble(
          bot.x,
          bot.y - 24 * bot.scale,
          bot.speechBubble.text,
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1
        );
      } else if (bot.alertBubbleTimer > 0) {
        drawAlertBubble(bot.x, bot.y, bot.alertBubbleTimer);
      }
    };

    // 5. TANK ROVER WITH 3 ROLLING WHEELS (NO FACE)
    const drawTreadBot = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const bob = Math.sin(bot.walkCycle * 3.5) * 1.5;
      ctx.translate(0, bob);

      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 26, 32, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Rubber Tank Tread
      drawDoodleRect(-28, 12, 56, 17, 8.5, FILL_PAPER, INK_MAIN, 2.6);

      // 3 Rolling spoke wheels
      const wheelRot = bot.walkCycle * 2.8;
      [-17, 0, 17].forEach((wx) => {
        ctx.save();
        ctx.translate(wx, 20.5);
        ctx.rotate(wheelRot);
        drawDoodleCircle(0, 0, 6.2, FILL_PAPER, INK_MAIN, 2.0);
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

      drawDoodleRect(-17, -9, 34, 21, 4, FILL_PAPER, INK_MAIN, 2.5);
      drawDoodleRect(-24, -36, 48, 22, 4, FILL_PAPER, INK_MAIN, 2.6);

      // Clean horizontal sensor slit (NO FACE)
      drawDoodleRect(-16, -27, 32, 6, 2, FILL_SHADE, INK_MAIN, 1.8);

      const antWobble = Math.sin(bot.walkCycle * 2.5) * 2;
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(0, -36);
      ctx.lineTo(antWobble, -47);
      ctx.stroke();
      drawDoodleCircle(antWobble, -49, 3.5, FILL_PAPER, INK_MAIN, 2.0);

      ctx.restore();

      if (bot.speechBubble && bot.speechBubble.timer > 0) {
        drawSpeechBubble(
          bot.x,
          bot.y - 36 * bot.scale,
          bot.speechBubble.text,
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1
        );
      } else if (bot.alertBubbleTimer > 0) {
        drawAlertBubble(bot.x, bot.y, bot.alertBubbleTimer);
      }
    };

    // 6. FLOATING SAUCER DRONE (NO FACE)
    const drawUfoBot = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const hoverBob = Math.sin(bot.walkCycle * 2.2) * 6;
      const tilt = Math.sin(bot.walkCycle * 1.5) * 0.10;
      ctx.translate(0, hoverBob);
      ctx.rotate(tilt);

      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 58 - hoverBob, 28, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 4, 18, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.fillStyle = FILL_SHADE;
      ctx.fill();
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 3, 38, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = FILL_PAPER;
      ctx.fill();
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      [-23, -8, 8, 23].forEach((px) => {
        drawDoodleCircle(px, 3, 3.2, FILL_PAPER, INK_MAIN, 1.8);
      });

      // Clear dome (NO FACE inside)
      ctx.beginPath();
      ctx.arc(0, -4, 18, Math.PI, 0);
      ctx.closePath();
      ctx.fillStyle = FILL_PAPER;
      ctx.fill();
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      const antWobble = Math.sin(bot.walkCycle * 3) * 2;
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.quadraticCurveTo(antWobble, -30, antWobble * 0.5, -34);
      ctx.stroke();
      drawDoodleCircle(antWobble * 0.5, -36, 3.5, FILL_PAPER, INK_MAIN, 2.0);

      ctx.restore();

      if (bot.speechBubble && bot.speechBubble.timer > 0) {
        drawSpeechBubble(
          bot.x,
          bot.y - 36 * bot.scale,
          bot.speechBubble.text,
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1
        );
      } else if (bot.alertBubbleTimer > 0) {
        drawAlertBubble(bot.x, bot.y, bot.alertBubbleTimer);
      }
    };

    // 7. COMPACT QUAD-LEG BOT (NO FACE)
    const drawSpiderChibi = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const pitterPatter = Math.abs(Math.sin(bot.walkCycle * 3.8)) * 3.5;
      ctx.translate(0, -pitterPatter);

      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 22 + pitterPatter, 28, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      const legCycle = bot.walkCycle * 3.8;
      [-15, -6, 6, 15].forEach((lx, i) => {
        const swing = Math.sin(legCycle + i * 1.5) * 5;
        const lift = Math.max(0, -Math.cos(legCycle + i * 1.5)) * 4;
        const footX = lx + swing;
        const footY = 17 - lift;

        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(lx * 0.7, 4);
        ctx.quadraticCurveTo(lx * 1.2, 8, footX, footY);
        ctx.stroke();
        drawDoodleCircle(footX, footY, 2.2, INK_MAIN, INK_MAIN, 1);
      });

      // Rounded geometric chassis (NO FACE)
      drawDoodleCircle(0, -2, 21, FILL_PAPER, INK_MAIN, 2.6);

      // Chassis division seam
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(0, -2, 14, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      if (bot.speechBubble && bot.speechBubble.timer > 0) {
        drawSpeechBubble(
          bot.x,
          bot.y - 32 * bot.scale,
          bot.speechBubble.text,
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1
        );
      } else if (bot.alertBubbleTimer > 0) {
        drawAlertBubble(bot.x, bot.y, bot.alertBubbleTimer);
      }
    };

    // 8. UNIBOT ON SINGLE ROLLING WHEEL (NO FACE)
    const drawUniBot = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const bounce = Math.abs(Math.sin(bot.walkCycle * 3.2)) * 4;
      ctx.translate(0, -bounce);

      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 36 + bounce, 24, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      const wheelRot = bot.walkCycle * 3.6;
      ctx.save();
      ctx.translate(0, 24);
      ctx.rotate(wheelRot);
      drawDoodleCircle(0, 0, 13, FILL_PAPER, INK_MAIN, 2.6);
      drawDoodleCircle(0, 0, 6.5, FILL_PAPER, INK_MAIN, 2.0);
      ctx.restore();

      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(0, 12);
      ctx.lineTo(0, 24);
      ctx.stroke();

      // Box body & screen (NO FACE: Oscilloscope grid)
      drawDoodleRect(-17, -9, 34, 21, 4, FILL_PAPER, INK_MAIN, 2.5);
      drawDoodleRect(-22, -37, 44, 24, 4, FILL_PAPER, INK_MAIN, 2.6);
      drawDoodleRect(-17, -32, 34, 14, 2, FILL_SHADE, INK_MAIN, 1.8);

      ctx.restore();

      if (bot.speechBubble && bot.speechBubble.timer > 0) {
        drawSpeechBubble(
          bot.x,
          bot.y - 36 * bot.scale,
          bot.speechBubble.text,
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1
        );
      } else if (bot.alertBubbleTimer > 0) {
        drawAlertBubble(bot.x, bot.y, bot.alertBubbleTimer);
      }
    };

    // =========================================================================
    // MAIN ANIMATION LOOP WITH DYNAMIC ZOOM IN & OUT
    // =========================================================================
    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Compute Dynamic Breathing Zoom & Camera Pan
      baseZoomPhase += 0.005;
      const ambientBreathingZoom = 1.0 + Math.sin(baseZoomPhase * 0.4) * 0.14;

      if (clickZoomTimer > 0) {
        clickZoomTimer--;
        if (clickZoomTimer === 0) {
          targetZoom = 1.0;
          targetPanX = 0;
          targetPanY = 0;
        }
      } else {
        targetZoom = ambientBreathingZoom;
      }

      currentZoom += (targetZoom - currentZoom) * 0.04;
      cameraPanX += (targetPanX - cameraPanX) * 0.04;
      cameraPanY += (targetPanY - cameraPanY) * 0.04;

      const cx = width / 2;
      const cy = height / 2;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(currentZoom, currentZoom);
      ctx.translate(-cx - cameraPanX, -cy - cameraPanY);

      // 2. Render Floating Background Doodle Accents (Pure Monochrome Dull Gray)
      for (const item of floatingDoodles) {
        item.rotation += item.vRot;
        item.floatPhase += 0.02;
        item.x += item.vx + Math.sin(item.floatPhase) * 0.15;
        item.y += item.vy + Math.cos(item.floatPhase) * 0.15;

        if (item.x < -80) item.x = width + 80;
        if (item.x > width + 80) item.x = -80;
        if (item.y < -80) item.y = height + 80;
        if (item.y > height + 80) item.y = -80;

        switch (item.type) {
          case "gear":
            drawDoodleCircle(item.x, item.y, item.size * 0.7, FILL_PAPER, INK_MAIN, 2.0);
            break;
          case "wrench":
            drawDoodleRect(item.x - 3, item.y - 12, 6, 24, 2, FILL_PAPER, INK_MAIN, 2.0);
            break;
          case "nut":
            drawDoodleCircle(item.x, item.y, item.size * 0.5, FILL_PAPER, INK_MAIN, 2.0);
            break;
          case "gauge":
            drawDoodleCircle(item.x, item.y, item.size * 0.6, FILL_PAPER, INK_MAIN, 2.0);
            break;
          case "spring":
            drawDoodleCircle(item.x, item.y, item.size * 0.4, FILL_PAPER, INK_MAIN, 1.8);
            break;
          case "plug":
            drawDoodleRect(item.x - 6, item.y - 6, 12, 12, 3, FILL_PAPER, INK_MAIN, 2.0);
            break;
          case "bubble":
            drawDoodleCircle(item.x, item.y, item.size * 0.35, FILL_PAPER, INK_LIGHT, 1.6);
            break;
        }
      }

      // 3. Render Dropped Interactive Tokens (Hardware Line-Art: Gears, Nuts, Washers)
      const floorY = height - 28;
      for (let i = droppedTokens.length - 1; i >= 0; i--) {
        const tok = droppedTokens[i];
        tok.life--;

        if (tok.life < 50) {
          tok.alpha = (tok.life / 50) * 0.95;
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
            tok.vy = -tok.vy * 0.44;
            tok.vx *= 0.78;
            tok.vRot *= 0.72;
            tok.bounces++;

            if (Math.abs(tok.vy) < 0.7 && tok.bounces >= 3) {
              tok.settled = true;
              tok.vy = 0;
              tok.vx = 0;
            }
          }
        }

        // Clean monochrome hardware drawing (No yellow, No gold)
        ctx.save();
        ctx.translate(tok.x, tok.y);
        ctx.rotate(tok.rotation);
        ctx.globalAlpha = tok.alpha;

        ctx.fillStyle = "rgba(20, 20, 15, 0.25)";
        ctx.beginPath();
        ctx.ellipse(2, 3, tok.radius, tok.radius * 0.85, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = FILL_PAPER;
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(0, 0, tok.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(0, 0, tok.radius * 0.5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }

      // 4. Social Interaction: Crowd of Square Bots Chatting
      for (let i = 0; i < bots.length; i++) {
        for (let j = i + 1; j < bots.length; j++) {
          const b1 = bots[i];
          const b2 = bots[j];
          if (b1.state === "moving" && b2.state === "moving") {
            const dist = Math.hypot(b1.x - b2.x, b1.y - b2.y);
            if (dist < 80 && Math.random() < 0.007) {
              b1.state = "chatting";
              b2.state = "chatting";
              b1.stateTimer = 160;
              b2.stateTimer = 160;
              b1.chatPartnerId = b2.id;
              b2.chatPartnerId = b1.id;
              b1.facing = b2.x > b1.x ? 1 : -1;
              b2.facing = b1.x > b2.x ? 1 : -1;

              const phrase = BOT_PHRASES[Math.floor(Math.random() * BOT_PHRASES.length)];
              b1.speechBubble = { text: phrase, timer: 130, maxTimer: 130 };

              setTimeout(() => {
                if (b2.state === "chatting") {
                  const reply = SOCIAL_REPLIES[Math.floor(Math.random() * SOCIAL_REPLIES.length)];
                  b2.speechBubble = { text: reply, timer: 120, maxTimer: 120 };
                }
              }, 700);
            }
          }
        }
      }

      // 5. Y-Sort All Bots for 2.5D Depth Ordering
      const sortedBots = [...bots].sort((a, b) => a.y - b.y);

      // 6. Update & Render All Square Shape Bots
      for (const bot of sortedBots) {
        bot.stateTimer--;
        if (bot.alertBubbleTimer > 0) {
          bot.alertBubbleTimer--;
        }

        if (bot.speechBubble) {
          bot.speechBubble.timer--;
          if (bot.speechBubble.timer <= 0) {
            bot.speechBubble = undefined;
          }
        }

        if (bot.stateTimer <= 0) {
          if (bot.state === "moving" || bot.state === "inspecting" || bot.state === "chatting") {
            bot.state = "idle";
            bot.stateTimer = Math.random() * 80 + 50;
            bot.chatPartnerId = undefined;
          } else {
            bot.state = "moving";
            bot.stateTimer = Math.random() * 260 + 160;
            bot.targetX = Math.random() * (width - 180) + 90;
            bot.targetY = Math.random() * (height - 180) + 90;
          }
        }

        if (bot.state === "moving" || bot.state === "inspecting") {
          const dx = bot.targetX - bot.x;
          const dy = bot.targetY - bot.y;
          if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
            const dirX = Math.sign(dx);
            bot.vx = dirX * bot.speed;
            bot.vy = Math.sign(dy) * (bot.speed * 0.4);
            bot.facing = dirX as 1 | -1;
            bot.x += bot.vx;
            bot.y += bot.vy;
            bot.walkCycle += 0.05 * (0.85 + bot.speed);
          } else {
            bot.state = "idle";
          }
        }

        bot.x = Math.max(45, Math.min(width - 45, bot.x));
        bot.y = Math.max(70, Math.min(height - 85, bot.y));

        switch (bot.type) {
          case "boxchibi":
            drawBoxChibi(bot);
            break;
          case "towerchibi":
            drawTowerChibi(bot);
            break;
          case "visorchibi":
            drawVisorChibi(bot);
            break;
          case "minichibi":
            drawMiniChibi(bot);
            break;
          case "treadbot":
            drawTreadBot(bot);
            break;
          case "ufobot":
            drawUfoBot(bot);
            break;
          case "spiderchibi":
            drawSpiderChibi(bot);
            break;
          case "unibot":
            drawUniBot(bot);
            break;
          default:
            drawBoxChibi(bot);
        }
      }

      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleWheel);
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
