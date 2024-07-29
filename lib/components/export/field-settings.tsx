import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FieldsTable } from "./export-components";
import { Icon } from "@/lib/icons";

export const FieldSettings = ({
  data,
  selectedOptions,
  setSelectedOptions,
  setCurrentOption
}: any) => {
  const { fields } = data?.selectedData;

  const defaultValues = fields?.filter((item: any) => item?.default);
  const selectableValues = fields?.filter((item: any) => !item?.default);


  const updateState = (fields : any) => setSelectedOptions((prev: any) => {
    const { parent, selectedData } = data;
    return {
      ...prev,
      [parent.id]: {
        ...prev?.[parent.id],
        [selectedData.id]: {
          ...prev?.[parent.id]?.[selectedData.id],
          fields,
        },
      },
    };
  });

  const handleSelectAll = () => {
    const updatedFields = fields?.map((item: any) => ({
      ...item,
      included: true,
    }));
    console.log({updatedFields})
    updateState(updatedFields)    
  };

  const handleToggle = (item: any) => {
    const currentData = fields?.findIndex((_: any) => _.id === item?.id);
    fields[currentData]["included"] = !fields[currentData]["included"];
    updateState(fields)
  };
  

  const fieldsTableData = [
    {
      id: "selectable-values",
      title: "Selcetable Values",
      description:
        "These fields are defaulty present in the data. this cant be toggled.",
      data: selectableValues,
      isSelectable: true,
      handleSelectAll,
      handleToggle
    },
    {
      id: "default-values",
      title: "Default Values",
      description:
        "These fields are defaulty present in the data. this cant be toggled.",
      data: defaultValues,
    },
  ];

  console.log({defaultValues,selectableValues,fields,selectedOptions,fieldsTableData})


  
  return (
    <div className="w-full h-full p-4 mb-10 space-y-4">
      <div className="flex gap-4 items-center justify-between">
        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={() => setCurrentOption(null)}
        >
          <Icon name="ChevronLeft" />
          <p className="text-sm font-semibold">Move to Options</p>
        </div>
        {/* <div
          className="flex justify-end gap-2 space-y-0.5 px-2 cursor-pointer"
          onClick={() => handleSelectAll()}
        >
          <Checkbox value={data?.id} id={data?.id} className="h-4 w-4" />
          <Label htmlFor={data?.id} className="opacity-50 text-xs">
            Select All
          </Label>
        </div> */}
      </div>
      <div className="space-y-8">
        {fieldsTableData?.map((item: any) => (
          <FieldsTable {...item} />
        ))}
      </div>
    </div>
  );
};
