import BottomCTAMoonHomePage from '@/components/HomePageZesCloudComps/BottomCTAMoonHomePage/BottomCTAMoonHomePage'
import FromSignalToActionHomePage from '@/components/HomePageZesCloudComps/FromSinglaToActionHomePage/FromSignalToActionHomePage'
import HomePageMarqueTrusted from '@/components/HomePageZesCloudComps/HomePageMarqueTrusted/HomePageMarqueTrusted'
import HomePageSliderZesclode from '@/components/HomePageZesCloudComps/HomePageSliderZesclode/HomePageSliderZescloud'
import MeetZauraHomePage from '@/components/HomePageZesCloudComps/MeetZauraHomePage/MeetZauraHomePage'
import OPThatMattersHomePage from '@/components/HomePageZesCloudComps/OPThatMattersHomePage/OPThatMattersHomePage'
import SomethingWillBrokeHomePage from '@/components/HomePageZesCloudComps/SomethingWillBrokeHomePage/SomethingWillBrokeHomePage'
import UnderstandActHomePage from '@/components/HomePageZesCloudComps/UnderstandActHomePage/UnderstandActHomePage'
import ZesCloudHomeMainIntegrate from '@/components/HomePageZesCloudComps/ZesCloudHomeMainIntegrate/ZesCloudHomeMainIntegrate'
import React from 'react'

function page() {
  return (
    <div>
      <HomePageSliderZesclode/>
      <HomePageMarqueTrusted/>
      <SomethingWillBrokeHomePage/>
      <UnderstandActHomePage/>
      <OPThatMattersHomePage/>
      <ZesCloudHomeMainIntegrate/>
      <MeetZauraHomePage/>
      <FromSignalToActionHomePage/>
      <BottomCTAMoonHomePage/>
    </div>
  )
}

export default page