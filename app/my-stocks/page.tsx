import { getProductsByShopId, getStocksByShopId } from "@/apicall";
import accessPage from "@/lib/auth/access-page";
import {MyProductsScreen, MyStocksScreen} from "@/lib/screens";

export const revalidate = 0;

export default async function MyProducts({params,searchParams} : any) {
  const session = await accessPage() as any
  const queryParams = new URLSearchParams(searchParams)
  const stocks = await getStocksByShopId(session?.shopId,queryParams);

  return <MyStocksScreen stocks={stocks} />;
}


