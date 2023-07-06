import React, { useContext } from "react";
import { View } from "react-native";
import RadioContainer from "./SingleElements/RadioContainer";
import YourTeam from "./SingleElements/YourTeam";
import useBackgrounds from "../../hooks/useBackgrounds";
import OpponentSelect from "./SingleElements/OpponentSelect";
import DateInput from "./SingleElements/DateInput";
import LeagueInput from "./SingleElements/LeagueInput";
import PlaceInput from "./SingleElements/PlaceInput";
import SaveButton from "../EditPanel/SaveButton";
import RoundedButton from "../../../components/RoundedButton";
import { LanguageContext } from "../../../../context/LanguageContext";
import ModalWindows from "../EditPanel/ModalWindows";
import translate from "../../locales/translate.json";
import ThemeOption from "./SingleElements/ThemeOption";
import Title from "./Title";
import Result from "./SingleElements/Result";
import Player from "./SingleElements/Player";

const SingleElements = ({ coords, webViewRef, uid, isModalOpen, setIsModalOpen, size }) => {
  const { language } = useContext(LanguageContext);
  return (
    <>
      <Title />
      <ThemeOption webViewRef={webViewRef} uid={uid} size={size} />
      {(coords.opponentFirstName || coords.opponentSecondName || coords.opponentImage || coords.opponentName) && (
        <RadioContainer />
      )}

      <YourTeam webViewRef={webViewRef} coords={coords} />
      {(coords.player || coords.playerImage) && (
        <Player webViewRef={webViewRef} coords={coords} />
      )}
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
      
      {(coords.yourTeamResult || coords.opponentTeamResult) && <Result webViewRef={webViewRef} coords={coords} />}
    {coords.yourPlayerOneGoal && (
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <RoundedButton
            text={translate.addYourTeamGoals[language]}
            onPress={() => setIsModalOpen((prev) => ({ ...prev, isOpen: true, type: "yourTeamGoals" }))}
          />
        </View>
      )}
      {coords.opponentPlayerOneGoal && (
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <RoundedButton
            text={translate.addOpponentTeamGoals[language]}
            onPress={() => setIsModalOpen((prev) => ({ ...prev, isOpen: true, type: "opponentTeamGoals" }))}
          />
        </View>
      )}
    </>
  );
};

export default SingleElements;
