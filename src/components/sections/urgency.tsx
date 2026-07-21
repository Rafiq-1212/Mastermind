import styles from "./Urgency.module.css";
 

export default function UrgencySection() {
  const stats = [
    { value: "45+ Applications", label: "Already waiting" },
    { value: "25 seats", label: "Available this Residency" },
    { value: "Final Deadline ", label: "No extensions granted" },
  ];

  const ifYouWait = [
    "Keep building without an outside read on your plan",
    "Stay stuck making every decision alone",
    "Watch founders at your stage move faster",
    "Miss this cohort's dates",
  ];

  const ifYouApply = [
    "Leave with a 12-month roadmap and 90-day plan",
    "Join a room of 25 founders at your stage",
    "Get your plan reviewed directly by Alfred",
    "Start executing the Monday you're back",
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Eyebrow */}
        <p className={styles.eyebrow}>DON&apos;T MISS YOUR CHANCE</p>

        {/* Headline */}
        <h2 className={styles.headline}>
          This is your opportunity to join India&apos;s most exclusive founder
          residency.
        </h2>

        {/* Placeholder deadline banner */}
        {/* <div className={styles.placeholderBanner}>
          <p className={styles.placeholderText}>
            PLACEHOLDER — INSERT YOUR REAL APPLICATION DEADLINE AND SEAT COUNT
          </p>
        </div> */}

        {/* Stat cards */}
        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Comparison panel */}
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>What happens if you wait?</h3>

          <div className={styles.comparisonGrid}>
            <div>
              <p className={styles.columnTitle1}>If you don&apos;t act now</p>
              <ul className={styles.list}>
                {ifYouWait.map((item) => (
                  <li key={item} className={styles.listItem}>
                    <span className={styles.dash1}>–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={styles.columnTitle2}>If you apply today</p>
              <ul className={styles.list}>
                {ifYouApply.map((item) => (
                  <li key={item} className={styles.listItem}>
                    <span className={styles.dash2}>–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}