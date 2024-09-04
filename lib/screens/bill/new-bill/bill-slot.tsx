"use client";

import * as z from "zod";

import { BillingItemsSchema, ShopDetailsSchema } from "@/lib/form-schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddBill from "./add-bill";
import { useQuery } from "@tanstack/react-query";
import { getProductsByShopId } from "@/apicall";
import BillTableSlot from "./bill-table-slot";
import { useAddEditDeleteBillItems } from "@/lib/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TotalDetails from "./total-details";
import { getTaxCalculationByHsn } from "@/lib/utils-helper/calculation/getTaxCalculation";
import { billCalculation } from "@/lib/utils-helper/calculation/calculateTotal";

type FormData = z.infer<typeof BillingItemsSchema>;

export default function BillSlot({
  billDetails,
  billId,
  form,
  session,
}: any) {
  const billingItemForm = useForm<FormData>({
    resolver: zodResolver(BillingItemsSchema),
    defaultValues: {
      cost: "",
      hsnCode: "",
      quantity: "",
      discount: "",
    },
  });

  const {
    data: productDetails,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["products", session?.shopId],
    queryFn: () => getProductsByShopId(session?.shopId),
    enabled: !!session?.shopId,
  });

  const handleProductSelect = (selectedProduct: any) => {
    const { value, ...rest } = selectedProduct;
    const selectedValue = productDetails?.find(
      (item: any) => item?.id === value
    );

    if (selectedValue) {
      Object.entries({
        ...selectedValue,
        ...rest,
        quantity: selectedProduct?.quantity || "1",
      }).forEach(([field, value]: any) => {
        billingItemForm.setValue(field, value);
      });
    }
  };

  const { mutate: onSubmit } = useAddEditDeleteBillItems({
    method: "DELETE",
  });

  const {items , Customer,Shop} = billDetails
  const isIntraTrade = !Customer ? true : Shop?.address?.stateCode === Customer?.address?.stateCode

  const discountedTotal = getTaxCalculationByHsn({ data: billDetails?.items, isIntraTrade });

  const totalDetails = billCalculation({data : billDetails?.items,isIntraTrade});

  const handleEdit = ({ data }: any) =>
    handleProductSelect({
      value: data?.product?.productSnapId,
      discount: String(data?.discount || ""),
      quantity: String(data?.quantity),
      cost: String(data?.cost),
      product: {
        label: data?.product?.productName,
        value: data?.product?.productSnapId,
      },
      id: data?.id,
      edit: true,
    });

  const handleDelete = ({id}: any) => onSubmit({ billItemId: id });


  return (
    <div className="flex md:flex-row flex-col  justify-between gap-4">
      <BillTableSlot
        items={items}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        total={discountedTotal}
        isIntraTrade={isIntraTrade}
      />
      <div className="w-full md:w-80">
        <Tabs defaultValue="add" className="w-full">
          <TabsList className="h-11 w-full">
            <TabsTrigger value="add" className="h-full w-full">
              Add
            </TabsTrigger>
            <TabsTrigger value="total" className="h-full w-full">
              Total
            </TabsTrigger>
          </TabsList>
          <TabsContent value="add">
            <AddBill
              billId={billId}
              session={session}
              productDetails={productDetails}
              billingItems={billDetails?.items}
              form={billingItemForm}
              isLoading={isLoading}
              isFetching={isFetching}
              handleProductSelect={handleProductSelect}
            />
          </TabsContent>
          <TabsContent value="total">
            <TotalDetails totalDetails={totalDetails} form={form} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
