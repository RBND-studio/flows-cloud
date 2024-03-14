import { css } from "@flows/styled-system/css";
import { formatDate, isIsoDate } from "lib/date";
import { type FC, useEffect, useState } from "react";
import { t } from "translations";
import { Input, Select } from "ui";

import { type CompareValue, type CompareValueKey, compareValueOptions } from "./targeting-types";

type Props<T extends CompareValue = CompareValue> = {
  value?: T;
  onChange: (value: T) => void;
};

export const CompareValueInput: FC<Props> = ({ onChange, value }) => {
  const [dataType, setDataType] = useState<CompareValueKey>(() => {
    if (typeof value === "number") return "number";
    if (typeof value === "string" && isIsoDate(value)) return "date";
    if (typeof value === "string") return "string";

    return compareValueOptions[0].value;
  });

  useEffect(() => {
    if (dataType === "number" && typeof value !== "number") onChange(0);
    if (dataType === "date" && (typeof value !== "string" || !isIsoDate(value))) {
      const defaultDate = new Date();
      defaultDate.setHours(0, 0, 0, 0);
      onChange(defaultDate.toISOString());
    }
    if (dataType === "string" && typeof value !== "string") onChange("");
  }, [dataType, onChange, value]);

  return (
    <>
      <Select
        buttonSize="default"
        className={css({ minWidth: "124px" })}
        onChange={(v) => setDataType(v)}
        options={compareValueOptions}
        value={dataType}
      />

      {dataType === "number" && typeof value === "number" && (
        <Input onChange={(e) => onChange(Number(e.target.value))} type="number" value={value} />
      )}
      {dataType === "date" && typeof value === "string" && isIsoDate(value) && (
        <Input
          onChange={(e) => {
            const date = new Date();
            if (!e.target.value) return onChange(date.toISOString());
            const [year, month, day] = e.target.value.split("-").map((v) => Number(v));
            date.setUTCFullYear(year, month - 1, day);
            date.setUTCHours(0, 0, 0, 0);
            onChange(date.toISOString());
          }}
          type="date"
          value={formatDate(value)}
        />
      )}
      {dataType === "string" && typeof value === "string" && (
        <Input
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.targeting.value}
          value={value}
        />
      )}
    </>
  );
};
