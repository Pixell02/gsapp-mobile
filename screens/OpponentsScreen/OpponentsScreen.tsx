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
  const [isOpen, setIsOpen] = useState(0);
  const { user } = useAuthContext();
  const [selectedValue, setSelectedValue] = useState("");
  const [opponentData, setOpponentData] = useState({
    firstName: "",
    secondName: "",
    img: null,
    team: "",
    uid: user.uid,
  });
  const [place, setPlace]= useState(null)


  return (
    <ScreenContainer>
      <TopBar />
      {isOpen !== 0 && (
        <OpponentModal
          isOpen={isOpen}
          setIsOpen={() => setIsOpen(0)}
          opponentData={opponentData}
          setOpponentData={setOpponentData}
          place={place}
          setPlace={setPlace}
        />
      )}
      <AddBtn onPress={() => setIsOpen(1)} />
      <MainContent>
        <OpponentsContent
          setOpponentData={setOpponentData}
          opponentData={opponentData}
          setIsOpen={setIsOpen}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          setPlace={setPlace}
        />
      </MainContent>
    </ScreenContainer>
  );
}
