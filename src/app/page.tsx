// src/app/page.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import NextImage from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  Instagram,
  MessageCircle,
} from "lucide-react";

import GlowRays from "@/components/ui/GlowRays";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


/* ===================== CONTENT ===================== */

// La misión resumida de NONHUMAN en inglés para la sección HERO (ACTUALIZADO)
const NONHUMAN_HERO_MISSION =
  "NONHUMAN is the first embodied AI research lab in Peru, striving to achieve the capacity of global power countries. Our mission is to understand and build artificial intelligence capable of transcending the virtual world.";

const PROFILE = {
  name: "Diego Bruno Pozo Abregu",
  roleHero:
    "Builder of AI, XR & robotics solutions.",
  // El texto largo se mantiene para el Flip Card, donde es apropiado
  longAbout:
    "I’m a builder with a mechatronics background who enjoys taking ideas from sketch to real-world impact. My work spans AI, XR, and robotics—designing systems, shipping experiments, and iterating quickly with users. I co-founded AIDA (XR + AI-generated content) and DoersFund, where we back fast demos and MVPs through hackathons and hands-on support. I love solving hard problems with small, focused teams and turning prototypes into outcomes. I’m also part of NONHUMAN, an AI research community focused on Embodied AI—spanning LLMs, robotics, autonomous agents and computer vision.\n\nNONHUMAN is the first embodied AI research lab in Perú, a lab striving for capacity equivalent to global power countries. Our mission is to understand and build artificial intelligence capable of transcending the virtual world, endowing it with abilities to interact with the physical environment. We believe that the next great step for AI is its integration into the real world through robots that perceive, act and learn alongside us. We seek to strengthen the bond between humans and machines, developing systems that collaborate with us in daily tasks, expanding our capabilities and mutual understanding.",
  photo: "/diego.webp",
  socials: {
    github: "https://github.com/Pozzzo",
    linkedin: "https://www.linkedin.com/in/diego-pozo-abregu/",
    mailto:
      "mailto:diegopozo1323@gmail.com?subject=Contact%20from%20portfolio",
    instagram: "https://www.instagram.com/diego.abregupozo/",
    whatsapp: "https://wa.me/qr/MRVIPGZ7UIBXI1",
  },
};

const NONHUMAN = {
  name: "NONHUMAN",
  url: "https://www.nonhuman.site/",
  // Volvemos al tagline original para uso en el Navbar/links
  tagline:
    "AI research community exploring LLMs, robotics, autonomous agents and computer vision — focused on Embodied AI.",
};

const DOERS = {
  name: "DoersFund",
  url: "https://doersfund.org",
  tagline:
    "Maker-first foundation helping early projects reach MVP quality with visibility, micro-funding and hands-on acceleration.",
};

const HACKATHON = {
  name: "Blitz Hackathon",
  url: "https://forms.zohopublic.com/santinomav789gm1/form/EmployeeEmergencyContactForm/formperma/ImGOs1SS8_9hfsZd5QIeAsbnfBx1wPKIliD4GSLdT5I",
  scope: "Virtual · LATAM",
  deadline: "Closes Oct 31",
  prize: "$1000 equity-free + direct pass to DoersFund",
};

const SKILL_CHIPS = [
  "XR experiences",
  "Builder / maker",
  "Sports player",
  "Creative coder",
  "Traveler",
];

const PROJECT_GROUPS = [
  {
    groupTitle: "All",
    items: [
      {
        title: "XR prototyping & training",
        blurb:
          "Unity/AR demos and immersive experiences—rapid iterations, UI overlays and interactive flows.",
        tags: ["Unity", "XR", "UX", "Prototyping"],
        links: {
          code: "https://drive.google.com/drive/u/0/folders/1EkYOlrnCwOYOhE246FSJriz-zZz06cRP",
        },
        video: { mp4: "/xr_cover.mp4", poster: "/xr_cover_poster.jpg" },
        codeLabel: "Repository (XR experiences)",
      },
      {
        title: "Conversational NAO with VLM/VLA",
        blurb:
          "Pipeline to connect NAO V6 with GenAI (LLM/VLM). Perception → dialog → action for embodied interactions.",
        tags: ["NAO V6", "LLM", "VLM/VLA", "Embodied AI"],
        links: { demo: "https://www.youtube.com/watch?v=AWuyNfJ0bhQ" },
        video: { mp4: "/nao.mp4", poster: "/nao_poster.jpg" },
      },
      {
        title: "Universal Robot Teleoperation",
        blurb:
          "Remote UR control via VR tracker and Python bridge with safe workspace limits.",
        tags: ["UR3e", "rtde", "VR", "Python"],
        links: { code: "https://github.com/elpis-lab/UR10_Teleop" },
        video: { mp4: "/ur_vr.mp4", poster: "/ur_vr_poster.jpg" },
      },
      {
        title: "TCG Pokémon Search App",
        blurb:
          "Given a photo, identify the card and fetch details from well-known sources. Focus on fast, reliable recognition UX.",
        tags: ["Vision", "Mobile", "Search"],
        links: {},
        image: "/tcg.webp",
        imageFit: "contain" as const,
      },
    ],
  },
];
// ===================================================

