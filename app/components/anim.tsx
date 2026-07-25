"use client";

import { motion, type Variants } from "framer-motion";
import { Children, useMemo, type ElementType, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Generic fade + rise reveal that fires once when scrolled into view. */
export function Reveal({
  as = "div",
  className,
  children,
  delay = 0,
  y = 40,
  amount = 0.25,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  delay?: number;
  y?: number;
  amount?: number;
  [key: string]: unknown;
}) {
  const MotionTag = useMemo(() => motion.create(as as ElementType), [as]);
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {Children.toArray(children)}
    </MotionTag>
  );
}

/** Horizontal clip-path wipe — used to "draw in" the SVG line titles. */
export function LineReveal({
  as = "div",
  className,
  children,
  delay = 0,
  amount = 0.6,
}: {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  delay?: number;
  amount?: number;
}) {
  const MotionTag = useMemo(() => motion.create(as as ElementType), [as]);
  return (
    <MotionTag
      className={className}
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {Children.toArray(children)}
    </MotionTag>
  );
}

const lineWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const lineItem: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

/**
 * Line-by-line rise reveal. Each child string rises from an overflow-hidden mask.
 * Mirrors the original js-textTransform copy animation.
 */
export function LinesReveal({
  as = "p",
  className,
  lines,
  amount = 0.4,
}: {
  as?: ElementType;
  className?: string;
  lines: ReactNode[];
  amount?: number;
}) {
  const MotionTag = useMemo(() => motion.create(as as ElementType), [as]);
  return (
    <MotionTag
      className={className}
      variants={lineWrap}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {lines.map((line, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden" }}>
          <motion.span variants={lineItem} style={{ display: "block" }}>
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
