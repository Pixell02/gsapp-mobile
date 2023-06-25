import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import SquadPlayers from "./ModalComponents/SquadPlayers";
import ReservePlayers from "./ModalComponents/ReservePlayers";
import YourTeamGoals from "./ModalComponents/YourTeamGoals";
import OpponentTeamGoals from "./ModalComponents/OpponentTeamGoals";
import PlayersRoles from "./ModalComponents/PlayersRoles";
import RoundedButton from "../../../components/RoundedButton";
import translate from "../../locales/translate.json";
import { LanguageContext } from "../../../../context/LanguageContext";

const ModalWindows = ({ isModalOpen, setIsModalOpen }) => {
  const { language } = useContext(LanguageContext);
  const [capitan, setCapitan] = useState(null);
  const [goalkeeper, setGoalkeeper] = useState(null);
  return (
    <View style={styles.modalContainer}>
      {isModalOpen.type === "squadPlayers" && <SquadPlayers capitan={capitan} goalkeeper={goalkeeper} />}
      {isModalOpen.type === "reservePlayers" && <ReservePlayers goalkeeper={goalkeeper} />}
      {isModalOpen.type === "yourTeamGoals" && <YourTeamGoals />}
      {isModalOpen.type === "opponentTeamGoals" && <OpponentTeamGoals />}
      {isModalOpen.type === "PlayersRoles" && (
        <PlayersRoles capitan={capitan} setCapitan={setCapitan} setGoalkeeper={setGoalkeeper} goalkeeper={goalkeeper} />
      )}
      <View>
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
});

export default ModalWindows;
