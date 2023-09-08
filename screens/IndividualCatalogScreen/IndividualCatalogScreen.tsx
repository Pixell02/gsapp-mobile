import React, { useEffect, useState } from 'react'
import {StyleSheet, View} from 'react-native'
import ScreenContainer from '../components/ScreenContainer'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../StartingScreen/type';
import TopBar from '../components/TopBar';
import MainContent from '../components/MainContent';
import MainPanelContent from '../MainPanelScreen/component/MainPanelContent';
import NavBar from '../components/NavBar';
import IndividualCatalogContent from './components/IndividualCatalogContent';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import Alert from '../MainPanelScreen/Alert';

type YourCatalogScreenNavigationProp = StackNavigationProp<RootStackParamList, "YourCatalogScreen">;

type Props = {
  navigation: YourCatalogScreenNavigationProp;
};


export default function IndividualCatalogScreen({navigation}: Props) {

  const { user } = useAuthContext();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const handleGetDoc = async() => {
      const docRef = doc(db, "information", user.uid);
    const alertDoc = await getDoc(docRef);
      if(alertDoc.data() === undefined) {
        setAlert(true)
      } else {
        setAlert(false)
      }
    }
    handleGetDoc();
    
  },[])

  const handlePressAlert = () => {
    setAlert(false);
    const alertRef = doc(db, "information", user.uid);
    setDoc(alertRef, {
      uid: user.uid,
    }, user.uid)
  }

  return (
    <View style={styles.container}>
    {alert && <Alert handlePressAlert={handlePressAlert} />}
    {!alert && (
    <ScreenContainer>
       <TopBar />
      <MainContent>
        <IndividualCatalogContent />
      </MainContent>
      {/* <NavBar /> */}
    </ScreenContainer>
    )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
  },
});