import React, { useState } from 'react'
import { View } from 'react-native'
import ScreenContainer from '../components/ScreenContainer'
import NavBar from '../components/NavBar'
import MainContent from '../components/MainContent'
import TopBar from '../components/TopBar'
import OfferContainer from './component/OfferContainer'
import LoadingScreen from '../components/LoadingScreen'
import TemporaryContainer from './component/TemporaryContainer'

const OfferScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ScreenContainer>
      {isLoading && <LoadingScreen />}
      {!isLoading &&  (
        <>
        <TopBar />
      <MainContent>
        {/* <OfferContainer /> */}
        <TemporaryContainer />
      </MainContent>
      <NavBar />
      </>
      )}
      
    </ScreenContainer>
  )
}

export default OfferScreen
