"use client";

import { useRadio } from "@nextui-org/radio";
import { cn } from "@nextui-org/theme";
import { Tooltip } from "@nextui-org/tooltip";
import { VisuallyHidden } from "@react-aria/visually-hidden";

import type { RadioProps } from "@nextui-org/radio";

type ColorRadioItemProps = Omit<RadioProps, "color"> & {
  color?: string;
  tooltip?: string;
};

export function ColorRadioItem({
  color,
  tooltip,
  ...props
}: ColorRadioItemProps) {
  const { Component, isSelected, isFocusVisible, getBaseProps, getInputProps } =
    useRadio(props);

  return (
    <Tooltip
      content={tooltip}
      delay={1000}
      isDisabled={!tooltip}
      offset={0}
      placement="top"
    >
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <span
          className={cn(
            "pointer-events-none h-8 w-8 rounded-full border border-black border-opacity-10 transition-transform group-data-[pressed=true]:scale-90",
            {
              "ring-2 ring-offset-2 ring-offset-content1": isSelected,
            },
          )}
          style={{
            backgroundColor: color,
            // @ts-ignore
            "--tw-ring-color":
              isSelected || isFocusVisible
                ? "hsl(var(--nextui-primary))"
                : "transparent",
          }}
        />
      </Component>
    </Tooltip>
  );
}
