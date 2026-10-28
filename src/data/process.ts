/** TODO: Confirm the real clinic steps and wording with Dr. Jansi before launch. */

export type ProcessSceneId =
  | "consultation"
  | "assessment"
  | "personal-plan"
  | "follow-up";

export interface ProcessStep {
  id: ProcessSceneId;
  step: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: "consultation",
    step: "Consultation",
    title: "Consultation",
    description: "A conversation about your concerns, history and what you hope to address.",
  },
  {
    id: "assessment",
    step: "Assessment",
    title: "Assessment",
    description: "A closer look at the concern and the factors around it.",
  },
  {
    id: "personal-plan",
    step: "Personal plan",
    title: "Personal plan",
    description: "A clear plan for the next steps, explained in plain language.",
  },
  {
    id: "follow-up",
    step: "Follow-up",
    title: "Follow-up",
    description: "A scheduled check-in to review progress and adjust the plan.",
  },
];
