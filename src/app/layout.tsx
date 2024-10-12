import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import ToggleTheme from "@/components/ak/ToggleTheme";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`antialiased `}
      >
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="light"
        >
          <div className="flex flex-col min-h-dvh w-full bg-gray-50 text-black dark:bg-black dark:text-white">
            {children}
            <ToggleTheme />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
