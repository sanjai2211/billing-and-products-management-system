"use client";
import React, { useState } from "react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Icon } from "../../lib/icons";

function MultiplSelectButton({ list }: any) {
  const [current, setCurrent] = useState(list[0]);
  return (
    <div className="flex">
      <Button
        type={current?.type || "button"}
        className="rounded-r-none border-r py-2 flex justify-start gap-2"
        onClick={current?.onClick}
        disabled={current?.disabled}
      >
        <Icon name={current?.icon} className="h-4 w-4" />
        <p>{current?.label}</p>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="icon"
            className="rounded-l-none outline-none ring-0"
          >
            <Icon name="ChevronDown" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 rounded-lg px-2" align="end">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          <DropdownMenuGroup className="space-y-2">
            {list?.map((item: any) => (
              <DropdownMenuItem
                onClick={() => {
                  setCurrent(item);
                  // item?.onClick();
                }}
                className={`flex justify-start flex-col items-start ${
                  item?.id === current.id ? "bg-secondary" : ""
                }
                ${item?.disabled ? "opacity-75" : ""}`}
              >
                <div className="flex gap-2">
                  <Icon name={item?.icon} className="h-4 w-4" />
                  <span>{item?.label}</span>
                </div>

                <span className="text-xs opacity-50">{item?.description}</span>
                {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { MultiplSelectButton };
