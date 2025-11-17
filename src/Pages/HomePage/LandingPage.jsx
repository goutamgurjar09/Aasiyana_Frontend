import React from 'react'
import WhyChooseUs from './WhyChooseUs';
import Services from './Services';
import HowItWorks from './HowItWorks';
import HomeSection from './HomeSection';
import Contact from './Contact';
import FAQ from './FAQ';

export const LandingPage = () => {
  return (
    <div>
        <HomeSection />
        <Services />
        <WhyChooseUs />
        <HowItWorks />
        <FAQ />
        <Contact />
    </div>
  )
}
