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
  rotation: number;
  rotationSpeed: number;
}

const PARTICLE_COUNT = 50;
const CONNECTION_DISTANCE = 130;
const PARALLAX_STRENGTH = 25;

function createParticles(w: number, h: number): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const depth = 0.2 + Math.random() * 0.8;
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
      fontSize: 10 + depth * 10,
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


      particles.forEach((p) => {
        p.baseY -= p.speed;
        if (p.baseY < -40) {
          p.baseY = h + 40;
          p.baseX = Math.random() * w;
        }

        const wobble =
          Math.sin(elapsed * p.wobbleSpeed + p.wobblePhase) * p.wobbleAmp;

        const parallaxX = mx * PARALLAX_STRENGTH * p.depth;
        const parallaxY = my * PARALLAX_STRENGTH * p.depth * 0.5;

        p.x = p.baseX + wobble + parallaxX;
        p.y = p.baseY + parallaxY;


        p.rotation += p.rotationSpeed;
      });


      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const lineOpacity =
              (1 - dist / CONNECTION_DISTANCE) *
              0.08 *
              Math.min(particles[i].opacity, particles[j].opacity);

            ctx.strokeStyle = `hsla(250, 50%, 65%, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }


      particles.forEach((p) => {
        if (p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50) return;

        const pulse = 0.8 + 0.2 * Math.sin(elapsed * 0.0015 + p.wobblePhase);
        const alpha = p.opacity * pulse;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);


        ctx.shadowColor = `hsla(${p.hue}, 70%, 70%, ${alpha * 0.6})`;
        ctx.shadowBlur = p.fontSize * 0.8;


        ctx.font = `${p.fontSize}px "Fira Code", "JetBrains Mono", "SF Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `hsla(${p.hue}, 60%, 75%, ${alpha})`;
        ctx.fillText(p.symbol, 0, 0);


        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;

        ctx.restore();
      });

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
