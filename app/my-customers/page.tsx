import { getCustomersByShopId } from "@/apicall";
import accessPage from "@/lib/auth/access-page";
import {MyCustomersScreen} from "@/lib/screens";

export const revalidate = 0;

export default async function MyProducts({params,searchParams} : any) {
  const session = await accessPage() as any
  const queryParams = new URLSearchParams(searchParams)
  const customers = await getCustomersByShopId(session?.shopId,queryParams);

  return <MyCustomersScreen customers={customers} />;
}
