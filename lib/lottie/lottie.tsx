import { useTheme } from "next-themes";
import React from "react";
import Lottie from "react-lottie";

const LottieAnimation = ({ dark,light }: any) => {
  const { theme } = useTheme();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: theme === 'dark' ? dark : light,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={400} width={400} />;
};

export default LottieAnimation;
