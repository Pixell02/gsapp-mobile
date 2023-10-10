import React from "react";
import { View } from "react-native";
import useTeamUid from "../../../hooks/useTeamUid";
import MainPlayers from "./PlayersMainContent/MainPlayers";
import SquadPreset from "./PlayersMainContent/SquadPreset";
import TeamPlayers from "./PlayersMainContent/TeamPlayers";

export default function PlayersMainContent(): JSX.Element {
  const uid = useTeamUid();
  return (
    <View>
      <MainPlayers />
      {uid && <TeamPlayers uid={uid} />}
      <SquadPreset />
    </View>
  );
}
