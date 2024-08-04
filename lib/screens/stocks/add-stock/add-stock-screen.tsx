"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import { AddStockSchema, StockDetailsSchema } from "@/lib/form-schema";
import {
  CodePreviewer,
  EditDeleteIconContainer,
  PageHeader,
} from "@/lib/components";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  useAddEditDeleteClearStock,
  useAddEditDeleteStockItems,
} from "@/lib/hooks";
import { Icon } from "@/lib/icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo, useState } from "react";
import { DynamicAddTable } from "@/lib/tables/billing-items/data-table";
import { StockColumns } from "@/lib/tables/dynamic-add-table/constants/stock-columns";
import { useQuery } from "@tanstack/react-query";
import { getProductsByShopId } from "@/apicall";
import { calculateTotalNewStockValue } from "@/lib/utils-helper/calculation/caculateTotalNewStockValue";
import StockDetailsSlot from "./stock-details-slot";
import { DeleteAlert } from "@/lib/components/alerts/delete-alert";
import { getList } from "@/lib/utils-helper/screens/getList";
import DetailsSlot from "../../components/DetailsSlot";
import { StockBasicDetails } from "@/lib/constants";

type AddFormData = z.infer<typeof AddStockSchema>;
type DetailsFormData = z.infer<typeof StockDetailsSchema>;

