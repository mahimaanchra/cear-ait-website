"use client";

import React, { useEffect, useRef } from "react";

export type BotType =
  | "boxchibi"    // Primary: Cute Classic Square Shape Bot with walking legs & spring antenna
  | "towerchibi"  // Tall Square Bot with dual antennas, chest meters & walking legs
  | "visorchibi"  // Wide Square Bot with smiling panoramic visor & walking legs
  | "minichibi"   // Adorable baby Mini Square Bot with big manga eyes & pitter-patter legs
  | "joybot"      // Waving Chibi TV Bot
  | "ufobot"      // Floating cute saucer drone
  | "treadbot"    // Tank rover with 3 rolling wheels in tread
  | "domebot"     // R2-style cute dome chibi with waddling feet
  | "spiderchibi" // Baby marshmallow spiderbot with 4 puppy legs
  | "unibot";     // Bouncy monocycle robot on a single wheel

interface SpeechBubble {
  text: string;
  timer: number;
  maxTimer: number;
  isShout?: boolean;
}

interface DoodleBot {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: BotType;
  facing: 1 | -1;
  state: "moving" | "idle" | "chatting" | "inspecting" | "happy";
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
  speechBubble?: SpeechBubble;
  chatPartnerId?: number;
  heartBubbleTimer: number;
  colorAccent?: string; // Subtle pastel tint for chest panel / badge
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
  type: "coin" | "gear" | "nut" | "washer";
  bounces: number;
  settled: boolean;
  alpha: number;
  life: number;
}

// Dialogues inspired by dontlookup.app crowd banter, tailored for CEAR AIT
const BOT_PHRASES = [
  "Beep boop! 🤖",
  "Wartech 2026! 🏆",
  "AI model synced ⚡",
  "Checking LiDAR... 📡",
  "All systems GO! ✨",
  "Battery: 100% 🔋",
  "RoboRace ready 🏎️",
  "Hi human! 👋",
  "SumoBot armor check 🛡️",
  "Drone telemetry OK 🛸",
  "Path optimized 🎯",
  "Calibrating sensors...",
  "Line tracer locked 🏁",
  "Autonomous fleet ready 🦾",
  "Looking up! 👀",
];

const SOCIAL_REPLIES = [
  "All circuits nominal! ✨",
  "Affirmative! 🦾",
  "Scanning arena... 🎯",
  "Full speed ahead! ⚡",
  "Roger that, fellow bot! 🤖",
  "Podium incoming! 🏅",
  "High five! ✋",
];

