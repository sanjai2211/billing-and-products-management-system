"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Icon } from "@/lib/icons";
import { useRouter } from "next/navigation";

export function PageHeader({
  title,
  hasBack = false,
  path = "/",
}: {
  title: string;
  hasBack?: boolean;
  path?: string;
}) {
  const router = useRouter();
  return (
    <div className="flex gap-4 items-center">
      {hasBack && (
        <div
          className="border rounded-md p-1 cursor-pointer"
          onClick={() => router.push(path)}
        >
          <Icon name="ChevronLeft" />
        </div>
      )}
      <p className="text-xl font-semibold">{title}</p>
    </div>
  );
}
