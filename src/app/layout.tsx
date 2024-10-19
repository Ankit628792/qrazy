import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import ToggleTheme from "@/components/ak/ToggleTheme";
import { Toaster } from "react-hot-toast";
import TopLoader from "@/components/ak/TopLoader";

export const metadata: Metadata = {
  title: "QRazy | Admin",
  description: "a qr based reward and sales system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Qrazy" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`antialiased overflow-x-hidden`}
      >
        <TopLoader />
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="system"
        >
          <div className="flex flex-col min-h-dvh w-full text-black dark:text-white bg-white dark:bg-black">
            <Toaster />
            {children}
            <div className="fixed bottom-2 right-2 z-50 p-2 bg-white dark:bg-black rounded-full" draggable>
              <ToggleTheme />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
