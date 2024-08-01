
import accessPage from "@/lib/auth/access-page";
import HomeScreen from "@/lib/screens/home/home-screen";

export default async function Home() {
  const session = await accessPage();
  console.log({sesssionnnn :session})

  return (
    <HomeScreen />
  );
}
