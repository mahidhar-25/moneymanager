import Header from "@/components/layout/header";
import Services from "@/components/layout/services";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <Services />
                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
}
