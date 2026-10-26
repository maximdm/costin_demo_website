import { Hero } from '@/components/sections/hero'
import { Stats } from '@/components/sections/stats'
import { ServicesOverview } from '@/components/sections/services-overview'
import { IndustriesPreview } from '@/components/sections/industries-preview'
import { BrandsMarquee } from '@/components/sections/brands-marquee'
import { WhyUs } from '@/components/sections/why-us'
import { CtaSection } from '@/components/sections/cta-section'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesOverview />
      <IndustriesPreview />
      <BrandsMarquee />
      <WhyUs />
      <CtaSection />
    </>
  )
}
