import BottomCTAMoonHomePage from '@/components/HomePageZesCloudComps/BottomCTAMoonHomePage/BottomCTAMoonHomePage'
import DesingedForTrustPlatforms from '@/components/PlatformsPageComps/DesingedForTrustPlatforms/DesingedForTrustPlatforms'
import BeforeUsersDoSolutions from '@/components/SolutionsPageComps/BeforeUsersDoSolutions/BeforeUsersDoSolutions'
import InfrastructureSolutions from '@/components/SolutionsPageComps/InfrastructureSolutions/InfrastructureSolutions'
import MainSolutionsPageHero from '@/components/SolutionsPageComps/MainSolutionsPageHero/MainSolutionsPageHero'
import ManualVentionsSolutions from '@/components/SolutionsPageComps/ManualVentionsSolutions/ManualVentionsSolutions'
import ProjectServersSolutions from '@/components/SolutionsPageComps/ProjectServersSolutions/ProjectServersSolutions'
import TrustedRunningSolutions from '@/components/SolutionsPageComps/TrustedRunningSolutions/TrustedRunningSolutions'
import React from 'react'

function page() {
  return (
    <div>
        <MainSolutionsPageHero/>
        <BeforeUsersDoSolutions/>
        <InfrastructureSolutions/>
        <ManualVentionsSolutions/>
        <ProjectServersSolutions/>
        <TrustedRunningSolutions/>
        <BottomCTAMoonHomePage/>
    </div>
  )
}

export default page