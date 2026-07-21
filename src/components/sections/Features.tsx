import { Workflow, LineChart, Users, Compass } from "lucide-react";
import { NodesIllustration, ChartIllustration, TeamIllustration, RoadmapIllustration } from "./FeatureIllustrations";
import styles from "./Features.module.css";

const FEATURES = [
  {
    icon: Workflow,
    title: "Systems Over Hustle",
    lines: [
      "In-person, Athirapalli, Kerala",
      "Small-group strategy sessions",
      "Hosted by Alfred and the GOAT team"
    ],
    Illustration: NodesIllustration,
  },
  {
    icon: LineChart,
    title: "Your founder roadmap",
    lines: [
      "3–5 year vision, written and reviewed",
      "12-month strategic roadmap",
      "90-day execution plan"
    ],
    Illustration: ChartIllustration,
  },
  {
    icon: Users,
    title: "Systems & frameworks",
    lines: [
      "Decision frameworks for pricing, hiring",
      "AI tools and workflows, set up live",
      "Growth systems for predictable revenue"
    ],
    Illustration: TeamIllustration,
  },
  {
    icon: Compass,
    title: "Direct review with Alfred",
    lines: [
      "Your roadmap reviewed line by line",
      "Your 90-day plan pressure-tested by the room",
    ],
    Illustration: RoadmapIllustration,
  },
];

export default function Features() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTag}>What Changes</span>
        <h2>Everything You Leave With</h2>
        <p>This isn&apos;t another framework to read. It&apos;s the business you actually set out to build.</p>
      </div>

      <div className={styles.rows}>
        {FEATURES.map((item, idx) => (
          <div key={item.title} className={`${styles.row} ${idx % 2 === 1 ? styles.reversed : ""}`}>
            <div className={styles.text}>
              <div className={styles.iconWrap}>
                <item.icon size={18} aria-hidden="true" />
              </div>
              <h3>{item.title}</h3>
              {item.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <span className={styles.accentLine} />
            </div>

            <div className={styles.visual}>
              <div className={styles.visualPanel}>
                <item.Illustration />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
