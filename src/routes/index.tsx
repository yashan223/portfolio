import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Contact } from "@/components/portfolio/Contact";
import { MouseGlow } from "@/components/portfolio/MouseGlow";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yashan Perera — Aspiring DevOps Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Yashan Perera — student and aspiring DevOps engineer. Projects pulled live from GitHub.",
      },
      { property: "og:title", content: "Yashan Perera — Aspiring DevOps Engineer" },
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
      <MouseGlow />
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
