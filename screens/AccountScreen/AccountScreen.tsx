import React from 'react'
import { Text, View } from 'react-native'
import ScreenContainer from '../components/ScreenContainer'
import TopBar from '../components/TopBar'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../StartingScreen/type';
import MainContent from '../components/MainContent';
import NavBar from '../components/NavBar';
import AccountContent from './components/AccountContent';
import { Button } from 'react-native-paper';

type CatalogScreenNavigationProp = StackNavigationProp<RootStackParamList, "CatalogScreen">;

type Props = {
  navigation: CatalogScreenNavigationProp;
};


export default function AccountScreen({navigation}: Props) {
  return (
    <ScreenContainer>
      <TopBar />
      <View style={{width: "100%", justifyContent: "flex-start", alignItems: "flex-start", marginTop: 10, marginLeft: 10}}>
      <Button onPress={() => navigation.navigate("HomeScreen")} style={{backgroundColor: "black", borderRadius: 0}}>
        <Text style={{color: "white"}}>Panel nawigacji</Text>
      </Button>
      </View>
      <MainContent>
        <AccountContent navigation={navigation} />
      </MainContent>
      {/* <NavBar /> */}
    </ScreenContainer>
  )
}
