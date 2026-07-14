import { TrendingUp, Compass, Users, Workflow, LineChart, Target } from "lucide-react";
import Reveal from "@/components/Reveal";
import RevealItem from "@/components/RevealItem";
import Card from "@/components/ui/Card";
import styles from "./Outcomes.module.css";

const OUTCOMES = [
  {
    icon: TrendingUp,
    title: "Predictable Growth",
    desc: "Revenue that compounds on systems, not your personal effort.",
  },
  {
    icon: Compass,
    title: "CEO Freedom",
    desc: "Step back from delivery. Focus only on strategy and capital.",
  },
  {
    icon: Users,
    title: "High-Performing Team",
    desc: "Leaders who own outcomes — not just tasks.",
  },
  {
    icon: Workflow,
    title: "Operational Systems",
    desc: "Processes that run the business whether you're in the room or not.",
  },
  {
    icon: LineChart,
    title: "Scalable Revenue",
    desc: "An engine built to grow past ₹3–4 Cr, not plateau there.",
  },
  {
    icon: Target,
    title: "Decision Clarity",
    desc: "A clear framework for what to do next — and what to ignore.",
  },
];

export default function Outcomes() {
  return (
    <section id="outcomes" className={styles.section}>
      <Reveal className={styles.sectionHeader}>
        <span className={styles.sectionTag}>THE OUTCOMES</span><br />
        <span className={styles.childtag}>What Changes For You</span>
        <p>This isn&apos;t another framework to read. It&apos;s the business you actually set out to build.</p>
      </Reveal>

      <Reveal stagger className={styles.grid}>
        {OUTCOMES.map((item) => (
          <RevealItem key={item.title}>
            <Card className={styles.card}>
              <div className={styles.iconWrap}>
                <item.icon size={22} aria-hidden="true" />
              </div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </Card>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
