import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import {Providers} from '../store/provider.js';
export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      
      <body>
        <Providers>{children}</Providers>
        </body>
      <Toaster/>
    </html>
  )
}
