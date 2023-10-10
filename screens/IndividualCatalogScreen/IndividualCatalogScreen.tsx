import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainContent from '../../components/MainContent';
import ScreenContainer from '../../components/ScreenContainer';
import TopBar from '../../components/TopBar';
import { RootStackParamList } from '../StartingScreen/type';
import IndividualCatalogContent from './components/IndividualCatalogContent';

type YourCatalogScreenNavigationProp = StackNavigationProp<RootStackParamList, "YourCatalogScreen">;

type Props = {
  navigation: YourCatalogScreenNavigationProp;
};


export default function IndividualCatalogScreen({ navigation }: Props) {

  return (
    <View style={styles.container}>
      <ScreenContainer>
        <TopBar />
        <MainContent>
          <IndividualCatalogContent />
        </MainContent>
      </ScreenContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
  },
});