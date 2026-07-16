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

const OUTCOMES = [
  {
    number: "01",
    icon: Target,
    title: "Clear Business Clarity",
    desc: "Understand exactly where your business stands today and identify your biggest opportunities.",
  },
  {
    number: "02",
    icon: Compass,
    title: "3–5 Year Founder Vision",
    desc: "Leave with a long-term vision that aligns your business, leadership, and personal goals.",
  },
  {
    number: "03",
    icon: Calendar,
    title: "12-Month Growth Roadmap",
    desc: "A practical yearly strategy with milestones that keep your company moving forward.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "90-Day Execution Plan",
    desc: "Walk away with clear priorities and immediate next steps for execution.",
  },
  {
    number: "05",
    icon: Workflow,
    title: "Scalable Systems",
    desc: "Proven frameworks and operating systems to simplify growth and decision-making.",
  },
  {
    number: "06",
    icon: Wrench,
    title: "Ready-to-Use Tools",
    desc: "Templates, resources, and practical tools that can be implemented immediately.",
  },
  {
    number: "07",
    icon: Brain,
    title: "Founder Habits",
    desc: "Daily operating principles that improve focus, leadership, and consistency.",
  },
  {
    number: "08",
    icon: CheckCircle,
    title: "Execution in Progress",
    desc: "Complete meaningful work during the residency instead of only taking notes.",
  },
  {
    number: "09",
    icon: Crown,
    title: "CEO Confidence",
    desc: "Develop the mindset and confidence required to lead a high-performing company.",
  },
];

export default function Outcomes() {
  return (
    <section id="outcomes" className={styles.section}>
      <div className={styles.header}>
        <h2>What You&apos;ll Leave With</h2>
        <p>
          Every founder leaves the residency with a complete operating system for building,
          scaling, and leading a world-class company.
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
