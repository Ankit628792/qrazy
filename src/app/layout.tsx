import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Provider } from '@/providers'
import { ErrorBoundary } from '@/templates/error-boundary'
import { ProtectedBoundary } from '@/templates/protected-boundary'
import { HeaderComponent } from '@/features/header'
import { FooterComponent } from '@/features/shared/footer'

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
          <Toaster position="top-center" />
          <ErrorBoundary>
            <Provider>
              <HeaderComponent />
              <ProtectedBoundary {...{ children }} />
              <FooterComponent />
            </Provider>
          </ErrorBoundary>
        </main>
      </body>
    </html>
  )
}
