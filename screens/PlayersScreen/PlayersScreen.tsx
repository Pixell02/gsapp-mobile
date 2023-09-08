import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native";
import { RootStackParamList } from "../StartingScreen/type";
import TopBar from "../components/TopBar";
import MainContent from "../components/MainContent";
import PlayersMainContent from "./component/PlayersMainContent";
import AddBtn from "../components/AddBtn";
import { useAuthContext } from "../../hooks/useAuthContext";
import PlayerModal from "./component/PlayerModal";

type PlayersScreenNavigationProp = StackNavigationProp<RootStackParamList, "PlayersScreen">;

type Props = {
  navigation: PlayersScreenNavigationProp;
};

export default function PlayersScreen({ navigation }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(0);
  const { user } = useAuthContext();
  const [selectedValue, setSelectedValue] = useState("");
  const [squadData, setSquadData] = useState(null);
  const [playerData, setPlayerData] = useState({
    firstName: "",
    secondName: "",
    img: null,
    number: null,
    team: "",
    uid: user.uid,
  });
  return (
    
      <View style={styles.container}>
        <TopBar />
        {isOpen !== 0 && (
          <PlayerModal
            isOpen={isOpen}
            setIsOpen={() => setIsOpen(0)}
            playerData={playerData}
            setPlayerData={setPlayerData}
            squadData={squadData}
            setSquadData={setSquadData}
          />
        )}
        <AddBtn onPress={() => setIsOpen(1)} />
        <MainContent>
          <PlayersMainContent
            setIsOpen={setIsOpen}
            setPlayerData={setPlayerData}
            playerData={playerData}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            setSquadData={setSquadData}
          />
        </MainContent>
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
  },
});
