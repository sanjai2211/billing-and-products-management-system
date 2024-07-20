"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import { BillingItemsSchema } from "@/lib/form-schema";
import { BillData } from "@/lib/constants";
import { DynamicInputField, ShowDetails } from "@/lib/components";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useAddEditDeleteBillItems } from "@/lib/hooks";
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductsByShopId } from "@/apicall";
import { Icon } from "@/lib/icons";

type FormData = z.infer<typeof BillingItemsSchema>;

export default function AddBill({
  billId,
  billingItems,
  form,
  productDetails,
  isFetching,
  isLoading,
  handleProductSelect,
}: any) {
  const list = Array.isArray(productDetails)
    ? productDetails?.map((item: any) => ({
        value: item?.id,
        label: item?.printName,
      }))
    : [];

  const selectedValues = Array.isArray(billingItems)
    ? billingItems?.map((item: any) => ({
        value: item?.product?.productSnapId,
      }))
    : [];

  const {
    id,
    productName,
    edit,
    quantity: quantityField,
    rate,
    discount: discountField,
    shopId,
    createdAt,
    updatedAt,
    printName,
    cost: costField,
    hsnCode,
    total,
    ...rest
  } = form.getValues() as any;

  const { mutate: onSubmit } = useAddEditDeleteBillItems({
    method: edit ? "PATCH" : "CREATE",
    form,
  });

  const productsField = useMemo(
    () => ({
      id: "product",
      label: "Product",
      placeholder: "Select Product",
      component: "searchableField",
      isLoading: isFetching || isLoading,
      list,
      selectedValues,
      onSelect: handleProductSelect,
      disabled: edit,
    }),
    [isFetching, isLoading, productDetails]
  );

  const cost = useWatch({ control: form.control, name: "cost" });
  const quantity = useWatch({ control: form.control, name: "quantity" });
  const discount = useWatch({ control: form.control, name: "discount" });

  const totalCost: any = useMemo(() => {
    const [parsedCost, parsedQuantity, parsedDiscount] = [
      cost,
      quantity,
      discount,
    ].map((val: any) => parseFloat(val || "0"));
    return (
      parsedCost * parsedQuantity -
      (parsedCost * parsedQuantity * parsedDiscount) / 100
    ).toFixed(2);
  }, [cost, quantity, discount]);

  useEffect(() => form.setValue("total", totalCost), [totalCost, form]);

  const totalField = {
    id: "total",
    label: "Total",
    value: totalCost.toLocaleString(),
    disabled: true,
    component: "inputField",
  };

  const handleSubmit = () => {
    let data: any = {
      quantity: parseInt(String(quantity)),
      cost: parseFloat(cost),
      discount: parseFloat(String(discount)),
    };

    if (edit) {
      data = {
        ...data,
        billItemId: id,
      };
    } else {
      data = {
        ...data,
        productId: id,
        billId,
      };
    }
    onSubmit(data);
  };

  const clearForm = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form>
        <div className="border w-full h-full rounded-md pb-4 pt-2 space-y-2">
          <div className="flex justify-between gap-2 items-center px-4">
            <p>{id ? productName : "Add Product"}</p>
            {id && <ShowDetails title="Other Details" data={rest} />}
          </div>
          <div className="grid grid-rows-1 md:grid-rows-1 gap-3 px-4">
            <DynamicInputField form={form} data={productsField} />
            {BillData?.map((field: any) => (
              <div key={field.id}>
                <DynamicInputField form={form} data={field} />
              </div>
            ))}
            <div className="flex items-end justify-between gap-4">
              <DynamicInputField form={form} data={totalField} />
              {!edit ? (
                <Button type="button" className="z-50" onClick={handleSubmit}>
                  Add
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button size="icon" type="button">
                    <Icon
                      name="Pencil"
                      className="h-4 w-4"
                      onClick={handleSubmit}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={clearForm}
                    type="button"
                  >
                    <Icon name="CircleX" className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
