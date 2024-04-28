"use client";

import { css } from "@flows/styled-system/css";
import React, { useEffect, useState } from "react";

const useMousePosition = (): { x: number; y: number } => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent): void => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return mousePosition;
};

type SafeAreaProps = {
  submenu: HTMLDivElement;
};

export const SafeArea = ({ submenu }: SafeAreaProps): JSX.Element => {
  const { x: mouseX, y: mouseY } = useMousePosition();

  const { height, x, y } = submenu.getBoundingClientRect();

  const svgWidth = x - mouseX;
  const svgHeight = height;

  return (
    <svg
      style={{
        position: "fixed",
        width: svgWidth,
        height: `${height}px`,
        pointerEvents: "none",
        // To temporarily show the safe area, set opacity to 1
        opacity: 0,
        zIndex: 2,
        top: 0,
        bottom: 0,
        left: mouseX - 15,
      }}
      className={css({
        height: `${height}px`,
      })}
      id="svg-safe-area"
    >
      {/* Unsafe Area - only defined for debug visualization */}
      <path
        pointerEvents="none"
        width="100%"
        height="100%"
        fill="var(--colors-bg-danger-subtle)"
        opacity={0.5}
        d={`M 0,0 L ${svgWidth},0 L ${svgWidth},${svgHeight} L 0,${svgHeight} z`}
      />
      {/* Safe Area */}
      <path
        pointerEvents="auto"
        stroke="var(--colors-border-primary)"
        strokeWidth="1"
        fill="var(--colors-bg-success)"
        opacity={0.5}
        // prettier-ignore
        d={`M 0, ${mouseY-y} 
            L ${svgWidth},${svgHeight}  
            L ${svgWidth},0 z`}
      />
    </svg>
  );
};
