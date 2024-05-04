import { Flex } from "@flows/styled-system/jsx";
import { type FC } from "react";
import { plural, t } from "translations";
import { Text } from "ui";

import { type SelectedItem, useFlowEditForm } from "../edit-constants";

type Props = {
  selectedItem?: SelectedItem;
  onSelectItem: (item: SelectedItem) => void;
};

export const StartConditions: FC<Props> = ({ onSelectItem, selectedItem }) => {
  const { watch } = useFlowEditForm();

  const frequencyText = (() => {
    const value = watch("frequency");
    if (!value) return "";
    return t.frequency[value];
  })();

  const targetingText = (() => {
    const value = watch("userProperties");
    const count = value.length;
    return `${count} ${plural(count, "target group", "target groups")}`;
  })();

  const startText = (() => {
    const startOptions = watch("start");
    if (startOptions.length === 1) {
      const firstOption = startOptions[0];
      const location = !!firstOption.location;
      if (firstOption.form && location) return "By submitting a form at specific page";
      if (firstOption.form) return "By submitting a form";
      if (firstOption.change && location) return "By changing input at specific page";
      if (firstOption.change) return "By changing input";
      if (firstOption.clickElement && location) return "By clicking element at specific page";
      if (firstOption.clickElement) return "By clicking element";
      if (location) return "By visiting a page";
      return "From code";
    }
    return `${startOptions.length} start options`;
  })();

  return (
    <Flex gap="space8" bor="1px" p="space12" borderRadius="radius8">
      {(
        [
          { value: "start", label: t.start.start, text: startText },
          { value: "targeting", label: t.targeting.targeting, text: targetingText },
          { value: "frequency", label: t.frequency.frequency, text: frequencyText },
        ] as const
      ).map((item) => {
        const selected = selectedItem === item.value;
        return (
          <Flex
            bor="1px"
            p="space12"
            borderColor={selected ? "border.primary" : "border"}
            boxShadow={selected ? "focus" : "l1"}
            justifyContent="center"
            flexDirection="column"
            cursor="pointer"
            borderRadius="radius8"
            fastEaseInOut="all"
            key={item.value}
            width="140px"
            onClick={() => onSelectItem(item.value)}
            background="bg.card"
            _hover={{
              borderColor: selected ? "border.primary" : "border.strong",
              boxShadow: selected ? "focus" : "l2",
            }}
          >
            <Text variant="titleS">{item.label}</Text>
            <Text color="subtle" variant="bodyXs">
              {item.text}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
};
