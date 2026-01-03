import { useMemo, useState } from "react";
import type { ReactNode, MouseEventHandler, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  ExternalLink,
  Filter,
  GraduationCap,
  Briefcase,
  Server,
  Cloud,
  Code2,
  Phone,
} from "lucide-react";

// shadcn/ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

/**
 * Portfolio template for new-grad SWE / Full-Stack / Backend / DevOps roles.
 *
 * How to use:
 * 1) Replace the PROFILE + SKILLS + PROJECTS + TIMELINE data below.
 * 2) Update CV_URL and social links.
 * 3) For "Contact Me":
 *    - Option A (default): mailto (no backend required)
 *    - Option B: Formspree (recommended for a real form) -> set FORMSPREE_ENDPOINT
 */

// ============================
// 1) BASIC INFORMATION
// ============================
const PROFILE = {
  name: "Yuanhui Xu",
  title: "Hi, I'm Yuanhui 👋",
  base: "Dublin, Ireland",
  email: "xuyuanhui37@gmail.com",
  phone: "+353 89 201 6899",
  avatar: "@/assets/profile.jpg", // path to your avatar image
  linkedin: "https://www.linkedin.com/in/yuanhui-xu-6679b528b",
  github: "https://github.com/imyuanhui",
  about:
    "I have a Master's degree in Computer Science from University College Dublin, with a focus on software engineering and cutting-edge cloud & AI technologies. I am passionate about building scalable and efficient software solutions to solve real-world problems. Currently, I am seeking full-time opportunities in software development or DevOps roles where I can contribute my skills and grow professionally.",
  cvUrl: "https://drive.google.com/file/d/1AwkWCip7WOp8-Vxmr59jZkbbRmBZa_k4/view?usp=sharing", // put cv.pdf in your public folder, or point to Google Drive / S3
  // Optional hero image (drop a file into your project and reference it here)
  heroImageUrl: "", // e.g., "/headshot.jpg"
};

// ============================
// 2) TECHNICAL SKILLS
// ============================
const SKILLS = {
  frontend: {
    icon: Code2,
    items: [
      "JavaScript/TypeScript",
      "React",
      "React Native",
      "Vue.js",
      "Redux",
      "HTML/CSS",
      "Tailwind CSS"
    ],
  },
  backend: {
    icon: Server,
    items: [
      "Java",
      "Python",
      "Spring Boot",
      "FastAPI",
      "Flask",
      "Node.js",
      "REST",
      "gRPC",
      "RabbitMQ",
      "Microservices",
      "postgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Swagger/OpenAPI",
    ],
  },
  devops: {
    icon: Cloud,
    items: [
      "Docker",
      "Kubernetes",
      "CI/CD",
      "AWS",
      "GCP"
    ],
  },
};

