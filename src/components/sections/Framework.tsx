import Reveal from "@/components/Reveal";
import RevealItem from "@/components/RevealItem";
import Card from "@/components/ui/Card";
import styles from "./Framework.module.css";

const FRAMEWORK = [
  {
    num: "01",
    title: "The Founder Operating System",
    tagline: "Think clearly. Decide boldly. Lead confidently.",
    body: "Build your personal strategy cockpit. Create bulletproof decision-making frameworks, eliminate cognitive overload, and learn to master focus. Establish the core CEO routines that save hours weekly and keep you in the zone of high-leverage execution.",
  },
  {
    num: "02",
    title: "The Founder Identity",
    tagline: "Build discipline, influence, and relationships that compound.",
    body: "Upgrade who you are as a leader. Learn how to speak, write, and command authority as a premium founder. Master high-impact networking, personal brand foundations, and the psychological habits required to lead a high-performing team without burning out.",
  },
  {
    num: "03",
    title: "The Founder Engine",
    tagline: "Design a business that attracts customers, talent, and opportunities.",
    body: "Assemble the engines of growth. Design scalable operations, build predictable client acquisition flows (incorporating AI-driven marketing systems), structure an irresistible offer, and draft systems for recruiting and managing high-tier talent.",
  },
];

export default function Framework() {
  return (
    <section id="framework" className={styles.section}>
      <Reveal className={styles.sectionHeader}>
        <span className={styles.sectionTag}>THE BLUEPRINT</span>
        <h2>Program Transformation Framework</h2>
        <p>Our curriculum is structured to tackle every layer of business scaling over three immersive days.</p>
      </Reveal>

      <Reveal stagger className={styles.grid}>
        {FRAMEWORK.map((item) => (
          <RevealItem key={item.num}>
            <Card className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.num}>{item.num}</span>
                <h3>{item.title}</h3>
              </div>
              <p className={styles.tagline}>{item.tagline}</p>
              <p className={styles.body}>{item.body}</p>
            </Card>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
