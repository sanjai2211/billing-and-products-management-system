import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function accessPage() {
  const session: any = await getServerSession();
  console.log({ session });

  if (!session && !session?.user?.email) {
    redirect("/login");
  }

  return session;
}
