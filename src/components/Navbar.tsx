"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav, profile } from "@/data/site";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // highlight the link for the section currently on screen
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((n) => {
      const el = document.querySelector(n.href);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-line/80 bg-midnight/75 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-miami/40 bg-miami/10 font-mono text-sm font-bold text-miami transition-all group-hover:rotate-6 group-hover:bg-miami group-hover:text-midnight">
            {profile.initials}
          </span>
          <span className="hidden font-semibold tracking-tight text-white sm:block">
            {profile.shortName}
            <span className="text-caliente">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === n.href ? "text-white" : "text-slate-mute hover:text-white"
                }`}
              >
                {active === n.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-miami/40 bg-miami/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${profile.email}`}
          className="hidden rounded-full border border-slate-line px-4 py-2 text-sm text-white transition-all hover:border-miami hover:bg-miami hover:text-midnight md:block"
        >
          Say hello
        </a>

        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg border border-slate-line p-2 text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-line bg-midnight/95 px-5 backdrop-blur-xl md:hidden"
          >
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-slate-line/60 py-4 text-slate-text last:border-0"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
