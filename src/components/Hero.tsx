"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { profile } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "./icons";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2600);
    return () => clearInterval(t);
  }, []);

  const [first, ...rest] = profile.name.split(" ");

  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-36 sm:pt-44">
      {/* background: grid + glows */}
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-[-12rem] h-[38rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(0_168_232/0.28),transparent)] blur-2xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[-8rem] top-[10rem] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(closest-side,rgb(230_57_70/0.16),transparent)] blur-2xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-slate-line bg-surface/60 px-3.5 py-1.5 text-xs text-slate-text backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-miami opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-miami" />
          </span>
          {profile.status}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mb-5 flex h-6 items-center gap-2 font-mono text-sm font-semibold uppercase tracking-[0.25em] text-caliente"
        >
          <span>&gt;</span>
          <span className="relative inline-block overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={profile.roles[i]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.4, ease }}
                className="inline-block"
              >
                {profile.roles[i]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="inline-block h-4 w-[2px] animate-pulse bg-caliente" />
        </motion.p>

        <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl">
          {[first, rest.join(" ")].map((line, idx) => (
            <span key={idx} className="block overflow-hidden pb-2">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 + idx * 0.12, ease }}
                className={`block ${idx === 1 ? "bg-gradient-to-r from-white via-miami-soft to-miami bg-clip-text text-transparent" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-mute sm:text-xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-miami px-6 py-3 font-semibold text-midnight shadow-[0_0_40px_-8px_rgb(0_168_232/0.7)] transition-shadow hover:shadow-[0_0_60px_-6px_rgb(0_168_232/0.9)]"
          >
            View my work
            <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-line bg-surface/50 px-6 py-3 font-semibold text-white backdrop-blur transition-colors hover:border-caliente/70"
          >
            Get in touch
          </motion.a>

          <div className="ml-1 flex items-center gap-1">
            {[
              { href: profile.github, label: "GitHub", icon: <GithubIcon /> },
              { href: profile.linkedin, label: "LinkedIn", icon: <LinkedinIcon /> },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                whileHover={{ y: -3 }}
                className="grid h-11 w-11 place-items-center rounded-full text-slate-mute transition-colors hover:bg-surface hover:text-miami"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-16 flex items-center gap-2 text-sm text-slate-mute"
        >
          <MapPin size={15} className="text-caliente" /> {profile.location}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-slate-mute hover:text-miami sm:block"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
