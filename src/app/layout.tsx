import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const Links = [
  {href: '/', label: 'Home'},
  {href: '/', label: 'Home'},
  {href: '/', label: 'YouTube'},
  {href: '/', label: 'About'},
]

export const metadata: Metadata = {
  title: 'MR',
  description: 'MeganRing.com',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
