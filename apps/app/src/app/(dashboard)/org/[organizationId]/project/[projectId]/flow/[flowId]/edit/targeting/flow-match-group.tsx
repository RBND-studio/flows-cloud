import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { Close16, Plus16 } from "icons";
import { type FC } from "react";
import { useFieldArray } from "react-hook-form";
import { t } from "translations";
import { Button, Icon, Text } from "ui";

import { useFlowEditForm } from "../edit-constants";
import { PropertyMatcher } from "./property-matcher";

type Props = {
  index: number;
  onRemove: () => void;
};

export const FlowMatchGroup: FC<Props> = ({ index, onRemove }) => {
  const { control } = useFlowEditForm();
  const { fields, append, remove } = useFieldArray({ control, name: `userProperties.${index}` });

  return (
    <Flex borBottom="1px" flexDirection="column" gap="space12" paddingY="space16" p="space16">
      <div className={css({ display: "flex", gap: "space8", alignItems: "center" })}>
        <Text variant="titleS">{t.targeting.group}</Text>
        <Button onClick={onRemove} size="small" variant="ghost">
          <Icon icon={Close16} />
        </Button>
      </div>
      <Flex direction="column" gap="space12">
        {fields.map((f, matcherIndex) => (
          <PropertyMatcher
            groupIndex={index}
            key={f.id}
            matcherIndex={matcherIndex}
            onRemove={() => remove(matcherIndex)}
          />
        ))}
      </Flex>
      <div>
        <Button
          onClick={() => append({ key: "" })}
          shadow="none"
          size="small"
          startIcon={<Plus16 />}
          variant="secondary"
        >
          {t.targeting.addMatcher}
        </Button>
      </div>
    </Flex>
  );
};
