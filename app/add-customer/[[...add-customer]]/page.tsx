import { getProductDetailsById } from "@/apicall";
import accessPage from "@/lib/auth/access-page";
import { AddCustomerScreen } from "@/lib/screens";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function Home({ params }: any) {
  const session = await accessPage();
  const { productId } = params;
  let productDetails;

  if (productId) {
    productDetails = await getProductDetailsById(productId);
  }

  // If any product id is changed

  if (productDetails?.error) {
    redirect("/add-customer");
  }

  return <AddCustomerScreen productDetails={productDetails} session={session} />;
}
