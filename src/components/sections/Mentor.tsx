import Image from "next/image";
import { User, Quote, PenLine } from "lucide-react";
import Reveal from "@/components/Reveal";
import RevealItem from "@/components/RevealItem";
import Button from "@/components/ui/Button";
import BookCallButton from "@/components/BookCallButton";
import styles from "./Mentor.module.css";

interface Stat {
  value: string;
  label: string;
}

interface MentorProps {
  eyebrow?: string;
  name?: string;
  subhead?: string;
  bio?: string[];
  stats?: Stat[];
  quote?: string;
  quoteSign?: string;
  badgeLabel?: string;
  portraitSrc?: string;
  portraitAlt?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

const DEFAULT_BIO = [
  "[A short introduction — who they are and what they've built goes here.]",
  "[X]+ years helping founders install the systems, leadership, and operating rhythm that let a business run without them in the room.",
  "[Why founders trust them — track record, philosophy, or approach goes here.]",
];

const DEFAULT_STATS: Stat[] = [
  { value: "[X]+", label: "Years Experience" },
  { value: "[X]+", label: "Founders Advised" },
  { value: "[X] Cr+", label: "Revenue Scaled" },
  { value: "[X]%", label: "Success Rating" },
];

export default function Mentor({
  eyebrow = "Meet Your Mentor",
  name = "[Mentor Name Goes Here]",
  subhead = "Helping Founders Build Businesses That Run Without Them.",
  bio = DEFAULT_BIO,
  stats = DEFAULT_STATS,
  quote = "[A one or two line personal quote about their philosophy on building founder-independent businesses goes here.]",
  quoteSign = "— [Mentor Name]",
  badgeLabel = "Founder & Mentor",
  portraitSrc,
  portraitAlt = name,
  primaryCtaLabel = "Join the Mastermind",
  secondaryCtaLabel = "Watch My Story",
  secondaryCtaHref,
}: MentorProps) {
  return (
    <section id="mentor" className={styles.section}>
      <div className={styles.grid}>
        <Reveal className={styles.portraitCol}>
          <div className={styles.frame}>
            <div className={styles.frameGlow} />
            {portraitSrc ? (
              <Image
                src={portraitSrc}
                alt={portraitAlt}
                fill
                sizes="(max-width: 1023px) 280px, 22vw"
                className={styles.portraitImg}
              />
            ) : (
              <div className={styles.portraitPlaceholder}>
                <User size={64} aria-hidden="true" />
              </div>
            )}
            <div className={styles.signatureBadge}>
              <PenLine size={14} aria-hidden="true" />
              <span className={styles.founder}>{badgeLabel}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className={styles.contentCol}>
          <span className={styles.sectionTag}>{eyebrow}</span>
          <h2>
            Hi, I&apos;m {name}
            {subhead && <span className={styles.subhead}>{subhead}</span>}
          </h2>

          <div className={styles.bio}>
            {bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <Reveal stagger className={styles.statsGrid}>
            {stats.map((stat) => (
              <RevealItem className={styles.statCard} key={stat.label}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </RevealItem>
            ))}
          </Reveal>

          <div className={styles.quoteBox}>
            <Quote size={26} className={styles.quoteIcon} aria-hidden="true" />
            <p>&ldquo;{quote}&rdquo;</p>
            <span className={styles.quoteSign}>{quoteSign}</span>
          </div>

          <div className={styles.ctas}>
            <BookCallButton variant="primary" showArrow>
              {primaryCtaLabel}
            </BookCallButton>
            {secondaryCtaHref && (
              <Button variant="secondary" href={secondaryCtaHref}>
                {secondaryCtaLabel}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
