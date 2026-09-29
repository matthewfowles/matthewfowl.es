"use client";

import { useEffect, useRef } from "react";

const HEX_SIZE = 3;
const PARENT_SCALE = 12;
const PARENT_SIZE = HEX_SIZE * PARENT_SCALE;
const FADE_RATE = 1.38;
const TRAIL_POINTS = 36;
const HEAD_RADIUS = 8;
const SPARK_COUNT = 12;

function mix(a: Rgb, b: Rgb, t: number): Rgb {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  };
}

type Rgb = { r: number; g: number; b: number };
type Hex = { q: number; r: number };
type Spark = { col: number; row: number; t: number; speed: number; life: number; maxLife: number };

function hexKey(hex: Hex) {
  return `${hex.q},${hex.r}`;
}

function hexCenter(hex: Hex) {
  return {
    x: HEX_SIZE * 1.5 * hex.q,
    y: HEX_SIZE * Math.sqrt(3) * (hex.r + hex.q / 2),
  };
}

function axialRound(q: number, r: number): Hex {
  const s = -q - r;
  let rq = Math.round(q);
  let rr = Math.round(r);
  const rs = Math.round(s);
  const qDiff = Math.abs(rq - q);
  const rDiff = Math.abs(rr - r);
  const sDiff = Math.abs(rs - s);

  if (qDiff > rDiff && qDiff > sDiff) rq = -rr - rs;
  else if (rDiff > sDiff) rr = -rq - rs;

  return { q: rq, r: rr };
}

function pickHex(x: number, y: number): Hex {
  const q = ((2 / 3) * x) / HEX_SIZE;
  const r = ((-1 / 3) * x + (Math.sqrt(3) / 3) * y) / HEX_SIZE;
  return axialRound(q, r);
}

function traceHex(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const vx = x + radius * Math.cos(angle);
    const vy = y + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(vx, vy);
    else ctx.lineTo(vx, vy);
  }
  ctx.closePath();
}

function rgba(color: Rgb, alpha: number) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

function readRgb(name: string): Rgb {
  const probe = document.createElement("canvas").getContext("2d");
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!probe) return { r: 200, g: 120, b: 40 };
  probe.fillStyle = value;
  const hex = probe.fillStyle;
  const digits = hex.startsWith("#") ? hex.slice(1) : "c87828";
  return {
    r: Number.parseInt(digits.slice(0, 2), 16),
    g: Number.parseInt(digits.slice(2, 4), 16),
    b: Number.parseInt(digits.slice(4, 6), 16),
  };
}

