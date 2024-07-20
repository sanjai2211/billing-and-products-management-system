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

export function ShowDetails({ title, data = {} }: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">
          <Icon name="ReceiptText" className="w-4 h-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72 mt-2" align="end">
        <div className="grid gap-4">
          <p className="font-medium leading-none text-sm">{title}</p>
          <div className="grid gap-2 max-h-56 h-full overflow-y-scroll">
            {Object.entries(data).map(([key, value], index) => (
              <FieldWithValues title={key} value={value} />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
