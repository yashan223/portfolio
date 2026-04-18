import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const EMAIL = "yashanperera223@icloud.com";

const socials = [
  {
    icon: Github,
    label: "GitHub",
    handle: "@yashan223",
    href: "https://github.com/yashan223",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "Connect with me",
    href: "https://www.linkedin.com/in/yashan-perera-270360267/",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    handle: "@yashan223",
    href: "https://twitter.com/yashan223",
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-28 px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-sm font-medium uppercase tracking-widest text-primary">
            Contact
          </h2>
          <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Let's get in touch
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Open to internships and collaboration.
            The fastest way to reach me is by email.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border p-8 backdrop-blur-xl sm:p-10"
          style={{
            backgroundColor: "var(--glass-bg)",
            borderColor: "var(--glass-border)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(600px circle at 0% 0%, oklch(0.78 0.16 250 / 0.18), transparent 60%), radial-gradient(500px circle at 100% 100%, oklch(0.72 0.18 305 / 0.15), transparent 60%)",
            }}
          />

          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                Email
              </div>
              <a
                href={`mailto:${EMAIL}`}
                className="group flex max-w-full items-start gap-2 text-lg font-semibold tracking-tight transition-colors hover:text-primary sm:items-center sm:text-3xl"
              >
                <span className="break-all leading-tight text-white">
                  {EMAIL}
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <div className="mt-6">
                <Button asChild size="lg" className="rounded-full bg-primary/80 hover:bg-primary/70">
                  <a href={`mailto:${EMAIL}`}>
                    <Mail className="mr-1 h-4 w-4 text-white" />
                    Send me an email
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  whileHover={{ x: 2 }}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                      <s.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{s.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {s.handle}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
