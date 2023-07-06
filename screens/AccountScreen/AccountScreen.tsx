import React from 'react'
import { View } from 'react-native'
import ScreenContainer from '../components/ScreenContainer'
import TopBar from '../components/TopBar'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../StartingScreen/type';
import MainContent from '../components/MainContent';
import NavBar from '../components/NavBar';
import AccountContent from './components/AccountContent';

type CatalogScreenNavigationProp = StackNavigationProp<RootStackParamList, "CatalogScreen">;

type Props = {
  navigation: CatalogScreenNavigationProp;
};


export default function AccountScreen({navigation}: Props) {
  return (
    <ScreenContainer>
      <TopBar />
      <MainContent>
        <AccountContent navigation={navigation} />
      </MainContent>
      <NavBar />
    </ScreenContainer>
  )
}
