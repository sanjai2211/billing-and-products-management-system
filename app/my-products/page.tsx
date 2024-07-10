import { getProductsByShopId } from "@/apicall";
import accessPage from "@/lib/auth/access-page";
import {MyProductsScreen} from "@/lib/screens";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function MyProducts() {
  const result = await getProductsByShopId('668d73ba2a6cfb4e622c0255');;

  if (result?.error) {
    redirect("/shop-settings");
  }

  return <MyProductsScreen products={result} />;
}
