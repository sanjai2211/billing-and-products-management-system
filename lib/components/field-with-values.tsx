"use client";

import * as React from "react";

export function FieldWithValues({ title, value }: any) {
  const formattedValue = typeof value === 'string' && value.includes('<br/>')
    ? <span dangerouslySetInnerHTML={{ __html: value }} />
    : value || "-";

  return (
    <div className="space-y-1">
      <p className="text-xs opacity-50 font-semibold">{title}</p>
      <p className="text-sm">{formattedValue}</p>
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
