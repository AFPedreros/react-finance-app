"use client";

import { RadioGroup } from "@nextui-org/radio";

import { ColorRadioItem } from "./color-radio-item";

type ColorPickerProps = {
  isDisabled: boolean;
  selectedColor: string;
  onSelectColor: (color: string) => void;
};

export function ColorPicker({
  isDisabled,
  selectedColor,
  onSelectColor,
}: ColorPickerProps) {
  return (
    <div className="max-w-fit">
      <span className="pointer-events-none z-10 block max-w-full cursor-pointer overflow-hidden text-ellipsis pe-2 text-small text-foreground-500 subpixel-antialiased transition-[transform,color,left,opacity] !duration-200 !ease-out will-change-auto after:ml-0.5 after:text-danger after:content-['*'] group-data-[filled=true]:pointer-events-auto group-data-[filled=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px)] group-data-[filled=true]:scale-85 group-data-[filled=true]:text-default-600 motion-reduce:transition-none">
        Color
      </span>
      <RadioGroup
        aria-label="Color"
        classNames={{
          base: "mt-2",
          wrapper: "gap-2",
        }}
        isDisabled={isDisabled}
        orientation="horizontal"
        value={selectedColor}
        onValueChange={onSelectColor}
      >
        <ColorRadioItem color="#006FEE" tooltip="Blue" value="#006FEE" />
        <ColorRadioItem color="#7828C8" tooltip="Purple" value="#7828C8" />
        <ColorRadioItem color="#17C964" tooltip="Green" value="#17C964" />
        <ColorRadioItem color="#F31260" tooltip="Red" value="#F31260" />
        <ColorRadioItem color="#FF4ECD" tooltip="Pink" value="#FF4ECD" />
        <ColorRadioItem color="#F5A524" tooltip="Yellow" value="#F5A524" />
        <ColorRadioItem color="#7EE7FC" tooltip="Cyan" value="#7EE7FC" />
        <ColorRadioItem color="#3F3F46" tooltip="Gray" value="#3F3F46" />
      </RadioGroup>
    </div>
  );
}
