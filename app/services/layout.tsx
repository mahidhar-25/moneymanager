export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex flex-col min-h-screen">
        <div className="border-b p-4 text-center"> Money Manager </div>
        <div className="flex flex-1">
          <div className="border-r p-2 w-1/5">
            <div className="text-center mx-auto border-b p-3">Lender Manager</div>
          </div>
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    
  );
}