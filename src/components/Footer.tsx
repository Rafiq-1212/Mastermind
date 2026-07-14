import Reveal from "@/components/Reveal";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Reveal className={styles.content}>
        <div className={styles.brand}>
          <h3>10X FOUNDER</h3>
          <p>Strategy partner for &#8377;3&ndash;4 Cr founders building businesses that run without them.</p>
        </div>
        <div className={styles.meta}>
          <p>&copy; {new Date().getFullYear()} 10X Founder. All rights reserved.</p>
        </div>
      </Reveal>
    </footer>
  );
}
