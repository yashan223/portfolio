import { useEffect, useRef } from "react";

const SYMBOLS = [
  "{ }",
  "</>",
  "$ _",
  ">>",
  "⚙",
  "☁",
  "⎈",
  "λ",
  "⬡",
  "↻",
  "⌥",
  "▶",
  "🐳",
  "∞",
  "⊞",
  "#!",
  "git",
  "ssh",
  "yml",
  "env",
];

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  speed: number;
  opacity: number;
  wobbleAmp: number;
  wobbleSpeed: number;
  wobblePhase: number;
  depth: number;
  hue: number;
  symbol: string;
  fontSize: number;
  fontString: string;
  rotation: number;
  rotationSpeed: number;
}

const PARTICLE_COUNT = 48;
const CONNECTION_DISTANCE = 130;
const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
const PARALLAX_STRENGTH = 30;

function createParticles(w: number, h: number): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const depth = 0.2 + Math.random() * 0.8;
    const fontSize = Math.round(10 + depth * 10);
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      baseX: Math.random() * w,
      baseY: Math.random() * h,
      speed: 0.1 + Math.random() * 0.3,
      opacity: 0.15 + depth * 0.35,
      wobbleAmp: 12 + Math.random() * 25,
      wobbleSpeed: 0.0004 + Math.random() * 0.0008,
      wobblePhase: Math.random() * Math.PI * 2,
      depth,
      hue: 220 + Math.random() * 80,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      fontSize,
      fontString: `${fontSize}px "Fira Code","JetBrains Mono","SF Mono",monospace`,
      rotation: Math.random() * Math.PI * 0.4 - Math.PI * 0.2,
      rotationSpeed: (Math.random() - 0.5) * 0.0003,
    });
  }

  return particles;
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width;
      canvas.height = rect.height;
      particlesRef.current = createParticles(canvas.width, canvas.height);
    };

    resize();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let startTime: number | null = null;

    const draw = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const w = canvas.width;
      const h = canvas.height;

      if (w === 0 || h === 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x - 0.5;
      const my = mouseRef.current.y - 0.5;

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.baseY -= p.speed;
        if (p.baseY < -40) {
          p.baseY = h + 40;
          p.baseX = Math.random() * w;
        }

        const wobble = Math.sin(elapsed * p.wobbleSpeed + p.wobblePhase) * p.wobbleAmp;
        p.x = p.baseX + wobble + mx * PARALLAX_STRENGTH * p.depth;
        p.y = p.baseY + my * PARALLAX_STRENGTH * p.depth * 0.5;
        p.rotation += p.rotationSpeed;
      }

      const BUCKETS = 4;
      const bucketPaths: Path2D[] = Array.from({ length: BUCKETS }, () => new Path2D());
      const bucketOpacities: number[] = new Array(BUCKETS).fill(0);

      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        if (pi.x < -50 || pi.x > w + 50 || pi.y < -50 || pi.y > h + 50) continue;
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONNECTION_DISTANCE_SQ) {
            const lineOpacity =
              (1 - Math.sqrt(distSq) / CONNECTION_DISTANCE) *
              0.11 *
              Math.min(pi.opacity, pj.opacity);

            const bucket = Math.min(BUCKETS - 1, Math.floor(lineOpacity * BUCKETS / 0.05));
            bucketPaths[bucket].moveTo(pi.x, pi.y);
            bucketPaths[bucket].lineTo(pj.x, pj.y);
            bucketOpacities[bucket] = Math.max(bucketOpacities[bucket], lineOpacity);
          }
        }
      }

      ctx.lineWidth = 0.5;
      for (let b = 0; b < BUCKETS; b++) {
        if (bucketOpacities[b] > 0) {
          ctx.strokeStyle = `hsla(250,50%,65%,${bucketOpacities[b].toFixed(3)})`;
          ctx.stroke(bucketPaths[b]);
        }
      }

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50) continue;

        const pulse = 0.75 + 0.25 * Math.sin(elapsed * 0.0015 + p.wobblePhase);
        const alpha = p.opacity * pulse;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = p.fontString;

        ctx.globalAlpha = alpha * 0.25;
        ctx.fillStyle = `hsl(${p.hue},70%,80%)`;
        ctx.fillText(p.symbol, 0, 0);
        ctx.fillText(p.symbol, 0, 0);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsl(${p.hue},60%,75%)`;
        ctx.fillText(p.symbol, 0, 0);

        ctx.globalAlpha = 1;
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[12]"
      style={{ background: "transparent" }}
      aria-hidden="true"
    />
  );
}
