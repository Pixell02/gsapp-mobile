import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { LanguageContext } from "../../../../context/LanguageContext";
import RoundedButton from "../../../components/RoundedButton";
import translate from "../../locales/translate.json";
import DateInput from "./SingleElements/DateInput";
import LeagueInput from "./SingleElements/LeagueInput";
import OpponentSelect from "./SingleElements/OpponentSelect";
import PlaceInput from "./SingleElements/PlaceInput";
import Player from "./SingleElements/Player";
import RadioContainer from "./SingleElements/RadioContainer";
import Result from "./SingleElements/Result";
import TextBoxInput from "./SingleElements/TextBoxInput";
import TextInput from "./SingleElements/TextInput";
import ThemeOption from "./SingleElements/ThemeOption";
import YourTeam from "./SingleElements/YourTeam";
import Title from "./Title";

const SingleElements = ({ coords, webViewRef, uid, isModalOpen, setIsModalOpen, size }) => {
  const { language } = useContext(LanguageContext);
  return (
    <View>
      <Title />
      <ThemeOption webViewRef={webViewRef} uid={uid} size={size} />
      {(coords.opponentFirstName || coords.opponentSecondName || coords.opponentImage || coords.opponentName) && (
        <RadioContainer />
      )}
      <YourTeam webViewRef={webViewRef} coords={coords} />
      {(coords.player || coords.playerImage) && <Player webViewRef={webViewRef} coords={coords} />}
      {(coords.opponentFirstName || coords.opponentSecondName || coords.opponentImage || coords.opponentName) && (
        <OpponentSelect webViewRef={webViewRef} coords={coords} />
      )}
      {(coords.yourTeamResult || coords.opponentTeamResult) && 
      <View style={{width: "100%", alignItems: "center"}}>
      <Result webViewRef={webViewRef} coords={coords} />
      </View>
      }
      {coords.typeData && <DateInput webViewRef={webViewRef} coords={coords} />}
      {coords.yourLeague && <LeagueInput webViewRef={webViewRef} coords={coords} />}
      {coords.typePlace && <PlaceInput webViewRef={webViewRef} coords={coords} />}
      {coords?.TextBox?.map((coords: any, i: number) => (
        <TextBoxInput key={i} webViewRef={webViewRef} coords={coords} />
      ))}
      {coords?.Text?.map((coords: any, i: number) => (
        <TextInput key={i} webViewRef={webViewRef} coords={coords} />
      ))}
      {coords.playerOne && (
        <View style={styles.buttonContainer}>
          <RoundedButton
            text={translate.addPlayers[language] || translate.addPlayers["en"]}
            onPress={() => setIsModalOpen((prev) => ({ ...prev, isOpen: true, type: "squadPlayers" }))}
          />
        </View>
      )}
      {coords.reserveOne && (
        <View style={styles.buttonContainer}>
          <RoundedButton
            text={translate.addReserve[language] || translate.addReserve["en"]}
            onPress={() => setIsModalOpen((prev) => ({ ...prev, isOpen: true, type: "reservePlayers" }))}
          />
        </View>
      )}
      {(coords.playerOne || coords.reserveOne) && (
        <View style={styles.buttonContainer}>
          <RoundedButton
            text={translate.setRules[language] || translate.setRules["en"]}
            onPress={() => setIsModalOpen((prev) => ({ ...prev, isOpen: true, type: "PlayersRoles" }))}
          />
        </View>
      )}

      
      {coords.yourPlayerOneGoal && (
        <View style={styles.buttonContainer}>
          <RoundedButton
            text={translate.addYourTeamGoals[language] || translate.addYourTeamGoals["en"]}
            onPress={() => setIsModalOpen((prev) => ({ ...prev, isOpen: true, type: "yourTeamGoals" }))}
          />
        </View>
      )}
      {coords.opponentPlayerOneGoal && (
        <View style={styles.buttonContainer}>
          <RoundedButton
            text={translate.addOpponentTeamGoals[language] || translate.addOpponentTeamGoals["en"]}
            onPress={() => setIsModalOpen((prev) => ({ ...prev, isOpen: true, type: "opponentTeamGoals" }))}
          />
        </View>
      )}
    </View>
  );
};

export default SingleElements;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10, 
    marginBottom: 10,
    width: "100%", 
    alignItems: "center",
  }
})