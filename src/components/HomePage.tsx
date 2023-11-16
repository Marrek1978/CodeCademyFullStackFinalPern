import About from './homePage/About'
import Cta from './homePage/CTA'
import Features from './homePage/features/Features'
import Hero from './homePage/Hero'
import StatsLayout from './homePage/stats/StatsLayout'

// type Props = {}

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <StatsLayout />
      <Cta />
    </>
  )
}

export default HomePage