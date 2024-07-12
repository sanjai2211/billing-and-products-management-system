"use client";
import { Icon } from "@/lib/icons";
import { DynamicInputField } from "./dynamic-input-field";

export function Section({ name, icon, component }: any) {
  return (
    <div className="w-full space-y-8 py-4">
      <div className="relative border rounded-md min-h-10">
        {(name || icon) && (
          <div className="absolute -top-5 left-5 flex items-center gap-2  bg-background w-fit">
            <div className="flex items-center justify-center border rounded-md h-10 w-10">
              <Icon name={icon} className="w-4 h-4" />
            </div>
            <div className="border rounded-md py-2 px-4">
              <p>{name}</p>
            </div>
          </div>
        )}
        {component}
      </div>
    </div>
  );
}
