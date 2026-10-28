import type { MotionProps } from "framer-motion";

export function draw(
  reduced: boolean,
  delay = 0,
  duration = 1
): MotionProps {
  if (reduced) {
    return { initial: false, animate: { pathLength: 1, opacity: 1 } };
  }

  return {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: {
      pathLength: { delay, duration, ease: "easeOut" },
      opacity: { delay, duration: 0.2, ease: "easeOut" },
    },
  };
}

export function reveal(
  reduced: boolean,
  delay = 0,
  duration = 0.4
): MotionProps {
  if (reduced) {
    return { initial: false, animate: { opacity: 1 } };
  }

  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay, duration, ease: "easeOut" },
  };
}
