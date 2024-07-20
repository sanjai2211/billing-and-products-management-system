import {
  createBill,
  getBillDetailsById,
  getProductsByShopId,
  getShopDetailsById,
} from "@/apicall";
import accessPage from "@/lib/auth/access-page";
import { AddProductSlot, BillDetailsSlot, BillTableSlot, NewBillScreen } from "@/lib/screens";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function NewBill({ params }: any) {
  const session = await accessPage() as any;

  return (
    <BillDetailsSlot
      session={session}
    />
  );
}
