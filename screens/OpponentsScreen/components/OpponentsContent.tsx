import React from "react";
import { View } from "react-native";
import useTeamUid from "../../../hooks/useTeamUid";
import MainOpponent from "./OpponentContent/MainOpponent";
import PlaygroundContent from "./OpponentContent/PlaygroundContent";
import TeamOpponent from "./OpponentContent/TeamOpponent";

export default function OpponentsContent(): JSX.Element {
  const uid = useTeamUid();

  return (
    <View>
      <MainOpponent />
      {uid && <TeamOpponent uid={uid} />}
      <PlaygroundContent />
    </View>
  );
}
