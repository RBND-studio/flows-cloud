import { css } from "@flows/styled-system/css";
import { links } from "shared";

export const DocsBanner = (): JSX.Element => {
  return (
    <>
      We are live on{" "}
      <a
        className={css({
          textDecoration: "underline!",
          fontWeight: "700!",
        })}
        href={links.productHunt}
        target="_blank"
        rel="noopener"
      >
        Product Hunt
      </a>{" "}
      🚀
    </>
  );
};
