import { css } from "@flows/styled-system/css";
import { SmartLink } from "components/ui/smart-link";
import { useSend } from "hooks/use-send";
import { Send16 } from "icons";
import { api, type FlowDetail } from "lib/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { links } from "shared";
import { t } from "translations";
import {
  Button,
  Dialog,
  DialogActions,
  DialogClose,
  DialogContent,
  DialogTitle,
  Input,
  Text,
} from "ui";

type Props = {
  flow: FlowDetail;
};

type FormData = {
  url: string;
};

export const FlowPreviewDialog: FC<Props> = ({ flow }) => {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { url: flow.preview_url ?? "" },
  });

  const { loading, send } = useSend();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const [domainAndPathname, params] = data.url.split("?");
    const previewParams = new URLSearchParams(params);
    previewParams.set("flows-flow-id", flow.human_id);
    previewParams.set("flows-project-id", flow.project_id);
    const url = `${domainAndPathname}?${previewParams.toString()}`;

    window.open(url, "_blank");

    const res = await send(api["PATCH /flows/:flowId"](flow.id, { preview_url: data.url }), {
      errorMessage: t.toasts.savePreviewUrlFailed,
    });
    if (res.error) return;
    router.refresh();
  };

  return (
    <Dialog
      trigger={
        <Button variant="secondary" startIcon={<Send16 />}>
          Preview
        </Button>
      }
    >
      <DialogTitle>Preview Flow</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Text
            className={css({
              mb: "space16",
            })}
          >
            Enter the URL where you want to preview this flow. If nothing shows up, make sure that
            you have installed Flows on the website.{" "}
            <SmartLink href={links.docs.previewFlow} target="_blank" color="text.primary">
              Learn about preview
            </SmartLink>
          </Text>
          <Text
            className={css({
              mb: "space16",
            })}
          >
            Flow previews don’t get counted towards your usage.
          </Text>
          <Input
            label="Start url"
            type="url"
            {...register("url")}
            required
            placeholder="https://example.com/about"
          />
        </DialogContent>
        <DialogActions>
          <DialogClose asChild>
            <Button shadow="none" size="small" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button loading={loading} size="small" type="submit">
            Go
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
