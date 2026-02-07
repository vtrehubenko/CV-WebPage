import { useEffect, useMemo, useRef, useState } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

type Project = {
  title: string;
  description: string;
  highlights: string[];
  stack: string[];
  liveUrl: string;
  repoUrl: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, isVisible };
}

function RevealSection(props: {
  id?: string;
  title?: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  const { ref, isVisible } = useReveal();

  return (
    <section
      id={props.id}
      ref={(node) => {
        // TS-friendly ref assignment
        (ref as any).current = node;
      }}
      className={cx("section", isVisible && "reveal")}
    >
      {(props.title || props.kicker) && (
        <div className="sectionHeader">
          {props.kicker && <div className="kicker">{props.kicker}</div>}
          {props.title && <h2 className="sectionTitle">{props.title}</h2>}
        </div>
      )}
      {props.children}
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="pill">{children}</span>;
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="card">
      <div className="cardTop">
        <h3 className="cardTitle">{p.title}</h3>
        <div className="cardLinks">
          <a className="link" href={p.liveUrl} target="_blank" rel="noreferrer">
            Live
          </a>
          <span className="dot">•</span>
          <a className="link" href={p.repoUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>

      <p className="muted">{p.description}</p>

      <div className="chips">
        {p.stack.map((s) => (
          <Pill key={s}>{s}</Pill>
        ))}
      </div>

      <ul className="list">
        {p.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    </article>
  );
}

export default function App() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const projects: Project[] = useMemo(
    () => [
      {
        title: "TaskFlow — Kanban Task Manager",
        description:
          "Kanban board with drag-and-drop, filters, and clean UI. Built to feel like a real product.",
        highlights: [
          "Drag-and-drop columns using dnd-kit",
          "Filtering by title and priority",
          "Reusable components and TypeScript types",
          "Deployed to Vercel",
        ],
        stack: ["React", "TypeScript", "Vite", "dnd-kit", "CSS"],
        liveUrl: "https://taskflow-snowy-zeta.vercel.app",
        repoUrl: "https://github.com/VolodyaLetov/taskflow",
      },
      {
        title: "Job Tracker — Applications Manager",
        description:
          "Track job applications with structured data, clean form UX, and simple state management.",
        highlights: [
          "CRUD operations for applications",
          "Form validation and better UX",
          "Clear UI for fast scanning",
          "Deployed to Vercel",
        ],
        stack: ["React", "JavaScript", "Vite", "REST-style data model"],
        liveUrl: "https://job-tracker-brown.vercel.app",
        repoUrl: "https://github.com/VolodyaLetov/job-tracker",
      },
      {
        title: "JS Atari Asteroids — Arcade Game",
        description:
          "Classic arcade gameplay recreated with canvas rendering, physics, and collision detection.",
        highlights: [
          "Game loop + canvas rendering",
          "Collision detection and controls",
          "Clean project structure",
          "Deployed to Vercel",
        ],
        stack: ["JavaScript", "HTML5 Canvas", "CSS"],
        liveUrl: "https://js-atari-asteroid.vercel.app",
        repoUrl: "https://github.com/VolodyaLetov/JS-Atari-Asteroid",
      },
    ],
    [],
  );

  return (
    <div className="app">
      <header className="navBar">
        <a className="brand" href="#top">
          Volodymyr • Frontend Dev
        </a>

        <nav className="nav">
          <a href="#about">{t("aboutNav")}</a>
          <a href="#projects">{t("projectsNav")}</a>
          <a href="#skills">{t("skillsNav")}</a>
          <a href="#contact">{t("contactNav")}</a>
        </nav>

        <button
          className="ghostBtn"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          aria-label="Toggle theme"
          type="button"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
        <div className="langSwitch">
          <button
            onClick={() => {
              i18n.changeLanguage("en");
              localStorage.setItem("lang", "en");
            }}
          >
            EN
          </button>

          <button
            onClick={() => {
              i18n.changeLanguage("pl");
              localStorage.setItem("lang", "pl");
            }}
          >
            PL
          </button>
        </div>
      </header>

      <main id="top" className="container">
        {/* HERO */}
        <section className="hero">
          <div className="heroBadge">{t("available")}</div>

          <h1 className="heroTitle">{t("heroTitle")}</h1>

          <p className="heroText">{t("heroSubtitle")}</p>

          <div className="heroActions">
            <a className="btn primary">{t("viewProjects")}</a>
            <a className="btn">{t("contact1")}</a>
            <a className="btn">{t("downloadCV")}</a>
          </div>

          <div className="heroMeta">
            <Pill>Warsaw, PL</Pill>
            <Pill>React</Pill>
            <Pill>TypeScript</Pill>
            <Pill>Git</Pill>
            <Pill>Vercel</Pill>
          </div>
        </section>

        {/* ABOUT */}
        <RevealSection
          id="about"
          kicker={t("aboutKicker")}
          title={t("aboutTitle")}
        >
          <div className="grid2">
            <div className="card soft">
              <h3>{t("whoIAm")}</h3>
              <p>{t("whoIAmText")}</p>
            </div>

            <div className="card soft">
              <h3>{t("goal")}</h3>
              <ul className="list">
                <li>{t("goal1")}</li>
                <li>{t("goal2")}</li>
                <li>{t("goal3")}</li>
              </ul>

              <div className="chips">
                <Pill>{t("pillComponentDesign")}</Pill>
                <Pill>{t("pillCleanCode")}</Pill>
                <Pill>{t("pillAnimations")}</Pill>
                <Pill>{t("pillDeployment")}</Pill>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* PROJECTS */}
        <RevealSection
          id="projects"
          kicker={t("projectsKicker")}
          title={t("projectsTitle")}
        >
          <div className="grid3">
            {projects.map((p) => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </div>
        </RevealSection>

        {/* SKILLS */}
        <RevealSection
          id="skills"
          kicker={t("skillsKicker")}
          title={t("skillsTitle")}
        >
          <div className="grid3">
            <div className="card soft">
              <h3 className="miniTitle">{t("skillsFrontend")}</h3>
              <div className="chips">
                <Pill>React</Pill>
                <Pill>TypeScript</Pill>
                <Pill>JavaScript (ES6+)</Pill>
                <Pill>HTML</Pill>
                <Pill>CSS</Pill>
              </div>
            </div>

            <div className="card soft">
              <h3 className="miniTitle">{t("skillsTooling")}</h3>
              <div className="chips">
                <Pill>Git / GitHub</Pill>
                <Pill>Vite</Pill>
                <Pill>ESLint</Pill>
                <Pill>Prettier</Pill>
                <Pill>Vercel</Pill>
              </div>
            </div>

            <div className="card soft">
              <h3 className="miniTitle">{t("skillsPractical")}</h3>
              <div className="chips">
                <Pill>REST API</Pill>
                <Pill>LocalStorage</Pill>
                <Pill>DnD UX</Pill>
                <Pill>Responsive UI</Pill>
                <Pill>Clean code</Pill>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* CONTACT */}
        <RevealSection
          id="contact"
          kicker={t("nav.contact")}
          title={t("contact.title")}
        >
          <div className="card soft">
            <div className="contactGrid">
              <div>
                <div className="contactLabel">Email</div>
                <a
                  className="link big"
                  href="mailto:trehubenkovolodymyr@gmail.com"
                >
                  <Mail size={18} />
                  trehubenkovolodymyr@gmail.com
                </a>
              </div>

              <div>
                <div className="contactLabel">GitHub</div>
                <a
                  className="link big"
                  href="https://github.com/vtrehubenko"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={18} />
                  github.com/vtrehubenko
                </a>
              </div>

              <div>
                <div className="contactLabel">LinkedIn</div>
                <a
                  className="link big"
                  href="https://www.linkedin.com/in/volodymyr-trehubenko"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={18} />
                  linkedin.com/in/volodymyr-trehubenko
                </a>
              </div>
            </div>

            <div className="divider" />

            <div className="heroActions">
              <a className="btn primary" href="#top">
                {t("buttons.backToTop")}
              </a>
              <a className="btn" href="#projects">
                {t("nav.projects")}
              </a>
            </div>
          </div>
        </RevealSection>

        <footer className="footer">
          <span className="muted">
            © {new Date().getFullYear()} Volodymyr • Built with React
          </span>
        </footer>
      </main>
    </div>
  );
}
