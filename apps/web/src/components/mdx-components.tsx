import { css } from "@flows/styled-system/css";
import { isValidUrl } from "lib/is-valid-url";
import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";
import type { HTMLProps, ReactElement } from "react";
import { Text } from "ui";
import { CodeHighlight } from "ui/server";

const mdxComponents = {
  Image: (props: HTMLProps<HTMLImageElement>) => (
    <Image
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- or is better here
      alt={props.alt || "Blog post cover image"}
      className={css({
        borderRadius: "radius12",
        mb: "space24",
      })}
      height={Number(props.height)}
      src={props.src ?? ""}
      width={Number(props.width)}
    />
  ),
  h1: (props) => (
    <Text
      as="h2"
      className={css({
        mt: "space48",
        mb: "space24",
      })}
      variant="title2xl"
      {...props}
    />
  ),
  h2: (props) => (
    <Text
      as="h3"
      className={css({
        mt: "space24",
        mb: "space16",
      })}
      variant="titleXl"
      {...props}
    />
  ),
  h3: (props) => (
    <Text
      as="h4"
      className={css({
        mt: "space24",
        mb: "space16",
      })}
      variant="titleL"
      {...props}
    />
  ),
  h4: (props) => (
    <Text
      as="h5"
      className={css({
        mt: "space24",
        mb: "space16",
      })}
      variant="titleM"
      {...props}
    />
  ),
  p: (props) => (
    <Text
      as="p"
      className={css({
        mb: "space24",
        "& code": {
          backgroundColor: "bg.subtle",
          color: "text",
          paddingX: "space4",
          paddingY: "2px",
          borderRadius: "radius4",
          textStyle: "bodyM",
          fontFamily: "monospace",
        },
      })}
      variant="bodyL"
      {...props}
    />
  ),
  ul: (props) => (
    <Text
      as="ul"
      className={css({
        listStyle: "disc",
        marginBottom: "space24",
        "& ul": {
          paddingLeft: "space32",
        },
        "& > li": {
          "&::marker": {
            textStyle: "bodyS",
          },
        },
      })}
      variant="bodyL"
      {...props}
    />
  ),
  ol: (props) => (
    <Text
      as="ol"
      className={css({
        listStyle: "number",
      })}
      variant="bodyL"
      {...props}
    />
  ),
  li: (props) => (
    <Text
      as="li"
      variant="bodyL"
      {...props}
      className={css({ listStylePosition: "inside", marginBottom: "space8" })}
    />
  ),

  blockquote: (props) => (
    <Text
      as="blockquote"
      className={css({
        mt: "space24",
        mb: "space16",
        pl: "space24",
        borderLeft: "2px solid",
        borderColor: "border.primary",
      })}
      variant="bodyL"
      {...props}
    />
  ),

  hr: (props) => (
    <hr
      className={css({
        my: "space48",
        border: "none",
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderTopColor: "border.strong",
      })}
      {...props}
    />
  ),

  a: ({ href, children, ...rest }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- because fuck vercel eslint
    const source: string = href.toString();

    if (isValidUrl(source)) {
      return (
        <a
          className={css({
            color: "text.primary",
            textDecoration: "underline",
          })}
          href={source}
          rel="noreferrer"
          target="_blank"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        {...rest}
        className={css({
          color: "text.primary",
          textDecoration: "underline",
        })}
      >
        {children}
      </Link>
    );
  },
  pre: (props) => <CodeHighlight {...props} />,
  CodeHighlight,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps): ReactElement {
  const MDXContent = useMDXComponent(code);

  return <MDXContent components={mdxComponents} />;
}
