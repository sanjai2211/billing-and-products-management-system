"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { ProductSchema } from "@/lib/form-schema";
import { AdddProduct } from "@/lib/constants";
import { PageHeader, SectionWithFields } from "@/lib/components";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useAddEditProduct } from "@/lib/hooks";
import { Icon } from "@/lib/icons";

type FormData = z.infer<typeof ProductSchema>;

export default function AddProductScreen({ productDetails }: any) {
  const form = useForm<FormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      code: "",
      productName: "",
      printName: "",
      category: "",
      unit: "",
      group: "",
      brand: "",
      cost: "",
      mrp: "",
      purchaseRate: "",
      salesRate: "",
      gstPurchase: "",
      gstSales: "",
      igstPurchase: "",
      igstSales: "",
      hsnCode: "",
      openStock: "",
      stockValue: "",
      ...productDetails,
    },
  });

  const { mutate: onSubmit } = useAddEditProduct(productDetails?.id);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as any)}>
        <div className="flex flex-1 h-full flex-col gap-4">
          <div className="flex justify-between">
            <PageHeader title="Add Product" />
            {productDetails?.id ? (
              <Button type="submit" >
                <Icon name="Pencil" className="h-4 w-4 mr-2" />
                Save
              </Button>
            ) : (
              <div className="flex justify-end gap-4">
                {" "}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    onSubmit({ ...form.getValues(), status: "DRAFT" })
                  }
                >
                  <Icon name="Save" className="h-4 w-4 mr-2" />
                  Save as Draft
                </Button>
                <Button type="submit">
                  <Icon name="Plus" className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            )}
          </div>
          <SectionWithFields data={AdddProduct} form={form} />
        </div>
      </form>
    </Form>
  );
}
