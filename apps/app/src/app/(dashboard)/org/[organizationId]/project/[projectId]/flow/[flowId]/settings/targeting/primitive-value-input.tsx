import { css } from "@flows/styled-system/css";
import { type FC, Fragment, useEffect, useState } from "react";
import { t } from "translations";
import { Button, Input, Select, Text } from "ui";

import type { PrimitiveValue, PrimitiveValueKey } from "../flow-edit-types";
import { primitiveValueOptions } from "../flow-edit-types";

type Props<T extends PrimitiveValue = PrimitiveValue> = {
  value: T | T[];
  onChange: (value: T | T[]) => void;
};

export const PrimitiveValueInput: FC<Props> = ({ onChange, value }) => {
  const [dataType, setDataType] = useState<PrimitiveValueKey>(primitiveValueOptions[0].value);

  const handleDataTypeChange = (v: PrimitiveValueKey): void => {
    setDataType(v);
    onChange([null]);
  };

  useEffect(() => {
    if (!Array.isArray(value)) onChange([null]);
  }, [onChange, value]);

  if (!Array.isArray(value)) return null;

  const chainable = dataType === "string" || dataType === "number" || dataType === "boolean";

  return (
    <>
      <Select
        buttonClassName={css({ minWidth: "124px" })}
        buttonSize="default"
        onChange={handleDataTypeChange}
        options={primitiveValueOptions}
        value={dataType}
      />

      {value.map((v, i) => (
        <Fragment
          // eslint-disable-next-line react/no-array-index-key -- index is fine here
          key={i}
        >
          {i > 0 && <Text>{t.targeting.or}</Text>}
          <InputOnly
            dataType={dataType}
            onChange={(newValue) => {
              const updated = [...value];
              updated[i] = newValue;
              onChange(updated);
            }}
            value={v}
          />
        </Fragment>
      ))}

      {chainable ? (
        <Button onClick={() => onChange([...value, ""])} variant="black">
          {t.targeting.or}
        </Button>
      ) : null}
    </>
  );
};

type InputOnlyProps<T extends PrimitiveValue = PrimitiveValue> = {
  value: T;
  onChange: (value: T) => void;
  dataType: PrimitiveValueKey;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const InputOnly: FC<InputOnlyProps> = ({ onChange, value, dataType }) => {
  useEffect(() => {
    if (dataType === "string" && typeof value !== "string") onChange("");
    if (dataType === "number" && typeof value !== "number") onChange(0);
    if (dataType === "boolean" && typeof value !== "boolean") onChange(false);
    if (dataType === "null" && value !== null) onChange(null);
    if (dataType === "undefined" && value !== undefined) onChange(undefined);
  }, [dataType, onChange, value]);

  return (
    <>
      {dataType === "string" && typeof value === "string" && (
        <Input
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.targeting.value}
          value={value}
        />
      )}
      {dataType === "number" && typeof value === "number" && (
        <Input
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder={t.targeting.value}
          type="number"
          value={value}
        />
      )}
      {dataType === "boolean" && typeof value === "boolean" && (
        <Select
          buttonSize="default"
          onChange={(v) => onChange(v === "true")}
          options={[
            { label: "True", value: "true" },
            { label: "False", value: "false" },
          ]}
          value={value ? "true" : "false"}
        />
      )}
    </>
  );
};
