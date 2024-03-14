"use client";

import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { useSend } from "hooks/use-send";
import { Plus16 } from "icons";
import { api, type FlowDetail } from "lib/api";
import { useRouter } from "next/navigation";
import { type FC, Fragment } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { t } from "translations";
import { Button, Text, toast } from "ui";

import { FlowMatchGroup } from "./flow-match-group";
import type { MatchGroup, TargetingForm } from "./targeting-types";

type Props = {
  flow: FlowDetail;
};

const createDefaultValues = (flow: FlowDetail): TargetingForm => {
  const editVersion = flow.draftVersion ?? flow.publishedVersion;
  return {
    userProperties: (editVersion?.userProperties as MatchGroup[] | undefined) ?? [],
  };
};

export const FlowTargetingForm: FC<Props> = ({ flow }) => {
  const { watch, setValue, control, handleSubmit, reset, formState } = useForm<TargetingForm>({
    defaultValues: createDefaultValues(flow),
  });
  const { send, loading } = useSend();
  const router = useRouter();
  const onSubmit: SubmitHandler<TargetingForm> = async (data) => {
    const fixedUserProperties = data.userProperties
      .map((group) => group.filter((matcher) => !!matcher.key))
      .filter((group) => !!group.length);
    const res = await send(
      api["PATCH /flows/:flowId"](flow.id, {
        userProperties: fixedUserProperties,
      }),
      { errorMessage: t.toasts.saveTargetingFailed },
    );
    if (res.error) return;
    reset(data, { keepValues: true });
    toast.success(t.toasts.saveTargetingSuccess);
    router.refresh();
  };

  const userProperties = watch("userProperties");

  const handleRemoveGroup = (index: number): void => {
    const updated = [...userProperties];
    updated.splice(index, 1);
    setValue("userProperties", updated);
  };

  const isCloud = flow.flow_type === "cloud";

  return (
    <Flex cardWrap="-" flexDirection="column" mb="space16">
      <Flex flexDirection="column" padding="space16">
        <Text variant="titleL">{t.targeting.targeting}</Text>
        <Text color="muted">{t.targeting.description}</Text>
      </Flex>
      {isCloud ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box borTop="1px">
            {userProperties.map((_, i) => (
              <Fragment
                // eslint-disable-next-line react/no-array-index-key -- index is fine here
                key={i}
              >
                {i !== 0 && (
                  <Flex justifyContent="center" width="100%">
                    <Text
                      as="span"
                      className={css({
                        paddingX: "space8",
                        backgroundColor: "bg.strong",
                        borderRadius: "radius8",
                        mt: "-space12",
                        mb: "-space12",
                      })}
                      variant="bodyS"
                    >
                      or
                    </Text>
                  </Flex>
                )}
                <FlowMatchGroup control={control} index={i} onRemove={() => handleRemoveGroup(i)} />
              </Fragment>
            ))}
          </Box>
          <Flex gap="space8" p="space16">
            <Button disabled={!formState.isDirty} loading={loading} type="submit" variant="black">
              Save
            </Button>
            <Button
              onClick={() => setValue("userProperties", [...userProperties, []])}
              startIcon={<Plus16 />}
              variant="secondary"
            >
              {t.targeting.addGroup}
            </Button>
          </Flex>
        </form>
      ) : (
        <Flex justifyContent="center" padding="space40">
          <Text color="muted">{t.targeting.localState}</Text>
        </Flex>
      )}
    </Flex>
  );
};
