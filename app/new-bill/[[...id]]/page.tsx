import {
  createBill,
  createStock,
  getBillDetailsById,
  getBillingItems,
  getProductsByShopId,
  getShopDetailsById,
  getStockDetailsById,
} from "@/apicall";
import { ToolTip } from "@/components/ui/tooltip";
import accessPage from "@/lib/auth/access-page";
import { NewBillScreen } from "@/lib/screens";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function NewBill({ params, searchParams }: any) {
  const session = await accessPage();
  const { id } = params;

  if (!id || id?.length === 0) {
    const newBill = await createBill(
      { type: searchParams?.type || 'BILL', shopId: session?.shopId },
      true
    );
    console.log({ newBill: newBill?.id });
    if (newBill?.id) {
      redirect(`/new-bill/${newBill?.id}`);
    } else {
      redirect(`/my-bills`);
    }
  }

  let billDetails;

  if (id && id?.length > 0) {
    if (id?.length === 1) {
      billDetails = await getBillDetailsById(id);
    }
    if (id?.length > 1 || billDetails?.error) {
      redirect("/my-bills");
    }
  }

  if (billDetails?.error) {
    redirect("/my-bills");
  }

  const billId = params?.id?.[0];

  // return (
  //   <ToolTip
  //     trigger={
  //       <p className="text-xl border px-2 py-1.5 rounded-md cursor-pointer">
  //         {billDetails?.billNumber}
  //       </p>
  //     }
  //     content={"Bill Number"}
  //   />
  // );
  return (
    <NewBillScreen
      billId={billId}
      billDetails={billDetails}
      session={session}
    />
  );
}
