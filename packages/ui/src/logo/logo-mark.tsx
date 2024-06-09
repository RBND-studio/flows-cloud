import { type SVGProps } from "react";

export const LogoMarkSvg = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 40 40" {...props}>
    <path
      fillRule="evenodd"
      d="M9.348 0h21.304A9.348 9.348 0 0 1 40 9.348v21.304A9.348 9.348 0 0 1 30.652 40H9.348A9.348 9.348 0 0 1 0 30.652V9.348A9.348 9.348 0 0 1 9.348 0ZM19.93 24.646c-1.22 0-2.4.486-3.26 1.346l.014-.014-1.22 1.026c-3.412 2.871-8.627.444-8.627-4.022a3.96 3.96 0 0 1 1.151-2.788l3.426-3.425a4.62 4.62 0 0 1 3.26-1.346h5.395c1.22 0 2.399-.485 3.259-1.345l1.082-.971c3.328-2.982 8.64-.68 8.751 3.8v.18c0 1.04-.416 2.053-1.15 2.788l-3.427 3.426a4.62 4.62 0 0 1-3.259 1.346H19.93Z"
      clipRule="evenodd"
    />
  </svg>
);
