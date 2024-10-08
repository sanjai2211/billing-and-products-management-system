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
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { ToolTip } from "@/components/ui/tooltip";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { compareValues, DynamicInputField } from "./dynamic-input-field";
import { formatDateToLocalString } from "../utils-helper/date/fotmatDateToLocalString";

export function DynamicFilterField({ form, data }: any) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const search = params.getAll(data?.id);

  const router = useRouter();
  const pathName = usePathname();

  const [open, setOpen] = useState(false);

  const handleClearFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(data?.id);
    router.replace(`${pathName}?${newParams.toString()}`);
  };

  const renderFormControl = (field: any) => {
    const { component, id, ...rest } = data;
    const onChange = (value: any) => {
      const newParams = new URLSearchParams(searchParams);

      switch (data?.component) {
        case "select":
          newParams.set(data?.id, value);
          break;
        case "multipleSelect":
          newParams.delete(data?.id);
          value?.forEach((val: string) => newParams.append(data?.id, val));
          break;
        case "inputField":
          newParams.set(data?.id, value?.target?.value);
          break;
        case "datePicker":
          console.log({newParams})
          newParams.delete(data?.id);
          if (value?.from) {
            newParams.append(data?.id, formatDateToLocalString(value?.from));
          }
          if (value?.to) {
            newParams.append(data?.id, formatDateToLocalString(value?.to));
          }
          break;

        default:
          return;
      }

      field.onChange(value); // Update form state
      router.replace(`${pathName}?${newParams.toString()}`);
      //   setOpen(false)
    };

    const getDefaultValues = () => {
      switch (data?.component) {
        case "select":
          return search
            ? rest?.list?.find((item: any) => item?.value === search[0])
            : "";
        case "multipleSelect":
          return search
            ? rest?.list
                ?.filter((item: any) => search.includes(item?.value))
                ?.map((item: any) => item?.value)
            : "";

        case "datePicker":
          return {
            from: search[0],
            to: search[1],
          };
        default:
          return;
      }
    };

    const selectedValue = getDefaultValues();

    switch (data?.component) {
      case "inputField":
        return (
          <Input
            {...field}
            {...rest}
            onChange={onChange}
            disabled={shouldDisableField()}
          />
        );
      case "select":
        return (
          <Select
            onValueChange={onChange}
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
        return (
          <MultiSelector
            onValuesChange={onChange}
            values={field.value || selectedValue || []}
          >
            <MultiSelectorTrigger>
              <MultiSelectorInput placeholder={rest.placeholder} />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList>
                {rest?.list?.map((item: any) => (
                  <MultiSelectorItem key={item?.value} value={item?.value}>
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
            onSelect={onChange}
            id={id}
            disabled={shouldDisableField()}
          />
        );
      case "datePicker":
        return (
          <DatePicker
            field={{ ...field }}
            {...rest}
            onHandleChange={onChange}
            disabled={shouldDisableField()}
            disableDates={disableDates}
            defaultValue={selectedValue}
          />
        );
      default:
        return null;
    }
  };

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

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <ToolTip
            trigger={
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => setOpen(true)}
              >
                <Icon name={data?.icon} className="h-5 w-5" />
              </Button>
            }
            content={data?.sectionName}
            align="end"
            side='bottom'    
          />
        </PopoverTrigger>
        <PopoverContent className="p-0" align="end">
          {shouldRenderField() ? (
            <FormField
              control={form?.control}
              name={data?.id}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>{renderFormControl(field)}</FormControl>
                    {data?.description && (
                      <FormDescription>{data?.description}</FormDescription>
                    )}
                  </FormItem>
                );
              }}
            />
          ) : null}{" "}
        </PopoverContent>
      </Popover>
      {search?.length > 0 ? (
        <>
          <div className="absolute -bottom-2 -right-2 border-2  h-4 w-4 rounded-full bg-background hover:bg-muted flex items-center justify-center text-xs text-center">
            {["multipleSelect"].includes(data?.component) ? (
              <p className="text-xs text-green-500 p-2">{search?.length}</p>
            ) : (
              <Icon name="CircleCheckBig" className="h-4 w-4 text-green-500" />
            )}
          </div>
          <div
            className="absolute -top-2 -right-2  h-4 w-4 rounded-full bg-background  text-xs text-center cursor-pointer"
            onClick={handleClearFilter}
          >
            <Icon name="CircleX" className="h-4 w-4 text-destructive" />
          </div>
        </>
      ) : null}
    </div>
  );
}
