import React from "react";
import { View } from "react-native";
import TeamContent from "./TeamContent";
import TrainerContent from "./TrainerContent";

export default function MainPanelContent(): JSX.Element {
  return (
    <View>
      <TeamContent />
      <TrainerContent />
    </View>
  );
}
