import type { Variants } from "framer-motion";

// Every variant below explicitly sets x, y, and scale in both "hidden" and
// "show" states (even when a given variant doesn't use one of those axes).
// Components that pick between variants based on isMobile (SSR-safe, so it
// starts false and corrects after hydration) can have the variants object
// itself swap out mid-lifecycle — Framer Motion only interpolates properties
// present in the *new* variant, so if e.g. slideInMobile omitted `x`, a
// stale x offset from an earlier slideInLeft/Right render would never get
// cleared, leaving the element permanently shifted off its resting position.
export const fadeUp: Variants = {
  hidden: { opacity: 0, x: 0, y: 32, scale: 0.96 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// Shorter travel distance and faster settle for mobile — same motion
// language, lighter weight on smaller/lower-powered devices.
export const fadeUpMobile: Variants = {
  hidden: { opacity: 0, x: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// Directional variants for alternating left/right layouts (e.g. Features'
// image+text rows). Same rise/scale/fade language, entering from the side.
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40, y: 0, scale: 0.96 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40, y: 0, scale: 0.96 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInMobile: Variants = {
  hidden: { opacity: 0, x: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const staggerContainerMobile: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.03 },
  },
};
