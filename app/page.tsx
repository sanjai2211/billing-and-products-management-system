import accessPage from "@/lib/auth/access-page";
import HomeScreen from "@/lib/screens/home/home-screen";
import { redirect } from "next/navigation";

export default async function Home() {
  // const session = await accessPage();

  redirect("/my-bills");
  return <HomeScreen />;
}
