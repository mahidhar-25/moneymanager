import Dashboard from "@/components/lenderManager/dashBoard";
export default function LenderManagerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 p-3">{children}</div>
        </div>
    );
}
