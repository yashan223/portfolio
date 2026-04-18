import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const tags = [
  "Linux", "Bash", "Docker", "Git", "GitHub Actions",
  "CI/CD", "Nginx", "Networking", "Python", "Node.js", "Cloud",
];

export function About() {
  return (
    <section id="about" className="relative px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-medium uppercase tracking-widest text-primary">About</h2>
          <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            A bit about me
          </h3>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            I'm a student on a mission to become a DevOps Engineer. I love
            tinkering with Linux, automating boring tasks, and learning how
            modern infrastructure is built and deployed. Every project here is
            a step in that journey building, breaking, and learning along the way.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Badge
                  variant="outline"
                  className="rounded-full border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-normal text-muted-foreground backdrop-blur"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
