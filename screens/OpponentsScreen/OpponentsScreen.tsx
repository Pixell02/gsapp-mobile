import React, { useState } from "react";
import { View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { RootStackParamList } from "../StartingScreen/type";
import { StackNavigationProp } from "@react-navigation/stack";
import TopBar from "../components/TopBar";
import MainContent from "../components/MainContent";
import NavBar from "../components/NavBar";
import OpponentsContent from "./components/OpponentsContent";
import AddBtn from "../components/AddBtn";
import { useAuthContext } from "../../hooks/useAuthContext";
import OpponentModal from "./components/OpponentModal";

type OpponentsScreenNavigationProp = StackNavigationProp<RootStackParamList, "OpponentsScreen">;

type Props = {
  navigation: OpponentsScreenNavigationProp;
};

export default function OpponentsScreen({ navigation }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { user } = useAuthContext();
  const [selectedValue, setSelectedValue] = useState("");
  const [opponentData, setOpponentData] = useState({
    firstName: "",
    secondName: "",
    img: null,
    team: "",
    uid: user.uid,
  });

  return (
    <ScreenContainer>
      <TopBar navigation={navigation} />
      {(isOpen || isEditOpen) && (
        <OpponentModal
          isOpen={isOpen}
          setIsOpen={() => setIsOpen(false)}
          isEditOpen={isEditOpen}
          setIsEditOpen={() => setIsEditOpen(false)}
          opponentData={opponentData}
          setOpponentData={setOpponentData}
        />
      )}
      <AddBtn onPress={() => setIsOpen(true)} />
      <MainContent>
        <OpponentsContent
          setIsOpen={() => setIsEditOpen(true)}
          setOpponentData={setOpponentData}
          opponentData={opponentData}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </MainContent>
      <NavBar />
    </ScreenContainer>
  );
}
