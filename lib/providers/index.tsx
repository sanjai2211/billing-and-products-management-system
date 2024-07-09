"use client";
import { Toaster } from "@/components/ui/toaster";
import { BaseLayout } from "@/lib/layouts";
import ReactQueryClientProvider from "./query-client-provider";
import { ThemeProvider } from "./themes";
import { usePathname } from "next/navigation";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const fullScreen = ["/login", "/signup"]
  const isFullScreen = fullScreen?.includes(pathName);

  return (
    <>
      <ReactQueryClientProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {isFullScreen ? children : <BaseLayout>{children}</BaseLayout>}
        </ThemeProvider>
      </ReactQueryClientProvider>
      <Toaster />
    </>
  );
};

export { Providers };
