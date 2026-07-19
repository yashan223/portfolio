import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SpotifyActivity } from "./SpotifyActivity";
import profilePhotoUrl from "../../pfp/image.jpg";


export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(1 0 0 / 0.03), transparent 70%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="hero-aurora hero-aurora--one" />
        <div className="hero-aurora hero-aurora--two" />
        <div className="hero-grid" />
      </div>



      <div className="relative z-20 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl"
          >
            Yashan Perera
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl lg:mx-0"
          >
            Student on the path to becoming a DevOps Engineer learning Linux,
            automation, and cloud infrastructure while building real projects along the way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex justify-center lg:justify-start"
          >
            <div className="inline-flex w-full max-w-[400px] flex-col overflow-hidden rounded-md border border-primary/25 bg-background/50 text-left font-mono text-xs shadow-lg backdrop-blur-xl sm:text-sm font-semibold" style={{ boxShadow: "0 0 24px oklch(1 0 0 / 0.05)" }}>
              <div className="flex items-center gap-1.5 border-b border-primary/15 px-3 py-1.5" style={{ backgroundColor: "oklch(0.05 0 0)" }}>
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/70"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/70"></div>
                <span className="ml-2 text-[10px] text-muted-foreground/60">bash</span>
              </div>
              <div className="p-3" style={{ backgroundColor: "oklch(0.02 0 0)" }}>
                <div className="flex pb-1">
                  <span className="mr-2 text-zinc-400">yashan@server</span>
                  <span className="mr-2 text-zinc-500">~</span>
                  <span className="text-zinc-300">$</span>
                  <span className="ml-2 text-slate-300">cat current_status.txt</span>
                </div>
                <div className="mt-1 text-slate-400">
                  &gt;&nbsp;Deploying scalable infrastructure...
                </div>
                <div className="mt-2 flex">
                  <span className="mr-2 text-zinc-400">yashan@server</span>
                  <span className="mr-2 text-zinc-500">~</span>
                  <span className="text-zinc-300">$</span>
                  <span className="ml-2 animate-pulse text-zinc-300">_</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Button
              asChild
              size="lg"
              className="group rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a href="#projects">
                View Projects
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <a href="https://www.linkedin.com/in/yashan-perera/" target="_blank" rel="noreferrer">
                <Linkedin className="mr-1 h-4 w-4" />
                LinkedIn Profile
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <a href="https://github.com/yashan223" target="_blank" rel="noreferrer">
                <Github className="mr-1 h-4 w-4" />
                GitHub Profile
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:ml-auto"
        >
          <div className="hero-orbit hero-orbit--primary" />
          <div className="hero-orbit hero-orbit--secondary" />
          <div className="hero-frame">
            <img
              src={profilePhotoUrl}
              alt="Yashan Perera profile photo"
              className="aspect-square w-full object-cover"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <SpotifyActivity />
        </motion.div>
      </div>
    </section>
  );
}
