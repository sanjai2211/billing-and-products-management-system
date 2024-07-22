"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { addDays, format ,startOfDay, endOfDay} from "date-fns";
import { DateRange } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "rounded-md border text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

const normalizeDateToStartOfDay = (date: Date) => {
  return startOfDay(date);
};

const normalizeDateToEndOfDay = (date: Date) => {
  return endOfDay(date);
};
const DatePicker = ({
  field,
  disabled,
  disableDates,
  isMultipleDate = false,
}: any) => {
  const [date, setDate] = React.useState<any>(
    isMultipleDate ? { from: null, to: null } : null
  );

  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant={"outline"}
          className="w-full pl-3 text-left font-normal"
        >
          {isMultipleDate ? (
            date?.from ? (
              date.to ? (
                <>
                  {format(normalizeDateToStartOfDay(date.from), "LLL dd, y")} -{" "}
                  {format(normalizeDateToEndOfDay(date.to), "LLL dd, y")}
                </>
              ) : (
                format(normalizeDateToStartOfDay(date.from), "LLL dd, y")
              )
            ) : (
              <span className="opacity-50">From Date - To Date</span>
            )
          ) : field.value ? (
            format(normalizeDateToStartOfDay(field.value), "PPP")
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-80" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Calendar
          initialFocus
          mode={isMultipleDate ? "range" : "single"}
          selected={isMultipleDate ? date : normalizeDateToStartOfDay(field.value)}
          onSelect={
            isMultipleDate
              ? (e: any) => {
                  const normalizedRange = {
                    from: e.from ? normalizeDateToStartOfDay(e.from) : null,
                    to: e.to ? normalizeDateToEndOfDay(e.to) : null,
                  };
                  setDate(normalizedRange);
                  field.onChange(normalizedRange);
                }
              : (e: any) => field.onChange(normalizeDateToStartOfDay(e))
          }
          disabled={(date) => {
            if (disableDates) {
              return disableDates(date);
            }
            return date > new Date() || date < new Date("1900-01-01");
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export { Calendar, DatePicker };
