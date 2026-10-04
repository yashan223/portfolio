import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SpotifyActivity } from "./SpotifyActivity";
import profilePhotoUrl from "../../pfp/image.jpg";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-28 pb-16 lg:pt-32 lg:pb-24"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(1 0 0 / 0.04), transparent 70%)",
      }}
    >
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="hero-aurora hero-aurora--one" />
        <div className="hero-aurora hero-aurora--two" />
        <div className="hero-grid" />
      </div>

      <div className="relative z-20 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Left Column: Executive Header & Bio */}
        <div className="text-center lg:text-left">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="whitespace-nowrap text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl"
          >
            Yashan Perera
          </motion.h1>

          {/* Role Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xl font-semibold text-zinc-300 sm:text-2xl"
          >
            DevOps & Cloud Engineer
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg lg:mx-0 leading-relaxed"
          >
            Motivated and hardworking individual with a positive attitude and a willingness to learn. I am a responsible and adaptable person who enjoys working with others and developing new skills. I am eager to gain experience and contribute positively to a professional team.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start"
          >
            <Button
              asChild
              size="lg"
              className="group rounded-full bg-white text-black hover:bg-zinc-200 font-semibold px-6"
            >
              <a href="#projects">
                View Projects
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="group rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white px-6"
            >
              <a
                href="/YashanPereraCV.pdf"
                download="YashanPereraCV.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <Download className="mr-1.5 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                Download CV
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white px-6"
            >
              <a href="#contact">
                <Mail className="mr-1.5 h-4 w-4" />
                Contact Me
              </a>
            </Button>

            <div className="flex items-center gap-2 pl-1">
              <Button
                asChild
                size="icon"
                variant="outline"
                className="h-11 w-11 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <a
                  href="https://www.linkedin.com/in/yashan-perera/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                size="icon"
                variant="outline"
                className="h-11 w-11 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <a
                  href="https://github.com/yashan223"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Unified Executive Profile & Live Spotify Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative mx-auto flex w-full max-w-xs lg:max-w-sm flex-col gap-3 lg:ml-auto"
        >
          {/* Profile Photo Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/40 p-2 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-white/25">
            {/* Background Glow */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl" />

            {/* Profile Photo */}
            <div className="relative mx-auto w-full overflow-hidden rounded-xl shadow-lg">
              <img
                src={profilePhotoUrl}
                alt="Yashan Perera"
                className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Standalone Spotify Activity Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full"
          >
            <SpotifyActivity />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
