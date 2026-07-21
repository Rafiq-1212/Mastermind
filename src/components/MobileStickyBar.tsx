import BookCallButton from "@/components/BookCallButton";
import styles from "./MobileStickyBar.module.css";

export default function MobileStickyBar() {
  return (
    <div className={styles.bar}>
      <BookCallButton variant="primary" className={styles.cta}>
        Join The Wait List
      </BookCallButton>
    </div>
  );
}
