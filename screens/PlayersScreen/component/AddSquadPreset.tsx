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
import useSelectedTeamContext from "../../CreatorScreen/hooks/useSelectedTeamContext";
import translate from "../locales/translate.json";
import PlayersToCheck from "./AddSquadPreset/PlayersToCheck";
import ReserveToCheck from "./AddSquadPreset/ReserveToCheck";

const AddSquadPreset = ({ isOpen, setIsOpen, setSquadData }) => {
  const panResponder = useCustomPanResponder(isOpen, setIsOpen, setSquadData);
  const { user } = useAuthContext();
  const [isPressed, setIsPressed] = useState(false);
  const [goalkeeper, setGoalkeeper] = useState("");
  const [capitan, setCapitan] = useState("");
  const { selectedPlayers, selectedReserve } = useSelectedTeamContext();
  const [presetName, setPresetName] = useState("")
  const { language } = useLanguageContext();

  const handleSave = () => {
    const docRef = collection(db, "squadPreset");
    addDoc(docRef, {
      capitan: capitan,
      goalkeeper: goalkeeper,
      squadPlayers: selectedPlayers,
      reservePlayers: selectedReserve,
      presetName: presetName,
      uid: user.uid
    })
    setIsOpen(0)
  }

  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType="slide" visible={isOpen === 3} onRequestClose={() => setIsOpen(0)}>
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
          {!isPressed && <PlayersToCheck capitan={capitan} setCapitan={setCapitan} goalkeeper={goalkeeper} setGoalkeeper={setGoalkeeper} />}
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
