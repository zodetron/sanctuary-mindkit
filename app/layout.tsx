import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stress & Anxiety Self-Help Toolkit',
  description: 'A comprehensive toolkit for managing stress and anxiety',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {children}
      </body>
    </html>
  )
}

