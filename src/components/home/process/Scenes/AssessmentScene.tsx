import { motion } from "framer-motion";
import { draw } from "./motion";
import type { SceneProps } from "./types";

const waves = [88, 112, 136, 160, 184].map(
  (y) =>
    `M32 ${y}Q52 ${y - 11} 72 ${y}T112 ${y}T152 ${y}T192 ${y}T232 ${y}T272 ${y}`
);

const lights: Array<[number, number, number]> = [
  [100, 108, 1.2],
  [152, 148, 1.65],
  [200, 118, 2.1],
];

export function AssessmentScene({ reduced }: SceneProps) {
  return (
    <svg
      viewBox="0 0 300 400"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="150" cy="138" rx="118" ry="92" className="fill-taupe/30" />

      {waves.map((d, index) => (
        <motion.path
          key={d}
          d={d}
          className="stroke-brown/25"
          strokeWidth={1.1}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          {...draw(reduced, index * 0.07, 0.7)}
        />
      ))}

      {lights.map(([cx, cy, at]) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          className="fill-sand"
          initial={reduced ? false : { r: 1, opacity: 0 }}
          animate={{ r: 4, opacity: 1 }}
          transition={
            reduced
              ? { duration: 0 }
              : { delay: at, duration: 0.35, ease: "easeOut" }
          }
        />
      ))}

      <motion.g
        initial={reduced ? false : { x: -40, y: 6 }}
        animate={reduced ? { x: 0, y: 0 } : { x: 68, y: -4 }}
        transition={
          reduced
            ? { duration: 0 }
            : { delay: 0.9, duration: 1.6, ease: "easeInOut" }
        }
      >
        <motion.circle
          cx="118"
          cy="132"
          r="34"
          className="fill-taupe/30 stroke-brown"
          strokeWidth={1.6}
          vectorEffect="non-scaling-stroke"
          {...draw(reduced, 0.35, 0.9)}
        />
        <motion.path
          d="M142 156L172 186"
          className="stroke-brown"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          {...draw(reduced, 0.55, 0.6)}
        />
      </motion.g>
    </svg>
  );
}
