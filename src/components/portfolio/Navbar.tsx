import { motion } from "framer-motion";

const links = [
  { href: "#home", label: "Home" },
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
          className="relative flex items-center justify-center rounded-full border px-3 py-3 backdrop-blur-xl sm:px-5"
          style={{
            backgroundColor: "var(--glass-bg)",
            borderColor: "var(--glass-border)",
          }}
        >
          <nav
            aria-label="Primary"
            className="flex w-full items-center justify-between gap-2 text-[11px] sm:text-xs md:gap-7 md:text-sm"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
