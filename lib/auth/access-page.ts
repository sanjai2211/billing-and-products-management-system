import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "./authoptions";

export default async function accessPage() {
  const session: any = await getServerSession(authOptions as any);
  console.log({ session });

  // if (!session || !session?.email || !session?.userId) {
  //   redirect("/login");
  // }

  // if (session && !session?.shopId) {
  //   redirect("/shop-settings");
  // }

  return session;
}
