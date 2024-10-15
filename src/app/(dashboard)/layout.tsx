import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex flex-col min-h-dvh w-full bg-gradient-to-b from-zinc-200 to-sky-100 dark:from-zinc-700 dark:to-zinc-900">
            <Header />
            <section className="flex-grow w-full flex px-5 gap-4 h-dvh">
                <Sidebar />
                <div className="flex-grow overflow-y-auto pb-5 pt-24 scroll-hidden">
                    {children}
                </div>
            </section>
        </main>
    );
}
