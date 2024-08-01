"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CustomerSchema } from "@/lib/form-schema";
import { AddCustomer, AdddProduct } from "@/lib/constants";
import { PageHeader, SectionWithDynamicFields } from "@/lib/components";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useAddEditDeleteCustomer, useAddEditDeleteProduct } from "@/lib/hooks";
import { Icon } from "@/lib/icons";

type FormData = z.infer<typeof CustomerSchema>;

export default function AddCustomerScreen({ customerDetails, session }: any) {
  const form = useForm<FormData>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      ...customerDetails,
    },
  });

  console.log({customerDetails})

  const { mutate: onSubmit } = useAddEditDeleteCustomer({
    shopId: session?.shopId,
    method: customerDetails?.id ? "PATCH" : "",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log({ data });
          onSubmit({ ...data, customerId: customerDetails?.id }) as any;
        })}
      >
        <div className="flex flex-1 h-full flex-col gap-4">
          <div className="flex justify-between">
            <PageHeader
              title={`${customerDetails?.id ? "Edit" : "Add"} Customer`}
              hasBack={!!customerDetails?.id}
              path="/my-customers"
            />
            {customerDetails?.id ? (
              <Button type="submit">
                <Icon name="Pencil" className="h-4 w-4 mr-2" />
                Save
              </Button>
            ) : (
              <div className="flex justify-end gap-4">
                {" "}
                {/* <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    onSubmit({ ...form.getValues(), status: "DRAFT" })
                  }
                >
                  <Icon name="Save" className="h-4 w-4 mr-2" />
                  Save as Draft
                </Button> */}
                <Button type="submit">
                  <Icon name="Plus" className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            )}
          </div>
          {AddCustomer?.map((item: any) => (
            <SectionWithDynamicFields data={item} form={form} />
          ))}
        </div>
      </form>
    </Form>
  );
}
