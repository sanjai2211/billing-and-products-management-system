import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Icon } from '../icons';

export function AddableComponent({ component, value = [], setValue, form, data }: any) {
  const [hoveredRow, setHoveredRow] = useState<string | number | null>(null);
  const [editField, setEditField] = useState<number | null>(null);

  // const {
  //   fields,
  //   append,
  //   prepend,
  //   remove,
  //   swap,
  //   move,
  //   insert,
  //   replace
  // } = useFieldArray({
  //   control : form?.control,
  //   name: data?.zodName,
  //   rules: {
  //     minLength: 4
  //   }
  // });


  const handleOnAdd = (data: any) => {
    // append({ contactNumber: "vdvdf", contactPersonPhone: "fvdfvdfv" })
    const updatedFields = getSpecificFieldsData();
    setValue((prev: any) => [...prev, updatedFields]);
    resetSpecificFields();
  };

  const handleEdit = (index: number) => {
    const currentField = value[index];
    Object.entries(currentField).forEach(([key, value]) => {
      form.setValue(key, value);
    });
    setEditField(index);
  };

  const handleUpdate = () => {
    if (editField === null) return;
    const updatedFields = getSpecificFieldsData();

    setValue((prev: any) => {
      const newValues = [...prev];
      newValues[editField] = updatedFields;
      return newValues;
    });

    handleCancel();
  };

  const handleCancel = () => {
    resetSpecificFields();
    setEditField(null);
  };

  const handleDelete = (index: number) => {
    const newValue = value.filter((_: any, i: number) => i !== index);
    setValue(newValue);
  };

  const resetSpecificFields = () => {
    const resetFields = data?.fields?.reduce((acc: any, item: any) => {
      acc[item.id] = "";
      return acc;
    }, {});
    form.reset(resetFields);
  };

  const getSpecificFieldsData = () => {
    return data?.fields?.reduce((acc: any, item: any) => {
      acc[item.id] = form.getValues(item.id);
      return acc;
    }, {});
  };

  const headers = data?.fields?.map((_: any) => _.label);

  return (
    <div className="w-full space-y-8 py-4">
      <div className="w-full">
        {/* <form onSubmit={form.handleSubmit(handleOnAdd)}> */}
        {component}
        <div className="px-4">
          {!editField ? (
            <Button type="button" onClick={handleOnAdd}>Add</Button>
          ) : (
            <div className="flex items-center gap-4">
              <Button onClick={handleCancel} type="button" variant="outline">
                Cancel
              </Button>
              <Button onClick={handleUpdate} type="button">
                Update
              </Button>
            </div>
          )}
        </div>
        {/* </form> */}
      </div>

      {value?.length > 0 && (
        <div className="mx-4 rounded-md border max-h-[244px] overflow-y-auto">
          <Table>
            <TableHeader></TableHeader>
            <TableHeader>
              <TableRow className="divide-x">
                <TableHead className="w-1" colSpan={1}>
                  S.No
                </TableHead>
                {headers?.map((header: string, index: number) => (
                  <TableHead colSpan={1} key={index}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {value?.map((item: any, index: number) => (
                <TableRow
                  key={index}
                  className="divide-x relative"
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <TableCell className="text-xs opacity-50 w-1">
                    {index + 1}
                  </TableCell>
                  {Object.entries(item).map(([key, value]: any, ind) => (
                    <TableCell key={ind} className="text-xs opacity-50">
                      {value || "-"}
                    </TableCell>
                  ))}
                  {hoveredRow === index && (
                    <div className="absolute right-0 flex flex-1 items-center justify-center gap-2 h-full w-28 bg-background">
                      <div
                        className="rounded-full border p-2 hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleEdit(index)}
                      >
                        <Icon name="Pencil" className="w-4 h-4" />
                      </div>
                      <div
                        className="text-destructive rounded-full border p-2 hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleDelete(index)}
                      >
                        <Icon name="Trash2" className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
