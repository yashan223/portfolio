import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Yashan Perera. Built with React & Tailwind.</p>
        <a
          href="https://github.com/yashan223"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 transition-colors hover:text-foreground"
        >
          <Github className="h-4 w-4" />
          @yashan223
        </a>
      </div>
    </footer>
  );
}
