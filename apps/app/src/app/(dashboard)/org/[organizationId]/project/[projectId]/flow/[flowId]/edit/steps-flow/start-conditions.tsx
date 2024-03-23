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

  const launchText = (() => {
    const location = watch("location");
    const clickElement = watch("clickElement");
    if (location && clickElement) return "Page and click element";
    if (location) return "By visiting a page";
    if (clickElement) return "By clicking element";
    return "From code";
  })();

  return (
    <Flex gap="space8" bor="1px" p="space12" borderRadius="radius8">
      {(
        [
          { value: "frequency", label: t.frequency.frequency, text: frequencyText },
          { value: "targeting", label: t.targeting.targeting, text: targetingText },
          { value: "launch", label: t.launch.launch, text: launchText },
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
