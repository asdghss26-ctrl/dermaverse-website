import { motion } from "framer-motion";
import { draw, reveal } from "./motion";
import type { SceneProps } from "./types";

const bubbleOne =
  "M56 58H148Q168 58 168 78V122Q168 142 148 142H98L80 160V142H56Q38 142 38 122V78Q38 58 56 58Z";
const bubbleTwo =
  "M152 110H250Q270 110 270 130V168Q270 188 250 188H230L214 204L212 188H152Q132 188 132 168V130Q132 110 152 110Z";

const checklist = [
  { check: "M40 212l5 5 9-11", line: "M62 212H214", at: 0.95 },
  { check: "M40 229l5 5 9-11", line: "M62 229H190", at: 1.1 },
  { check: "M40 246l5 5 9-11", line: "M62 246H236", at: 1.25 },
];

export function ConsultationScene({ reduced }: SceneProps) {
  return (
    <svg
      viewBox="0 0 300 400"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="150" cy="142" rx="116" ry="96" className="fill-taupe/30" />

      <motion.path
        d={bubbleOne}
        className="fill-taupe/30"
        {...reveal(reduced, 0.25, 0.5)}
      />
      <motion.path
        d={bubbleOne}
        className="stroke-brown"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        {...draw(reduced, 0, 0.9)}
      />

      <motion.path
        d={bubbleTwo}
        className="fill-taupe/30"
        {...reveal(reduced, 0.5, 0.5)}
      />
      <motion.path
        d={bubbleTwo}
        className="stroke-brown"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        {...draw(reduced, 0.2, 0.9)}
      />

      {checklist.map((item) => (
        <g key={item.check}>
          <motion.path
            d={item.line}
            className="stroke-brown/60"
            strokeWidth={1.2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            {...draw(reduced, item.at, 0.55)}
          />
          <motion.path
            d={item.check}
            className="stroke-sand"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            {...draw(reduced, item.at + 0.08, 0.4)}
          />
        </g>
      ))}
    </svg>
  );
}
