import { LandingCta } from '@/components/landing/cta'
import { LandingFeatures } from '@/components/landing/features'
import { LandingFooter } from '@/components/landing/footer'
import { LandingGoals } from '@/components/landing/goals'
import { LandingHeader } from '@/components/landing/header'
import { LandingHero } from '@/components/landing/hero'
import { LandingPricing } from '@/components/landing/pricing'

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingGoals />
        <LandingPricing />
        {/* <LandingCta /> */}
      </main>
      <LandingFooter />
    </>
  )
}
