import ToggleTheme from "@/components/ak/ToggleTheme";

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
