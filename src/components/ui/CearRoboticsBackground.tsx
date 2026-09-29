"use client";

import React, { useEffect, useRef } from "react";

export type BotType =
  | "boxchibi"    // Classic Square Bot with walking legs & top antenna (No face, monochrome)
  | "towerchibi"  // Tall Cuboid Bot with dual sensor pegs & walking legs (No face, monochrome)
  | "visorchibi"  // Wide Box Bot with horizontal sensor slit & walking legs (No face, monochrome)
  | "minichibi";  // Compact Cube Bot with sensor peg & walking legs (No face, monochrome)

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
  alertBubbleTimer: number;
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

    // Pure Monochrome Color Palette: Dull Gray / Charcoal Ink & Warm Paper (Zero Colors)
    const INK_MAIN = "rgba(42, 46, 54, 0.86)";       // Dense charcoal-black marker ink
    const INK_LIGHT = "rgba(95, 102, 112, 0.55)";   // Secondary sketch lines
    const FILL_PAPER = "rgba(255, 255, 255, 0.85)";  // Solid paper body fill
    const FILL_SHADE = "rgba(215, 220, 228, 0.45)";  // Soft dull gray paper shadow

    // Exclusively Square Shape Bots with Walking Legs (No Circular Bots, No Faces)
    const bots: DoodleBot[] = [];
    const botTypes: BotType[] = [
      "boxchibi",
      "towerchibi",
      "visorchibi",
      "minichibi",
      "boxchibi",
      "towerchibi",
      "visorchibi",
      "minichibi",
      "boxchibi",
      "towerchibi",
      "visorchibi",
      "minichibi",
      "boxchibi",
      "boxchibi",
    ];

    const botCount = 14;
    for (let i = 0; i < botCount; i++) {
      const type = botTypes[i % botTypes.length];
      const scale = 0.94 + (i % 3) * 0.10;
      const alpha = 0.82 + (i % 2) * 0.10;
      const speed = 0.46 + Math.random() * 0.28;

      // Spawn with guaranteed spacing so no bots ever spawn overlapping
      let spawnX = 0;
      let spawnY = 0;
      let attempts = 0;
      let valid = false;

      while (!valid && attempts < 80) {
        spawnX = Math.random() * (width - 240) + 120;
        spawnY = Math.random() * (height - 180) + 90;
        valid = true;
        for (const existing of bots) {
          if (Math.hypot(existing.x - spawnX, existing.y - spawnY) < 72) {
            valid = false;
            break;
          }
        }
        attempts++;
      }

      const facing = Math.random() > 0.5 ? 1 : -1;

      bots.push({
        id: i + 1,
        x: spawnX,
        y: spawnY,
        vx: facing * speed,
        vy: (Math.random() - 0.5) * 0.15,
        type,
        facing,
        state: "moving",
        stateTimer: Math.random() * 240 + 160,
        walkCycle: Math.random() * 30,
        targetX: Math.random() * (width - 240) + 120,
        targetY: Math.random() * (height - 180) + 90,
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

    // Interactive Dropped Tokens (Hardware Line-Art: Gears, Nuts, Washers)
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

    // Click / Tap: Spawns Tokens & Smoothly Zooms Camera In
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

      for (let k = 1; k < Math.min(3, sortedBots.length); k++) {
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
    // TACTILE SPEECH BUBBLE (Monochrome, continuous tail)
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

      ctx.fillStyle = "rgba(20, 20, 15, 0.28)";
      ctx.beginPath();
      ctx.roundRect(bubbleX + 2, bubbleY + 2.5, bubbleW, bubbleH, 6);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.roundRect(bubbleX, bubbleY, bubbleW, bubbleH, 6);
      ctx.fill();
      ctx.stroke();

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

      ctx.beginPath();
      ctx.moveTo(-2.5, 7);
      ctx.lineTo(-4, 11);
      ctx.lineTo(1.5, 7);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = INK_MAIN;
      ctx.font = "800 11px 'Space Grotesk', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("!", 0, -1);

      ctx.restore();
    };

    // =========================================================================
    // SQUARE SHAPE BOTS WITH WALKING LEGS (NO CIRCULAR BOTS, NO FACES)
    // =========================================================================

    // 1. CLASSIC SQUARE SHAPE BOT WITH LEGS (Architectural Mechatronic Body)
    const drawBoxChibi = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const stepPhase = bot.walkCycle * 3.4;
      const walkBob = Math.abs(Math.sin(stepPhase)) * 3;
      const legSwing = Math.sin(stepPhase) * 7;
      ctx.translate(0, -walkBob);

      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 24 + walkBob, 22, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Walking legs with foot pads
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

        drawDoodleRect(footX - 3.5, footY - 1, 7.5, 4.5, 2, FILL_PAPER, INK_MAIN, 2.0);
      });

      // Square Body (No Face)
      const bodyW = 28;
      const bodyH = 26;
      drawDoodleRect(-bodyW / 2, -14, bodyW, bodyH, 4, FILL_PAPER, INK_MAIN, 2.5);

      // Horizontal division panel seam
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-bodyW / 2, -2);
      ctx.lineTo(bodyW / 2, -2);
      ctx.stroke();

      // Minimalist hardware indicator slits (Tech details, NOT a face)
      [-6, 6].forEach((rx) => {
        ctx.beginPath();
        ctx.moveTo(rx - 2, -7);
        ctx.lineTo(rx + 2, -7);
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.0;
        ctx.stroke();
      });

      [-6, 6].forEach((bx) => {
        drawDoodleCircle(bx, 5, 1.4, INK_MAIN, INK_MAIN, 1);
      });

      // Side pipe arms swinging with stride
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

      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-13, -4);
      ctx.lineTo(13, -4);
      ctx.stroke();

      drawDoodleRect(-7, -13, 14, 5, 1.5, FILL_SHADE, INK_MAIN, 1.6);
      drawDoodleRect(-7, 3, 14, 5, 1.5, FILL_PAPER, INK_MAIN, 1.6);

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

      [-20, 17].forEach((nx) => {
        drawDoodleRect(nx, -5, 3.5, 8, 1.8, FILL_PAPER, INK_MAIN, 2.0);
      });

      drawDoodleRect(-12, -7, 24, 5, 2, FILL_SHADE, INK_MAIN, 1.8);
      ctx.fillStyle = INK_MAIN;
      ctx.beginPath();
      ctx.arc(0, -4.5, 1.5, 0, Math.PI * 2);
      ctx.fill();

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

      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(-11, -1);
      ctx.lineTo(11, -1);
      ctx.stroke();

      drawDoodleCircle(0, -6, 1.8, INK_MAIN, INK_MAIN, 1);

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

    // =========================================================================
    // MAIN ANIMATION LOOP WITH ANTI-OVERLAP PHYSICS & DYNAMIC ZOOM
    // =========================================================================
    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Dynamic Breathing Zoom & Camera Pan
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

      // 2. Render Floating Background Doodle Accents
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

      // 3. Render Dropped Interactive Tokens (Hardware Line-Art)
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

      // 4. Social Interaction: Bots Chatting at a Safe Distance
      for (let i = 0; i < bots.length; i++) {
        for (let j = i + 1; j < bots.length; j++) {
          const b1 = bots[i];
          const b2 = bots[j];
          if (b1.state === "moving" && b2.state === "moving") {
            const dist = Math.hypot(b1.x - b2.x, b1.y - b2.y);
            // Chat distance safely outside collision boundary
            if (dist > 68 && dist < 96 && Math.random() < 0.007) {
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

      // 5. Update State & Movement for All Square Bots
      for (const bot of bots) {
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
            bot.targetX = Math.random() * (width - 240) + 120;
            bot.targetY = Math.random() * (height - 180) + 90;
          }
        }

        if (bot.state === "moving" || bot.state === "inspecting") {
          const dx = bot.targetX - bot.x;
          const dy = bot.targetY - bot.y;
          if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
            const dirX = Math.sign(dx);
            bot.vx = dirX * bot.speed;
            bot.vy = Math.sign(dy) * (bot.speed * 0.35);
            bot.facing = dirX as 1 | -1;
            bot.x += bot.vx;
            bot.y += bot.vy;
            bot.walkCycle += 0.05 * (0.85 + bot.speed);
          } else {
            bot.state = "idle";
          }
        }

        // Clamp inside visible bounds
        bot.x = Math.max(50, Math.min(width - 50, bot.x));
        bot.y = Math.max(75, Math.min(height - 90, bot.y));
      }

      // 6. ANTI-OVERLAP COLLISION AVOIDANCE PHYSICS PASS (Guarantees Bots NEVER Overlap)
      const MIN_DISTANCE = 64; // Clearance so square bodies never overlap
      // Run two relaxation passes to resolve multiple simultaneous proximities smoothly
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < bots.length; i++) {
          for (let j = i + 1; j < bots.length; j++) {
            const b1 = bots[i];
            const b2 = bots[j];
            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const dist = Math.hypot(dx, dy);

            if (dist < MIN_DISTANCE && dist > 0.0001) {
              const overlap = (MIN_DISTANCE - dist) * 0.5;
              const nx = dx / dist;
              const ny = dy / dist;

              // Immediate positional separation pushing both bodies apart
              b1.x -= nx * overlap;
              b1.y -= ny * overlap;
              b2.x += nx * overlap;
              b2.y += ny * overlap;

              // Deflect velocities away from collision axis
              b1.vx -= nx * 0.25;
              b1.vy -= ny * 0.25;
              b2.vx += nx * 0.25;
              b2.vy += ny * 0.25;

              // Redirect movement goals so they steer clear of each other
              b1.targetX += -nx * 40;
              b1.targetY += -ny * 30;
              b2.targetX += nx * 40;
              b2.targetY += ny * 30;
            }
          }
        }
      }

      // Ensure clamped within visible canvas bounds after separation
      for (const bot of bots) {
        bot.x = Math.max(50, Math.min(width - 50, bot.x));
        bot.y = Math.max(75, Math.min(height - 90, bot.y));
      }

      // 7. Y-Sort All Bots for Depth Ordering & Render
      const sortedBots = [...bots].sort((a, b) => a.y - b.y);

      for (const bot of sortedBots) {
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
