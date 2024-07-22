import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const GeneralLayout = ({ children, title, description }: any) => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-1 p-2">
        <p className="text-normal font-semibold">{title}</p>
        <p className="text-xs opacity-50">{description}</p>
      </div>
      <div className="border my-1" />

      {children}
    </div>
  );
};

export const FieldsTable = ({
  data,
  details,
  title,
  description,
  isSelectable = false,
  handleToggle = () => {},
  handleSelectAll = () => {},
}: any) => {
  return (
    <div className="space-y-2 mb-10">
      
      <div className="rounded-t-lg  border-2">
        <div className="w-full hover:rounded-t-lg font-semibold border-b p-4">
          <p>{title}</p>
          <p className="text-xs opacity-50">{description} </p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 ">
          {data?.map((item: any, index: number) => (
            <div className="flex items-center gap-4 space-y-0.5 w-full hover:bg-muted/50 divide divide-x border cursor-pointer">
              {!isSelectable ? (
                <Label htmlFor={item?.id} className="p-4 w-4">
                  {index + 1}
                </Label>
              ) : (
                <Checkbox
                  value={item?.id}
                  id={item?.id}
                  className="ml-4"
                  checked={item?.value || item?.included}
                  onClick={() => handleToggle(item)}
                />
              )}
              <Label htmlFor={item?.id} className="p-4 w-full">
                {item?.label}
              </Label>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
