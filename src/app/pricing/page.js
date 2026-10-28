import BottomCTAMoonHomePage from '@/components/HomePageZesCloudComps/BottomCTAMoonHomePage/BottomCTAMoonHomePage'
import PricingOperationalExcellence from '@/components/PricingPageComps/PricingOperationalExcellence/PricingOperationalExcellence'
import PricingPageMainSlider from '@/components/PricingPageComps/PricingPageMainSlider/PricingPageMainSlider'
import PricingPagePricingMothlyYearly from '@/components/PricingPageComps/PricingPagePricingMothlyYearly/PricingPagePricingMothlyYearly'
import PricingPageTable from '@/components/PricingPageComps/PricingPageTable/PricingPageTable'
import React from 'react'

function page() {
  return (
    <div>
        <PricingPageMainSlider/>
        <PricingPagePricingMothlyYearly/>
        <PricingPageTable/>
        <PricingOperationalExcellence/>
        <BottomCTAMoonHomePage/>
    </div>
  )
}

export default page