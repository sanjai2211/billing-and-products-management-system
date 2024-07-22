import { getBillsByShopId, getProductsByShopId } from "@/apicall";
import accessPage from "@/lib/auth/access-page";
import {MyBillsScreen} from "@/lib/screens";

export const revalidate = 0;

export default async function MyProducts({params,searchParams} : any) {
  const session = await accessPage() as any
  const queryParams = new URLSearchParams(searchParams)
  const bills = await getBillsByShopId(session?.shopId,queryParams);
  
  return <MyBillsScreen bills={bills} />;
}
