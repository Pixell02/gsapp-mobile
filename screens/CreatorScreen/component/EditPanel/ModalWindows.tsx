import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import useLanguageContext from "../../../../hooks/useLanguageContext";
import RoundedButton from "../../../components/RoundedButton";
import translate from "../../locales/translate.json";
import OpponentTeamGoals from "./ModalComponents/OpponentTeamGoals";
import ReservePlayers from "./ModalComponents/ReservePlayers";
import SquadPlayers from "./ModalComponents/SquadPlayers";
import YourTeamGoals from "./ModalComponents/YourTeamGoals";
import MultiElements from "./MultiElements";

const ModalWindows = ({ webViewRef, isModalOpen, setIsModalOpen, coords, selectedMatch }) => {
  const { language } = useLanguageContext();
  const [capitan, setCapitan] = useState(null);
  const [goalkeeper, setGoalkeeper] = useState(null);
  return (
    <View style={styles.modalContainer}>
      <SquadPlayers
        isModalOpen={isModalOpen}
        coords={coords}
        webViewRef={webViewRef}
        capitan={capitan}
        setCapitan={setCapitan}
        goalkeeper={goalkeeper}
        setGoalkeeper={setGoalkeeper}
      />
      <ReservePlayers
        isModalOpen={isModalOpen}
        webViewRef={webViewRef}
        coords={coords}
      />

      {isModalOpen.type === "yourTeamGoals" && <YourTeamGoals webViewRef={webViewRef} coords={coords} />}
      {isModalOpen.type === "opponentTeamGoals" && <OpponentTeamGoals webViewRef={webViewRef} coords={coords} />}
      {isModalOpen.type === "MultiElements" && <MultiElements webViewRef={webViewRef} coords={coords} selectedMatch={selectedMatch} />}
      <View style={styles.buttonContainer}>
        <RoundedButton
          text={translate.close[language]}
          onPress={() => setIsModalOpen((prev) => ({ ...prev, isOpen: false, type: "" }))}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: 250,
    alignItems: "center",
  },
});

export default ModalWindows;
