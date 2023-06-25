import React from 'react'
import {View} from 'react-native'
import ScreenContainer from '../components/ScreenContainer'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../StartingScreen/type';
import TopBar from '../components/TopBar';
import MainContent from '../components/MainContent';
import MainPanelContent from '../MainPanelScreen/component/MainPanelContent';
import NavBar from '../components/NavBar';
import IndividualCatalogContent from './components/IndividualCatalogContent';

type YourCatalogScreenNavigationProp = StackNavigationProp<RootStackParamList, "YourCatalogScreen">;

type Props = {
  navigation: YourCatalogScreenNavigationProp;
};


export default function IndividualCatalogScreen({navigation}: Props) {
  return (
    <ScreenContainer>
       <TopBar navigation={navigation} />
      <MainContent>
        <IndividualCatalogContent navigation={navigation} />
      </MainContent>
      <NavBar navigation={navigation} />
    </ScreenContainer>
  )
}
