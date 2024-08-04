import * as React from "react";

import { Icon } from "@/lib/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldWithValues } from "./field-with-values";
import { formatString } from "../utils-helper/string/string";

export function ShowDetails({
  title,
  data = {},
  icon = "Eye",
  component = null,
}: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer opacity-60">
          <Icon name={icon} className="w-4 h-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72 mt-2" align="end">
        <div className="grid gap-2">
          <p className="font-medium leading-none text-sm">{title}</p>
          <div className="grid gap-4 max-h-56 h-full overflow-y-scroll hide-scrollbar border rounded p-2">
            {component
              ? component
              : Object.entries(data)?.map(([key, value], index) => (
                  <FieldWithValues title={formatString(key)} value={value} />
                ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
