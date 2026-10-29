import AboutPageMainSlider from '@/components/AboutUSPageComponents/AboutPageMainSlider/AboutPageMainSlider'
import AffordToLookAwayAboutUs from '@/components/AboutUSPageComponents/AffordToLookAwayAboutUs/AffordToLookAwayAboutUs'
import EveryThingWeBuildAboutUS from '@/components/AboutUSPageComponents/EveryThingWeBuildAboutUS/EveryThingWeBuildAboutUS'
import IntelligenceClearViewAboutUs from '@/components/AboutUSPageComponents/IntelligenceClearViewAboutUs/IntelligenceClearViewAboutUs'
import MostSeeThemAboutUs from '@/components/AboutUSPageComponents/MostSeeThemAboutUs/MostSeeThemAboutUs'
import ReactiveToReadyAboutUs from '@/components/AboutUSPageComponents/ReactiveToReadyAboutUs/ReactiveToReadyAboutUs'
import BottomCTAMoonHomePage from '@/components/HomePageZesCloudComps/BottomCTAMoonHomePage/BottomCTAMoonHomePage'
import React from 'react'

function page() {
  return (
    <div>
        <AboutPageMainSlider/>
        <MostSeeThemAboutUs/>
        <IntelligenceClearViewAboutUs/>
        <EveryThingWeBuildAboutUS/>
      <AffordToLookAwayAboutUs/>
        <ReactiveToReadyAboutUs/>
        <BottomCTAMoonHomePage/>
    </div>
  )
}

export default page