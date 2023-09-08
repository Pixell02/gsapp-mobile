import React, { useEffect, useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import useSelectedTeamContext from "../../CreatorScreen/hooks/useSelectedTeamContext";
import useCustomPanResponder from "../../../hooks/useCustomPanResponder";
import translate from "../locales/translate.json";
import useLanguageContext from "../../../hooks/useLanguageContext";
import Title from "../../components/Title";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import RoundedButton from "../../components/RoundedButton";
import PlayersToCheck from "./AddSquadPreset/PlayersToCheck";
import ReserveToCheck from "./AddSquadPreset/ReserveToCheck";
import InputData from "../../components/InputData";

const EditSquadPreset = ({ isOpen, setIsOpen, setSquadData, data }) => {
  const panResponder = useCustomPanResponder(isOpen, setIsOpen, setSquadData);
  
  const [isPressed, setIsPressed] = useState(false);
  const [goalkeeper, setGoalkeeper] = useState(data.goalkeeper);
  const [capitan, setCapitan] = useState(data.capitan);
  const { selectedPlayers, selectedReserve, handleReserveChecked, handlePlayerChecked } = useSelectedTeamContext();
  const [presetName, setPresetName] = useState(data.presetName)
  const { language } = useLanguageContext();
  useEffect(() => {
    data?.squadPlayers?.map((player) => (
      handlePlayerChecked(player)
    ))
    data?.reservePlayers?.map((reserve) => (
      handleReserveChecked(reserve)
    ))
  },[data])

  const handleClose = () => {
    setIsOpen(0)
  }

  const handleSave = () => {
    const docRef = doc(collection(db, "squadPreset"))
    updateDoc(docRef, {
      capitan: capitan,
      goalkeeper: goalkeeper,
      squadPlayers: selectedPlayers,
      reservePlayers: selectedReserve,
      presetName: presetName,
    })
    setIsOpen(0)
  }
  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType="slide" visible={isOpen === 4} onRequestClose={() => setIsOpen(0)}>
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
            <PlayersToCheck
              capitan={capitan}
              setCapitan={setCapitan}
              goalkeeper={goalkeeper}
              setGoalkeeper={setGoalkeeper}
            />
          )}
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
