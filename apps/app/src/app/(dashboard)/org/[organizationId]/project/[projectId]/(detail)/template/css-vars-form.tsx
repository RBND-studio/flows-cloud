"use client";

import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { CodeEditor } from "components/ui/code-editor";
import { mutate } from "hooks/use-fetch";
import { useSend } from "hooks/use-send";
import { api, type ProjectDetail } from "lib/api";
import type { editor } from "monaco-editor";
import { useRouter } from "next/navigation";
import { type FC, useRef } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { t } from "translations";
import { Button, Text, toast } from "ui";

import { useTemplate } from "./template-context";

type Props = {
  project: ProjectDetail;
  defaultVars: string;
};

type FormValues = {
  cssVars: string;
};

const createDefaultValues = ({ defaultVars, project }: Props): FormValues => ({
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- or is intentional here
  cssVars: project.css_vars || defaultVars,
});

export const CssVarsForm: FC<Props> = ({ project, defaultVars }) => {
  const { setCssVars } = useTemplate();
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const { control, handleSubmit, setError, clearErrors, formState, reset, setValue } =
    useForm<FormValues>({ defaultValues: createDefaultValues({ project, defaultVars }) });

  const { send, loading } = useSend();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await send(
      api["PATCH /projects/:projectId"](project.id, { css_vars: data.cssVars }),
      { errorMessage: t.toasts.saveCssVarsFailed },
    );
    if (res.error) return;
    if (res.data) {
      const newDefaults = createDefaultValues({ project: res.data, defaultVars });
      reset(newDefaults);
      editorRef.current?.setValue(newDefaults.cssVars);
    }
    toast.success(t.toasts.saveCssVarsSuccess);
    void mutate("/projects/:projectId", [project.id]);
    router.refresh();
  };

  const handleDefault = (): void => {
    setValue("cssVars", defaultVars);
    editorRef.current?.setValue(defaultVars);
  };

  return (
    <Box cardWrap="-" mb="space16" p="space16">
      <Flex gap="space16" mb="space12">
        <Box flex={1}>
          <Text variant="titleL">CSS variables</Text>
          <Text color="muted">
            With CSS variables you can customize the basic things like colors, fonts, and spacing,
            without needing to dig into the CSS template.
          </Text>
        </Box>
        <Button onClick={handleDefault} size="small" variant="secondary">
          Apply defaults
        </Button>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="cssVars"
          render={({ field, fieldState }) => (
            <>
              <CodeEditor
                defaultValue={field.value}
                language="css"
                onChange={(v) => (field.onChange(v), setCssVars(v ?? ""))}
                onMount={(e) => (editorRef.current = e)}
                onValidate={(markers) => {
                  if (markers.length)
                    setError("cssVars", {
                      message: `Invalid CSS: ${markers.map((m) => m.message).join(", ")}`,
                    });
                  else clearErrors("cssVars");
                }}
              />
              <Text
                className={css({ minH: "16px", mt: "space4", mb: "space8" })}
                color="danger"
                variant="bodyXs"
              >
                {fieldState.error?.message}
              </Text>
            </>
          )}
        />

        <Button disabled={!formState.isValid || !formState.isDirty} loading={loading} type="submit">
          Save
        </Button>
      </form>
    </Box>
  );
};
