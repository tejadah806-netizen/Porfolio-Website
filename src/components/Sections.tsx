"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  Clock,
  Copy,
  GraduationCap,
  Mail,
  Plus,
} from "lucide-react";
import { about, posts, profile, projects, skills, timeline } from "@/data/site";
import { Reveal, SpotlightCard } from "./motion";
import { GithubIcon, LinkedinIcon } from "./icons";

/* ── shared heading: small red label + big bold title ── */
function Heading({
  label,
  title,
  sub,
}: {
  label: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal className="mb-14">
      <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-caliente">
        {label}
      </p>
      <h2 className="text-4xl font-extrabold tracking-[-0.035em] text-white sm:text-6xl">
        {title}
      </h2>
      {sub && (
        <p className="mt-5 max-w-xl text-sm uppercase tracking-[0.18em] text-slate-mute">
          {sub}
        </p>
      )}
    </Reveal>
  );
}

function Section({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

/* ── ABOUT ── */
export function About() {
  return (
    <Section id="about">
      <Heading label="01 · About me" title="Who I am" />
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6 text-lg leading-relaxed text-slate-text">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 self-start">
          {about.facts.map((f, i) => (
            <Reveal key={f.label} delay={0.1 + i * 0.07}>
              <SpotlightCard className="h-full p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-mute">
                  {f.label}
                </p>
                <p className="mt-2 font-semibold text-white">{f.value}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── JOURNEY (education + experience timeline) ── */
export function Journey() {
  return (
    <Section id="journey">
      <Heading
        label="02 · Journey"
        title="Education & experience"
        sub="From the Dominican Republic to NJIT."
      />
      <div className="relative">
        {/* the vertical line draws itself as you scroll */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute left-[19px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-miami via-slate-line to-transparent sm:left-[23px]"
        />
        <ol className="space-y-6">
          {timeline.map((t, i) => {
            const Icon = t.kind === "education" ? GraduationCap : Briefcase;
            return (
              <li key={i} className="relative pl-14 sm:pl-16">
                <Reveal delay={i * 0.05}>
                  <span
                    className={`absolute left-0 top-5 grid h-10 w-10 place-items-center rounded-xl border bg-midnight sm:h-12 sm:w-12 ${
                      t.kind === "education"
                        ? "border-miami/50 text-miami"
                        : "border-slate-line text-slate-text"
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  <SpotlightCard className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-white sm:text-xl">{t.title}</h3>
                        <p className="mt-1 text-slate-text">
                          {t.org} <span className="text-slate-mute">· {t.place}</span>
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 font-mono text-xs ${
                          t.current
                            ? "bg-miami/15 text-miami"
                            : "bg-slate-line/70 text-slate-mute"
                        }`}
                      >
                        {t.date}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-1.5 text-sm text-slate-mute">
                      {t.points.map((p) => (
                        <li key={p} className="flex gap-2.5">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-caliente" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}

/* ── SKILLS ── */
export function Skills() {
  return (
    <Section id="skills">
      <Heading label="03 · Skills" title="What I work with" />
      <div className="grid gap-5 md:grid-cols-3">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.08}>
            <SpotlightCard className="h-full p-7">
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-miami">
                {g.group}
              </p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <motion.span
                    key={s}
                    whileHover={{ y: -3, scale: 1.06 }}
                    className="cursor-default rounded-full border border-slate-line bg-midnight-2 px-3.5 py-1.5 text-sm text-slate-text transition-colors hover:border-miami/60 hover:text-white"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── PROJECTS ── */
export function Projects() {
  return (
    <Section id="projects">
      <Heading
        label="04 · Projects"
        title="Things I've built"
        sub={`${projects.length} projects · more on the way`}
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal
            key={p.title}
            delay={(i % 3) * 0.08}
            className={p.featured ? "md:col-span-2" : ""}
          >
            <SpotlightCard className="group flex h-full flex-col p-7">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-mute">
                  {String(i + 1).padStart(2, "0")}
                  {p.date && <span> · {p.date}</span>}
                </span>
                {p.featured && (
                  <span className="rounded-full bg-caliente/15 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-caliente">
                    Featured
                  </span>
                )}
                {p.inProgress && (
                  <span className="flex items-center gap-1.5 rounded-full bg-miami/15 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-miami">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-miami opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-miami" />
                    </span>
                    In progress
                  </span>
                )}
                {p.comingSoon && (
                  <span className="flex items-center gap-1.5 rounded-full bg-slate-line px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-slate-text">
                    <Clock size={11} /> Coming soon
                  </span>
                )}
              </div>
              <h3
                className={`font-bold tracking-tight text-white transition-colors group-hover:text-miami ${
                  p.featured ? "text-3xl" : "text-xl"
                }`}
              >
                {p.title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-slate-mute">{p.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-midnight-2 px-2.5 py-1 font-mono text-xs text-slate-text"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {(p.live || p.code) && (
                <div className="mt-6 flex gap-5 border-t border-slate-line pt-5 text-sm">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="group/l inline-flex items-center gap-1 font-medium text-white hover:text-miami"
                    >
                      {p.live.includes("itch.io") ? "Play on itch.io" : "Live site"}
                      <ArrowUpRight size={15} className="transition-transform group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5" />
                    </a>
                  )}
                  {p.code && (
                    <a
                      href={p.code}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-mute hover:text-white"
                    >
                      <GithubIcon size={14} /> Code
                    </a>
                  )}
                </div>
              )}
            </SpotlightCard>
          </Reveal>
        ))}
        <Reveal delay={0.1} className="md:col-span-2">
          <motion.a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -6 }}
            className="group flex h-full min-h-[12rem] flex-col justify-between rounded-2xl border border-dashed border-slate-line p-7 transition-colors hover:border-miami/60 hover:bg-miami/[0.04]"
          >
            <GithubIcon size={26} />
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xl font-bold text-white">More on GitHub</p>
                <p className="mt-1 text-slate-mute">
                  Class work, experiments and everything in progress.
                </p>
              </div>
              <ArrowUpRight
                size={28}
                className="shrink-0 text-slate-mute transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-miami"
              />
            </div>
          </motion.a>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── BLOG ── */
export function Blog() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Section id="blog">
      <Heading label="05 · Blog" title="Thoughts & notes" />
      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <SpotlightCard className="h-full p-7">
              <span className="font-mono text-xs text-caliente">#{p.tag}</span>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">{p.title}</h3>
              <p className="mt-3 text-slate-mute">{p.excerpt}</p>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden leading-relaxed text-slate-text"
                  >
                    <span className="block pt-3">{p.body}</span>
                  </motion.p>
                )}
              </AnimatePresence>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-miami hover:text-white"
              >
                <motion.span animate={{ rotate: open === i ? 45 : 0 }}>
                  <Plus size={16} />
                </motion.span>
                {open === i ? "Show less" : "Read more"}
              </button>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── CONTACT ── */
export function Contact() {
  const [copied, setCopied] = useState(false);
  return (
    <Section id="contact">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-slate-line bg-surface/60 px-6 py-16 text-center sm:px-16 sm:py-24">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(0_168_232/0.22),transparent)] blur-2xl" />
          <p className="relative mb-4 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-caliente">
            06 · Contact
          </p>
          <h2 className="relative text-4xl font-extrabold tracking-[-0.035em] text-white sm:text-6xl">
            Let&apos;s work together
          </h2>
          <p className="relative mx-auto mt-5 max-w-lg text-slate-mute">
            Open to internships, IT and cybersecurity opportunities, and web projects. My inbox is
            always open.
          </p>

          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-miami px-6 py-3 font-semibold text-midnight shadow-[0_0_40px_-8px_rgb(0_168_232/0.7)]"
            >
              <Mail size={18} /> {profile.email}
            </motion.a>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(profile.email);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-line px-5 py-3 text-sm text-slate-text transition-colors hover:border-miami hover:text-white"
            >
              {copied ? <Check size={16} className="text-miami" /> : <Copy size={16} />}
              {copied ? "Copied!" : "Copy email"}
            </button>
          </div>

          <div className="relative mt-8 flex justify-center gap-3">
            {[
              { href: profile.github, label: "GitHub", icon: <GithubIcon /> },
              { href: profile.linkedin, label: "LinkedIn", icon: <LinkedinIcon /> },
            ].map((s) => (
              <motion.a
                key={s.label}
                whileHover={{ y: -4 }}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-line bg-midnight/60 px-4 py-2 text-sm text-slate-text transition-colors hover:border-miami/60 hover:text-white"
              >
                {s.icon} {s.label}
              </motion.a>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-slate-mute sm:flex-row sm:px-8">
        <p>
          © 2026 {profile.name}
        </p>
        <p className="font-mono text-xs">
          Built with Next.js · <span className="text-miami">Miami Blue</span> &{" "}
          <span className="text-caliente">Caliente Red</span>
        </p>
      </div>
    </footer>
  );
}
