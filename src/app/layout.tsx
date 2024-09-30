import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Layout } from '@/templates/layouts'

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
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Layout>{children}</Layout>
        </main>
      </body>
    </html>
  )
}
