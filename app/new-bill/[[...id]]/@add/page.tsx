import {
  createBill,
  getBillDetailsById,
  getBillingItems,
  getProductsByShopId,
  getShopDetailsById,
} from "@/apicall";
import accessPage from "@/lib/auth/access-page";
import { AddProductSlot, NewBillScreen } from "@/lib/screens";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function NewBill({ params }: any) {
  const session = await accessPage() as any;
  console.log({params})
  const billId = params?.id[0]
  const billingItems = await getBillingItems(billId);


  return (
    <AddProductSlot
      session={session}
      billId={billId}
      billingItems={billingItems}
    />
  );
}
