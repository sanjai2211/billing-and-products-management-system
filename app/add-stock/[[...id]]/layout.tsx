export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen h-full flex-col justify-between">
      {children}
    </main>
  );
}