// ============================
// 3) PROJECTS (cards + tag filters)
// ============================
const PROJECTS = [
  {
    id: "p1",
    name: "Smart Trip NYC",
    oneLiner: "A crowd-aware urban itinerary planner, combining real-time data, ML models, and an AI-powered itinerary generation engine to help users make stree-free travel plans.",
    techStack: ["Java", "Python", "Typescript", "Spring Boot", "Flask", "React", "PostgreSQL", "Docker", "NGINX", "JWT", "OAuth2",  "XGBoost", "scikit-learn", "pandas", "Gemini API"],
    tags: ["API Design", "Database Design", "Testing", "Security", "CI/CD", "LLM Integration", "ML Pipelines"],
    thumbnailUrl: "p1.jpg",
    githubUrl: "https://github.com/imyuanhui/COMP47360",
    liveUrl: "https://smarttrip.duckdns.org",
  },
  {
    id: "p2",
    name: "TixForge",
    oneLiner: "A distributed ticket booking system, ensuring fair access & controlled load under high concurrency, reliable order & payment processing. ",
    techStack: ["Python", "Go", "TypeScript", "FastAPI", "Gin", "React", "Redis", "PostgreSQL", "SQS", "Stripe API", "Docker", "Kubernetes"],
    tags: ["Microservices", "API Design", "ADR", "Caching", "Message Queues", "Kubernetes", "API Gateway", "Security", "Payments"],
    thumbnailUrl: "p2.jpg",
    githubUrl: "https://github.com/imyuanhui/COMP41720",
    liveUrl: "https://drive.google.com/file/d/19fw1QG8PN-cICT6B3JP4XmwCDqwj2PQH/view?usp=sharing",
  },
  {
    id: "p3",
    name: "WhisperWall",
    oneLiner: "An anonymous blogging platform for open, identity-free expression, enabling user interaction and providing administrators with management tools for users, posts, and comments.",
    techStack: ["TypeScript", "Node.js", "Express", "React", "MongoDB", "Docker", "JWT", "OAuth2", "Firebase", "Redux", "Tailwind CSS", "Render"],
    tags: ["CI/CD", "Security", "API Design", "Database Design", "Testing", "Responsive UI","Fullstack", "DevOps"],
    thumbnailUrl: "p3.jpg",
    githubUrl: "https://github.com/imyuanhui/WhisperWall",
    liveUrl: "https://whisperwall-d2ry.onrender.com/",
  },
  {
    id: "p4",
    name: "End-to-End Cloud-Native Healthcare Analytics Pipeline",
    oneLiner: "A fully cloud-native analytics pipeline, enabling scalable and secure analysis of large-scale clinical readmission data.",
    techStack: ["Python", "Hadoop MapReduce", "Pyspark", "Dataproc", "GCS", "BigQuery", "LookerStudio"],
    tags: ["Cloud", "GCP", "Big Data"],
    thumbnailUrl: "p4.jpg",
    githubUrl: "",
    liveUrl: "",
  },
  {
    id: "p5",
    name: "Dublin Bikes – Real-Time & Predictive Web App",
    oneLiner: "A web app that visualizes real-time and forecasted bike availability, with built-in journey planning across Dublin’s public bike-sharing system.",
    techStack: ["Python", "Flask", "JavaScript", "HTML/CSS", "MySQL", "AWS EC2", "Linear Regression", "Random Forest"],
    tags: ["API Design", "Database Design", "Testing", "ML Pipelines"],
    thumbnailUrl: "p5.jpg",
    githubUrl: "https://github.com/imyuanhui/comp30830-group4",
    liveUrl: "https://drive.google.com/file/d/1PkvOQU6m2fmazRwlxgVWh0_8SxZSFpqd/view?usp=sharing",
  },
  {
    id: "p6",
    name: "TradeSure",
    oneLiner: "An escrow platform for safer, simpler second-hand electronics trading.",
    techStack: ["TypeScript", "React Native", "Python", "Flask", "JWT", "Firebase", "ChatGPT-4", "OpenAI Version", "Stripe API"],
    tags: ["API Design", "Database Design", "Security", "CI/CD", "LLM Integration"],
    thumbnailUrl: "p6.jpg",
    githubUrl: "https://github.com/samennis1/Team8",
    liveUrl: "https://devpost.com/software/hackireland-2025-team-8-tradesure?ref_content=my-projects-tab&ref_feature=my_projects",
  },
  {
    id: "p7",
    name: "Gloss",
    oneLiner: "An AI-powered vocabulary assistant that helps intermediate-to-advanced English learners clarify meaning, usage, and context, and seamlessly organize new words in Notion.",
    techStack: ["Python", "FastAPI", "CloudFlare", "Render", "OpenRouter API", "DeepSeek", "Notion API"],
    tags: ["LLM Integration", "Prompt Engineering", "Multi-agent System", "CI/CD", "API Design"],
    thumbnailUrl: "p7.jpg",
    githubUrl: "https://github.com/imyuanhui/gloss",
    liveUrl: "https://gloss.xuyuanhui.org/",
  },
];

