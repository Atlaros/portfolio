"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useEntranceEnabled } from "@/components/motion/use-entrance-enabled";

const ENTRANCE_SECONDS = 0.4;
const ENTRANCE_RISE_PX = 8;

interface FadeRiseProps {
  children: ReactNode;
  className: string;
}

export function FadeRise({ children, className }: FadeRiseProps) {
  const play = useEntranceEnabled();

  if (!play) {
    return <section className={className}>{children}</section>;
  }

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: ENTRANCE_RISE_PX }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ENTRANCE_SECONDS, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
