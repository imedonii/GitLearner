import { HeroSection } from '@/components/HeroSection'
import { FeaturesBox } from '@/components/FeaturesBox/FeaturesBox'
import { WhyLearnGit } from '@/components/WhyLearnGit'
import { BecomeMaster } from '@/components/BecomeMaster'

const GuestPage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesBox />
      <WhyLearnGit />
      <BecomeMaster />
    </div>
  )
}

export default GuestPage
