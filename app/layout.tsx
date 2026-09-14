import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Constellation — Rencontres qui commencent par l’essentiel',
  description:
    'Application de rencontre internationale où la personnalité et la compatibilité priment sur l’apparence.',
  generator: 'v0.app',
  applicationName: 'Constellation',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Constellation',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1a1c22',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="dark bg-background">
      <body className={`${geistSans.className} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
