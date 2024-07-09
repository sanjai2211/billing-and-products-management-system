"use client";
import { Icon } from "@/lib/icons";
import { DynamicInputField } from "./dynamic-input-field";

export function SectionWithFields({ form, data }: any) {
  return (
    <div className="w-full space-y-8 py-4">
      {data?.map((section: any) => (
        <div className="" key={section?.id}>
          <div className="relative border rounded-md min-h-10">
            {(section?.sectionName || section?.icon) && (
              <div className="absolute -top-5 left-5 flex items-center gap-2 border rounded-md bg-background p-2 h-10 w-fit">
                <Icon name={section?.icon} className="w-4 h-4" />
                <p>{section?.sectionName}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4">
              {section?.fields?.map((field: any) => (
                <div>
                  <DynamicInputField form={form} data={field} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
