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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DynamicInputField({ form, data }: DynamicInputFieldProps) {
  const renderFormControl = (field: any) => {
    const { component, id, ...rest } = data;
    switch (data?.component) {
      case "inputField":
        return <Input {...rest} {...field} />;
      case "select":
        return (
          <Select  onValueChange={field.onChange} defaultValue={rest?.defaultValue}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={rest?.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {rest?.list?.map((item: any) => (
                <SelectItem
                  value={item?.value}
                >
                  {item?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return null;
    }
  };

  const error = form.formState.errors[data.id]?.message;

  return (
    <FormField
      control={form.control}
      name={data?.id}
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
