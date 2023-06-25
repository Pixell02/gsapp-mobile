import React from 'react'
import {View, Text} from 'react-native'
import ScreenContainer from '../components/ScreenContainer';
import TopBar from '../components/TopBar';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../StartingScreen/type';
import MainContent from '../components/MainContent';
import CatalogContent from './component/CatalogContent';
import NavBar from '../components/NavBar';


type CatalogScreenNavigationProp = StackNavigationProp<RootStackParamList, "CatalogScreen">;

type Props = {
  navigation: CatalogScreenNavigationProp;
};

export default function CatalogScreen({navigation}: Props): JSX.Element {
  return (
    <ScreenContainer>
      <TopBar navigation={navigation} />
      <MainContent>
        <CatalogContent navigation={navigation} />
      </MainContent>
      <NavBar navigation={navigation} />
    </ScreenContainer>
  )
}
