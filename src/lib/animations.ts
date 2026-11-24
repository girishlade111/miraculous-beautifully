import type { Transition, Variants } from 'motion/react';

export const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const transitionFast: Transition = {
  duration: 0.28,
  ease: luxuryEase,
};

export const transitionMedium: Transition = {
  duration: 0.55,
  ease: luxuryEase,
};

export const transitionSlow: Transition = {
  duration: 0.85,
  ease: luxuryEase,
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSlow,
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitionSlow,
  },
};

export const menuOverlayVariants: Variants = {
  closed: {
    opacity: 0,
    y: '-100%',
    transition: { duration: 0.45, ease: luxuryEase },
  },
  open: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.6, ease: luxuryEase },
  },
};

export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: luxuryEase },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: luxuryEase },
  },
};
