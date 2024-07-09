"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Icon } from "@/lib/icons";

export function PageHeader({
  title,
  hasBack = false,
}: {
  title: string;
  hasBack?: boolean;
}) {
  return (
    <div className="flex gap-2">
      {hasBack && <Icon name="ChevronLeft" />}
      <p className="text-xl font-semibold">{title}</p>
    </div>
  );
}
