"use client";
import { useState } from "react";
import { DynamicInputField } from "./dynamic-input-field";
import { Section } from "./section";
import { AddableComponent } from "./addable-component";

const renderDynamicField = ({ form, data, onBlur,onChange }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4">
      {data?.fields?.map((field: any) => (
        <DynamicInputField
          key={field.id}
          form={form}
          data={field}
          onBlur={onBlur}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export function SectionWithDynamicFields({ form, data, onBlur,onChange }: any) {
  return (
    <Section
      name={data?.sectionName}
      icon={data?.icon}
      component={renderDynamicField({ form, data,onBlur,onChange })}
    />
  );
}

type FieldsType = Record<string, any>;

export function SectionWithAddableFields({ form, data, key }: any) {
  const [value, setValue] = useState<FieldsType[]>([]);
  // console.log({ form, data, value });
  // console.log({ addForm, data: data?.validationSchema, default : form });

  return (
    <Section
      key={key}
      name={data?.sectionName}
      icon={data?.icon}
      component={
        <AddableComponent
          key={key}
          form={form}
          value={value}
          setValue={setValue}
          component={renderDynamicField({ form: form, data })}
          data={data}
        />
      }
    />
  );
}
