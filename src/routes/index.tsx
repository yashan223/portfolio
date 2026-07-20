import React, { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";

const ColorBends = React.lazy(() => import("@/components/portfolio/ColorBends"));
const About = React.lazy(() => import("@/components/portfolio/About").then((m) => ({ default: m.About })));
const Projects = React.lazy(() => import("@/components/portfolio/Projects").then((m) => ({ default: m.Projects })));
const Skills = React.lazy(() => import("@/components/portfolio/Skills").then((m) => ({ default: m.Skills })));
const Contact = React.lazy(() => import("@/components/portfolio/Contact").then((m) => ({ default: m.Contact })));
const Footer = React.lazy(() => import("@/components/portfolio/Footer").then((m) => ({ default: m.Footer })));

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
      <div 
        className="pointer-events-none fixed top-0 left-0 z-0 w-full opacity-80"
        style={{ height: "100lvh", minHeight: "100vh" }}
      >
        <Suspense fallback={null}>
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
        </Suspense>
      </div>
      {/* Subtle global ambient lighting to prevent the lower sections from being pitch black */}
      <div 
        className="pointer-events-none fixed top-0 left-0 z-0 w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-background to-background"
        style={{ height: "100lvh", minHeight: "100vh" }}
      />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<div className="min-h-screen" />}>
            <About />
            <Projects />
            <Skills />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}
