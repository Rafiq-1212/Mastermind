import {
  Target,
  Compass,
  Calendar,
  Rocket,
  Workflow,
  Wrench,
  Brain,
  CheckCircle,
  Crown,
} from "lucide-react";
import styles from "./Outcomes.module.css";
import { number } from "framer-motion";

const OUTCOMES = [
  {
    number: "01",
    icon: Target,
    title: "The Business Diagnostic",
    desc: "Map exactly where your business stands today revenue, margin, and the bottlenecks only you can see.",
  },
  {
    number: "02",
    icon: Compass,
    title: "The 3-5 Year Vision Lock ",
    desc: "Define the specific company you're building towards writen down, not an aspiration.",
  },
  {
    number: "03",
    icon: Calendar,
    title: "Decision Frameworks For Pricing and Hiring",
    desc: "The Specific model that stop decisions from taking days.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Predictable Growth Systems",
    desc: "Build a sales and marketing engine that doesn't depend on your personal hustle.",
  },
  {
    number: "05",
    icon: Workflow,
    title: "AI Framework For Founders",
    desc: "The specific AI tools and workflows that compress work founders usually take years to learn.",
  },
  {
    number: "06",
    icon: Wrench,
    title: "The 12-month strategic roadmap",
    desc: "Milestone by milestone, reviewed by Alfred and the room before you leave.",
  },
  {
    number: "07",
    icon: Brain,
    title: "The 90-day execution plan",
    desc: "Convert the roadmap into the specific, dated actions for your first quarter.",
  },
  {
    number: "08",
    icon: CheckCircle,
    title: "Team and leadership systems",
    desc: "What to hire for, when, and how to lead people who aren't you.",
  },
  {
    number: "09",
    icon: Crown,
    title: "Founder habits and operating rhythm",
    desc: "The daily principles that compound — built around your business, not generic advice.",
  },
  {
    number:"10",
    icon:Crown,
    title:"The commitment round",
    desc:"Say your 90-day plan out loud to the room. 25 founders now know what you said you'd do."
  }
];

export default function Outcomes() {
  return (
    <section id="outcomes" className={styles.section}>
      <div className={styles.header}>
        <h2>10 Things Every Founder Builds In The Room.</h2>
        <p>
          Not talks to sit through, frameworks you apply to your own business before you leave.
        </p>
      </div>

      <div className={styles.grid}>
        {OUTCOMES.map((item) => (
          <div className={styles.card} key={item.number}>
            {/* <span className={styles.number}>{item.number}</span> */}
            <div className={styles.iconWrap}>
              <item.icon size={22} aria-hidden="true" />
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
