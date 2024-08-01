import { getCustomerDetailsById } from "@/apicall";
import accessPage from "@/lib/auth/access-page";
import { AddCustomerScreen } from "@/lib/screens";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function Home({ params }: any) {
  const session = await accessPage();
  const { id } = params;
  let customerDetails;
  console.log({params})

  if (id) {
    console.log({id : id[0]})
    customerDetails = await getCustomerDetailsById(id[0]);
  }

  // If any product id is changed

  if (customerDetails?.error) {
    redirect("/add-customer");
  }

  return (
    <AddCustomerScreen customerDetails={customerDetails} session={session} />
  );
}
