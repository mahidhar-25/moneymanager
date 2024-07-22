export default function LenderManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-3 w-full text-center h-1/3">
        Dashboard
      </div>
      <div className="flex-1 p-3">
        {children}
      </div>
    </div>
  );
}
