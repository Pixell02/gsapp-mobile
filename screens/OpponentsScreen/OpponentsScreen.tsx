import React, { useState } from "react";
import AddBtn from "../../components/AddBtn";
import MainContent from "../../components/MainContent";
import ScreenContainer from "../../components/ScreenContainer";
import TopBar from "../../components/TopBar";
import { useAuthContext } from "../../hooks/useAuthContext";
import OpponentModal from "./components/OpponentModal";
import OpponentsContent from "./components/OpponentsContent";



export default function OpponentsScreen() {
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
      <AddBtn />
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
