import { motion } from "framer-motion";
import { Github } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <div
          className="flex items-center justify-between rounded-full border px-5 py-3 backdrop-blur-xl"
          style={{
            backgroundColor: "var(--glass-bg)",
            borderColor: "var(--glass-border)",
          }}
        >
          <a href="#" className="font-semibold tracking-tight">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-text)" }}>
              yashan.dev
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="https://github.com/yashan223"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors hover:bg-secondary"
            style={{ borderColor: "var(--glass-border)" }}
          >
            <Github className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
