"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddBill from "./add-bill";
import TotalDetails from "./total-details";
import { usePathname } from "next/navigation";
import { getProductsByShopId } from "@/apicall";
import { useQuery } from "@tanstack/react-query";

export default function AddProductSlot({ billId,billingItems, session }: any) {
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

  return (
    <div className="flex md:flex-row flex-col h-full  max-h-screen justify-between gap-4">
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
          <TabsContent value="add" className="w-80">
            <AddBill
              billId={billId}
              session={session}
              productDetails={productDetails}
              billingItems={billingItems}
              isLoading={isLoading}
              isFetching={isFetching}
            />
          </TabsContent>
          <TabsContent value="total">
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
