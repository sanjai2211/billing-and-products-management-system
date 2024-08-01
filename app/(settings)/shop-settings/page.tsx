import { getShopDetailsById } from "@/apicall";
import authOptions from "@/lib/auth/authoptions";
import { ShopSettingsScreen } from "@/lib/screens";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Loading from "./loading";

export const revalidate = 0;

export default async function ShopSettings() {
  const session: any = await getServerSession(authOptions as any);

  if (!session || !session?.email || !session?.userId) {
    redirect("/login");
  }

  let shopDetails;

  if (session?.shopId) {
    shopDetails = await getShopDetailsById(session?.shopId);
  }

  return (
    // 
    <Loading />
  );
}
