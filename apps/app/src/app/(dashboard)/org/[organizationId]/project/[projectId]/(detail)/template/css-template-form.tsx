"use client";

import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { CodeEditor } from "components/ui/code-editor";
import { mutate } from "hooks/use-fetch";
import { useSend } from "hooks/use-send";
import { api, type ProjectDetail } from "lib/api";
import type { editor } from "monaco-editor";
import { useRouter } from "next/navigation";
import { type FC, useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { t } from "translations";
import { Button, Switch, Text, toast } from "ui";

import { useTemplate } from "./template-context";

type Props = {
  project: ProjectDetail;
  defaultTemplate: string;
};

type FormValues = {
  cssTemplate: string;
};

const createDefaultValues = ({ defaultTemplate, project }: Props): FormValues => ({
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- or is intentional here
  cssTemplate: project.css_template || defaultTemplate,
});
const createDefaultEnabled = (project: ProjectDetail): boolean => !!project.css_template;

export const CssTemplateForm: FC<Props> = ({ project, defaultTemplate }) => {
  const { setCssTemplate } = useTemplate();
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const { control, handleSubmit, setError, clearErrors, formState, reset, setValue } =
    useForm<FormValues>({
      defaultValues: createDefaultValues({ project, defaultTemplate }),
    });
  const [enabled, setEnabled] = useState(createDefaultEnabled(project));
  const handleSetEnabled = (value: boolean): void => {
    if (value)
      setValue("cssTemplate", formState.defaultValues?.cssTemplate ?? "", { shouldDirty: true });
    else setValue("cssTemplate", "", { shouldDirty: true });
    setEnabled(value);
  };

  const { send, loading } = useSend();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await send(
      api["PATCH /projects/:projectId"](project.id, { css_template: data.cssTemplate }),
      { errorMessage: t.toasts.saveCssVarsFailed },
    );
    if (res.error) return;
    if (res.data) {
      const newDefaults = createDefaultValues({ project: res.data, defaultTemplate });
      reset(newDefaults);
      editorRef.current?.setValue(newDefaults.cssTemplate);
      setEnabled(createDefaultEnabled(res.data));
    }

    toast.success(t.toasts.saveCssVarsSuccess);
    void mutate("/projects/:projectId", [project.id]);
    router.refresh();
  };

  const handleDefault = (): void => {
    editorRef.current?.setValue(defaultTemplate);
  };

  return (
    <Box cardWrap="-" mb="space16" p="space16">
      <Flex gap="space16" mb="space12">
        <Box flex={1}>
          <Text variant="titleL">Full CSS template</Text>
          <Text color="muted">
            Full CSS template gives you control over all elements of flows. Customizing it increases
            the risk of breaking changes in future. Use with caution.
          </Text>
        </Box>

        {enabled ? (
          <Button onClick={handleDefault} size="small" variant="secondary">
            Apply defaults
          </Button>
        ) : null}
      </Flex>
      <Switch
        checked={enabled}
        className={css({ mb: "space12" })}
        id="enabled"
        label="Customize full CSS template"
        onChange={handleSetEnabled}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {enabled ? (
          <Controller
            control={control}
            name="cssTemplate"
            render={({ field, fieldState }) => (
              <>
                <CodeEditor
                  defaultValue={field.value}
                  language="css"
                  onChange={(v) => (field.onChange(v), setCssTemplate(v ?? ""))}
                  onMount={(e) => (editorRef.current = e)}
                  onValidate={(markers) => {
                    if (markers.length)
                      setError("cssTemplate", {
                        message: `Invalid CSS: ${markers.map((m) => m.message).join(", ")}`,
                      });
                    else clearErrors("cssTemplate");
                  }}
                />
                <Text className={css({ minH: "20px", mt: "space4", mb: "space8" })} color="danger">
                  {fieldState.error?.message}
                </Text>
              </>
            )}
          />
        ) : null}

        <Button disabled={!formState.isValid || !formState.isDirty} loading={loading} type="submit">
          Save
        </Button>
      </form>
    </Box>
  );
};
