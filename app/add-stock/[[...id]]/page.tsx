import { createStock, getStockDetailsById } from "@/apicall";
import accessPage from "@/lib/auth/access-page";
import { AddStockScreen } from "@/lib/screens";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function Home({ params }: any) {
  const session = await accessPage();
  const { id } = params;

  if (!id || id?.length === 0) {
    const newStock = await createStock({shopId : session?.shopId},true);
    if (newStock?.id) {
      redirect(`/add-stock/${newStock?.id}`);
    } else {
      redirect(`/my-stocks`);
    }
  }

  let stockDetails;

  if (id && id?.length > 0) {
    if (id?.length === 1) {
      stockDetails = await getStockDetailsById(id);
    }
    if (id?.length > 1 || stockDetails?.error) {
      redirect(`/my-stocks`);
    }
  }

  if (stockDetails?.error) {
    redirect("/my-stocks");
  }

  return <AddStockScreen stockDetails={stockDetails} session={session} />;
}
