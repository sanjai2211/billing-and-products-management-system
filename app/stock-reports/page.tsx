import { getStockReportsByShopId } from "@/apicall";
import accessPage from "@/lib/auth/access-page";
import { StockReportsScreen } from "@/lib/screens";

export const revalidate = 0;

export default async function MyProducts({ params, searchParams }: any) {
  const session = (await accessPage()) as any;
  const queryParams = new URLSearchParams(searchParams);
  const reports = await getStockReportsByShopId(session?.shopId, queryParams);

  return <StockReportsScreen reports={reports} session={session} />;
}
