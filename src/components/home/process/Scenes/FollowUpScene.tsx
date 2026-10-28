import { motion } from "framer-motion";
import { draw, reveal } from "./motion";
import type { SceneProps } from "./types";

const calendar =
  "M78 80H222Q238 80 238 96V224Q238 240 222 240H78Q62 240 62 224V96Q62 80 78 80Z";

const dates = [144, 174, 204].flatMap((y) =>
  [86, 128, 170, 212].map((x) => ({ x, y }))
);

export function FollowUpScene({ reduced }: SceneProps) {
  return (
    <svg
      viewBox="0 0 300 400"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="150" cy="150" rx="116" ry="98" className="fill-taupe/30" />

      <motion.path
        d={calendar}
        className="fill-taupe/30"
        {...reveal(reduced, 0.3, 0.6)}
      />
      <motion.path
        d={calendar}
        className="stroke-brown"
        strokeWidth={1.6}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        {...draw(reduced, 0, 1)}
      />

      <motion.path
        d="M62 120H238"
        className="stroke-brown"
        strokeWidth={1.2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        {...draw(reduced, 0.55, 0.6)}
      />

      <motion.path
        d="M106 66V90M194 66V90"
        className="stroke-brown"
        strokeWidth={2.6}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        {...draw(reduced, 0.7, 0.5)}
      />

      {dates.map(({ x, y }) => (
        <motion.circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={2.5}
          className="fill-brown/20"
          {...reveal(reduced, 0.8, 0.4)}
        />
      ))}

      <motion.path
        d="M84 204C104 188 120 196 136 198S164 202 180 178S206 164 218 176"
        className="stroke-sand"
        strokeWidth={2.2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        {...draw(reduced, 0.95, 1.2)}
      />

      <motion.circle
        r={3.2}
        className="fill-sand"
        initial={reduced ? false : { cx: 84, cy: 204, opacity: 0 }}
        animate={
          reduced
            ? { cx: 218, cy: 176, opacity: 1 }
            : {
                cx: [84, 136, 180, 218],
                cy: [204, 198, 178, 176],
                opacity: [0, 1, 1, 1],
              }
        }
        transition={
          reduced
            ? { duration: 0 }
            : { delay: 0.95, duration: 1.2, ease: "easeOut" }
        }
      />
    </svg>
  );
}
