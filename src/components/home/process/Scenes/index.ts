import type { ComponentType } from "react";
import type { ProcessSceneId } from "@/data/process";
import type { SceneProps } from "./types";
import { ConsultationScene } from "./ConsultationScene";
import { AssessmentScene } from "./AssessmentScene";
import { PersonalPlanScene } from "./PersonalPlanScene";
import { FollowUpScene } from "./FollowUpScene";

export const processScenes: Record<ProcessSceneId, ComponentType<SceneProps>> = {
  consultation: ConsultationScene,
  assessment: AssessmentScene,
  "personal-plan": PersonalPlanScene,
  "follow-up": FollowUpScene,
};