// ============================
// 4) EDUCATION & EXPERIENCE (center timeline)
// ============================
const TIMELINE = [
  {
    id: "t1",
    type: "education",
    date: "2024 – 2026",
    title: "MSc Computer Science",
    org: "University College Dublin",
    details: [
      "Relevant Coursework: Distributed Systems, Cloud Computing, Software Engineering, Information Security, Machine Learning With Python",
      "Awards: Hack Ireland 2025 - Runner-up in FinTech Track & Best Team Under 21",
      "Excurricular Activities: UCD Women+ in STEM Society, UCD Mountaineering Club",
      "Expected to graduate with First-Class Honours",
    ],
  },
    {
    id: "t4",
    type: "experience",
    date: "Sep 2025 – Dec 2025",
    title: "Demonstrator",
    org: "University College Dublin",
    details: [
      "Mentored 100+ students majoring in Computer Science, graded assignments, and ran weekly practical sessions.",
    ],
  },
  {
    id: "t3",
    type: "experience",
    date: "Apr 2024 – Jun 2024",
    title: "Software Engineering Intern",
    org: "Nanjing SkyTech",
    details: [
      "Collaborated with agile, cross-functional teams to deliver 5 SaaS platforms for public-sector clients on schedule.",
      "Contributed to the full software development lifecycle, including coding, testing, deployment, and maintenance.",
      "Built and maintained 30+ reusable UI components with TypeScript, Vue.js, and Node.js, improving modularity and maintainability.",
      "Partnered with senior engineers to debug production issues, ensuring platform reliability.",
      "Integrated RESTful APIs with authentication, validation, and error handling, improving system stability.",
      "Participated in code reviews, adopting best practices and improving overall code quality.",
      "Implemented interactive data visualisations with ECharts, simplifying complex datasets for end users."
    ],
  },
  {
    id: "t5",
    type: "experience",
    date: "Mar 2024 – Present",
    title: "IT Support Volunteer",
    org: "AWDPI & Avoice",
    details: [
      "Provided first-line technical support for internal teams, troubleshooting software and workflow issues.",
      "Automated recruitment and task management workflows using Lark APIs.",
      "Recommended process improvements and tool configurations."
    ],
  },
  {
    id: "t2",
    type: "education",
    date: "2021 – 2024",
    title: "MFA Drama",
    org: "Nanjing University",
    details: [
      "Extracurricular Activities: Game Development Society, Game Jam",
    ],
  },
  {
    id: "t7",
    type: "education",
    date: "2017 – 2021",
    title: "BSc Ecology",
    org: "Sun Yat-sen University",
    details: [
      "Relevant Coursework: Programming Languages (R & Perl), Linear Algebra, Probability & Statistics",
      "Awards: National Scholarship, First-Class Academic Scholarship",
    ],
  },
];

// ============================
// 5) CONTACT FORM CONFIG
// ============================
const FORMSPREE_ENDPOINT = ""; // e.g., "https://formspree.io/f/xxxxxx" (leave blank to use mailto)

// ============================
// Helpers
// ============================
// function cn(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// function Section({ id, title, subtitle, children }) {
//   return (
//     <section id={id} className="scroll-mt-24">
//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
//         {subtitle ? (
//           <p className="mt-1 text-sm text-muted-foreground max-w-3xl">{subtitle}</p>
//         ) : null}
//       </div>
//       {children}
//     </section>
//   );
// }

// function TagChip({ label, active, onClick }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={cn(
//         "inline-flex items-center rounded-full border px-3 py-1 text-xs transition",
//         active
//           ? "bg-foreground text-background"
//           : "bg-background hover:bg-muted"
//       )}
//       aria-pressed={active}
//     >
//       {label}
//     </button>
//   );
// }
type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-muted-foreground max-w-3xl">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

type TagChipProps = {
  label: string;
  active: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function TagChip({ label, active, onClick }: TagChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs transition",
        active ? "bg-foreground text-background" : "bg-background hover:bg-muted",
      ].join(" ")}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}


