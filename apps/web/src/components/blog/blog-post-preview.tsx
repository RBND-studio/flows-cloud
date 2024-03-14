import { css } from "@flows/styled-system/css";
import type { Post } from "contentlayer/generated";
import { ArrowRight16 } from "icons";
import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import React from "react";
import { Text } from "ui";

type Props = {
  post: Post;
};

export const BlogPostPreview = ({ post }: Props): ReactElement => {
  return (
    <li
      className={css({
        pt: "space48",
        pb: "space48",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "border",
        "&:last-child": {
          borderBottom: "none",
        },
      })}
      key={post.slug}
    >
      {post.image ? (
        <Link href={`/blog/${post.slugAsParams}`}>
          <Image
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- or is better here
            alt={post.imageAlt || "Blog post cover image"}
            className={css({
              borderRadius: "radius12",
              mb: "space16",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "border.strong",
            })}
            height={600}
            src={post.image}
            width={1200}
          />
        </Link>
      ) : null}

      <Text
        as="h2"
        className={css({
          transition: "color 120ms ease-out",
          _hover: {
            color: "text.primary",
          },
        })}
        variant="title2xl"
      >
        <Link href={`/blog/${post.slugAsParams}`}>{post.title}</Link>
      </Text>
      <Text
        as="p"
        className={css({
          my: "space16",
        })}
        variant="bodyL"
      >
        {post.description}
      </Text>
      <Link
        className={css({
          textStyle: "titleL",
          color: "text.primary",
          display: "flex",
          alignItems: "center",
          gap: "space4",
          _hover: {
            "& svg": {
              transform: "translateX(4px)",
            },
          },
          "& svg": {
            transition: "transform 120ms ease-out",
          },
        })}
        href={`/blog/${post.slugAsParams}`}
      >
        Read more
        <ArrowRight16 />
      </Link>
    </li>
  );
};
