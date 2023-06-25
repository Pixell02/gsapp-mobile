import React, { useState } from 'react'
import { View } from 'react-native'
import ScreenContainer from '../components/ScreenContainer'
import NavBar from '../components/NavBar'
import MainContent from '../components/MainContent'
import TopBar from '../components/TopBar'
import OfferContainer from './component/OfferContainer'
import LoadingScreen from '../components/LoadingScreen'

const OfferScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ScreenContainer>
      {isLoading && <LoadingScreen />}
      {!isLoading &&  (
        <>
        <TopBar navigation={navigation} />
      <MainContent>
        <OfferContainer />
      </MainContent>
      <NavBar navigation={navigation} />
      </>
      )}
      
    </ScreenContainer>
  )
}

export default OfferScreen
