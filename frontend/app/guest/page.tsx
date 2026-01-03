import type { Metadata } from 'next'
import { HeroSection } from '@/components/HeroSection'
import { FeaturesBox } from '@/components/FeaturesBox/FeaturesBox'
import { WhyLearnGit } from '@/components/WhyLearnGit'
import { AchievementsSection } from '@/components/AchievementsSection'
import { PlaygroundSection } from '@/components/PlaygroundSection/PlaygroundSection'
import { CheatSheetSection } from '@/components/CheatSheetSection/CheatSheetSection'
import { WhoIsThisFor } from '@/components/WhoIsThisFor/WhoIsThisFor'
import { FAQSection } from '@/components/FAQSection/FAQSection'
import { CTASection } from '@/components/CTASection/CTASection'

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

const GuestPage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesBox />
      <PlaygroundSection />
      <CheatSheetSection />
      <WhyLearnGit />
      <AchievementsSection />
      <WhoIsThisFor />
      <FAQSection />
      <CTASection />
    </>
  )
}

export default GuestPage
