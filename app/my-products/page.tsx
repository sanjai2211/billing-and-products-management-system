import { getProductsByShopId } from "@/apicall";
import accessPage from "@/lib/auth/access-page";
import {MyProductsScreen} from "@/lib/screens";

export const revalidate = 0;

export default async function MyProducts() {
  const session = await accessPage() as any
  const result = await getProductsByShopId(session?.shopId);

  return <MyProductsScreen products={result} />;
}
