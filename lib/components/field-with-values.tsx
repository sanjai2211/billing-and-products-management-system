"use client";

import * as React from "react";

export function FieldWithValues({ title, value }: any) {
  return (
    <div>
      <p className="text-xs opacity-50">{title}</p>
      <p className="text-sm font-semibold">{value || "-"}</p>
    </div>
  );
}

export function FieldWithBoxValues({ title, value, edgeCaseValue,color }: any) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs opacity-50">{title}</p>
      <p className={`text-sm text-left font-semibold border px-2 py-1 rounded-sm w-fit min-w-20 text-${color}-500`}>
        {value || edgeCaseValue || "-"}
      </p>
    </div>
  );
}
