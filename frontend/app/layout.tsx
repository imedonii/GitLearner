import { Fira_Code } from 'next/font/google'
import { Metadata } from 'next'
import './globals.css'
import ClientProviders from './client-providers'

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://gitlearner.com'),
  title: {
    default: 'Git Learner - Interactive Git Learning',
    template: '%s | Git Learner',
  },
  description:
    'Learn Git interactively with visualizations, playgrounds, and real-world examples.',
  keywords: [
    'Git Learner',
    'Git tutorial',
    'Git for beginners',
    'Git interactive',
    'Version control',
    'Git playground',
  ],
  authors: [{ name: 'Git Learner' }],
  creator: 'Git Learner',
  openGraph: {
    title: 'Git Learner - Interactive Git Learning',
    description:
      'Master Git through interactive visualization and hands-on practice.',
    url: 'https://gitlearner.com',
    siteName: 'Git Learner',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Git Learner - Interactive Git Learning',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Git Learner - Interactive Git Learning',
    description: 'Learn Git with interactive lessons and real Git simulations.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${firaCode.variable} bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 bg-fixed`}>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
