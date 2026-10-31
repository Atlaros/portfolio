"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useEntranceEnabled } from "@/components/motion/use-entrance-enabled";

const ENTRANCE_SECONDS = 0.4;
const STAGGER_SECONDS = 0.08;
const MAX_STAGGER_START_SECONDS = 0.2;
const HOVER_LIFT_PX = 4;
const HOVER_SECONDS = 0.2;
const COMPACT_MEDIA_QUERY = "(max-width: 767px)";

interface CardEntranceProps {
  index: number;
  children: ReactNode;
}

export function CardEntrance({ index, children }: CardEntranceProps) {
  const play = useEntranceEnabled();

  if (!play) {
    return <div className="h-full">{children}</div>;
  }

  const delay = entranceDelay(index);

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: ENTRANCE_SECONDS,
          ease: "easeOut",
          delay,
        },
      }}
      transition={{ duration: HOVER_SECONDS, ease: "easeOut" }}
      whileHover={{ y: -HOVER_LIFT_PX }}
    >
      {children}
    </motion.div>
  );
}

function entranceDelay(index: number): number {
  if (window.matchMedia(COMPACT_MEDIA_QUERY).matches) {
    return 0;
  }

  return Math.min(index * STAGGER_SECONDS, MAX_STAGGER_START_SECONDS);
}