export default function AddStockScreen({ stockDetails, session }: any) {
  const [currentTab, setCurretTab] = useState("stocks");

  const addForm = useForm<AddFormData>({
    resolver: zodResolver(AddStockSchema),
    defaultValues: {
      edit: false,
    },
  });

  const detailsForm = useForm<DetailsFormData>({
    resolver: zodResolver(StockDetailsSchema),
    defaultValues: {
      ...stockDetails.Bank,
      ...stockDetails.Customer,
    },
  });

  const isCompleted = stockDetails?.dataStatus === "COMPLETED";
  const isDraft = stockDetails?.dataStatus === "DRAFT";

  const clearForm = () => {
    addForm.reset();
    addForm.setValue("quantity", "");
    addForm.setValue("cost", "");
  };

  const { mutate: onSubmit } = useAddEditDeleteStockItems({
    stockId: stockDetails?.id,
    clearForm,
  });

  const { mutate: onStockSubmit } = useAddEditDeleteClearStock({
    stockId: stockDetails?.id,
    shopId: session?.shopId, // not
  });

  const {
    data: productDetails,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["products-stock", session?.shopId],
    queryFn: () => getProductsByShopId(session?.shopId),
    enabled: !!session?.shopId,
  });

  const selectedValues = Array.isArray(stockDetails?.stockItems)
    ? stockDetails?.stockItems?.map((item: any) => ({
        value: item?.product?.productSnapId,
      }))
    : [];

  const cost = useWatch({ control: addForm.control, name: "cost" });
  const quantity = useWatch({ control: addForm.control, name: "quantity" });
  const edit = useWatch({ control: addForm.control, name: "edit" });

  const totalCost: any = useMemo(() => {
    const [parsedCost, parsedQuantity] = [cost, quantity].map((val: any) =>
      parseFloat(val || "0")
    );
    return (parsedCost * parsedQuantity).toFixed(2);
  }, [cost, quantity]);

  const handleProductSelect = (selectedProduct: any) => {
    const { value } = selectedProduct;
    const {
      code,
      cost,
      printName,
      unit,
      mrp,
      purchaseRate,
      salesRate,
      openStock,
      stockValue,
      quantity,
    } = productDetails?.find((item: any) => item?.id === value);

    Object.entries({
      code: { value, label: code },
      printName: { value, label: printName },
      cost,
      unit,
      mrp,
      purchaseRate,
      salesRate,
      openStock,
      stockValue,
      quantity,
    }).forEach(([field, value]: any) => {
      addForm.setValue(field, value);
    });
  };

  const handleDelete = ({ id }: any) => onSubmit({ id, method: "DELETE" });

  const handleEdit = ({ data }: any) => {
    const { product, sNo, submit, total, ...rest } = data;
    Object.entries({
      code: { value: product?.id, label: product?.code },
      printName: { value: product?.id, label: product?.printName },
      ...rest,
      edit: true,
    }).forEach(([field, value]: any) => {
      addForm.setValue(field, value);
    });
  };

  const commonFields = {
    isLoading: isFetching || isLoading,
    selectedValues,
    onSelect: handleProductSelect,
    disabled: edit,
    component: "searchableField",
  };

  const dynamicFields = [
    {
      id: "sNo",
      component: "inputField",
      value: stockDetails?.stockItems?.length + 1 || 1,
      disabled: true,
      className: "w-16",
    },
    {
      id: "code",
      placeholder: "Product Code",
      list: getList(productDetails, "code", "printName"),
      className: "w-40",
      ...commonFields,
    },
    {
      id: "productName",
      placeholder: "Product Name",
      list: getList(productDetails, "productName", "printName"),
      className: "w-80",
      ...commonFields,
    },
    {
      id: "cost",
      component: "inputField",
      placeholder: "Rate",
    },
    {
      id: "quantity",
      component: "inputField",
      placeholder: "Quantity",
    },
    {
      id: "total",
      component: "inputField",
      placeholder: "Total",
      value: totalCost,
      disabled: true,
    },
    {
      id: "submit",
      component: !edit ? (
        <Button
          type="button"
          onClick={() => onSubmit({ ...addForm.getValues() })}
        >
          <Icon name="Plus" className="h-4 w-4 mr-2" />
          Add
        </Button>
      ) : (
        <EditDeleteIconContainer
          handleEdit={() =>
            onSubmit({ ...addForm.getValues(), method: "PATCH" })
          }
          handleDelete={clearForm}
        />
      ),
    },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between">
        <PageHeader
          title={`${!isCompleted ? "Add" : "Edit"} Stocks`}
          hasBack={isCompleted || isDraft}
          path={"/my-stocks"}
        />

        <div className="flex justify-end items-center gap-4">
          <div className="border rounded-sm py-2 px-4 flex items-center gap-2">
            <p>&#8377;</p>
            <p className="text-green-500 font-semibold text-lg">
              {(
                calculateTotalNewStockValue(stockDetails?.stockItems) +
                parseFloat(totalCost)
              ).toFixed(2)}
            </p>
          </div>
          <CodePreviewer
            code={stockDetails?.stockCode}
            content="Stock Code"
            isDraft={isDraft}
          />

          <Tabs defaultValue="stocks" className="w-fit">
            <TabsList className="h-10 rounded-md">
              <TabsTrigger
                value="stocks"
                onClick={() => setCurretTab("stocks")}
                className="h-full"
              >
                Stocks
              </TabsTrigger>
              <TabsTrigger
                value="details"
                onClick={() => setCurretTab("details")}
                className="h-full"
              >
                Details
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {!isCompleted && !isDraft && (
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="destructive"
                onClick={() =>
                  onStockSubmit({ id: stockDetails?.id, method: "CLEAR" })
                }
                disabled={
                  !stockDetails?.stockItems.length &&
                  !stockDetails?.bankId &&
                  !stockDetails?.customerId
                }
              >
                <Icon name="CircleX" className="h-4 w-4 mr-2" />
                Clear All
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  onStockSubmit({ dataStatus: "DRAFT", method: "PATCH" })
                }
              >
                <Icon name="Save" className="h-4 w-4 mr-2" />
                Draft
              </Button>
            </div>
          )}

          {isDraft && (
            <Button
              type="button"
              variant="destructive"
              onClick={() =>
                onStockSubmit({ id: stockDetails?.id, method: "DELETE" })
              }
            >
              <Icon name="Trash2" className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}

          {!isCompleted ? (
            <Button
              type="button"
              onClick={() =>
                onStockSubmit({ dataStatus: "COMPLETED", method: "FINAL" })
              }
              disabled={!stockDetails?.stockItems.length}
            >
              <Icon name={"Plus"} className="h-4 w-4 mr-2" />
              Create
            </Button>
          ) : (
            <DeleteAlert
              handleDelete={() =>
                onStockSubmit({ id: stockDetails?.id, method: "DELETE" })
              }
              details={{
                name: "Stock",
                code: stockDetails?.stockCode,
                id: stockDetails,
              }}
              type="button"
            />
          )}
        </div>
      </div>
      {currentTab === "stocks" ? (
        <Form {...addForm}>
          <form
            onSubmit={addForm.handleSubmit(
              (data: any) =>
                onSubmit({ ...data, productId: productDetails?.id }) as any
            )}
            className="w-full space-y-4"
          >
            <DynamicAddTable
              data={stockDetails?.stockItems || []}
              columns={StockColumns}
              dynamicFields={dynamicFields}
              form={addForm}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </form>
        </Form>
      ) : (
        <Form {...detailsForm}>
          <form>
            <DetailsSlot session={session} form={detailsForm} basicDetails={StockBasicDetails} />
          </form>
        </Form>
      )}
    </div>
  );
}