const DROP_REACTIONS = [
  "Ooh, shiny gear! ⚙️",
  "Hardware drop! 🔩",
  "Parts received! 🛠️",
  "Resource collected! ✨",
  "Tactile coin drop! 🪙",
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

    // Optional user interactive scroll zoom
    const handleWheel = (e: WheelEvent) => {
      // Gentle responsive scroll zoom
      targetZoom = Math.max(0.75, Math.min(1.45, targetZoom - e.deltaY * 0.0008));
    };
    window.addEventListener("wheel", handleWheel, { passive: true });

    // Color Palette: Warm Sketchbook Ink & Paper (dontlookup.app tactile physics)
    const INK_MAIN = "rgba(42, 46, 54, 0.86)";       // Dense charcoal-black marker ink
    const INK_LIGHT = "rgba(95, 102, 112, 0.55)";   // Secondary sketch lines
    const FILL_PAPER = "rgba(255, 255, 255, 0.82)";  // Solid paper body fill
    const FILL_SHADE = "rgba(215, 220, 228, 0.45)";  // Soft paper shadow
    const COIN_GOLD = "rgba(242, 195, 26, 0.90)";    // Tactile gold coin fill
    const COIN_DARK = "rgba(201, 143, 6, 0.90)";

    // Crowd of Square Shape Bots with Legs (representing the crowd from dontlookup.app)
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
      "joybot",
      "ufobot",
      "treadbot",
      "domebot",
      "spiderchibi",
      "unibot",
      "boxchibi",
      "minichibi",
      "towerchibi",
      "visorchibi",
    ];

    const accents = [
      undefined,
      "rgba(248, 224, 138, 0.45)", // Soft yellow tint
      "rgba(154, 190, 239, 0.45)", // Soft blue tint
      "rgba(192, 52, 42, 0.25)",   // Soft red tint
    ];

    const botCount = 18;
    for (let i = 0; i < botCount; i++) {
      const type = botTypes[i % botTypes.length];
      const scale = 0.92 + (i % 3) * 0.12; // ~0.92, 1.04, 1.16
      const alpha = 0.82 + (i % 2) * 0.10;
      const speed = 0.48 + Math.random() * 0.32;

      // Distribute evenly across vertical ground plane
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
        blinkTimer: Math.random() * 120 + 80,
        isBlinking: false,
        targetX: Math.random() * width,
        targetY: botY,
        scale,
        alpha,
        speed,
        antennaWobble: Math.random() * Math.PI,
        heartBubbleTimer: 0,
        colorAccent: accents[i % accents.length],
      });
    }

    // Floating Doodle Mechanical Accents
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

    // Interactive Dropped Tokens
    const droppedTokens: DroppedDoodleToken[] = [];

    const spawnDoodleTokens = (worldX: number, worldY: number, count = 3) => {
      const types: DroppedDoodleToken["type"][] = ["coin", "gear", "nut", "washer"];
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

    // Click / Tap Interaction: Spawns Tokens & Smoothly Zooms/Pans Camera toward action
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      // Convert screen coordinates to world coordinates considering current zoom & pan
      const cx = width / 2;
      const cy = height / 2;
      const worldX = (clientX - cx) / currentZoom + cx + cameraPanX;
      const worldY = (clientY - cy) / currentZoom + cy + cameraPanY;

      spawnDoodleTokens(worldX, worldY, 3);

      // Trigger dynamic cinematic zoom-in to focus on the event (just like dontlookup.app!)
      targetZoom = 1.25;
      clickZoomTimer = 220; // Hold zoom for ~3.5 seconds
      targetPanX = (worldX - cx) * 0.35;
      targetPanY = (worldY - cy) * 0.35;

      // Find nearest bots and trigger alert & gathering
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
          nearest.heartBubbleTimer = 160;
          nearest.facing = worldX > nearest.x ? 1 : -1;

          const reaction = DROP_REACTIONS[Math.floor(Math.random() * DROP_REACTIONS.length)];
          nearest.speechBubble = { text: reaction, timer: 150, maxTimer: 150, isShout: true };
        }
      }

      // 2 more nearby square bots scamper over to see
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
    // HAND-DRAWN TACTILE SHAPE PRIMITIVES
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

    // =========================================================================
    // TACTILE SPEECH BUBBLE (Exact style from dontlookup.app)
    // =========================================================================
    const drawSpeechBubble = (
      x: number,
      y: number,
      text: string,
      alpha: number,
      isShout = false
    ) => {
      ctx.save();
      ctx.globalAlpha = Math.min(1, Math.max(0, alpha));
      ctx.font = isShout
        ? "800 12px 'Space Grotesk', system-ui, sans-serif"
        : "700 11px 'Space Grotesk', system-ui, sans-serif";

      const metrics = ctx.measureText(text);
      const textW = metrics.width;
      const padX = 9;
      const bubbleW = Math.max(textW + padX * 2, 42);
      const bubbleH = 23;
      const bubbleX = x - bubbleW / 2;
      const bubbleY = y - 46;

      // Hard offset paper shadow
      ctx.fillStyle = "rgba(20, 20, 15, 0.28)";
      ctx.beginPath();
      ctx.roundRect(bubbleX + 2, bubbleY + 3, bubbleW, bubbleH, 7);
      ctx.fill();

      // Paper white background
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = isShout ? "#c0342a" : INK_MAIN;
      ctx.lineWidth = isShout ? 2.5 : 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.roundRect(bubbleX, bubbleY, bubbleW, bubbleH, 7);
      ctx.fill();
      ctx.stroke();

      // Continuous SVG-style pointed tail pointing at bot head
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(x - 5, bubbleY + bubbleH - 0.5);
      ctx.lineTo(x, bubbleY + bubbleH + 7);
      ctx.lineTo(x + 5, bubbleY + bubbleH - 0.5);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x - 5, bubbleY + bubbleH - 0.5);
      ctx.lineTo(x, bubbleY + bubbleH + 7);
      ctx.lineTo(x + 5, bubbleY + bubbleH - 0.5);
      ctx.stroke();

      // Erase inner chord
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(x - 4, bubbleY + bubbleH - 0.5);
      ctx.lineTo(x + 4, bubbleY + bubbleH - 0.5);
      ctx.stroke();

      ctx.fillStyle = isShout ? "#c0342a" : INK_MAIN;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, x, bubbleY + bubbleH / 2);

      ctx.restore();
    };

    const drawHeartBubble = (x: number, y: number, timer: number) => {
      const progress = 1 - timer / 160;
      const floatY = y - 44 - progress * 24;
      const alpha = timer < 30 ? timer / 30 : 0.90;
      const pulse = 1 + Math.sin(progress * Math.PI * 3) * 0.15;

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
      ctx.roundRect(-12, -12, 24, 20, 7);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-3, 8);
      ctx.lineTo(-5, 13);
      ctx.lineTo(2, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#c0342a";
      ctx.beginPath();
      ctx.moveTo(0, 2);
      ctx.bezierCurveTo(-5, -3, -5, -8, 0, -8);
      ctx.bezierCurveTo(5, -8, 5, -3, 0, 2);
      ctx.fill();

      ctx.restore();
    };

    // =========================================================================
    // SQUARE SHAPE BOTS WITH WALKING LEGS (Replacing people from dontlookup.app)
    // =========================================================================

    // 1. CLASSIC SQUARE SHAPE BOT WITH LEGS (The Primary Citizen Bot)
    const drawBoxChibi = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      // Realistic Walking Gait & Bobbing
      const stepPhase = bot.walkCycle * 3.4;
      const walkBob = Math.abs(Math.sin(stepPhase)) * 3;
      const legSwing = Math.sin(stepPhase) * 7;
      ctx.translate(0, -walkBob);

      // Ground Shadow
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

        // Cute rectangular walking shoe
        drawDoodleRect(footX - 3.5, footY - 1, 7.5, 4.5, 2, FILL_PAPER, INK_MAIN, 2.0);
      });

      // THE CUTE SQUARE BODY
      const bodyW = 28;
      const bodyH = 26;
      drawDoodleRect(-bodyW / 2, -14, bodyW, bodyH, 5, bot.colorAccent || FILL_PAPER, INK_MAIN, 2.5);

      // Cute Jointed Pipe Arms waving with stride
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

        // Open clamp hand
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

      // Spring Antenna with Ball on top of the Square
      const wobble = Math.sin(bot.walkCycle * 2.8) * 2.5;
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.lineTo(wobble, -25);
      ctx.stroke();
      drawDoodleCircle(wobble, -27, 3.5, FILL_PAPER, INK_MAIN, 2.0);

      // Two Round Cartoon Eyes on the Square Face
      [-6.5, 6.5].forEach((ex) => {
        drawDoodleCircle(ex, -4, 5.2, FILL_PAPER, INK_MAIN, 2.0);

        if (!bot.isBlinking) {
          ctx.fillStyle = INK_MAIN;
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 0.8 : -0.8), -4, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 0.3 : -1.3), -4.8, 1.0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(ex, -3.5, 3.5, 1.1 * Math.PI, 1.9 * Math.PI);
          ctx.stroke();
        }
      });

      // Cute Smile on the Square
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.arc(0, -1, 4.5, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();

      // Two cute chest bolts
      [-7, 7].forEach((bx) => {
        drawDoodleCircle(bx, 7, 1.5, INK_MAIN, INK_MAIN, 1);
      });

      ctx.restore();

      if (bot.speechBubble && bot.speechBubble.timer > 0) {
        drawSpeechBubble(
          bot.x,
          bot.y - 28 * bot.scale,
          bot.speechBubble.text,
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1,
          bot.speechBubble.isShout
        );
      } else if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

    // 2. TALL SQUARE / TOWER CHIBI WITH WALKING LEGS
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

      // Tall Square Body
      drawDoodleRect(-13, -18, 26, 32, 5, bot.colorAccent || FILL_PAPER, INK_MAIN, 2.5);

      // Dual Bunny Antennas with balls
      const antWobble = Math.sin(bot.walkCycle * 2.5) * 2;
      [-7, 7].forEach((ax, i) => {
        const dir = i === 0 ? -1 : 1;
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(ax, -18);
        ctx.lineTo(ax + dir * 4 + antWobble, -28);
        ctx.stroke();
        drawDoodleCircle(ax + dir * 4 + antWobble, -30, 3.0, FILL_PAPER, INK_MAIN, 1.8);
      });

      // Big Eyes
      [-5.5, 5.5].forEach((ex) => {
        drawDoodleCircle(ex, -8, 4.5, FILL_PAPER, INK_MAIN, 2.0);
        if (!bot.isBlinking) {
          ctx.fillStyle = INK_MAIN;
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 0.7 : -0.7), -8, 2.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(ex, -7.5, 3.0, 1.1 * Math.PI, 1.9 * Math.PI);
          ctx.stroke();
        }
      });

      // Toothy grill mouth [||||]
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.rect(-6, -2, 12, 4);
      ctx.stroke();
      [-2.5, 0, 2.5].forEach((gx) => {
        ctx.beginPath();
        ctx.moveTo(gx, -2);
        ctx.lineTo(gx, 2);
        ctx.stroke();
      });

      // Two chest meters
      drawDoodleRect(-8, 5, 6, 6, 1.5, FILL_PAPER, INK_MAIN, 1.5);
      drawDoodleRect(2, 5, 6, 6, 1.5, FILL_PAPER, INK_MAIN, 1.5);

      ctx.restore();

      if (bot.speechBubble && bot.speechBubble.timer > 0) {
        drawSpeechBubble(
          bot.x,
          bot.y - 32 * bot.scale,
          bot.speechBubble.text,
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1,
          bot.speechBubble.isShout
        );
      } else if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

    // 3. WIDE VISOR SQUARE BOT WITH LEGS
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

      // Legs
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

      // Wide Square Body
      drawDoodleRect(-17, -13, 34, 24, 5, bot.colorAccent || FILL_PAPER, INK_MAIN, 2.5);

      // Side ear nubs
      [-20, 17].forEach((nx) => {
        drawDoodleRect(nx, -5, 3.5, 8, 1.8, FILL_PAPER, INK_MAIN, 2.0);
      });

      // Visor Screen
      drawDoodleRect(-12, -9, 24, 11, 4, FILL_PAPER, INK_MAIN, 2.0);

      // Smiling curved eyes inside visor (^ ‿ ^)
      [-5.5, 5.5].forEach((ex) => {
        if (!bot.isBlinking) {
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.arc(ex, -3, 3.2, 1.1 * Math.PI, 1.9 * Math.PI);
          ctx.stroke();
        } else {
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(ex - 2.5, -3);
          ctx.lineTo(ex + 2.5, -3);
          ctx.stroke();
        }
      });

      // Small sweet smile
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(0, -1, 3.0, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();

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
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1,
          bot.speechBubble.isShout
        );
      } else if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

    // 4. MINI SQUARE CHIBI WITH PITTER-PATTER LEGS
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

      // Pitter-patter legs
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

      // Mini Square Body
      drawDoodleRect(-11, -11, 22, 20, 4, bot.colorAccent || FILL_PAPER, INK_MAIN, 2.4);

      // Huge Shiny Manga Eyes (takes up most of the cute baby square face!)
      [-5, 5].forEach((ex) => {
        drawDoodleCircle(ex, -3, 4.5, FILL_PAPER, INK_MAIN, 2.0);
        if (!bot.isBlinking) {
          ctx.fillStyle = INK_MAIN;
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 0.6 : -0.6), -3, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 0.2 : -1.0), -4, 1.0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(ex, -2.5, 3.0, 1.1 * Math.PI, 1.9 * Math.PI);
          ctx.stroke();
        }
      });

      // Curly pig-tail spring antenna
      const curl = Math.sin(bot.walkCycle * 3.5) * 2;
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(0, -11);
      ctx.quadraticCurveTo(curl, -17, curl * 0.5, -20);
      ctx.stroke();
      drawDoodleCircle(curl * 0.5, -22, 2.8, FILL_PAPER, INK_MAIN, 1.8);

      ctx.restore();

      if (bot.speechBubble && bot.speechBubble.timer > 0) {
        drawSpeechBubble(
          bot.x,
          bot.y - 24 * bot.scale,
          bot.speechBubble.text,
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1,
          bot.speechBubble.isShout
        );
      } else if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

    // =========================================================================
    // FLAGSHIP ROBOTS (JoyBot, UfoBot, TreadBot, DomeBot, SpiderChibi, UniBot)
    // =========================================================================

    const drawJoyBot = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const walkBob = Math.abs(Math.sin(bot.walkCycle * 2.8)) * 3;
      ctx.translate(0, -walkBob);

      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 26 + walkBob, 28, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      const legStep = Math.sin(bot.walkCycle * 2.8) * 6;
      [-8, 8].forEach((lx, i) => {
        const step = i === 0 ? legStep : -legStep;
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(lx, 15);
        ctx.lineTo(lx + step * 0.6, 22);
        ctx.stroke();
        drawDoodleRect(lx + step * 0.6 - 4, 21, 8, 5, 2.5, FILL_PAPER, INK_MAIN, 2.0);
      });

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
      ctx.stroke();

      [-1, 5, 11].forEach((by) => {
        drawDoodleCircle(0, by, 1.8, INK_MAIN, INK_MAIN, 1);
      });

      const armWave = Math.sin(bot.walkCycle * 3.2) * 5;
      [-13, 13].forEach((ax, i) => {
        const dir = i === 0 ? -1 : 1;
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(ax, -4);
        ctx.lineTo(ax + dir * 10, -16 + (dir === 1 ? armWave : -armWave));
        ctx.stroke();

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

      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -7);
      ctx.lineTo(0, -12);
      ctx.stroke();

      drawDoodleRect(-23, -36, 46, 25, 7, FILL_PAPER, INK_MAIN, 2.6);

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

      [-10, 10].forEach((ex) => {
        drawDoodleCircle(ex, -24, 6, FILL_PAPER, INK_MAIN, 2.2);
        if (!bot.isBlinking) {
          ctx.fillStyle = INK_MAIN;
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 1 : -1), -24, 2.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.arc(ex, -23, 4, 1.1 * Math.PI, 1.9 * Math.PI);
          ctx.stroke();
        }
      });

      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(0, -21, 6.5, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();

      ctx.restore();

      if (bot.speechBubble && bot.speechBubble.timer > 0) {
        drawSpeechBubble(
          bot.x,
          bot.y - 36 * bot.scale,
          bot.speechBubble.text,
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1,
          bot.speechBubble.isShout
        );
      } else if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

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

      [-6, 6].forEach((ex) => {
        if (!bot.isBlinking) {
          ctx.fillStyle = INK_MAIN;
          ctx.beginPath();
          ctx.arc(ex, -12, 2.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(ex, -12, 2.5, 1.1 * Math.PI, 1.9 * Math.PI);
          ctx.stroke();
        }
      });

      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.arc(0, -8.5, 4.0, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();

      ctx.restore();

      if (bot.speechBubble && bot.speechBubble.timer > 0) {
        drawSpeechBubble(
          bot.x,
          bot.y - 36 * bot.scale,
          bot.speechBubble.text,
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1,
          bot.speechBubble.isShout
        );
      } else if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

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

      drawDoodleRect(-28, 12, 56, 17, 8.5, FILL_PAPER, INK_MAIN, 2.6);

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
      drawDoodleRect(-24, -36, 48, 22, 5, FILL_PAPER, INK_MAIN, 2.6);

      const antWobble = Math.sin(bot.walkCycle * 2.5) * 2;
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(0, -36);
      ctx.lineTo(antWobble, -47);
      ctx.stroke();
      drawDoodleCircle(antWobble, -49, 3.5, FILL_PAPER, INK_MAIN, 2.0);

      [-11, 11].forEach((ex) => {
        drawDoodleCircle(ex, -25, 6.8, FILL_PAPER, INK_MAIN, 2.2);
        if (!bot.isBlinking) {
          ctx.fillStyle = INK_MAIN;
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 1 : -1), -25, 3.0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.arc(ex, -24, 4.5, 1.1 * Math.PI, 1.9 * Math.PI);
          ctx.stroke();
        }
      });

      ctx.restore();

      if (bot.speechBubble && bot.speechBubble.timer > 0) {
        drawSpeechBubble(
          bot.x,
          bot.y - 36 * bot.scale,
          bot.speechBubble.text,
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1,
          bot.speechBubble.isShout
        );
      } else if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

    const drawDomeBot = (bot: DoodleBot) => {
      ctx.save();
      ctx.translate(bot.x, bot.y);
      ctx.scale(bot.facing * bot.scale, bot.scale);
      ctx.globalAlpha = bot.alpha;

      const waddle = Math.sin(bot.walkCycle * 3.0) * 0.08;
      const walkBob = Math.abs(Math.sin(bot.walkCycle * 3.0)) * 2.5;
      ctx.translate(0, -walkBob);
      ctx.rotate(waddle);

      ctx.fillStyle = FILL_SHADE;
      ctx.beginPath();
      ctx.ellipse(0, 28 + walkBob, 26, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      const footShift = Math.sin(bot.walkCycle * 3.0) * 4;
      [-13, 3].forEach((fx, i) => {
        const shift = i === 0 ? footShift : -footShift;
        drawDoodleRect(fx + shift * 0.5, 20, 10, 8, 4, FILL_PAPER, INK_MAIN, 2.2);
      });

      ctx.beginPath();
      ctx.arc(0, -10, 21, Math.PI, 0);
      ctx.lineTo(21, 20);
      ctx.lineTo(-21, 20);
      ctx.closePath();
      ctx.fillStyle = FILL_PAPER;
      ctx.fill();
      ctx.strokeStyle = INK_MAIN;
      ctx.lineWidth = 2.6;
      ctx.stroke();

      drawDoodleRect(-15, -17, 30, 14, 6, FILL_PAPER, INK_MAIN, 2.2);

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

      ctx.restore();

      if (bot.speechBubble && bot.speechBubble.timer > 0) {
        drawSpeechBubble(
          bot.x,
          bot.y - 32 * bot.scale,
          bot.speechBubble.text,
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1,
          bot.speechBubble.isShout
        );
      } else if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

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

      drawDoodleCircle(0, -2, 21, FILL_PAPER, INK_MAIN, 2.6);

      [-8, 8].forEach((ex) => {
        drawDoodleCircle(ex, -4, 6.8, FILL_PAPER, INK_MAIN, 2.2);
        if (!bot.isBlinking) {
          ctx.fillStyle = INK_MAIN;
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 0.8 : -0.8), -4, 3.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.arc(ex, -3, 4.5, 1.1 * Math.PI, 1.9 * Math.PI);
          ctx.stroke();
        }
      });

      ctx.restore();

      if (bot.speechBubble && bot.speechBubble.timer > 0) {
        drawSpeechBubble(
          bot.x,
          bot.y - 32 * bot.scale,
          bot.speechBubble.text,
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1,
          bot.speechBubble.isShout
        );
      } else if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

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

      drawDoodleRect(-17, -9, 34, 21, 4, FILL_PAPER, INK_MAIN, 2.5);
      drawDoodleRect(-22, -37, 44, 24, 6, FILL_PAPER, INK_MAIN, 2.6);

      [-9, 9].forEach((ex) => {
        drawDoodleCircle(ex, -25, 5.8, FILL_PAPER, INK_MAIN, 2.2);
        if (!bot.isBlinking) {
          ctx.fillStyle = INK_MAIN;
          ctx.beginPath();
          ctx.arc(ex + (bot.facing === 1 ? 1 : -1), -25, 2.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = INK_MAIN;
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.arc(ex, -24, 4.0, 1.1 * Math.PI, 1.9 * Math.PI);
          ctx.stroke();
        }
      });

      ctx.restore();

      if (bot.speechBubble && bot.speechBubble.timer > 0) {
        drawSpeechBubble(
          bot.x,
          bot.y - 36 * bot.scale,
          bot.speechBubble.text,
          bot.speechBubble.timer < 25 ? bot.speechBubble.timer / 25 : 1,
          bot.speechBubble.isShout
        );
      } else if (bot.heartBubbleTimer > 0) {
        drawHeartBubble(bot.x, bot.y, bot.heartBubbleTimer);
      }
    };

    // =========================================================================
    // MAIN ANIMATION LOOP WITH DYNAMIC ZOOM IN & OUT
    // =========================================================================
    const loop = (timestamp: number) => {
      ctx.clearRect(0, 0, width, height);

      // 1. Compute Dynamic Breathing Zoom & Camera Pan (dontlookup.app camera physics)
      baseZoomPhase += 0.005;
      const ambientBreathingZoom = 1.0 + Math.sin(baseZoomPhase * 0.4) * 0.14; // Smooth 0.86x to 1.14x zoom cycle

      if (clickZoomTimer > 0) {
        clickZoomTimer--;
        if (clickZoomTimer === 0) {
          targetZoom = 1.0;
          targetPanX = 0;
          targetPanY = 0;
        }
      } else {
        // Track ambient breathing zoom
        targetZoom = ambientBreathingZoom;
      }

      // Smooth camera interpolation
      currentZoom += (targetZoom - currentZoom) * 0.04;
      cameraPanX += (targetPanX - cameraPanX) * 0.04;
      cameraPanY += (targetPanY - cameraPanY) * 0.04;

      // Apply Camera Viewport Transformation (Zoom In and Out around center)
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

      // 3. Render Dropped Interactive Tokens with Tactile Gravity & Floor Bouncing
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

        // Draw tactile coin/gear
        ctx.save();
        ctx.translate(tok.x, tok.y);
        ctx.rotate(tok.rotation);
        ctx.globalAlpha = tok.alpha;

        ctx.fillStyle = "rgba(20, 20, 15, 0.35)";
        ctx.beginPath();
        ctx.ellipse(2, 3, tok.radius, tok.radius * 0.85, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = COIN_GOLD;
        ctx.strokeStyle = INK_MAIN;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(0, 0, tok.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = COIN_DARK;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(0, 0, tok.radius * 0.72, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = INK_MAIN;
        ctx.font = `800 ${Math.round(tok.radius * 1.1)}px 'Space Grotesk', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("$", 0, 1);

        ctx.restore();
      }

      // 4. Social Interaction: Crowd of Square Bots Chatting with Speech Bubbles
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

      // 5. Y-Sort All Bots for 2.5D Depth Ordering (foreground bots naturally overlap background bots)
      const sortedBots = [...bots].sort((a, b) => a.y - b.y);

      // 6. Update & Render All Square Shape Bots & Friends
      for (const bot of sortedBots) {
        bot.stateTimer--;
        if (bot.heartBubbleTimer > 0) {
          bot.heartBubbleTimer--;
        }

        if (bot.speechBubble) {
          bot.speechBubble.timer--;
          if (bot.speechBubble.timer <= 0) {
            bot.speechBubble = undefined;
          }
        }

        if (bot.stateTimer <= 0) {
          if (bot.state === "moving" || bot.state === "happy" || bot.state === "inspecting" || bot.state === "chatting") {
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

        if (bot.state === "moving" || bot.state === "happy" || bot.state === "inspecting") {
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
          } else if (bot.state !== "happy") {
            bot.state = "idle";
          }
        }

        bot.x = Math.max(45, Math.min(width - 45, bot.x));
        bot.y = Math.max(70, Math.min(height - 85, bot.y));

        bot.blinkTimer--;
        if (bot.blinkTimer <= 0) {
          bot.isBlinking = !bot.isBlinking;
          bot.blinkTimer = bot.isBlinking ? 10 : Math.random() * 180 + 90;
        }

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

      ctx.restore(); // Restore Viewport Transformation

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
