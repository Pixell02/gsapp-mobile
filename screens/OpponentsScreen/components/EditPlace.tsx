import React, { useState } from "react";
import { Modal, View } from "react-native";
import useLanguageContext from "../../../hooks/useLanguageContext";
import { collection, doc, updateDoc } from "firebase/firestore";
import useCustomPanResponder from "../../../hooks/useCustomPanResponder";
import { db } from "../../../firebase/config";
import Title from "../../components/Title";
import InputData from "../../components/InputData";
import RoundedButton from "../../components/RoundedButton";
import { styles } from "../../MainPanelScreen/component/styles/styles";
import translate from "../locales/translate.json";

const EditPlace = ({ isOpen, setIsOpen, setData, data }) => {
  console.log(data);
  const { language } = useLanguageContext();
  const panResponder = useCustomPanResponder(isOpen, setIsOpen, setData);
  const [place, setPlace] = useState(data.place);

  const handleUpdate = () => {
    const docRef = doc(collection(db, "placePreset"), data.id);
    updateDoc(docRef, { place: place });
    setIsOpen();
  };
  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType="slide" visible={isOpen === 4} onRequestClose={() => setIsOpen(false)}>
        <View style={styles.modalContent}>
          <Title name={translate.places[language] || translate.places[language]} />
          <InputData
            text={place}
            name={translate.place[language] || translate.place[language]}
            onChangeText={(value) => setPlace(value)}
          />
          <View style={{ marginTop: 10 }}>
            <RoundedButton text={translate.save[language] || translate.save[language]} onPress={handleUpdate} />
          </View>
          <View style={{ marginTop: 20 }}>
            <RoundedButton text={translate.close[language] || translate.close[language]} onPress={setIsOpen} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditPlace;
