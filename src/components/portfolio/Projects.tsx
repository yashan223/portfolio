import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ExternalLink, GitFork, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
}

type SortKey = "stars" | "latest";

const langColors: Record<string, string> = {
  TypeScript: "oklch(0.7 0.13 235)",
  JavaScript: "oklch(0.85 0.16 90)",
  Python: "oklch(0.7 0.14 250)",
  HTML: "oklch(0.7 0.18 30)",
  CSS: "oklch(0.7 0.15 280)",
  Java: "oklch(0.7 0.15 40)",
  Shell: "oklch(0.7 0.13 145)",
  Go: "oklch(0.75 0.13 200)",
  Rust: "oklch(0.65 0.18 30)",
  PHP: "oklch(0.65 0.13 280)",
  Vue: "oklch(0.75 0.15 155)",
};

function langColor(lang: string | null) {
  if (!lang) return "oklch(0.6 0.02 260)";
  return langColors[lang] ?? "oklch(0.7 0.12 200)";
}

export function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("stars");

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    fetch("https://api.github.com/users/yashan223/repos?per_page=100", { signal: ctrl.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error(`GitHub API responded ${r.status}`);
        return (await r.json()) as Repo[];
      })
      .then((data) => {
        setRepos(data.filter((r) => !r.fork));
      })
      .catch((e: unknown) => {
        if ((e as { name?: string }).name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Failed to load repos");
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, []);

  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => r.language && set.add(r.language));
    return ["all", ...Array.from(set).sort()];
  }, [repos]);

  const filtered = useMemo(() => {
    let list = repos;
    if (language !== "all") list = list.filter((r) => r.language === language);
    list = [...list].sort((a, b) => {
      if (sort === "stars") return b.stargazers_count - a.stargazers_count;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
    return list;
  }, [repos, language, sort]);

  return (
    <section id="projects" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <h2 className="text-sm font-medium uppercase tracking-widest text-primary">Projects</h2>
            <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Live from GitHub
            </h3>
            <p className="mt-3 text-muted-foreground">
              Pulled directly from{" "}
              <a
                href="https://github.com/yashan223"
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline-offset-4 hover:underline"
              >
                @yashan223
              </a>
              .
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[160px] rounded-full border-white/10 bg-white/[0.03] backdrop-blur">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l === "all" ? "All languages" : l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="w-[160px] rounded-full border-white/10 bg-white/[0.03] backdrop-blur">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stars">Most stars</SelectItem>
                <SelectItem value="latest">Recently updated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {error && (
          <div
            className="flex items-center gap-3 rounded-2xl border border-destructive/30 p-6 text-sm"
            style={{ backgroundColor: "oklch(0.65 0.22 25 / 0.08)" }}
          >
            <AlertCircle className="h-5 w-5 text-white" />
            <div>
              <p className="font-medium text-foreground">Couldn't load projects</p>
              <p className="text-muted-foreground">{error}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto rounded-full"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        )}

        {loading && !error && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border p-6 backdrop-blur-xl"
                style={{ backgroundColor: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
              >
                <Skeleton className="mb-4 h-5 w-2/3" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-6 h-4 w-4/5" />
                <div className="flex gap-3">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-muted-foreground">No projects match this filter.</p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-colors hover:border-white/20"
                style={{
                  backgroundColor: "var(--glass-bg)",
                  borderColor: "var(--glass-border)",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(400px circle at 50% 0%, oklch(0.78 0.16 250 / 0.15), transparent 60%)",
                  }}
                />

                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-white" />
                    <h4 className="font-semibold tracking-tight transition-colors group-hover:text-primary">
                      {repo.name}
                    </h4>
                  </div>
                  <ExternalLink className="h-4 w-4 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                </div>

                <p className="relative mt-3 line-clamp-3 flex-1 text-sm text-muted-foreground">
                  {repo.description ?? "No description provided."}
                </p>

                <div className="relative mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: langColor(repo.language) }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-white" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3.5 w-3.5 text-white" />
                    {repo.forks_count}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
