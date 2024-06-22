import type {
  FlowModalStep,
  FlowStep,
  FlowSteps,
  FlowTooltipStep,
  FlowWaitStep,
  FooterActionItem,
  WaitStepOptions,
} from "@flows/js";
import { type FlowDetail, type UpdateFlow } from "lib/api";
import { useFormContext } from "react-hook-form";

import { type MatchGroup } from "./targeting";

export type FooterActionPlacement = "left" | "center" | "right";

export type WaitOptions = Omit<WaitStepOptions, "targetBranch"> & { targetBranch?: null | number };
type FooterItem = Omit<FooterActionItem, "targetBranch"> & { targetBranch?: null | number };
type IFooterActions = { left?: FooterItem[]; center?: FooterItem[]; right?: FooterItem[] };
type TooltipStep = Omit<FlowTooltipStep, "wait" | "footerActions"> & {
  wait?: WaitOptions | WaitOptions[];
  footerActions?: IFooterActions;
};
type ModalStep = Omit<FlowModalStep, "wait" | "footerActions"> & {
  wait?: WaitOptions | WaitOptions[];
  footerActions?: IFooterActions;
};
type IStep = TooltipStep | ModalStep | FlowWaitStep;
type Step = IStep | IStep[][];

export type IFlowEditForm = Pick<UpdateFlow, "frequency"> & {
  steps: Step[];

  userProperties: MatchGroup[];
  start: WaitStepOptions[];
};

export const createDefaultValues = (flow: FlowDetail): IFlowEditForm => {
  const editVersion = flow.draftVersion ?? flow.publishedVersion;
  return {
    steps: (editVersion?.steps as FlowSteps | undefined) ?? [],
    userProperties: (editVersion?.userProperties as MatchGroup[] | undefined) ?? [],
    frequency: editVersion?.frequency ?? "once",
    start: editVersion?.start ?? [{}],
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- not needed
export const useFlowEditForm = () => useFormContext<IFlowEditForm>();

export type SelectedItem =
  | number
  | `${number}.${number}.${number}`
  | "targeting"
  | "start"
  | "frequency";

export const formToRequest = (data: IFlowEditForm): UpdateFlow => {
  return {
    ...data,
    start: data.start as unknown as UpdateFlow["start"],
    steps: data.steps as unknown as UpdateFlow["steps"],
  };
};

export const fixFormData = (data: IFlowEditForm): IFlowEditForm => {
  const fixedUserProperties = data.userProperties
    .map((group) => group.filter((matcher) => !!matcher.key))
    .filter((group) => !!group.length);

  const fixedSteps = data.steps.map((step, i, arr) => {
    if (Array.isArray(step)) return step;
    const nextStep = arr.at(i + 1);
    const nextStepBranchCount = Array.isArray(nextStep) ? nextStep.length : null;
    const fixTargetBranch = (targetBranch: number | null | undefined): number | undefined => {
      if (targetBranch === undefined || targetBranch === null) return;
      if (nextStepBranchCount === null) return;
      if (targetBranch >= nextStepBranchCount) return;
      return targetBranch;
    };

    const waitArray = step.wait ? (Array.isArray(step.wait) ? step.wait : [step.wait]) : undefined;
    const wait = waitArray?.map((w) => ({
      ...w,
      targetBranch: fixTargetBranch(w.targetBranch),
    }));

    const footerActions =
      "footerActions" in step && step.footerActions
        ? Object.entries(step.footerActions).reduce(
            (acc, [key, actions]: [string, FooterActionItem[]]) => {
              acc[key] = actions.map((action) => ({
                ...action,
                targetBranch: fixTargetBranch(action.targetBranch),
              }));
              return acc;
            },
            {},
          )
        : undefined;

    return {
      ...step,
      wait,
      footerActions,
    } as FlowStep;
  });

  return { ...data, userProperties: fixedUserProperties, steps: fixedSteps };
};
