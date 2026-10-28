import { motion } from "framer-motion";
import { draw, reveal } from "./motion";
import type { SceneProps } from "./types";

const card =
  "M74 56H226Q244 56 244 74V220Q244 238 226 238H74Q56 238 56 220V74Q56 56 74 56Z";

const items = [
  { tick: "M88 118l6 6 12-14", line: "M120 118H216", at: 0.95 },
  { tick: "M88 158l6 6 12-14", line: "M120 158H196", at: 1.15 },
  { tick: "M88 198l6 6 12-14", line: "M120 198H228", at: 1.35 },
];

export function PersonalPlanScene({ reduced }: SceneProps) {
  return (
    <svg
      viewBox="0 0 300 400"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="150" cy="146" rx="116" ry="98" className="fill-taupe/30" />

      <motion.path
        d={card}
        className="fill-taupe/30"
        {...reveal(reduced, 0.3, 0.6)}
      />
      <motion.path
        d={card}
        className="stroke-brown"
        strokeWidth={1.6}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        {...draw(reduced, 0, 1)}
      />

      {items.map((item) => (
        <g key={item.tick}>
          <motion.path
            d={item.line}
            className="stroke-brown/50"
            strokeWidth={1.2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            {...draw(reduced, item.at, 0.5)}
          />
          <motion.path
            d={item.tick}
            className="stroke-sand"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            {...draw(reduced, item.at + 0.05, 0.4)}
          />
        </g>
      ))}
    </svg>
  );
}
