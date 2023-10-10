import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import InputData from '../../../components/InputData';
import RoundedButton from '../../../components/RoundedButton';
import Title from '../../../components/Title';
import { db } from '../../../firebase/config';
import { useAuthContext } from '../../../hooks/useAuthContext';
import useCustomPanResponder from '../../../hooks/useCustomPanResponder';
import useLanguageContext from '../../../hooks/useLanguageContext';
import { styles } from "../../MainPanelScreen/component/styles/styles";
import translate from "../locales/translate.json";

const AddPlace = ({isOpen, setIsOpen, setData}) => {
  const { language } =useLanguageContext(); 
  const { user } = useAuthContext()
  const panResponder = useCustomPanResponder(isOpen, setIsOpen, setData);
  const [place, setPlace] = useState("Boisko w");

  const handleSave = () => {
    const docRef = collection(db, "placePreset");
    addDoc(docRef, {
      place: place,
      uid: user.uid
    })
    setIsOpen()
  }

  return (
    <View {...panResponder.panHandlers}>
      <Modal  animationType="slide" visible={isOpen === 3} onRequestClose={() => setIsOpen(false)}>
      <View style={styles.modalContent}>
      <Title name={translate.places[language] || translate.places[language]} />
      <InputData text={place} name={translate.place[language] || translate.place[language]} onChangeText={(value) => setPlace(value)} />
      <View style={{marginTop: 10}}>
      <RoundedButton text={translate.save[language] || translate.save[language]} onPress={handleSave} />
      </View>
      <View style={{marginTop: 20}}>
        <RoundedButton text={translate.close[language] || translate.close[language]} onPress={setIsOpen} />
        </View>
      </View>
      </Modal>
    </View>
  )
}

export default AddPlace
