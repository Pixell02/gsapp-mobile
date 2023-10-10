import { collection, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import InputData from "../../../components/InputData";
import RoundedButton from "../../../components/RoundedButton";
import Title from "../../../components/Title";
import { db } from "../../../firebase/config";
import useCustomPanResponder from "../../../hooks/useCustomPanResponder";
import useLanguageContext from "../../../hooks/useLanguageContext";
import useModalContextProvider from "../../MainPanelScreen/component/hooks/useModalContextProvider";
import { squadPresetProps } from "../context/DataContext";
import useDataContext from "../hooks/useDataContext";
import translate from "../locales/translate.json";
import PlayersToCheck from "./AddSquadPreset/PlayersToCheck";
import ReserveToCheck from "./AddSquadPreset/ReserveToCheck";

const EditSquadPreset = () => {
  const { isModalOpen, setIsModalOpen } = useModalContextProvider();
  const panResponder = useCustomPanResponder(isModalOpen, setIsModalOpen);
  const { squadData, setSquadData } = useDataContext();
  const [isPressed, setIsPressed] = useState(false);
  const { language } = useLanguageContext();

  const handleValueChange = (value: string, className: string) => {
    setSquadData((prev: squadPresetProps) => ({
      ...prev,
      [className]: value,
    }));
  };

  const handleSave = () => {
    const docRef = doc(collection(db, "squadPreset"));
    updateDoc(docRef, {
      ...squadData,
    });
    setIsModalOpen(0);
  };
  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType="slide" visible={isModalOpen === 4} onRequestClose={() => setIsModalOpen(0)}>
        <Title name={translate.squadPreset[language || "en"]} />
        <ScrollView>
          <View style={{ justifyContent: "center", width: "100%", alignItems: "center" }}>
            <View style={{ width: "80%" }}>
              <RoundedButton
                text={isPressed ? translate.addPlayer[language || "en"] : translate.addReserve[language || "en"]}
                onPress={() => setIsPressed(!isPressed)}
              />
              <InputData
                text={squadData.presetName}
                name="Nazwa wzoru"
                onChangeText={(value) => handleValueChange(value, "presetName")}
              />
            </View>
          </View>
          {!isPressed && <PlayersToCheck />}
          {isPressed && <ReserveToCheck />}
          <View style={{ justifyContent: "center", width: "100%", alignItems: "center" }}>
            <View style={{ width: "80%" }}>
              <RoundedButton onPress={handleSave} text={translate.save[language || "en"]} />
            </View>
            <View style={{ width: "80%", marginTop: 20 }}>
              <RoundedButton onPress={handleSave} text={translate.close[language || "en"]} />
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default EditSquadPreset;
