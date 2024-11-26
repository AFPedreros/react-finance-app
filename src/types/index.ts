import { SVGProps } from "react";

export * from "./accounts";
export * from "./categories";
export * from "./transactions";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Column = {
  key: string;
  label: string;
};
