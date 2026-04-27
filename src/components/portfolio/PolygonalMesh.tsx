import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  origX: number;
  origY: number;
  vx: number;
  vy: number;
}

export function PolygonalMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initializePoints = () => {
      const points: Point[] = [];
      const spacing = 120;
      
      const cols = Math.ceil(canvas.width / spacing) + 3;
      const rows = Math.ceil(canvas.height / spacing) + 3;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * spacing;
          const y = row * spacing;
          points.push({
            x,
            y,
            origX: x,
            origY: y,
            vx: 0,
            vy: 0,
          });
        }
      }
      pointsRef.current = points;
    };

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      
      canvas.width = rect.width;
      canvas.height = rect.height;
      initializePoints();
    };

    resizeCanvas();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const getDistance = (p1: Point, p2: Point) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const isInPhotoArea = (x: number, y: number) => {
      const photoAreaStartX = canvas.width * 0.6;
      const photoAreaStartY = canvas.height * 0.15;
      const photoAreaEndY = canvas.height * 0.85;

      return x > photoAreaStartX && y > photoAreaStartY && y < photoAreaEndY;
    };

    const animate = () => {
      const time = timeRef.current;
      
      if (canvas.width === 0 || canvas.height === 0) {
        animationRef.current = requestAnimationFrame(animate);
        timeRef.current = time + 1;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;
      const mouse = mouseRef.current;

      points.forEach((p) => {
        const angle = time * 0.005 + (p.origX * p.origY) * 0.0001;
        const waveX = Math.sin(angle + p.origX * 0.01) * 20;
        const waveY = Math.cos(angle + p.origY * 0.01) * 20;

        let targetX = p.origX + waveX;
        let targetY = p.origY + waveY;

        if (mouse.active) {
          const distToMouse = getDistance({ x: targetX, y: targetY, origX: 0, origY: 0, vx: 0, vy: 0 }, { x: mouse.x, y: mouse.y, origX: 0, origY: 0, vx: 0, vy: 0 });

          if (distToMouse < 150) {
            const force = (1 - distToMouse / 150) * 30;
            const dx = targetX - mouse.x;
            const dy = targetY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 0) {
              targetX += (dx / dist) * force;
              targetY += (dy / dist) * force;
            }
          }
        }

        p.vx += (targetX - p.x) * 0.1;
        p.vy += (targetY - p.y) * 0.1;

        p.vx *= 0.85;
        p.vy *= 0.85;

        p.x += p.vx;
        p.y += p.vy;
      });

      const connectionDistance = 160;
      const drawnEdges = new Set<string>();

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dist = getDistance(points[i], points[j]);

          if (dist < connectionDistance) {
            const key = `${i}-${j}`;

            if (!drawnEdges.has(key) && !isInPhotoArea(points[i].x, points[i].y) && !isInPhotoArea(points[j].x, points[j].y)) {
              drawnEdges.add(key);

              const opacity = (1 - dist / connectionDistance) * 0.25;

              ctx.strokeStyle = `rgba(120, 119, 198, ${opacity})`;
              ctx.lineWidth = 1.2;
              ctx.beginPath();
              ctx.moveTo(points[i].x, points[i].y);
              ctx.lineTo(points[j].x, points[j].y);
              ctx.stroke();
            }
          }
        }
      }

      points.forEach((p) => {
        if (p.x > -50 && p.x < canvas.width + 50 && p.y > -50 && p.y < canvas.height + 50 && !isInPhotoArea(p.x, p.y)) {
          ctx.fillStyle = "rgba(150, 130, 255, 0.4)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "rgba(120, 119, 198, 0.08)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      timeRef.current = time + 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10"
      style={{
        background: "transparent",
      }}
    />
  );
}
