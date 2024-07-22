export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex  flex-col justify-between max-h-screen h-full overflow-y-scroll hide-scrollbar">
       Loading...
      </main>
    );
  }
  