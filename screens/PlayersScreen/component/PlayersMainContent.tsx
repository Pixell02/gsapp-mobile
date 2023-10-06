import React from "react";
import { View } from "react-native";
import useTeamUid from "../../../hooks/useTeamUid";
import MainPlayers from "./PlayersMainContent/MainPlayers";
import SquadPreset from "./PlayersMainContent/SquadPreset";
import TeamPlayers from "./PlayersMainContent/TeamPlayers";

interface props {
  playerData: object;
  setPlayerData: (playerData: object) => void;
  setIsOpen: (value: number) => void;
  selectedValue: string;
  setSquadData: (value) => void;
  setSelectedValue?: (selectedValue: string) => void;
}

export default function PlayersMainContent(props: props): JSX.Element {
  const uid = useTeamUid();
  console.log(uid)
  return (
    <View>
      <MainPlayers
        selectedValue={props.selectedValue}
        setSelectedValue={props.setSelectedValue}
        setPlayerData={props.setPlayerData}
        setIsOpen={props.setIsOpen}
      />

      {uid && (
        <TeamPlayers
          uid={uid}
          selectedValue={props.selectedValue}
          setSelectedValue={props.setSelectedValue}
          setIsOpen={props.setIsOpen}
          setPlayerData={props.setPlayerData}
        />
      )}
      <SquadPreset 
      setIsOpen={props.setIsOpen}
      setSquadData={props.setSquadData}
      />
    </View>
  );
}
