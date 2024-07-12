import { getProductsByShopId } from "@/apicall";
import accessPage from "@/lib/auth/access-page";
import {MyProductsScreen} from "@/lib/screens";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function MyProducts() {
  const session = accessPage() as any
  const result = await getProductsByShopId(session?.shopId);;

  if (result?.error) {
    redirect("/shop-settings");
  }

  return <MyProductsScreen products={result} />;
}
