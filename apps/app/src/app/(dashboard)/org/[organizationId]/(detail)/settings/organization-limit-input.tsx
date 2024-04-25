"use client";

import { Flex } from "@flows/styled-system/jsx";
import { mutate } from "hooks/use-fetch";
import { useSend } from "hooks/use-send";
import { api, type OrganizationDetail } from "lib/api";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { formatNumberWithThousandSeparator } from "shared";
import { t } from "translations";
import { Button, Input, Text, toast } from "ui";

type Props = {
  organization: OrganizationDetail;
};

type FormValues = {
  start_limit: string;
};

export const OrganizationLimitInput: FC<Props> = ({ organization }) => {
  const { register, formState, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: { start_limit: String(organization.limit) },
  });

  const getLimitPrice = (limit: number): number => {
    const subscription = organization.subscription;
    if (!subscription) return 0;
    let amountLeft = limit;
    let price = 0;
    subscription.price_tiers.forEach((tier) => {
      const lastUnit = tier.last_unit === "inf" ? Infinity : Number(tier.last_unit);
      const tierAmount = Math.min(amountLeft, lastUnit);
      amountLeft -= tierAmount;
      price += tierAmount * Number(tier.unit_price_decimal) * 0.01;
    });
    return price;
  };

  const { send, loading } = useSend();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await send(
      api["PATCH /organizations/:organizationId"](organization.id, {
        start_limit: Number(data.start_limit),
      }),
      { errorMessage: t.toasts.updateLimitFailed },
    );
    if (res.error) return;
    toast.success(t.toasts.updateLimitSuccess);
    router.refresh();
    void mutate("/organizations/:organizationId", [organization.id]);
    reset(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap="space8" alignItems="flex-end">
        <Input
          label="Flow limit"
          {...register("start_limit")}
          type="number"
          defaultValue={formState.defaultValues?.start_limit}
        />
        <div>
          <Text mb="space4">Cost estimate</Text>
          <Flex py="6px" px="space8" bg="bg.subtle" borderRadius="radius8">
            <Text>
              ${formatNumberWithThousandSeparator(getLimitPrice(Number(watch("start_limit"))), 3)}
            </Text>
          </Flex>
        </div>
        <Button loading={loading} disabled={!formState.isDirty} type="submit">
          Save
        </Button>
      </Flex>
    </form>
  );
};
