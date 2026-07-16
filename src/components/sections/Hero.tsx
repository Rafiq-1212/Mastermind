import { Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import RevealItem from "@/components/RevealItem";
import Button from "@/components/ui/Button";
import BookCallButton from "@/components/BookCallButton";
import HeroVisual from "./HeroVisual";
import styles from "./Hero.module.css";

const TRUST_INDICATORS = [
  { label: "Geography", sub: "Founders and Creators" },
  { label: "Age ", sub: "Under 29 years old." },
  { label: "Composition", sub: "80% Founders , 20% Creators " }
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grid}>
        <div className={styles.content}>
          {/* <Reveal>
            <span className={styles.badge}>
              <Sparkles size={13} aria-hidden="true" />
              GOAT Mastermind Presents
            </span>
          </Reveal> */}

          <Reveal delay={0.1}>
            <h1 className={styles.title}>
              Build your million dollar<br className={styles.lineBreak} /> company <span className={styles.hightlight}>before 30</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className={styles.subtitle}>
              3 days in Athirapalli. You won&apos;t leave inspired — you&apos;ll leave with a plan systems, and momentum.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className={styles.actions}>
              <BookCallButton  showArrow>
                Register Now
              </BookCallButton>
              <Button href="#transformation" variant="secondary">
                See How It Works
              </Button>
            </div>
          </Reveal>

          <Reveal stagger delay={0.4} className={styles.trustRow}>
            {TRUST_INDICATORS.map((item, idx) => (
              <div className={styles.trustGroup} key={item.label}>
                <RevealItem className={styles.trustItem}>
                  <h3>{item.label}</h3>
                  <p>{item.sub}</p>
                </RevealItem>
                {idx < TRUST_INDICATORS.length - 1 && <div className={styles.divider} />}
              </div>
            ))}
          </Reveal>

          
        </div>

        <HeroVisual />

        <Reveal delay={0.3} className={styles.para}>
          <p>Build the Clarity - Lead the Company - Become the Founder.</p>
        </Reveal>
      </div>
    </section>
  );
}
