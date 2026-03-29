import { Suspense } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { About } from '@/components/sections/About'
import { Gallery } from '@/components/sections/Gallery'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'
import { Cursor } from '@/components/ui/Cursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { StickyRDV } from '@/components/ui/StickyRDV'
import { SocialProof } from '@/components/ui/SocialProof'
import { getHeroData, getAboutData, getServices, getGallery, getTestimonials, getContactInfo } from '@/lib/db'

export const revalidate = 3600

export default async function HomePage() {
  const [hero, about, services, gallery, testimonials, contactInfo] = await Promise.all([
    getHeroData(),
    getAboutData(),
    getServices(),
    getGallery(),
    getTestimonials(),
    getContactInfo(),
  ])

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <StickyRDV />
      <Navbar />
      <main id="main-content">
        <Hero data={hero} />
        <SocialProof />
        <Services data={services} />
        <About data={about} />
        <Gallery data={gallery} />
        <Testimonials data={testimonials} />
        <Contact data={contactInfo} />
      </main>
      <Footer data={contactInfo} />
    </>
  )
}
