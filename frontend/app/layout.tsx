import type { Metadata } from 'next'
import { Fira_Code } from 'next/font/google'
import './globals.css'

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Git Learner',
  description:
    'Learn Git by seeing what is happening behind the scenes with interactive visualizations and step-by-step explanations for beginners and intermediate users. Perfect for developers wanting to master Git fundamentals and improve their workflow.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={firaCode.variable}>
      <body>{children}</body>
    </html>
  )
}
