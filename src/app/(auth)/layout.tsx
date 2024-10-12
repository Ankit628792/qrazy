import ToggleTheme from "@/components/ak/ToggleTheme";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="fixed top-2 left-2 z-50">
                <ToggleTheme />
            </div>
            {children}
        </>

    );
}
