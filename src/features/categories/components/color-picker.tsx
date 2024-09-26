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
      <h3 className="text-medium font-medium leading-8 text-default-600">
        Color
      </h3>
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
