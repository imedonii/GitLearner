import { SignIn } from '@/components/Auth'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Git Learner - Learn Git Interactively',
  description:
    'Learn Git interactively with visualizations, step-by-step explanations, and hands-on practice. Perfect for beginners and intermediate users to master Git fundamentals and improve their workflow.',
  icons: {
    icon: '/logo.ico',
  },
  alternates: {
    canonical: 'https://gitlearner.com',
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Git Learner - Learn Git Interactively',
    description: 'Learn Git with interactive lessons and real Git simulations.',
    images: ['/logo.svg'],
    creator: '@gitlearner',
  },
  openGraph: {
    title: 'Git Learner - Learn Git Interactively',
    description: 'Learn Git with interactive lessons and real Git simulations.',
    url: 'https://gitlearner.com',
    siteName: 'Git Learner',
    images: ['/logo.svg'],
    locale: 'en_US',
    type: 'website',
  },
}

const SignInPage = () => {
  return <SignIn />
}

export default SignInPage
