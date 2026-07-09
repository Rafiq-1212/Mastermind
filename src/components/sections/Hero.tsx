import Reveal from "@/components/Reveal";
import RevealItem from "@/components/RevealItem";
import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <Reveal>
          <span className={styles.badge}>BECOME A 10X FOUNDER</span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className={styles.title}>
            <span className={styles.line}>Build your million dollar company</span>
            <span className={`gradientAccent ${styles.highlight}`}>before 30</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className={styles.subtitle}>
            A premium, high-ticket 3-day residential program in Athirapalli, Kerala. Specifically designed
            for founders and business creators under 29 from Tamil Nadu generating &#8377;6L&ndash;&#8377;15L/month
            to transform from overwhelmed operators into world-class CEOs.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className={styles.actions}>
            <Button href="#apply" variant="primary">
              Apply for the Residency
            </Button>
            <Button href="#transformation" variant="secondary">
              Explore the Program Philosophy
            </Button>
          </div>
        </Reveal>

        <Reveal stagger delay={0.4} className={styles.metrics}>
          <RevealItem className={styles.metricItem}>
            <h3 aria-label="3 Days">
              <CountUp to={3} suffix=" Days" />
            </h3>
            <p>Immersive Residency</p>
          </RevealItem>
          <div className={styles.divider} />
          <RevealItem className={styles.metricItem}>
            <h3>Athirapalli</h3>
            <p>Kerala, India</p>
          </RevealItem>
          <div className={styles.divider} />
          <RevealItem className={styles.metricItem}>
            <h3>&#8377;6L &ndash; &#8377;15L</h3>
            <p>Monthly Current Revenue</p>
          </RevealItem>
          <div className={styles.divider} />
          <RevealItem className={styles.metricItem}>
            <h3 aria-label="Under 29">
              <CountUp to={29} prefix="Under " />
            </h3>
            <p>Target Age Group</p>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
