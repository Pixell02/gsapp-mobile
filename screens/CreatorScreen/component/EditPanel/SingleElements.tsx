import React, { useContext } from "react";
import { View } from "react-native";
import RadioContainer from "../EditPanel/RadioContainer";
import YourTeam from "../EditPanel/YourTeam";
import useBackgrounds from "../../hooks/useBackgrounds";
import OpponentSelect from "../EditPanel/OpponentSelect";
import DateInput from "../EditPanel/DateInput";
import LeagueInput from "../EditPanel/LeagueInput";
import PlaceInput from "../EditPanel/PlaceInput";
import SaveButton from "../EditPanel/SaveButton";
import RoundedButton from "../../../components/RoundedButton";
import { LanguageContext } from "../../../../context/LanguageContext";
import ModalWindows from "../EditPanel/ModalWindows";
import translate from "../../locales/translate.json";
import ThemeOption from "./ThemeOption";
import Title from "./Title";
import Result from "./Result";

const SingleElements = ({ coords, webViewRef, uid, isModalOpen, setIsModalOpen }) => {
  const { language } = useContext(LanguageContext);
  return (
    <>
      <Title />
      <ThemeOption webViewRef={webViewRef} uid={uid} />
      {(coords.opponentFirstName || coords.opponentSecondName || coords.opponentImage || coords.opponentName) && (
        <RadioContainer />
      )}
      <YourTeam webViewRef={webViewRef} coords={coords} />
      {(coords.opponentFirstName || coords.opponentSecondName || coords.opponentImage || coords.opponentName) && (
        <OpponentSelect webViewRef={webViewRef} coords={coords} />
      )}
      {coords.typeData && <DateInput webViewRef={webViewRef} coords={coords} />}
      {coords.yourLeague && <LeagueInput webViewRef={webViewRef} coords={coords} />}
      {coords.typePlace && <PlaceInput webViewRef={webViewRef} coords={coords} />}
      {coords.playerOne && (
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <RoundedButton
            text={translate.addPlayers[language]}
            onPress={() => setIsModalOpen((prev) => ({ ...prev, isOpen: true, type: "squadPlayers" }))}
          />
        </View>
      )}
      {coords.reserveOne && (
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <RoundedButton
            text={translate.addReserve[language]}
            onPress={() => setIsModalOpen((prev) => ({ ...prev, isOpen: true, type: "reservePlayers" }))}
          />
        </View>
      )}
      {(coords.playerOne || coords.reserveOne) && (
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <RoundedButton
            text={translate.setRules[language]}
            onPress={() => setIsModalOpen((prev) => ({ ...prev, isOpen: true, type: "PlayersRoles" }))}
          />
        </View>
      )}
      {coords.yourTeamResultOne && (
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <RoundedButton
            text={translate.addYourTeamGoals[language]}
            onPress={() => setIsModalOpen((prev) => ({ ...prev, isOpen: true, type: "yourTeamGoals" }))}
          />
        </View>
      )}
      {coords.opponentTeamResultOne && (
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <RoundedButton
            text={translate.addOpponentTeamGoals[language]}
            onPress={() => setIsModalOpen((prev) => ({ ...prev, isOpen: true, type: "opponentTeamGoals" }))}
          />
        </View>
      )}
      {(coords.yourTeamResult || coords.opponentTeamResult) && (
        <Result webViewRef={webViewRef} coords={coords} />
      )}
      
    </>
  );
};

export default SingleElements;
