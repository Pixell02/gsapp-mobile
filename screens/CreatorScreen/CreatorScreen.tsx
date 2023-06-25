import React from "react";
import { View } from "react-native";
import WorkSpace from "./WorkSpace";
import ScreenContainer from "../components/ScreenContainer";
import TopBar from "../components/TopBar";
import MainContent from "../components/MainContent";
import ItemCenter from "../components/ItemCenter";
import NavBar from "../components/NavBar";
function CreatorScreen({ navigation, route }) {
  const { uid } = route.params;
  return (
    <ScreenContainer>
      <TopBar navigation={navigation} />
        <ItemCenter>
          <WorkSpace uid={uid} />
        </ItemCenter>
      <NavBar navigation={navigation} />
    </ScreenContainer>
  );
}

export default CreatorScreen;
