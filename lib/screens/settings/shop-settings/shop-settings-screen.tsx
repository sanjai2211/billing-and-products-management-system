"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { ShopDetailsSchema } from "@/lib/form-schema";
import { ShopDetails } from "@/lib/constants";
import {
  PageHeader,
  SectionWithDynamicFields,
  SectionWithAddableFields,
} from "@/lib/components";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useAddEditShop } from "@/lib/hooks";
import { Icon } from "@/lib/icons";

type FormData = z.infer<typeof ShopDetailsSchema>;

export default function ShopSettingsScreen({ shopDetails, session }: any) {
  const form = useForm<FormData>({
    resolver: zodResolver(ShopDetailsSchema),
    defaultValues: {
      email: session?.email,
      ...shopDetails,
    },
  });
  const { shopId } = session;

  const { mutate: onSubmit } = useAddEditShop({ shopId });

  return (
    <Form {...form}>
      <form>
        <div className="flex flex-1 h-full flex-col gap-4">
          <div className="flex justify-between">
            <PageHeader title={`Shop Settings`} />
            <Button
              onClick={() =>
                onSubmit({ ...form.getValues(), userId: session?.userId })
              }
              type='button'
              className="flex items-center gap-2"
            >
              {shopId && <Icon name="Pencil" className="h-3.5 w-4" />}
              <p>{shopId ? "Save" : "Create Shop"}</p>
              {!shopId && <Icon name="Store" className="h-4 w-4" />}
            </Button>
          </div>
          {ShopDetails?.map((data: any, index: number) => (
            <SectionWithDynamicFields form={form} data={data} />
          ))}
          <div></div>
        </div>
      </form>
    </Form>
  );
}
