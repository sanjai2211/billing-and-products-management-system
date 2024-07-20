import {
  createBill,
  getBillDetailsById,
  getBillingItems,
  getProductsByShopId,
  getShopDetailsById,
} from "@/apicall";
import accessPage from "@/lib/auth/access-page";
import { AddProductSlot, BillTableSlot, NewBillScreen } from "@/lib/screens";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function NewBill({ params }: any) {
  const session = (await accessPage()) as any;
  const billId = params?.id[0];
  const billingItems = await getBillingItems(billId);

  return <BillTableSlot billingItems={billingItems} session={session} />;
}
