import AfterHeroCardsPlatformsPage from '@/components/PlatformsPageComps/AfterHeroCardsPlatformsPage/AfterHeroCardsPlatformsPage'
import DesingedForTrustPlatforms from '@/components/PlatformsPageComps/DesingedForTrustPlatforms/DesingedForTrustPlatforms'
import InfrastructureOperationsPlatforms from '@/components/PlatformsPageComps/InfrastructureOperationsPlatforms/InfrastructureOperationsPlatforms'
import MainPlatformsPageHero from '@/components/PlatformsPageComps/MainPlatformsPageHero/MainPlatformsPageHero'
import TotalDashboardControlPlatforms from '@/components/PlatformsPageComps/TotalDashboardControlPlatforms/TotalDashboardControlPlatforms'
import React from 'react'

function page() {
  return (
    <div>
         <MainPlatformsPageHero/>
         <AfterHeroCardsPlatformsPage/>
         <TotalDashboardControlPlatforms/>
         <InfrastructureOperationsPlatforms/>
         <DesingedForTrustPlatforms/>
    </div>
  )
}

export default page