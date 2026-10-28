// import AiOperationsAssistant from '@/components/AiOperationsAssistant/AiOperationsAssistant'
import AiOperationRobotAssistantModal from '@/components/AiOperationsPageComps/AiOperationRobotAssistantModal/AiOperationRobotAssistantModal'
import AiOperationsBannerAfterCards from '@/components/AiOperationsPageComps/AiOperationsBannerAfterCards/AiOperationsBannerAfterCards'
import AiOperationsCapabilitiesExcellence from '@/components/AiOperationsPageComps/AiOperationsCapabilitiesExcellence/AiOperationsCapabilitiesExcellence'
import AiOperationsDecisionAutomatically from '@/components/AiOperationsPageComps/AiOperationsDecisionAutomatically/AiOperationsDecisionAutomatically'
import AiOperationsPageMainSlider from '@/components/AiOperationsPageComps/AiOperationsPageMainSlider/AiOperationsPageMainSlider'
import PowerdByAIAoperations from '@/components/AiOperationsPageComps/PowerdByAIAoperations/PowerdByAIAoperations'
import BottomCTAMoonHomePage from '@/components/HomePageZesCloudComps/BottomCTAMoonHomePage/BottomCTAMoonHomePage'
import React from 'react'

function page() {
  return (
    <div>
        <AiOperationsPageMainSlider/>
        <AiOperationsBannerAfterCards/>
        <AiOperationsDecisionAutomatically/>
        <AiOperationsCapabilitiesExcellence/>
        <AiOperationRobotAssistantModal/>
        <PowerdByAIAoperations/>
        <BottomCTAMoonHomePage/>
    </div>
  )
}

export default page