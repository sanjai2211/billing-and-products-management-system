import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormControl, FormItem } from "@/components/ui/form";
import { SearchableInput } from "@/components/ui/searchable-input";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function DynamicInputSelctionField({ form, data }: any) {
  const [select, setSelect] = useState(data?.[0] || null); // Default to first item
  const [list, setList] = useState(data); // Keep the list as state
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathName = usePathname();

  console.log({list})

  const search = params.get(select?.value);

  const handleSelect = (selectedField: any) => {
    // setSelect(selectedField); // Only update select, not the list
    form.setValue(selectedField, params.get(selectedField) || ""); // Update the form field value
  };

  const handleClearFilter = (value: any) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(value);
    form.setValue(value, "");
    router.replace(`${pathName}?${newParams.toString()}`);
  };

  const onChange = (value: any, field: any) => {
    const sanitizedValue = value.trim().replace(/[^a-zA-Z0-9.@+\-_ ]/g, "");
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(select?.value, sanitizedValue);
    } else {
      newParams.delete(select?.value);
    }

    field.onChange(value);
    router.replace(`${pathName}?${newParams.toString()}`);
  };

  return (
    <Form {...form}>
      <form className="flex gap-4 items-center">
        <div className="flex items-center gap-4">
          <div className="flex gap-4 w-full">
            {/* Select Input */}
            <Select
              onValueChange={handleSelect}
              defaultValue={select?.value || select?.placeholder}
              value={select?.value}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Search By" />
              </SelectTrigger>
              <SelectContent>
                {list?.map((item: any) => (
                  <SelectItem
                    key={item.id}
                    value={item?.value}
                    onClick={() => setSelect(item)} // Set the selected value here
                  >
                    {item?.label || item?.placeholder}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Search Input */}
            <FormField
              control={form?.control}
              name={select?.id || data?.[0]?.id} // Use selected ID
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SearchableInput
                      {...select}
                      {...field}
                      form={form}
                      id={select?.id}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
