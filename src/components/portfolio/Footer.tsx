export function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-4 sm:py-5">
      <div className="mx-auto flex max-w-6xl items-center justify-center text-center text-xs text-muted-foreground/70">
        <p>© {new Date().getFullYear()} Yashan Perera. All rights reserved.</p>
      </div>
    </footer>
  );
}
