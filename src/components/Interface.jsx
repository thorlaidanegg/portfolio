import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";

const LINKEDIN_URL = "https://www.linkedin.com/in/ranak-shah";
const GITHUB_URL = "https://github.com/thorlaidanegg";
const NEXTFLOW_LIVE_URL = "https://worktrial-ranak-frontend.vercel.app";
const NEXTFLOW_DEMO_URL = "https://youtu.be/s5hu3QKgzQ8";

const Section = ({ children }) => (
  <motion.section
    className="h-screen w-screen p-8 max-w-screen-2xl mx-auto flex flex-col items-start"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }}
    viewport={{ once: true }}
  >
    {children}
  </motion.section>
);

// ─── Section 2: Skills ───────────────────────────────────────────────────────

const skills = [
  { title: "TypeScript / JavaScript", level: 90 },
  { title: "React / Next.js", level: 85 },
  { title: "Node.js / Go", level: 80 },
  { title: "Distributed Systems", level: 80 },
  { title: "PostgreSQL / Redis", level: 75 },
];

const achievements = [
  "Smart India Hackathon Winner 2023",
  "HackTU Intra-College Winner",
];

const SkillsSection = () => (
  <Section>
    <motion.div whileInView="visible" className="m-10 pt-5" viewport={{ once: true }}>
      <h2 className="text-5xl font-bold text-gray-100">Skills</h2>
      <div className="mt-8 space-y-4">
        {skills.map((skill, index) => (
          <div className="w-64" key={index}>
            <motion.h3
              className="text-xl font-bold text-gray-100"
              initial={{ opacity: 0 }}
              variants={{
                visible: {
                  opacity: 1,
                  transition: { duration: 1, delay: 1 + index * 0.2 },
                },
              }}
            >
              {skill.title}
            </motion.h3>
            <div className="h-2 w-full bg-gray-400 rounded-full mt-2">
              <motion.div
                className="h-full bg-indigo-500 rounded-full"
                style={{ width: `${skill.level}%` }}
                initial={{ scaleX: 0, originX: 0 }}
                variants={{
                  visible: {
                    scaleX: 1,
                    transition: { duration: 1, delay: 1 + index * 0.2 },
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-5xl font-bold mt-10 text-gray-100">Achievements</h2>
        <div className="mt-6 flex flex-col gap-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-indigo-500/50 bg-indigo-500/10 text-indigo-300 text-sm font-medium w-fit"
              initial={{ opacity: 0, x: -20 }}
              variants={{
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, delay: 2.2 + index * 0.2 },
                },
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
              {achievement}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  </Section>
);

// ─── Section 4: Experience ────────────────────────────────────────────────────

const ethosBullets = [
  "Cut infra costs from $2k → $250/mo (87% reduction)",
  "Shipped live prediction markets platform with real-time trading and live users",
  "Architected distributed event-driven backend with 10+ worker pipelines",
  "Led full Web3 → centralized DB migration while maintaining consistency for live users",
  "Built RFQ-based matching and activity-driven trade discovery",
  "Eliminated re-renders on critical trading screens — near-unusable UX into smooth real-time experience",
];

const medlrBullets = [
  "Owned backend during critical transition; maintained stability for healthcare workflows",
  "Shipped frontend features for clinical and patient workflows",
];

const ExperienceCard = ({ company, badge, role, period, bullets, defaultVisible = 2 }) => {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? bullets : bullets.slice(0, defaultVisible);
  const extra = bullets.length - defaultVisible;

  return (
    <motion.div
      className="w-80 bg-white/5 border border-white/10 rounded-xl p-5 mt-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-gray-100">{company}</h3>
            {badge && (
              <span className="text-xs px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30 font-mono">
                {badge}
              </span>
            )}
          </div>
          <p className="text-indigo-400 text-sm font-medium mt-0.5">{role}</p>
        </div>
        <span className="text-gray-500 text-xs whitespace-nowrap flex-shrink-0 mt-1">{period}</span>
      </div>

      <ul className="mt-4 space-y-2">
        <AnimatePresence initial={false}>
          {shown.map((bullet, i) => (
            <motion.li
              key={i}
              className="text-gray-400 text-sm leading-relaxed flex gap-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <span className="text-indigo-500 flex-shrink-0 mt-0.5">—</span>
              {bullet}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {extra > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
        >
          {expanded ? "show less" : `+${extra} more`}
        </button>
      )}
    </motion.div>
  );
};

const ExperienceSection = () => (
  <Section>
    <motion.div whileInView="visible" className="m-10 pt-5" viewport={{ once: true }}>
      <h2 className="text-5xl font-bold text-gray-100">Experience</h2>
      <ExperienceCard
        company="EthosX"
        badge="YC S22"
        role="Software Engineering Intern"
        period="Dec 2024 – May 2026"
        bullets={ethosBullets}
        defaultVisible={2}
      />
      <ExperienceCard
        company="Medlr"
        role="Software Engineering Intern"
        period="Jun – Nov 2024"
        bullets={medlrBullets}
        defaultVisible={2}
      />
    </motion.div>
  </Section>
);

// ─── Section 6: Projects + Socials ───────────────────────────────────────────

const NextFlowCard = () => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setPopupPos({ top: Math.max(16, rect.top), left: rect.right + 16 });
    }
    setHovered(true);
  };

  const tags = ["Next.js", "TypeScript", "Trigger.dev", "Zod", "PostgreSQL"];

  return (
    <>
      <motion.div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHovered(false)}
        className="w-80 bg-white/5 border border-indigo-500/20 rounded-xl p-5 cursor-pointer mt-6"
        whileHover={{ borderColor: "rgba(99,102,241,0.5)", backgroundColor: "rgba(255,255,255,0.08)" }}
        transition={{ duration: 0.2 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-100">NextFlow</h3>
          <span className="text-xs text-gray-500 font-mono">2026</span>
        </div>
        <p className="text-gray-400 text-sm mt-1">Visual AI Workflow Platform</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-500 text-xs mt-4">hover to preview</p>
      </motion.div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="fixed bg-[#0d0d14] border border-indigo-500/30 rounded-xl overflow-hidden"
                style={{
                  top: popupPos.top,
                  left: popupPos.left,
                  width: 480,
                  height: 330,
                  zIndex: 1000,
                  boxShadow: "0 25px 60px rgba(99,102,241,0.15), 0 0 0 1px rgba(99,102,241,0.1)",
                }}
                initial={{ opacity: 0, scale: 0.96, x: -8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500/60" />
                    <span className="text-gray-500 text-xs font-mono">nextflow preview</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      href={NEXTFLOW_DEMO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-400 hover:text-indigo-200 transition-colors font-medium"
                    >
                      ▶ Demo
                    </a>
                    <a
                      href={NEXTFLOW_LIVE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-400 hover:text-indigo-200 transition-colors font-medium"
                    >
                      ↗ Live
                    </a>
                  </div>
                </div>
                <iframe
                  src={NEXTFLOW_LIVE_URL}
                  loading="lazy"
                  style={{ width: "100%", height: "calc(100% - 37px)", border: "none" }}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation-by-user-activation"
                  title="NextFlow preview"
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

const ProjectsSection = () => (
  <Section>
    <motion.div whileInView="visible" className="m-10 pt-5" viewport={{ once: true }}>
      <h2 className="text-5xl font-bold text-gray-100">Projects</h2>
      <NextFlowCard />

      <motion.div
        className="mt-10 flex items-center gap-6"
        initial={{ opacity: 0 }}
        variants={{
          visible: { opacity: 1, transition: { duration: 1, delay: 1.5 } },
        }}
      >
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-400 hover:text-indigo-300 transition-colors text-sm font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-400 hover:text-indigo-300 transition-colors text-sm font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      </motion.div>
    </motion.div>
  </Section>
);

// ─── Root ────────────────────────────────────────────────────────────────────

const Interface = () => (
  <div className="flex flex-col items-center w-screen">
    <Section><h1></h1></Section>
    <Section><h1></h1></Section>
    <SkillsSection />
    <Section><h1></h1></Section>
    <ExperienceSection />
    <Section><h1></h1></Section>
    <ProjectsSection />
  </div>
);

export default Interface;
