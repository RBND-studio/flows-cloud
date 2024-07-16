import type {
  FlowBannerStep,
  FlowModalStep,
  FlowSteps,
  FlowTooltipStep,
  FlowWaitStep,
} from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { SmartLink } from "components/ui/smart-link";
import { ChevronDown16 } from "icons";
import { type FC, useMemo } from "react";
import { links } from "shared";
import { t } from "translations";
import { Icon, Menu, MenuItem, Text } from "ui";

import { useFlowEditForm } from "../edit-constants";
import { BannerStepForm } from "./banner-step-form";
import { ModalStepForm } from "./modal-step-form";
import { TooltipStepForm } from "./tooltip-step-form";
import { WaitStepForm } from "./wait-step-form";

type Props = {
  index: number | `${number}.${number}.${number}`;
};

const DEFAULT_TOOLTIP: FlowTooltipStep = {
  targetElement: "",
  title: "Tooltip Title",
  body: "Lorem ipsum dolor sit..",
  overlay: true,
};
const DEFAULT_MODAL: FlowModalStep = { title: "Modal Title", body: "Lorem ipsum dolor sit.." };
const DEFAULT_BANNER: FlowBannerStep = {
  title: "Banner Title",
  body: "Lorem ipsum dolor sit..",
  type: "banner",
};
const DEFAULT_WAIT: FlowWaitStep = { wait: [] };
const FORK_DEFAULT: FlowSteps[number] = [[DEFAULT_TOOLTIP], [DEFAULT_TOOLTIP]];
export const STEP_DEFAULT = {
  tooltip: DEFAULT_TOOLTIP,
  modal: DEFAULT_MODAL,
  banner: DEFAULT_BANNER,
  wait: DEFAULT_WAIT,
  fork: FORK_DEFAULT,
};

export const StepForm: FC<Props> = ({ index }) => {
  const { watch, setValue } = useFlowEditForm();
  const stepKey = `steps.${index}` as const;

  const stepValue = watch(stepKey);

  const stepType = (() => {
    if ("targetElement" in stepValue) return "tooltip";
    if ("type" in stepValue && stepValue.type === "banner") return "banner";
    if ("title" in stepValue) return "modal";
    return "wait";
  })();

  const typeOptions = useMemo(
    () =>
      (["tooltip", "modal", "banner", "wait"] as const).map((value) => ({
        value,
        label: t.steps.stepType[value],
      })),
    [],
  );

  return (
    <>
      <Flex gap="space16" justifyContent="space-between" alignItems="center" mb="space12">
        <Flex alignItems="center" gap="space16" ml="-space8">
          <Menu
            trigger={
              <button
                type="button"
                className={css({
                  display: "flex",
                  alignItems: "center",
                  gap: "space4",
                  py: "space4",
                  px: "space8",
                  borderRadius: "radius8",
                  cursor: "pointer",
                  _hover: { backgroundColor: "bg.hover" },
                })}
              >
                <Text variant="titleM">{t.steps.stepType[stepType]}</Text>{" "}
                <Icon icon={ChevronDown16} />
              </button>
            }
          >
            {typeOptions.map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => setValue(stepKey, STEP_DEFAULT[option.value])}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </Flex>
        <Text>
          <SmartLink color="text.primary" href={links.docs.step[stepType]} target="_blank">
            Learn about {t.steps.stepType[stepType]}
          </SmartLink>
        </Text>
      </Flex>

      {stepType === "tooltip" && <TooltipStepForm index={index} />}
      {stepType === "modal" && <ModalStepForm index={index} />}
      {stepType === "banner" && <BannerStepForm index={index} />}
      {stepType === "wait" && <WaitStepForm index={index} />}
    </>
  );
};
