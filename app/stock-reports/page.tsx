import { getStockReportsByShopId } from "@/apicall";
import accessPage from "@/lib/auth/access-page";
import { StockReportsScreen } from "@/lib/screens";

export const revalidate = 0;

export default async function MyProducts({ params, searchParams }: any) {
//   const session = (await accessPage()) as any;
const session ={
      name: null,
      email: 'sanjaikumar2211e@gmail.com',
      image: undefined,
      userId: '6690a9ed05505c07ea6036eb',
      shopId: '669110d805505c07ea603856'
    }
  
  const queryParams = new URLSearchParams(searchParams);
  const data = await getStockReportsByShopId(session?.shopId, queryParams);
  const {reports,details} = data

  return <StockReportsScreen reports={reports} details={details} session={session} />;
}
