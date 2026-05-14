import { motion } from "framer-motion";
import { Code2, Server, Wrench } from "lucide-react";

const categories = [
  {
    icon: Server,
    title: "DevOps & Infra",
    items: ["Linux", "Docker", "Nginx", "CI/CD", "GitHub Actions", "Bash"],
  },
  {
    icon: Wrench,
    title: "Tools I'm Learning",
    items: ["Kubernetes", "Terraform", "Ansible", "AWS", "Prometheus", "Grafana"],
  },
  {
    icon: Code2,
    title: "Programming",
    items: ["Python", "JavaScript", "Node.js", "Git", "REST APIs", "SQL"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-sm font-medium uppercase tracking-widest text-primary">Skills</h2>
          <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Tools I work with
          </h3>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 500, damping: 20 } }}
              className="group relative overflow-hidden rounded-2xl border p-6 transition-all duration-150 hover:border-primary/40 hover:bg-white/[0.02] hover:shadow-lg hover:shadow-primary/5"
              style={{
                backgroundColor: "var(--glass-bg)",
                borderColor: "var(--glass-border)",
              }}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/25 bg-white/10 transition-colors duration-150 group-hover:border-primary/50 group-hover:bg-primary/20">
                <cat.icon className="h-5 w-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.45)]" />
              </div>
              <h4 className="text-lg font-semibold">{cat.title}</h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
