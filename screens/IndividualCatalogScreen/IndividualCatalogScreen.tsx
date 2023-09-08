import { StackNavigationProp } from '@react-navigation/stack';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { db } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import Alert from '../MainPanelScreen/Alert';
import { RootStackParamList } from '../StartingScreen/type';
import MainContent from '../components/MainContent';
import ScreenContainer from '../components/ScreenContainer';
import TopBar from '../components/TopBar';
import IndividualCatalogContent from './components/IndividualCatalogContent';

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