import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import ColorBends from "@/components/portfolio/ColorBends";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yashan Perera - DevOps Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Yashan Perera — student and DevOps engineer.",
      },
      { property: "og:title", content: "Yashan Perera -DevOps Engineer" },
      {
        property: "og:description",
        content: "Student on the path to DevOps. Projects, skills, and learning journey.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-80">
        <ColorBends
          colors={["#111111", "#000000", "#222222"]}
          rotation={90}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          noise={0.15}
          parallax={0.5}
          iterations={1}
          intensity={1.5}
          bandWidth={6}
          transparent
          autoRotate={0}
        />
      </div>
      {/* Subtle global ambient lighting to prevent the lower sections from being pitch black */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-background to-background" />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
