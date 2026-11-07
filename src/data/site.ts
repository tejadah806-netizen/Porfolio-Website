// ─────────────────────────────────────────────────────────────
//  All the text on the site lives in this one file.
//  Edit here to update projects, skills, experience, etc.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Heriberto Tejada Guzmán",
  shortName: "Heriberto",
  initials: "HT",
  location: "Paterson, NJ",
  email: "tejadah806@gmail.com",
  github: "https://github.com/tejadah806-netizen",
  linkedin: "https://www.linkedin.com/in/heriberto-tejada-a47927376",
  roles: ["Cybersecurity", "Information Technology", "Web Development"],
  tagline:
    "IT student at NJIT concentrating in cybersecurity, with a foundation in web development and hands-on projects in JavaScript, Python and C++.",
  status: "B.S. Information Technology @ NJIT",
};

export const about = {
  paragraphs: [
    "I'm 22, born in the Dominican Republic, and moved to the U.S. when I was 9. I started teaching myself HTML and CSS in high school, and that curiosity turned into an Associate of Science in Web Development from Bergen Community College in May 2026.",
    "Now I'm at NJIT studying Information Technology with a concentration in Cybersecurity, learning how to protect the kind of systems I've been building. I like solving problems with a creative approach, and every project teaches me something new.",
    "Outside of tech I'm working out, gaming, following the Yankees and Formula 1, and spending time with the people I love.",
  ],
  facts: [
    { label: "Based in", value: "Paterson, NJ" },
    { label: "From", value: "Dominican Republic" },
    { label: "Languages", value: "English & Spanish" },
    { label: "Focus", value: "Cybersecurity" },
  ],
};

export type TimelineItem = {
  kind: "education" | "work";
  title: string;
  org: string;
  place: string;
  date: string;
  current?: boolean;
  points: string[];
};

export const timeline: TimelineItem[] = [
  {
    kind: "education",
    title: "B.S. Information Technology — Cybersecurity",
    org: "New Jersey Institute of Technology (NJIT)",
    place: "Newark, NJ",
    date: "Fall 2026 — Present",
    current: true,
    points: ["Concentration in cybersecurity."],
  },
  {
    kind: "work",
    title: "Crew Member",
    org: "Booth Mover",
    place: "Moonachie, NJ",
    date: "Jun 2024 — Present",
    current: true,
    points: [
      "Complete residential and commercial moves as part of a team.",
      "Handle equipment safely and communicate professionally with clients.",
    ],
  },
  {
    kind: "education",
    title: "A.S. Web Development",
    org: "Bergen Community College",
    place: "Paramus, NJ",
    date: "Graduated May 2026",
    points: [
      "Coursework: Web Development, JavaScript, HTML & CSS, Python, Databases, Systems Analysis.",
    ],
  },
  {
    kind: "work",
    title: "Customer Service & Maintenance Associate",
    org: "AMC Theatres",
    place: "Hackensack, NJ",
    date: "Sep 2023 — Jun 2024",
    points: [
      "Provided customer service in a fast-paced environment.",
      "Worked with the team to resolve issues and keep operations running.",
    ],
  },
  {
    kind: "work",
    title: "Inventory Specialist",
    org: "Walgreens",
    place: "Hackensack, NJ",
    date: "Jun 2022 — Sep 2023",
    points: [
      "Managed inventory levels and product organization.",
      "Ran regular inventory counts and supported loss prevention.",
    ],
  },
];

export const skills = [
  { group: "Languages", items: ["JavaScript", "Python", "C++", "HTML", "CSS"] },
  {
    group: "Tools & Platforms",
    items: ["GitHub", "VS Code", "Oracle APEX", "Microsoft Office"],
  },
  {
    group: "Soft skills",
    items: ["Bilingual (EN / ES)", "Teamwork", "Time Management", "Fast Learner"],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  date?: string;
  live?: string;
  code?: string;
  featured?: boolean;
  comingSoon?: boolean;
  inProgress?: boolean;
};

export const projects: Project[] = [
  {
    title: "Expense Tracker",
    description:
      "A JavaScript web app for tracking spending, with category filtering, automatic summaries and data saved in the browser with localStorage.",
    tags: ["JavaScript", "HTML", "CSS", "localStorage"],
    date: "Sep 2025",
    live: "https://tejadah806-netizen.github.io/Expense-Tracker/",
    code: "https://github.com/tejadah806-netizen/Expense-Tracker",
    featured: true,
  },
  {
    title: "Painter — Unity Project",
    description:
      "An ongoing class team project built in Unity. Every two weeks we ship an update with new features, like user flows, based on what we learn in class.",
    tags: ["Unity", "C#", "WebGL", "Team project"],
    live: "https://ht338.itch.io/painnter-project-2-continue",
    inProgress: true,
  },
  {
    title: "Portfolio v1",
    description:
      "My first personal portfolio: a responsive multi-page site with a blog, contact form validation and a projects page.",
    tags: ["HTML", "CSS", "JavaScript"],
    date: "Jun 2024",
    live: "https://tejadah806-netizen.github.io/Porfolio-Website/old-site/index.html",
    code: "https://github.com/tejadah806-netizen/Porfolio-Website",
  },
  {
    title: "Number Guessing Game",
    description:
      "A simple game where the player tries to guess a randomly generated number.",
    tags: ["Python"],
  },
  {
    title: "Name & Email Manager",
    description:
      "A Python program that stores and manages a list of names with their email addresses.",
    tags: ["Python"],
  },
  {
    title: "Vowels & Consonants",
    description:
      "A Python script that counts the vowels and consonants in any string the user types in.",
    tags: ["Python"],
  },
];

export const posts = [
  {
    title: "My Journey into Web Development",
    tag: "web-development",
    excerpt: "Web development started as a curiosity…",
    body: "Since high school, I began learning HTML & CSS. As I continued my studies at BCC, I expanded into JavaScript and Python. I initially pursued Computer Science but switched to Web Development because I found it far more enjoyable and creatively fulfilling. Every project has taught me something new, and I genuinely enjoy solving problems with a creative approach.",
  },
  {
    title: "Balancing Fitness, Gaming, and Tech",
    tag: "lifestyle",
    excerpt: "Staying active while being a tech enthusiast can be challenging…",
    body: "I make time for workouts, enjoy competitive gaming sessions, and always seek new skills. Balance keeps me sharp both mentally and physically.",
  },
];

export const nav = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];
