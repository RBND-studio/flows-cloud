"use client";

import { css, cx } from "@flows/styled-system/css";
import { Check16, Copy16 } from "icons";
import { type FC, useState } from "react";

import { Button } from "../button";
import { Icon } from "../icon";
import { clipboard } from "../utils/utils";

type Props = {
  code: string;
};

export const CopyButton: FC<Props> = ({ code }) => {
  const [successIcon, setSuccessIcon] = useState(false);

  const handleCopy = (): void => {
    void clipboard.copy(code);
    setSuccessIcon(true);
    setTimeout(() => setSuccessIcon(false), 2000);
  };

  return (
    <Button
      className={cx(
        css({ position: "absolute", right: "10px", top: "10px", opacity: 0, p: 0, w: "32px" }),
        "copy-button",
      )}
      onClick={handleCopy}
      variant="secondary"
    >
      <Icon icon={successIcon ? Check16 : Copy16} />
    </Button>
  );
};