export default function PortfolioPage() {
  const [tagFilter, setTagFilter] = useState("All");
  const [sortMode, setSortMode] = useState("featured");

  const allTags = useMemo(() => {
    const set = new Set(["All"]);
    PROJECTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  const projects = useMemo(() => {
    let list = PROJECTS.slice();

    if (tagFilter !== "All") {
      list = list.filter((p) => p.tags.includes(tagFilter));
    }

    // simple sort options; customize as needed
    if (sortMode === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [tagFilter, sortMode]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState({
    state: "idle", // idle | sending | sent | error
    message: "",
  });

  async function onSubmitContact(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      name: contact.name.trim(),
      email: contact.email.trim(),
      subject: contact.subject.trim(),
      message: contact.message.trim(),
    };

    if (!payload.email || !payload.message) {
      setContactStatus({
        state: "error",
        message: "Please provide your email and a message.",
      });
      return;
    }

    // Option A: Formspree (recommended)
    if (FORMSPREE_ENDPOINT) {
      try {
        setContactStatus({ state: "sending", message: "Sending…" });
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Request failed");

        setContactStatus({
          state: "sent",
          message: "Message sent. I will respond as soon as possible.",
        });
        setContact({ name: "", email: "", subject: "", message: "" });
      } catch {
        setContactStatus({
          state: "error",
          message:
            "Could not send via the form endpoint. Please use the email link below.",
        });
      }
      return;
    }

    // Option B: mailto fallback (no backend)
    const subject = encodeURIComponent(payload.subject || `Portfolio message from ${payload.name || ""}`.trim());
    const body = encodeURIComponent(
      `Name: ${payload.name || ""}\nEmail: ${payload.email}\n\n${payload.message}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="font-semibold tracking-tight">
            {PROFILE.name}
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a className="hover:text-foreground" href="#skills">
              Skills
            </a>
            <a className="hover:text-foreground" href="#projects">
              Projects
            </a>
            <a className="hover:text-foreground" href="#timeline">
              Education & Experience
            </a>
            <a className="hover:text-foreground" href="#contact">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={PROFILE.cvUrl} download>
                <Download className="mr-2 h-4 w-4" />
                CV
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* HERO / BASIC INFO */}
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {PROFILE.title}
            </h1>
            <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">
              {PROFILE.about}
            </p>
      
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href="#projects">
                  View Projects <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={PROFILE.github} target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-base">{PROFILE.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div className="flex flex-row items-center justify-between gap-2">
                {/* Basic Info */}
                <div className="space-y-2">
                  <div className="text-sm flex gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{PROFILE.base}</span>
                  </div>

                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-sm flex gap-2 hover:underline"
                  >
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{PROFILE.email}</span>
                  </a>

                  <div className="text-sm flex gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{PROFILE.phone}</span>
                  </div>
                </div>

                {/* Profile photo */}
                <img
                  src="/profile.jpg"
                  alt={PROFILE.name}
                  className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover ring-1 ring-border"
                />

                </div>
                
                {/* CV Button */}
                <Button asChild variant="secondary" className="w-full sm:w-auto">
                  <a href={PROFILE.cvUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="my-12">
          <Separator />
        </div>

        {/* TECHNICAL SKILLS */}
        <Section
          id="skills"
          title="Technical Skills"
          subtitle=""
        >
          <div className="grid gap-4 md:grid-cols-3">
            {Object.entries(SKILLS).map(([key, group]) => {
              const Icon = group.icon;
              return (
                <Card key={key} className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Icon className="h-4 w-4" />
                      {key === "frontend"
                        ? "Frontend"
                        : key === "backend"
                        ? "Backend"
                        : "DevOps & Cloud"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((s) => (
                        <Badge key={s} variant="secondary">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Section>

        <div className="my-12">
          <Separator />
        </div>

        {/* PROJECTS */}
        <Section
          id="projects"
          title="Projects"
          subtitle=""
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>Filter by tag:</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {allTags.map((t) => (
                  <TagChip
                    key={t}
                    label={t}
                    active={tagFilter === t}
                    onClick={() => setTagFilter(t)}
                  />
                ))}
              </div>

              <div className="w-full md:w-56">
                <Select value={sortMode} onValueChange={setSortMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card className="overflow-hidden h-full">
                    <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.thumbnailUrl}
                        alt={`${p.name} thumbnail`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-base">{p.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{p.oneLiner}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="mb-2 text-xs font-medium text-muted-foreground">
                          Tech stack
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {p.techStack.map((t) => (
                            <Badge key={t} variant="secondary">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="mb-2 text-xs font-medium text-muted-foreground">
                          Tags
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <Badge key={t} variant="outline">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button asChild variant="outline">
                          <a href={p.githubUrl} target="_blank" rel="noreferrer">
                            <Github className="mr-2 h-4 w-4" /> Repo
                          </a>
                        </Button>
                        <Button asChild disabled={!p.liveUrl}>
                          <a
                            href={p.liveUrl || "#"}
                            target="_blank"
                            rel="noreferrer"
                            aria-disabled={!p.liveUrl}
                            onClick={(e) => {
                              if (!p.liveUrl) e.preventDefault();
                            }}
                          >
                            Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {projects.length === 0 ? (
              <div className="rounded-lg border p-6 text-sm text-muted-foreground">
                No projects match this tag.
              </div>
            ) : null}
          </div>
        </Section>

        <div className="my-12">
          <Separator />
        </div>

        {/* EDUCATION & EXPERIENCE */}
        <Section
          id="timeline"
          title="Education & Experience"
          subtitle=""
        >
          {(() => {
            const educationItems = TIMELINE.filter((x) => x.type === "education");
            const experienceItems = TIMELINE.filter((x) => x.type === "experience");

            return (
              <div className="grid gap-6 md:grid-cols-2 items-stretch">
                {/* LEFT: Education */}
                <div className="flex flex-col h-full">

                  <div className="flex flex-col space-y-2 h-full justify-between">
                    {educationItems.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.12) }}
                        className="flex"
                      >
                        <Card className="flex flex-col w-full">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                              <GraduationCap className="h-4 w-4" /> {item.title}
                            </CardTitle>
                            <div className="text-sm text-muted-foreground">
                              {item.org} • {item.date}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                              {item.details.map((d) => (
                                <li key={d}>{d}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* RIGHT: Experience */}
                <div className="flex flex-col h-full">

                  <div className="flex flex-col space-y-2 h-full">
                    {experienceItems.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.12) }}
                        className="flex"
                      >
                        <Card className="flex flex-col w-full">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                              <Briefcase className="h-4 w-4" /> {item.title}
                            </CardTitle>
                            <div className="text-sm text-muted-foreground">
                              {item.org} • {item.date}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                              {item.details.map((d) => (
                                <li key={d}>{d}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </Section>


        <div className="my-12">
          <Separator />
        </div>

        {/* CONTACT */}
        <Section
          id="contact"
          title="Contact Me"
          subtitle=""
        >
          <div className="grid gap-6 md:grid-cols-[1fr_0.8fr]">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmitContact} className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        value={contact.name}
                        onChange={(e) =>
                          setContact((c) => ({ ...c, name: e.target.value }))
                        }
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email *</label>
                      <Input
                        value={contact.email}
                        onChange={(e) =>
                          setContact((c) => ({ ...c, email: e.target.value }))
                        }
                        type="email"
                        placeholder="you@domain.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Input
                      value={contact.subject}
                      onChange={(e) =>
                        setContact((c) => ({ ...c, subject: e.target.value }))
                      }
                      placeholder="Opportunity / Interview / Collaboration"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message *</label>
                    <Textarea
                      value={contact.message}
                      onChange={(e) =>
                        setContact((c) => ({ ...c, message: e.target.value }))
                      }
                      placeholder="Write your message…"
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button type="submit" disabled={contactStatus.state === "sending"}>
                      {contactStatus.state === "sending" ? "Sending…" : "Send"}
                    </Button>
                    <Button asChild type="button" variant="outline">
                      <a href={`mailto:${PROFILE.email}`}>
                        <Mail className="mr-2 h-4 w-4" /> Email directly
                      </a>
                    </Button>
                    {contactStatus.state !== "idle" ? (
                      <span
                        className={cn(
                          "text-sm",
                          contactStatus.state === "error"
                            ? "text-destructive"
                            : "text-muted-foreground"
                        )}
                      >
                        {contactStatus.message}
                      </span>
                    ) : null}
                  </div>
{/* 
                  <p className="text-xs text-muted-foreground">
                    Tip: set <span className="font-mono">FORMSPREE_ENDPOINT</span> at the top
                    to enable true form submissions without managing a server.
                  </p> */}
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-medium text-muted-foreground">Primary email</div>
                  <a
                    className="inline-flex items-center gap-2 text-sm hover:underline"
                    href={`mailto:${PROFILE.email}`}
                  >
                    <Mail className="h-4 w-4" /> {PROFILE.email}
                  </a>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-muted-foreground">Mobile</div>
                  <div className="inline-flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4" /> {PROFILE.phone}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-muted-foreground">Location</div>
                  <div className="inline-flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" /> {PROFILE.base}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-muted-foreground">Links</div>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild variant="outline" size="sm">
                      <a href={PROFILE.github} target="_blank" rel="noreferrer">
                        <Github className="mr-2 h-4 w-4" /> GitHub
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                        <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        <footer className="mt-14 pb-6">
          <Separator />
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm text-muted-foreground">
            <div>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1">
                <Code2 className="h-4 w-4" /> Built with React
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
