import { css } from "@flows/styled-system/css";
import { links } from "shared";

export const DocsBanner = (): JSX.Element => {
  return (
    <>
      Flows docs are in early stages and not everything is documented yet. If you have any
      questions, please{" "}
      <a
        className={css({
          textDecoration: "underline!",
          fontWeight: "700!",
        })}
        href={links.docs.contact}
      >
        contact us
      </a>
      .
    </>
  );
};
