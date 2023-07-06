import React from 'react'
import {View, Text} from 'react-native'
import ScreenContainer from '../components/ScreenContainer';
import TopBar from '../components/TopBar';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../StartingScreen/type';
import MainContent from '../components/MainContent';
import CatalogContent from './component/CatalogContent';
import NavBar from '../components/NavBar';



export default function CatalogScreen({navigation}): JSX.Element {
  
  return (
    <ScreenContainer>
      <TopBar />
      <MainContent>
        <CatalogContent />
      </MainContent>
      <NavBar />
    </ScreenContainer>
  )
}
