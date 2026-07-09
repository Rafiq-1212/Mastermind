import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <h3>10X FOUNDER RESIDENCY</h3>
          <p>Athirapalli, Kerala. For Tamil Nadu&apos;s Next Generation of CEOs.</p>
        </div>
        <div className={styles.meta}>
          <p>&copy; {new Date().getFullYear()} Million-Dollar Founder Residency. All rights reserved.</p>
          <p>Curated by Alfred &amp; Senjing.</p>
        </div>
      </div>
    </footer>
  );
}
