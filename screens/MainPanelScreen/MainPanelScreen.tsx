import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import MainPanelContent from "./component/MainPanelContent";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../StartingScreen/type";
import MainContent from "../components/MainContent";
import AddBtn from "../components/AddBtn";
import TeamModal from "./component/TeamModal";
import { useAuthContext } from "../../hooks/useAuthContext";


type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "MainScreen">;

type Props = {
  navigation: MainScreenNavigationProp;
};

export default function MainPanelScreen({ navigation }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { user } = useAuthContext();
  const [teamData, setTeamData] = useState({
    id: "",
    sport: "piłka nożna",
    uid: user.uid,
  });
  return (
    <View style={styles.container}>
      <TopBar />
      {(isOpen || isEditOpen) && (
        <TeamModal
          isOpen={isOpen}
          setIsOpen={() => setIsOpen(false)}
          isEditOpen={isEditOpen}
          setIsEditOpen={() => setIsEditOpen(false)}
          teamData={teamData}
          setTeamData={setTeamData}
        />
      )}
      <AddBtn onPress={() => setIsOpen(true)} />
      <MainContent>
        <MainPanelContent setIsOpen={() => setIsEditOpen(true)} setTeamData={setTeamData} teamData={teamData} />
      </MainContent>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
  },
});
