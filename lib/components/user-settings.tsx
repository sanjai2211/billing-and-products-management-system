"use client";

import React, { useState } from "react";
import { Icon } from "@/lib/icons";
import { useSignOutUser } from "@/lib/hooks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

export function UserSettings() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { mutate: handleLogout } = useSignOutUser(setIsLoggingOut);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="border border-border rounded-md p-1 cursor-pointer">
          <Icon name="UserCog" className="w-5 h-5" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0" align="start" side="top">
        <div>
          {/* <div className="flex items-center text-xs border-b p-2">
            User name
          </div>
          <div
            className="flex items-center text-xs cursor-pointer p-2"
            onClick={() => {
              router.push("/my-profile");
            }}
          >
            <Icon name="User" className="w-4 h-4 mr-2" />
            My Profile
          </div> */}
          <div
            className="flex items-center text-xs cursor-pointer p-2"
            onClick={() => {
              if (!isLoggingOut) {
                handleLogout();
              }
            }}
          >
            <Icon name="LogOut" className="w-4 h-4 mr-2" />
            Logout
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
