import { Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import RevealItem from "@/components/RevealItem";
import Card from "@/components/ui/Card";
import styles from "./Outcomes.module.css";

const OUTCOMES = [
  {
    title: "A Vision for the Next 3–5 Years",
    desc: "A crystal-clear projection of where your company is going and your role as a scaling CEO.",
  },
  {
    title: "A 12-Month Strategic Roadmap",
    desc: "Chronological milestones detailing key initiatives, metrics, and hiring timelines for the year.",
  },
  {
    title: "A 90-Day Execution Plan",
    desc: "A granular task map mapping out what you and your team need to complete in the next 12 weeks.",
  },
  {
    title: "AI Frameworks for Predictable Growth",
    desc: "Ready-to-use prompting sequences, content matrices, and scraping frameworks to generate leads automatically.",
  },
  {
    title: "Leadership Systems for Building Teams",
    desc: "Standard operating procedures (SOPs) for interviewing, onboarding, and tracking KPIs for your hires.",
  },
  {
    title: "CEO Habits & Decision-Making Frameworks",
    desc: "A structured personal calendar, time block templates, and a collection of mental models for hard decisions.",
  },
  {
    title: "Meaningful Work Already Completed",
    desc: "Instead of copying notes, you will draft policies, scripts, and plans live during interactive cohorts.",
  },
  {
    title: "Peer Authority & Lifelong Connections",
    desc: "Join a tight-knit circle of young, execution-driven founders from Tamil Nadu who hold you accountable.",
  },
];

export default function Outcomes() {
  return (
    <section id="outcomes" className={styles.section}>
      <Reveal className={styles.sectionHeader}>
        <span className={styles.sectionTag}>THE DELIVERABLES</span>
        <h2>What You Will Leave With</h2>
        <p>This is a practical residency, not a motivation session. Every participant is expected to build and leave with:</p>
      </Reveal>

      <Reveal stagger className={styles.grid}>
        {OUTCOMES.map((item) => (
          <RevealItem key={item.title}>
            <Card className={styles.card}>
              <div className={styles.check}>
                <Check size={18} aria-hidden="true" />
              </div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </Card>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
