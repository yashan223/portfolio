import { useEffect, useRef } from "react";

export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    target.current = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    current.current = { ...target.current };

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      current.current.x += dx * 0.08;
      current.current.y += dy * 0.08;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.current.x - 300}px, ${current.current.y - 300}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        ref={ref}
        className="absolute h-[600px] w-[600px] rounded-full opacity-60 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.16 250 / 0.35), oklch(0.72 0.18 305 / 0.15) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
