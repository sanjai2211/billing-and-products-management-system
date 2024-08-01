import { DarkLoading, Loading } from "../lottie";
import LottieAnimation from "../lottie/lottie";

export default function Loader() {
  return (
    <main className="flex  flex-col justify-center items-center max-h-screen h-full w-full overflow-y-scroll hide-scrollbar">
      <LottieAnimation dark={DarkLoading} light={Loading} />
    </main>
  );
}
