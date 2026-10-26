import BottomCTAResources from '@/components/ResourcesPageComps/BottomCTAResources/BottomCTAResources'
import DeeperZescloudResources from '@/components/ResourcesPageComps/DeeperZescloudResources/DeeperZescloudResources'
import HandpickedResourcesZescloud from '@/components/ResourcesPageComps/HandpickedResourcesZescloud/HandpickedResourcesZescloud'
import ResourcesExploreByCategory from '@/components/ResourcesPageComps/ResourcesExploreByCategory/ResourcesExploreByCategory'
import ResourcesMattersToYou from '@/components/ResourcesPageComps/ResourcesMattersToYou/ResourcesMattersToYou'
import ResourcesPageMainHero from '@/components/ResourcesPageComps/ResourcesPageMainHero/ResourcesPageMainHero'
import React from 'react'

function page() {
  return (
    <div>
        <ResourcesPageMainHero/>
        <ResourcesExploreByCategory/>
        <HandpickedResourcesZescloud/>
        <ResourcesMattersToYou/>
        <DeeperZescloudResources/>
        <BottomCTAResources/>
    </div>
  )
}

export default page