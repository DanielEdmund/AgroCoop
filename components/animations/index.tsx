"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  y?: number;
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** opacity 0 → 1 (default 500ms, ease-out) */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className,
  y = 16,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollRevealProps extends FadeInProps {
  x?: number;
}

/** opacity 0 → 1, y 40 → 0, 700ms with viewport={{ once: true }} */
export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.7,
  className,
  y = 40,
  x = 0,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (staggerDelay: number = 0.08) => ({
    transition: { staggerChildren: staggerDelay, delayChildren: 0.1 },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Parent that reveals children one-by-one (default stagger 80ms). */
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
  delayChildren = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      custom={staggerDelay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: staggerDelay, delayChildren }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/** Route-level wrapper: opacity 0→1, scale 0.98→1, 500ms, ease-out. */
export function PageTransition({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/** Standard warm hover interaction: scale 1.02 on hover, 0.98 on tap. */
export const hoverTap = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 400, damping: 24 },
};
