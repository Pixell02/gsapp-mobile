import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import MainContent from '../../components/MainContent';
import ScreenContainer from '../../components/ScreenContainer';
import TopBar from '../../components/TopBar';
import { RootStackParamList } from '../StartingScreen/type';
import AccountContent from './components/AccountContent';

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
    </ScreenContainer>
  )
}
