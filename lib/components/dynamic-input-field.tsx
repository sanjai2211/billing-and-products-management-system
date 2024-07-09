"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DynamicInputFieldProps } from "@/lib/types";

export function DynamicInputField({
  form,
  data,
}: DynamicInputFieldProps) {
  const renderFormControl = (field: any) => {
    switch (data?.component) {
      case "inputField":
        return (
          <Input
            placeholder={data.placeholder}
            type={data?.type || "text"}
            {...field}
          />
        );
      default:
        return null;
    }
  };

  const error = form.formState.errors[data.id]?.message;

  return (
    <FormField
      control={form.control}
      name={data.id}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{data.label}</FormLabel>
            <FormControl>{renderFormControl(field)}</FormControl>
            {data.description && (
              <FormDescription>{data.description}</FormDescription>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
          </FormItem>
        );
      }}
    />
  );
}
