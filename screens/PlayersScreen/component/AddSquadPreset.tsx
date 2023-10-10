import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import InputData from "../../../components/InputData";
import RoundedButton from "../../../components/RoundedButton";
import Title from "../../../components/Title";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import useCustomPanResponder from "../../../hooks/useCustomPanResponder";
import useLanguageContext from "../../../hooks/useLanguageContext";
import useModalContextProvider from "../../MainPanelScreen/component/hooks/useModalContextProvider";
import useDataContext from "../hooks/useDataContext";
import translate from "../locales/translate.json";
import PlayersToCheck from "./AddSquadPreset/PlayersToCheck";
import ReserveToCheck from "./AddSquadPreset/ReserveToCheck";

const AddSquadPreset = (): JSX.Element => {
  const { isModalOpen, setIsModalOpen } = useModalContextProvider();
  const { squadData } = useDataContext();
  const panResponder = useCustomPanResponder(isModalOpen, setIsModalOpen);
  const { user } = useAuthContext();
  const [isPressed, setIsPressed] = useState(false);
  const [presetName, setPresetName] = useState("");
  const { language } = useLanguageContext();

  const handleSave = () => {
    const docRef = collection(db, "squadPreset");
    addDoc(docRef, {
      ...squadData,
      uid: user.uid,
    });
    setIsModalOpen(0);
  };

  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType="slide" visible={isModalOpen === 3} onRequestClose={() => setIsModalOpen(0)}>
        <Title name={translate.squadPreset[language || "en"]} />
        <ScrollView>
          <View style={{ justifyContent: "center", width: "100%", alignItems: "center" }}>
            <View style={{ width: "80%" }}>
              <RoundedButton
                text={isPressed ? translate.addPlayer[language || "en"] : translate.addReserve[language || "en"]}
                onPress={() => setIsPressed(!isPressed)}
              />
              <InputData text={presetName} name="Nazwa wzoru" onChangeText={(value) => setPresetName(value)} />
            </View>
          </View>
          {!isPressed && (
            <PlayersToCheck  />
          )}
          {isPressed && <ReserveToCheck />}
          <View style={{ justifyContent: "center", width: "100%", alignItems: "center" }}>
            <View style={{ width: "80%" }}>
              <RoundedButton onPress={handleSave} text={translate.save[language || "en"]} />
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default AddSquadPreset;
