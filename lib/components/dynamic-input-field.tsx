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
import { SearchableInput } from "@/components/ui/searchable-input";
import { DatePicker } from "@/components/ui/calendar";
import React, { useEffect, useState } from "react";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { Icon } from "../icons";

export const compareValues = (
  parentValue: any,
  basedOn: string,
  value: any
) => {
  switch (basedOn) {
    case "equal":
      return parentValue === value;
    case "greater_than":
      return parentValue > value;
    case "lesser_than":
      return parentValue < value;
    case "greater_than_equal":
      return parentValue >= value;
    case "lesser_than_equal":
      return parentValue <= value;
    case "not_equal":
      return parentValue !== value;
    default:
      return false;
  }
};

export function DynamicInputField({ form, data }: any) {
  const renderFormControl = (field: any) => {
    const { component, id, ...rest } = data;
    switch (data?.component) {
      case "inputField":
        return <Input {...field} {...rest} disabled={shouldDisableField()} />;
      case "select":
        const selectedValue = form?.getValues(id)
          ? rest?.list?.find((item: any) => item?.value === form?.getValues(id))
          : "";
        return (
          <Select
            onValueChange={field.onChange}
            defaultValue={selectedValue?.value || rest?.defaultValue}
            disabled={shouldDisableField()}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={selectedValue?.label || rest?.placeholder}
              />
            </SelectTrigger>
            <SelectContent>
              {rest?.list?.map((item: any) => (
                <SelectItem value={item?.value}>{item?.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "multipleSelect":
        const [values, setValues] = useState(field.value || []);
        return (
          <MultiSelector
            onValuesChange={field.onChange}
            values={field.value || []}
          >
            <MultiSelectorTrigger>
              <MultiSelectorInput placeholder={rest.placeholder} />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList>
                {rest?.list?.map((item: any) => (
                  <MultiSelectorItem key={item?.value} value={item?.label}>
                    {item?.label}
                  </MultiSelectorItem>
                ))}
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
        );
      case "searchableField":
        return (
          <SearchableInput
            {...rest}
            form={form}
            id={id}
            disabled={shouldDisableField()}
          />
        );
      case "button":
        return (
          <Button
            variant={rest.variant || "default"}
            size={rest.size || "default"}
            className="space-x-2"
            type={rest.type || "button"}
          >
            <Icon name={rest.iconName} className="h-4 w-4" />
            <p>{rest.buttonLabel}</p>
          </Button>
        );
      case "datePicker":
        return (
          <DatePicker
            field={field}
            {...rest}
            disabled={shouldDisableField()}
            disableDates={disableDates}
          />
        );
      case component:
        return component;

        default:
        return null;
    }
  };

  const error = form?.formState
    ? form?.formState?.errors[data.id]?.message
    : "";

  const shouldRenderField = () => {
    if (data?.parent && data?.condition?.display) {
      const parentValue = form?.getValues(data?.parent);
      const { basedOn, value } = data?.condition.display;
      return compareValues(parentValue, basedOn, value);
    }
    return true;
  };

  const shouldDisableField = () => {
    if (data?.disabled) {
      return true;
    } else if (data?.parent && data?.condition?.disabled) {
      const parentValue = form?.getValues(data?.parent);
      const { basedOn, valueField } = data?.condition.disabled;
      const value = form?.getValues(valueField);
      return compareValues(parentValue, basedOn, value);
    }
    return false;
  };

  const disableDates = (date: Date) => {
    if (data?.component === "datePicker" && data?.condition?.disabled) {
      const { basedOn, valueField } = data?.condition.disabled;
      const value = form?.getValues(valueField);
      return compareValues(value, basedOn, date);
    }
    return false;
  };

  return shouldRenderField() ? (
    <FormField
      control={form?.control}
      name={data?.id}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{data?.label}</FormLabel>
            <FormControl>{renderFormControl(field)}</FormControl>
            {data?.description && (
              <FormDescription>{data?.description}</FormDescription>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
          </FormItem>
        );
      }}
    />
  ) : null;
}
