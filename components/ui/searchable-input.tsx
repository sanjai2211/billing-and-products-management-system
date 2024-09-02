"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { Icon } from "@/lib/icons";
import { Input } from "./input";

const SearchableInput = (props: any) => {
  const {
    list,
    placeholder,
    selectedValues = [],
    isLoading = false,
    form,
    onSelect,
    id,
    disabled
  } = props;
  console.log({props})
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isScrollable, setIsScrollable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null) as any;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = form?.getValues(id);

  let options = list;

  if (selectedValues?.length !== 0) {
    const selectedId = selectedValues?.map(
      (item: any) => item?.id || item?.value
    );
    options = list?.filter(
      (item: any) => !selectedId?.includes(item?.id || item?.value)
    );
  }

  const filteredOptions = options?.filter((option: any) =>
    option?.label?.toLowerCase()?.includes(inputValue.toLowerCase())
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsOpen(true);
  };

  const handleSelectOption = (option: any) => {
    form?.setValue(id, option);
    setInputValue(option?.label);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  const toggleInputMode = () => {
    setIsOpen(!isOpen);
    if (inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 0);
    }
    setInputValue("");
  };

  const handleScroll = (direction: "up" | "down") => {
    if (dropdownRef.current) {
      const scrollAmount = 50;
      dropdownRef.current.scrollBy({
        top: direction === "up" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (dropdownRef.current) {
      setIsScrollable(
        dropdownRef.current.scrollHeight > dropdownRef.current.clientHeight
      );
    }
  }, [filteredOptions, isOpen]);

  return (
    <div className="relative w-full flex flex-col gap-8" ref={inputRef}>
      {isOpen ? (
        <div className="flex items-center justify-between gap-2 border rounded-md px-2 outline outline-offset-2 outline-[2.5px] outline-primary">
          <div className="flex items-center justify-between gap-2">
            <Icon name="Search" className="w-4 h-4" />
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={() => {
                setIsOpen(false);
                if (selectedOption?.value) {
                  setInputValue(selectedOption?.value);
                }
              }}
              className="outline-none border-none px-0 focus-within:outline-none focus-within:outline-0 focus-within:ring-none focus-within:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Search"
            />
          </div>
        </div>
      ) : (
        <Button
          className={`border rounded px-4 py-2 w-full flex justify-between gap-2 ${disabled ? 'cursor-not-allowed' : ''}`}
          onClick={toggleInputMode}
          variant="outline"
          disabled={disabled}
          type="button"
        >
          <p>
            {selectedOption?.label || selectedOption || placeholder || "Select"}
          </p>
          <Icon name="ChevronsUpDown" className="w-4 h-4" />
        </Button>
      )}
      {isOpen && (
        <div className="z-50 absolute bg-background w-full rounded-md border my-1 mt-[52px] outline outline-offset-2 outline-[1px] outline-primary h-56 overflow-hidden p-1">
          {isLoading ? (
            <div className="flex flex-col gap-2 h-full items-center justify-center">
              <p className="opacity-50 text-sm">Please wait</p>
              <Icon name="RefreshCcw" className="h-4 w-4 animate-spin" />
            </div>
          ) : filteredOptions?.length > 0 ? (
            <>
              {/* {isScrollable && (
                <div className="flex items-center justify-center py-1">
                  <Icon
                    name="ChevronUp"
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => handleScroll("up")}
                  />
                </div>
              )} */}
              <div
                className="overflow-y-auto mac-scrollbar h-full max-h-56 space-y-1"
                ref={dropdownRef}
              >
                {filteredOptions?.map((option: any, index: number) => (
                  <div
                    className={`flex flex-col gap-0.5 px-2 py-2 cursor-pointer hover:bg-muted text-sm rounded-sm ${
                      option?.value === selectedOption?.value ||
                      option?.value === selectedOption
                        ? "bg-muted"
                        : ""
                    }`}
                    onClick={() => handleSelectOption(option)}
                  >
                    <p className="text-sm">{option.label}</p>
                    <p className="text-xs opacity-50">{option?.subField}</p>
                  </div>
                ))}
              </div>
              {/* {isScrollable && (
                <div className="flex items-center justify-center py-1">
                  <Icon
                    name="ChevronDown"
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => handleScroll("down")}
                  />
                </div>
              )} */}
            </>
          ) : (
            <div className="flex flex-col gap-2 h-full items-center justify-center">
              <p className="opacity-50 text-sm">
                {options?.length > 0 ? "No such Data" : "No Data"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { SearchableInput };
