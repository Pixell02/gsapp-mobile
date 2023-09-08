import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import MainPanelContent from "./component/MainPanelContent";
import MainContent from "../components/MainContent";
import AddBtn from "../components/AddBtn";
import TeamModal from "./component/TeamModal";
import { useAuthContext } from "../../hooks/useAuthContext";
import { RootStackParamList } from "../StartingScreen/type";
import { StackNavigationProp } from "@react-navigation/stack";
interface Props {
  navigation: StackNavigationProp<RootStackParamList, "MainScreen">;
}

export default function MainPanelScreen({ navigation }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTrainerOpen, setIsTrainerOpen] = useState(false);
  const [isEditTrainerOpen, setIsEditTrainerOpen] = useState(false)
  const { user } = useAuthContext();
  const [trainerData, setTrainerData] = useState({
    uid: user.uid
  })
  console.log(isTrainerOpen)

  const [teamData, setTeamData] = useState({
    id: "",
    sport: "piłka nożna",
    uid: user.uid,
  });

  return (
    <View style={styles.container}>
      <TopBar />
      {(isOpen || isEditOpen || isTrainerOpen || isEditTrainerOpen) && (
        <TeamModal
          isOpen={isOpen}
          setIsOpen={() => setIsOpen(false)}
          isEditOpen={isEditOpen}
          setIsEditOpen={() => setIsEditOpen(false)}
          isTrainerOpen={isTrainerOpen}
          setIsTrainerOpen={setIsTrainerOpen}
          trainerData={trainerData}
          setTrainerData={setTrainerData}
          teamData={teamData}
          setTeamData={setTeamData}
          isEditTrainerOpen={isEditTrainerOpen}
          setIsEditTrainerOpen={setIsEditTrainerOpen}
        />
      )}
      <AddBtn onPress={() => setIsOpen(true)} />
      <MainContent>
        <MainPanelContent 
        setIsOpen={() => setIsEditOpen(true)} 
        setTeamData={setTeamData} 
        teamData={teamData} 
        trainerData={trainerData}
        setTrainerData={setTrainerData}
        isTrainerOpen={isTrainerOpen}
        setIsTrainerOpen={() => setIsTrainerOpen(true)}
        isEditTrainerOpen={isEditTrainerOpen}
        setIsEditTrainerOpen={setIsEditTrainerOpen}
        />
      </MainContent>
      {/* <NavBar /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
  },
});
