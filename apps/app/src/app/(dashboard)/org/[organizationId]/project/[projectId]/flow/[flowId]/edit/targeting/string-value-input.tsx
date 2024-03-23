import { type FC, Fragment, useEffect } from "react";
import { t } from "translations";
import { Button, Input, Text } from "ui";

type Props = {
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  allowArray?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const StringValueInput: FC<Props> = ({ onChange, value, allowArray, onKeyDown }) => {
  useEffect(() => {
    if (allowArray && value === undefined) onChange([""]);
    if (allowArray && !Array.isArray(value)) onChange([value ?? ""]);
    if (allowArray && Array.isArray(value) && !value.length) onChange([""]);
    if (!allowArray && value === undefined) onChange("");
  }, [allowArray, onChange, value]);

  if (!Array.isArray(value))
    return (
      <Input
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={t.targeting.value}
        value={value ?? ""}
      />
    );

  return (
    <>
      {value.map((v, i) => (
        <Fragment
          // eslint-disable-next-line react/no-array-index-key -- index is fine here
          key={i}
        >
          {i > 0 && <Text>{t.targeting.or}</Text>}
          <StringValueInput
            onChange={(newValue) => {
              if (typeof newValue !== "string") return;
              const updated = [...value];
              updated[i] = newValue;
              onChange(updated);
            }}
            onKeyDown={(e) => {
              if (e.key !== "Backspace") return;
              if (i === 0) return;
              if (v.length) return;
              e.preventDefault();
              onChange(value.filter((_, index) => index !== i));
            }}
            value={v}
          />
        </Fragment>
      ))}
      <Button onClick={() => onChange([...value, ""])} shadow="none" variant="secondary">
        {t.targeting.or}
      </Button>
    </>
  );
};