/* ===================== HELPERS ===================== */

function SectionReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

function FlipCard({
  photo,
  name,
  aboutText,
}: {
  photo: string;
  name: string;
  aboutText: string;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      className="relative select-none [perspective:1400px] h-[420px] sm:h-[480px] md:h-[560px] lg:h-[600px]"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
      aria-label="Profile flip card"
    >
      <motion.div
        className="relative size-full [transform-style:preserve-3d] rounded-3xl"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden [backface-visibility:hidden]">
          <div className="absolute inset-0 bg-black" />
          <NextImage
            src={photo}
            alt={`${name} portrait`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 32vw"
            className="object-cover opacity-95 mix-blend-lighten"
            priority
          />
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-emerald-400/25" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_20px_60px_rgba(16,185,129,0.12)]" />
          <div className="absolute bottom-3 left-0 right-0 text-center text-[11px] text-white/80">
            Tap / hover to flip
          </div>
        </div>

        {/* BACK — scrollable */}
        <div className="absolute inset-0 rounded-3xl [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden">
          <div className="absolute inset-0 bg-black" />
          {/* Enhanced radial gradient contrast */}
          <div className="absolute inset-0 bg-[radial-gradient(600px_400px_at_80%_10%,rgba(16,185,129,0.35),transparent),radial-gradient(500px_300px_at_10%_90%,rgba(6,182,212,0.3),transparent)]" />
          <div className="absolute inset-0 rounded-3xl ring-1 ring-emerald-400/30" />
          <div className="relative z-10 h-full flex flex-col overflow-y-auto p-6 md:p-8 [-webkit-overflow-scrolling:touch]">
            {/* Added logic to render paragraphs for better text flow */}
            {aboutText.split('\n\n').map((paragraph, index) => (
              <p key={index} className={`text-white/90 text-[0.96rem] leading-6 md:text-[1rem] ${index > 0 ? 'mt-4' : ''}`}>
                {paragraph}
              </p>
            ))}
            <div className="mt-auto pt-4 text-xs text-white/80">
              Let’s build something that ships.
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Sparkle component (new!)
function Sparkle({ className = "" }: { className?: string }) {
  // HOOKS MUST BE CALLED AT THE TOP LEVEL OF THE FUNCTION
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(0);

  useEffect(() => {
    // Generate random positions and sizes for the sparkle
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const s = Math.random() * 2 + 0.5; // size between 0.5px and 2.5px

    setPosition({ x, y });
    setSize(s);
  }, []);

  return (
    <motion.div
      className={`absolute bg-white rounded-full opacity-0 ${className}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${size}px`,
        height: `${size}px`,
        filter: `blur(${size / 2}px)`, // subtle blur
      }}
      animate={{
        opacity: [0, 0.2, 0, 0.3, 0], // subtle flicker
        scale: [1, 1.2, 0.8, 1.1, 1],
      }}
      transition={{
        duration: Math.random() * 8 + 4, // Longer, random duration
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 5, // Random delay to stagger
      }}
    />
  );
}


/* ===================== PAGE ===================== */

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 24 });
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    // Main container
    // Added a subtle background grid pattern using CSS
    <div className="min-h-screen bg-slate-950 text-slate-50 relative
                    [background-image:linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]
                    [background-size:24px_24px]">
        
      {/* progress bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[3px] bg-emerald-400 origin-left"
        style={{ scaleX }}
      />

      {/* NAVBAR */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a
            href="#"
            className="font-bold tracking-tight text-lg sm:text-xl text-white/90 hover:text-white"
            aria-label="Home"
            style={{ fontFamily: "var(--font-grotesk)" }}
          >
            diego.<span className="text-emerald-400">pozo</span>
          </a>

          <div className="hidden md:flex items-center gap-7 text-sm">
            <a href="#projects" className="text-white/80 hover:text-white">
              Projects
            </a>
            <a
              href={NONHUMAN.url}
              target="_blank"
              rel="noreferrer"
              className="text-white/80 hover:text-emerald-300"
            >
              Research
            </a>
            <a
              href={DOERS.url}
              target="_blank"
              rel="noreferrer"
              className="text-white/80 hover:text-white"
            >
              DoersFund
            </a>
            <a href="#contact" className="text-white/80 hover:text-white">
              Contact
            </a>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white/90"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden border-t border-white/10"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-2 text-sm">
                <a
                  href="#projects"
                  className="rounded-lg px-3 py-2 hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  Projects
                </a>
                <a
                  href={NONHUMAN.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg px-3 py-2 hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  Research (NONHUMAN)
                </a>
                <a
                  href={DOERS.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg px-3 py-2 hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  DoersFund
                </a>
                <a
                  href="#contact"
                  className="rounded-lg px-3 py-2 hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* HERO */}
      <header className="relative overflow-hidden">
        {/* Fondo: gradientes más profundos + partículas */}
        <div className="absolute inset-0 -z-20">
          {/* Background Gradient (deeper, more focused) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-teal-900/10 to-emerald-900/5" />
          <div className="absolute right-[-10%] top-[-20%] h-[70vw] w-[70vw] max-h-[900px] max-w-[900px] rounded-full bg-amber-200/5 blur-3xl" />
          
          {/* Subtle Sparkle effect */}
          {Array.from({ length: 30 }).map((_, i) => (
            <Sparkle key={i} />
          ))}
        </div>

        {/* Glow Rays effect */}
        <div className="absolute inset-0 z-0">
          <GlowRays side="both" />
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24 pb-10 md:pb-16">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* TEXT (Se añadió 'relative z-10' para asegurar la interactividad) */}
            <div className="md:col-span-7 lg:col-span-8 relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                Open to collaborations
              </div>

              <h1
                className="mt-4 text-[34px] leading-tight sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold tracking-tight [text-wrap:balance]"
                style={{ fontFamily: "var(--font-grotesk)" }} // Using Grotesk for impact
              >
                Diego Bruno
                <br className="hidden sm:block" /> Pozo Abregu
              </h1>

              {/* Badges: Member of NONHUMAN (Clickable) & Co-founder of DoersFund (Clickable) */}
              <div className="mt-3 flex flex-wrap gap-2 items-center">
                <a
                  href={NONHUMAN.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-200 hover:bg-emerald-500/15"
                  title="NONHUMAN — AI Research Community"
                >
                  Member of{" "}
                  <span className="underline decoration-emerald-400/60 underline-offset-4">
                    {NONHUMAN.name}
                  </span>
                </a>
                
                <a
                  href={DOERS.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-200 hover:bg-emerald-500/15"
                  title="Co-founder at DoersFund"
                >
                  Co-founder of{" "}
                  <span className="underline decoration-emerald-400/60 underline-offset-4">
                    {DOERS.name}
                  </span>
                </a>
              </div>
              {/* End Badges */}

              <p className="mt-3 text-base sm:text-lg md:text-2xl text-white/95 max-w-2xl sm:max-w-3xl">
                {PROFILE.roleHero}
              </p>

              {/* Bloque 1: Descripción Resumida de NONHUMAN (Ahora en inglés) */}
              <p className="mt-3 text-white/90 max-w-4xl">
                <a
                  href={NONHUMAN.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-white/95 underline decoration-emerald-400/60 underline-offset-4 hover:text-emerald-300"
                >
                  {NONHUMAN.name}
                </a>{" "}
                — {NONHUMAN_HERO_MISSION}
              </p>

              {/* Bloque 2: Descripción breve de DoersFund restaurada */}
              <p className="mt-2 text-white/80">
                Co-founder at{" "}
                <a
                  href={DOERS.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-emerald-400/60 underline-offset-4 hover:text-emerald-300"
                >
                  {DOERS.name}
                </a>{" "}
                — {DOERS.tagline}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#contact">
                  <Button className="rounded-2xl bg-emerald-500 hover:bg-emerald-400 transition-colors text-slate-950 font-semibold shadow-lg shadow-emerald-500/30">
                    Let’s talk
                  </Button>
                </a>
                <a href={PROFILE.socials.github} target="_blank" rel="noreferrer">
                  <Button variant="ghost" className="rounded-2xl text-emerald-400 border border-emerald-400/30 hover:bg-emerald-500/10 hover:border-emerald-400">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                </a>
                <a
                  href={PROFILE.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="ghost" className="rounded-2xl text-emerald-400 border border-emerald-400/30 hover:bg-emerald-500/10 hover:border-emerald-400">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {SKILL_CHIPS.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* FLIP CARD */}
            <div className="md:col-span-5 lg:col-span-4 order-first md:order-none">
              <FlipCard
                photo={PROFILE.photo}
                name={PROFILE.name}
                aboutText={PROFILE.longAbout}
              />
            </div>
          </div>
        </section>
      </header>

      {/* HACKATHON banner - Looks good, minor text tweak for contrast */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 pb-8">
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5 sm:p-6 md:p-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-200 text-xs uppercase tracking-wide">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                {HACKATHON.scope}
              </div>
              <h3
                className="mt-1 text-xl sm:text-2xl font-semibold text-white"
                style={{ fontFamily: "var(--font-grotesk)" }}
              >
                {HACKATHON.name}
              </h3>
              <p className="mt-1 text-emerald-100/90">
                {HACKATHON.deadline} · Prize: {HACKATHON.prize}
              </p>
            </div>
            <div className="shrink-0">
              <a
                href={HACKATHON.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-xl border border-emerald-400/40 bg-emerald-500/20 px-4 py-2 text-emerald-100 hover:bg-emerald-500/25"
                aria-label="Open Blitz Hackathon registration form"
                title="Blitz Hackathon"
              >
                Blitz Hackathon
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS - No changes needed, card colors are consistent */}
      <section
        id="projects"
        className="max-w-7xl mx-auto px-4 sm:px-6 pb-14 md:pb-20 scroll-mt-28"
      >
        <SectionReveal>
          <h2
            className="text-2xl md:text-3xl font-semibold text-white"
            style={{ fontFamily: "var(--font-grotesk)" }}
          >
            Featured projects
          </h2>
        </SectionReveal>

        {(() => {
          const ALL_PROJECTS = PROJECT_GROUPS.flatMap((g) => g.items);
          return (
            <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-2">
              {ALL_PROJECTS.map((p, i) => (
                <motion.div
                  key={`proj-${i}-${p.title}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="h-full bg-white/5 border-white/10 rounded-2xl backdrop-blur overflow-hidden flex flex-col">
                    <CardContent className="p-0 flex flex-col h-full">
                      {/* Media */}
                      <div className="relative bg-slate-900/40">
                        <div className="relative w-full aspect-[16/9] overflow-hidden">
                          {p.video?.mp4 ? (
                            <video
                              className="absolute inset-0 h-full w-full object-contain p-2 md:p-3"
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              poster={p.video.poster ?? undefined}
                            >
                              <source src={p.video.mp4} type="video/mp4" />
                            </video>
                          ) : p.image ? (
                            <NextImage
                              src={p.image}
                              alt={p.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-contain p-2 md:p-3"
                              priority={i < 2}
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm">
                              No media available
                            </div>
                          )}
                        </div>
                        <div className="absolute inset-0 pointer-events-none border-b border-white/10" />
                      </div>

                      {/* Texto */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h4
                          className="font-semibold text-lg text-white"
                          style={{ fontFamily: "var(--font-grotesk)" }}
                        >
                          {p.title}
                        </h4>
                        <p className="text-white/90 mt-2 text-[1rem] leading-6 flex-1">
                          {p.blurb}
                        </p>

                        {!!p.tags?.length && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {p.tags.map((t) => (
                              <Badge
                                key={t}
                                className="bg-emerald-500/10 text-emerald-200 border-emerald-400/20"
                              >
                                {t}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {(p.links.demo || p.links.code) && (
                          <div className="mt-4 flex gap-5">
                            {p.links.demo && (
                              <a
                                href={p.links.demo}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm inline-flex items-center gap-1 text-white/90 hover:text-white"
                              >
                                <ExternalLink className="h-4 w-4" /> Demo
                              </a>
                            )}
                            {p.links.code && (
                              <a
                                href={p.links.code}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm inline-flex items-center gap-1 text-white/90 hover:text-white"
                              >
                                <Github className="h-4 w-4" />{" "}
                                {p.codeLabel ?? "Code"}
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          );
        })()}
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="max-w-7xl mx-auto px-4 sm:px-6 pb-14 md:pb-16 scroll-mt-28"
      >
        <SectionReveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-7 sm:p-10 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2
                  className="text-2xl md:text-3xl font-semibold"
                  style={{ fontFamily: "var(--font-grotesk)" }}
                >
                  Let’s build something great
                </h2>
                <p className="text-white/70 mt-2 max-w-xl">
                  Reach out for collaborations, consulting or talks. I respond
                  quickly.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={PROFILE.socials.mailto}
                  aria-label="Email"
                  className="inline-flex rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-emerald-500/10"
                >
                  <Mail className="h-5 w-5 text-emerald-400/90" />
                </a>
                <a
                  href={PROFILE.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-emerald-500/10"
                >
                  <Linkedin className="h-5 w-5 text-emerald-400/90" />
                </a>
                <a
                  href={PROFILE.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-emerald-500/10"
                >
                  <Instagram className="h-5 w-5 text-emerald-400/90" />
                </a>
                <a
                  href={PROFILE.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-emerald-500/10"
                >
                  <MessageCircle className="h-5 w-5 text-emerald-400/90" />
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10 text-sm text-white/60 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            © {year} {PROFILE.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href={PROFILE.socials.github}
              className="hover:text-emerald-400"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={PROFILE.socials.linkedin}
              className="hover:text-emerald-400"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={NONHUMAN.url}
              className="hover:text-emerald-300 text-white/70 text-sm"
              target="_blank"
              rel="noreferrer"
            >
              NONHUMAN
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}