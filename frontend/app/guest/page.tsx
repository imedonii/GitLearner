'use client'

import { HeroSection } from '@/components/HeroSection'
import { FeaturesBox } from '@/components/FeaturesBox/FeaturesBox'
import { WhyLearnGit } from '@/components/WhyLearnGit'
import { AchievementsSection } from '@/components/AchievementsSection'
import { PlaygroundSection } from '@/components/PlaygroundSection/PlaygroundSection'
import { CheatSheetSection } from '@/components/CheatSheetSection/CheatSheetSection'
import { WhoIsThisFor } from '@/components/WhoIsThisFor/WhoIsThisFor'
import { FAQSection } from '@/components/FAQSection/FAQSection'
import { CTASection } from '@/components/CTASection/CTASection'

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
