import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Layout } from '@/components/templates/layouts'
import { Toaster } from 'react-hot-toast'
import { Provider } from '@/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QRAZY',
  description: 'Open-source CRM for developers'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <main>
          <Toaster position="top-center" />
          <Provider>
            <Layout>{children}</Layout>
          </Provider>
        </main>
      </body>
    </html>
  )
}
