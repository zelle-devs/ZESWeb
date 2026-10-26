import BottomCTAMoonHomePage from '@/components/HomePageZesCloudComps/BottomCTAMoonHomePage/BottomCTAMoonHomePage'
import BeyoundIntegrationsProvide from '@/components/IntegrationsPageComps/BeyoundIntegrationsProvide/BeyoundIntegrationsProvide'
import IntegrationsPageMainSlider from '@/components/IntegrationsPageComps/IntegrationsPageMainSlider/IntegrationsPageMainSlider'
import LimitlessConnectionsIntegrations from '@/components/IntegrationsPageComps/limitlessConnectionsIntegrations/limitlessConnectionsIntegrations'
import MaxImpactIntegrations from '@/components/IntegrationsPageComps/MaxImpactIntegrations/MaxImpactIntegrations'
import React from 'react'

function page() {
  return (
    <div>
        <IntegrationsPageMainSlider/>
        <LimitlessConnectionsIntegrations/>
        <BeyoundIntegrationsProvide/>
        <MaxImpactIntegrations/>
        <BottomCTAMoonHomePage/>
    </div>
  )
}

export default page