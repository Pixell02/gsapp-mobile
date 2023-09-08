import React from "react";
import { View } from "react-native";
import MainOpponent from "./OpponentContent/MainOpponent";
import useTeamUid from "../../../hooks/useTeamUid";
import TeamOpponent from "./OpponentContent/TeamOpponent";
import PlaygroundContent from "./OpponentContent/PlaygroundContent";

interface props {
  setOpponentData: (value: object) => void;
  setSelectedValue: (value: string) => void;
  opponentData: object;
  selectedValue: string;
  setIsOpen: (value: number) => void;
  setPlace: (value: string) => void
}

export default function OpponentsContent(props: props): JSX.Element {

  const uid = useTeamUid();

  return (
    <View>
      <MainOpponent
        setOpponentData={props.setOpponentData}
        setSelectedValue={props.setSelectedValue}
        selectedValue={props.selectedValue}
        setIsOpen={props.setIsOpen}
      />
      {uid &&
        <TeamOpponent
          uid={uid}
          setOpponentData={props.setOpponentData}
          setSelectedValue={props.setSelectedValue}
          selectedValue={props.selectedValue}
          setIsOpen={props.setIsOpen}
        />}
        <PlaygroundContent 
          setIsOpen={props.setIsOpen}
          setPlace={props.setPlace}
        />
    </View>
  );
}
