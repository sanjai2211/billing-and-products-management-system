import { getProductsByShopId } from "@/apicall";
import accessPage from "@/lib/auth/access-page";
import {MyProductsScreen} from "@/lib/screens";

export const revalidate = 0;

export default async function MyProducts({params,searchParams} : any) {
  const session = await accessPage() as any
  const queryParams = new URLSearchParams(searchParams)
  const result = await getProductsByShopId(session?.shopId,queryParams);

  return <MyProductsScreen products={result} />;
}
