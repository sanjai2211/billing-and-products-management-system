import {
  createBill,
  getBillDetailsById,
  getBillingItems,
  getProductsByShopId,
  getShopDetailsById,
} from "@/apicall";
import { ToolTip } from "@/components/ui/tooltip";
import accessPage from "@/lib/auth/access-page";
import { NewBillScreen } from "@/lib/screens";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function NewBill({ params }: any) {
  const session = await accessPage();
  const { id } = params;
  const billId = params?.id[0];

  if (!id || id?.length === 0) {
    const newBill = await createBill({});
    console.log({ newBill: newBill?.id });
    if (newBill?.id) {
      redirect(`/new-bill/${newBill?.id}`);
    } else {
      redirect(`/new-bill`);
    }
  }

  let billDetails;

  if (id && id?.length > 0) {
    if (id?.length === 1) {
      billDetails = await getBillDetailsById(id);
    }
    if (id?.length > 1 || billDetails?.error) {
      // redirect("/my-bills");
    }
  }

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
