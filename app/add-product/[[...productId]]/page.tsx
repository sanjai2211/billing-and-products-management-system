import { getProductDetailsById } from "@/apicall";
import accessPage from "@/lib/auth/access-page";
import { AddProductScreen } from "@/lib/screens";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function Home({ params }: any) {
  const session = await accessPage();
  const { productId } = params;
  let productDetails;

  if (productId) {
    productDetails = await getProductDetailsById(productId);
  }

  if (productDetails?.error) {
    redirect("/add-product");
  }

  return <AddProductScreen productDetails={productDetails} session={session} />;
}
