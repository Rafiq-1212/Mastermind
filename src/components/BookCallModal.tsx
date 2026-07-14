"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useBookCallModal } from "@/components/BookCallModalContext";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { useIsMobile } from "@/lib/useIsMobile";
import BookCallForm from "@/components/BookCallForm";
import styles from "./BookCallModal.module.css";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function BookCallModal() {
  const { isOpen, closeModal, triggerRef } = useBookCallModal();
  const reduceMotion = useSafeReducedMotion();
  const isMobile = useIsMobile();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // Escape to close + focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeModal();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        );
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [isOpen, closeModal]);

  // Move focus into the modal on open, return it to the trigger on close
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        firstFocusable?.focus();
      }, 60);
      return () => clearTimeout(timer);
    }

    triggerRef.current?.focus?.();
  }, [isOpen, triggerRef]);

  const dialogMotionProps = reduceMotion
    ? { initial: false, animate: {}, exit: undefined }
    : isMobile
      ? {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%" },
        }
      : {
          initial: { opacity: 0, scale: 0.96, y: 16 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.96, y: 16 },
        };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.root}>
          <motion.div
            className={styles.overlay}
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            aria-hidden="true"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-call-title"
            className={`${styles.dialog} ${isMobile ? styles.dialogMobile : ""}`}
            {...dialogMotionProps}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <button type="button" className={styles.closeBtn} onClick={closeModal} aria-label="Close">
              <X size={18} aria-hidden="true" />
            </button>

            <div className={styles.header}>
              <h2 id="book-call-title">Let&apos;s Build Your Next Stage.</h2>
              <p>15-minute call. No pitch. Just clarity on your next move.</p>
            </div>

            <BookCallForm />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