export function HexagonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lit = new Map<string, { energy: number; color: Rgb }>();
    let base: HTMLCanvasElement | null = null;
    let line = "hsl(0 0% 29%)";
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    let lastTime = 0;
    let lastMove = 0;
    let strength = 1;
    const trail = Array.from({ length: TRAIL_POINTS }, () => ({ x: 0, y: 0 }));
    let trailReady = false;
    let glow = { r: 214, g: 122, b: 28 };
    let glowEnd = { r: 204, g: 72, b: 40 };
    let glowHot = { r: 245, g: 164, b: 51 };
    let sparkColor = { r: 90, g: 160, b: 230 };
    const sparks: Spark[] = [];

    const parentGrid = () => {
      const horiz = PARENT_SIZE * 1.5;
      const vert = PARENT_SIZE * Math.sqrt(3);
      return {
        horiz,
        vert,
        cols: Math.ceil(window.innerWidth / horiz) + 2,
        rows: Math.ceil(window.innerHeight / vert) + 2,
      };
    };

    const respawnSpark = (spark: Spark) => {
      const { cols, rows } = parentGrid();
      spark.col = Math.floor(Math.random() * cols) - 1;
      spark.row = Math.floor(Math.random() * rows) - 1;
      spark.t = Math.random();
      spark.speed = (0.08 + Math.random() * 0.14) * (Math.random() < 0.5 ? 1 : -1);
      spark.maxLife = 5 + Math.random() * 6;
      spark.life = spark.maxLife;
    };

    const readGlow = () => {
      glow = readRgb("--hex-glow");
      glowEnd = readRgb("--hex-glow-end");
      glowHot = readRgb("--hex-glow-hot");
      sparkColor = readRgb("--hex-spark");
    };

    const raise = (hex: Hex, energy: number, color: Rgb) => {
      if (energy < 0.03) return;
      const key = hexKey(hex);
      const current = lit.get(key);
      if (!current) {
        lit.set(key, { energy, color });
        return;
      }
      if (energy < current.energy) return;
      current.color = color;
      current.energy = energy;
    };

    const follow = (dt: number) => {
      if (!pointer) return;
      if (!trailReady) {
        for (const point of trail) {
          point.x = pointer.x;
          point.y = pointer.y;
        }
        trailReady = true;
      }

      const headEase = 1 - Math.pow(0.46, dt * 60);
      const chainEase = 1 - Math.pow(0.83, dt * 60);
      trail[0].x += (pointer.x - trail[0].x) * headEase;
      trail[0].y += (pointer.y - trail[0].y) * headEase;
      for (let i = 1; i < trail.length; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * chainEase;
        trail[i].y += (trail[i - 1].y - trail[i].y) * chainEase;
      }
    };

    const fillDisk = (x: number, y: number, radius: number, progress: number) => {
      const center = pickHex(x, y);
      const rings = Math.max(0, Math.ceil(radius));
      const life = 0.7 + 0.3 * (1 - progress);
      const hue = Math.min(1, progress * 2.4);
      const alongColor = mix(glow, glowEnd, hue);

      for (let dq = -rings; dq <= rings; dq++) {
        for (let dr = -rings; dr <= rings; dr++) {
          const dist = Math.max(Math.abs(dq), Math.abs(dr), Math.abs(-dq - dr));
          if (dist > radius) continue;
          const across = radius <= 0 ? 0 : dist / radius;
          const edge = Math.exp(-across * across * 2.1);
          const hotspot = Math.exp(-progress * 10) * Math.exp(-across * across * 4);
          const fromHead = Math.hypot(x - trail[0].x, y - trail[0].y);
          const along = Math.min(1, fromHead / (HEAD_RADIUS * HEX_SIZE * 2.2));
          const hold = strength + (1 - strength) * along;
          raise(
            { q: center.q + dq, r: center.r + dr },
            life * edge * hold,
            mix(alongColor, glowHot, hotspot * 0.55),
          );
        }
      }
    };

    const stamp = () => {
      lit.clear();
      const step = HEX_SIZE * Math.sqrt(3);
      fillDisk(trail[0].x, trail[0].y, HEAD_RADIUS, 0);

      for (let i = 0; i < trail.length - 1; i++) {
        const start = trail[i];
        const end = trail[i + 1];
        const distance = Math.hypot(end.x - start.x, end.y - start.y);
        const samples = Math.max(1, Math.ceil(distance / (step * 0.55)));

        for (let sample = 0; sample <= samples; sample++) {
          const t = sample / samples;
          const progress = (i + t) / (trail.length - 1);
          const radius = HEAD_RADIUS * Math.pow(1 - progress, 1.35);
          fillDisk(
            start.x + (end.x - start.x) * t,
            start.y + (end.y - start.y) * t,
            radius,
            progress,
          );
        }
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildBase(dpr);
    };

    const rebuildBase = (dpr: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const styles = getComputedStyle(document.documentElement);
      const background = styles.getPropertyValue("--background").trim();
      line = styles.getPropertyValue("--hex-line").trim();
      readGlow();

      base = document.createElement("canvas");
      base.width = Math.floor(width * dpr);
      base.height = Math.floor(height * dpr);
      const baseCtx = base.getContext("2d");
      if (!baseCtx) return;
      baseCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      baseCtx.fillStyle = background;
      baseCtx.fillRect(0, 0, width, height);
    };

    const paintParents = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const horiz = PARENT_SIZE * 1.5;
      const vert = PARENT_SIZE * Math.sqrt(3);
      const cols = Math.ceil(width / horiz) + 2;
      const rows = Math.ceil(height / vert) + 2;

      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const x = col * horiz;
          const y = row * vert + (Math.abs(col) % 2 === 1 ? vert / 2 : 0);
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const vx = x + PARENT_SIZE * Math.cos(angle);
            const vy = y + PARENT_SIZE * Math.sin(angle);
            if (i === 0) ctx.moveTo(vx, vy);
            else ctx.lineTo(vx, vy);
          }
          ctx.closePath();
        }
      }
      ctx.stroke();
    };

    const hexEdgePoint = (x: number, y: number, progress: number) => {
      const wrapped = ((progress % 1) + 1) % 1;
      const edge = Math.floor(wrapped * 6) % 6;
      const local = wrapped * 6 - edge;
      const a0 = (Math.PI / 3) * edge;
      const a1 = (Math.PI / 3) * ((edge + 1) % 6);
      return {
        x: x + PARENT_SIZE * (Math.cos(a0) + (Math.cos(a1) - Math.cos(a0)) * local),
        y: y + PARENT_SIZE * (Math.sin(a0) + (Math.sin(a1) - Math.sin(a0)) * local),
      };
    };

    const paintSparks = () => {
      const { horiz, vert } = parentGrid();
      const steps = 36;
      const span = 0.28;

      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 1.6;

      for (const spark of sparks) {
        const x = spark.col * horiz;
        const y = spark.row * vert + (Math.abs(spark.col) % 2 === 1 ? vert / 2 : 0);
        const fade = Math.min(1, spark.life / 0.8, (spark.maxLife - spark.life) / 0.8);
        const head = hexEdgePoint(x, y, spark.t);
        const tail = hexEdgePoint(x, y, spark.t - span);
        const gradient = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
        gradient.addColorStop(0, rgba(sparkColor, 0));
        gradient.addColorStop(1, rgba(sparkColor, fade * 0.68));

        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const point = hexEdgePoint(x, y, spark.t - span * (1 - i / steps));
          if (i === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        }
        ctx.strokeStyle = gradient;
        ctx.shadowColor = rgba(sparkColor, fade * 0.4);
        ctx.shadowBlur = 4;
        ctx.stroke();
      }

      ctx.restore();
    };

    const paintLit = () => {
      const bleed = 0.45;
      for (const [key, cell] of lit) {
        const [q, r] = key.split(",").map(Number);
        const { x, y } = hexCenter({ q, r });
        ctx.fillStyle = rgba(cell.color, Math.min(0.32, cell.energy));
        ctx.beginPath();
        traceHex(ctx, x, y, HEX_SIZE + bleed);
        ctx.fill();
      }
    };

    const paint = () => {
      if (!base) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(base, 0, 0);
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintLit();
      paintParents();
      paintSparks();
    };

    const step = (time: number) => {
      const dt = Math.min(0.05, (time - lastTime) / 1000 || 0);
      lastTime = time;
      const keep = Math.exp(-FADE_RATE * dt);

      if (pointer) {
        const idleFor = time - lastMove;
        strength = idleFor < 80 ? 1 : Math.max(0, 1 - (idleFor - 80) / 650);
        follow(dt);
        const tail = trail[trail.length - 1];
        const spread = Math.hypot(tail.x - trail[0].x, tail.y - trail[0].y);
        if (strength <= 0 && spread < 6) lit.clear();
        else stamp();
      } else {
        for (const [key, cell] of lit) {
          cell.energy *= keep;
          if (cell.energy < 0.04) lit.delete(key);
        }
      }
      for (const spark of sparks) {
        spark.t += spark.speed * dt;
        spark.life -= dt;
        if (spark.life <= 0) respawnSpark(spark);
      }

      paint();
      frame = requestAnimationFrame(step);
    };

    const ensureFrame = () => {
      if (frame) return;
      lastTime = performance.now();
      frame = requestAnimationFrame(step);
    };

    const onMouseMove = (event: MouseEvent) => {
      lastMove = performance.now();
      strength = 1;
      pointer = { x: event.clientX, y: event.clientY };
      if (!trailReady) follow(1 / 60);
      stamp();
      paint();
      ensureFrame();
    };

    const onMouseLeave = () => {
      pointer = null;
      trailReady = false;
      ensureFrame();
    };

    const onResize = () => {
      resize();
      paint();
    };

    for (let i = 0; i < SPARK_COUNT; i++) {
      const spark: Spark = { col: 0, row: 0, t: 0, speed: 0, life: 0, maxLife: 1 };
      respawnSpark(spark);
      spark.life = Math.random() * spark.maxLife;
      sparks.push(spark);
    }

    resize();
    lastTime = performance.now();
    frame = requestAnimationFrame(step);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    const observer = new MutationObserver(() => {
      resize();
      paint();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
    />
  );
}
