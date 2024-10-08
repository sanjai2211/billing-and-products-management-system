"use client";

import {
  Form,
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
import { compareValues } from "./dynamic-input-field";
import { DynamicFilterField } from "./dynamic-filter-field";

const ALLOWED_SYMBOLS_REGEX = /^[a-zA-Z0-9\s\-_\.,]*$/

export function DynamicInputSearchField({ form, data }: any) {
  const [select, setSelect] = useState(data[0]?.value) as any;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const search = params.get(select);

  const router = useRouter();
  const pathName = usePathname();

  const handleClearFilter = (value: any) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(value);
    form.setValue(value, "");
    router.replace(`${pathName}?${newParams.toString()}`);
  };

  const onChange = (value: any, field: any) => {
    const sanitizedValue = value.trim().replace(/[^a-zA-Z0-9.@+\-_ ]/g, '');
    const newParams = new URLSearchParams(searchParams);

    if (value) newParams.set(select, sanitizedValue);
    else newParams.delete(select);

    field.onChange(value);
    router.replace(`${pathName}?${newParams.toString()}`);
  };

  const handleSelect = (selectedField: any) => {
    setSelect(selectedField);
    form.setValue(selectedField, params.get(selectedField) || "");
  };

  return (
    <Form {...form}>
      <form className="flex gap-4 items-center">
        <div className="flex items-center gap-4">
          <div className="flex gap-4 w-full">
            <Select
              onValueChange={handleSelect}
              defaultValue={select}
              value={select}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder={"Select"} />
              </SelectTrigger>
              <SelectContent>
                {data?.map((item: any) => (
                  <SelectItem
                    value={item?.value}
                    onClick={() => setSelect(item)}
                  >
                    {item?.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormField
              control={form?.control}
              name={select || data[0]?.value}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        key={select}
                        {...field}
                        onChange={(e) => onChange(e?.target?.value, field)}
                        defaultValue={search || ""}
                        value={form.watch(select) || search}
                        placeholder="Search"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="flex gap-2">
            {data?.map((item: any) => (
              <ToolTip
                trigger={
                  <div className="relative">
                    <Button
                      size="icon"
                      variant={"outline"}
                      className={`rounded-full border ${
                        params.has(item?.value) ? "" : "opacity-50"
                      }`}
                      type="button"
                      onClick={() => handleSelect(item?.value)}
                    >
                      <Icon
                        name={item?.icon}
                        className={`h-4 w-4 ${
                          params.has(item?.value) ? "text-cyan-500" : ""
                        }`}
                      />
                    </Button>
                    {params.has(item?.value) ? (
                      <div
                        className="absolute -top-2 -right-2  h-4 w-4 rounded-full bg-background  text-xs text-center cursor-pointer"
                        onClick={() => handleClearFilter(item?.value)}
                      >
                        <Icon
                          name="CircleX"
                          className="h-4 w-4 text-destructive"
                        />
                      </div>
                    ) : null}
                  </div>
                }
                content={item?.label}
                align="center"
                side='bottom'
              />
            ))}
          </div>
        </div>
      </form>
    </Form>
  );
}
