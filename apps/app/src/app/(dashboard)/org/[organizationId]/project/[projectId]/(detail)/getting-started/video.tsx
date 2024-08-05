"use client";

import { css } from "@flows/styled-system/css";
import { Box } from "@flows/styled-system/jsx";
import { Play40 } from "icons";
import Image from "next/image";
import { useState } from "react";
import { Dialog, Icon } from "ui";

import demoVideoCover from "./demo-video-cover.png";

export const VideoSection = (): JSX.Element => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <Box
        mb="space24"
        width={256}
        overflow="hidden"
        cardWrap="-"
        onClick={() => setShowVideo(true)}
        position="relative"
        cursor="pointer"
        fastEaseInOut="all"
        _hover={{
          shadow: "l2",
          borderColor: "border.strong",
          "& svg": {
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%) scale(1.2)",
          },
        }}
      >
        <Icon
          icon={Play40}
          color="icon.primary"
          className={css({
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fastEaseInOut: "all",
          })}
        />
        <Image alt="Flows demo video cover" height={1624} src={demoVideoCover} width={2880} />
      </Box>
      <Dialog open={showVideo} onOpenChange={setShowVideo} maxWidth={1200}>
        <Box position="relative" width="100%" height="0" pb="56.25%">
          <iframe
            src="https://www.youtube.com/embed/XY3eU_p0AW4?si=kSQJFruZM8YViA0w"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className={css({
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            })}
          />
        </Box>
      </Dialog>
    </>
  );
};
