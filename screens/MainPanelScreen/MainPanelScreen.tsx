import React from "react";
import { StyleSheet, View } from "react-native";
import AddBtn from "../components/AddBtn";
import MainContent from "../components/MainContent";
import TopBar from "../components/TopBar";
import MainPanelContent from "./component/MainPanelContent";
import TeamModal from "./component/TeamModal";
import { DataProvider } from "./component/context/DataContext";
import { ModalContextProvider } from "./component/context/ModalContext";

export default function MainPanelScreen(): JSX.Element {
  return (
    <ModalContextProvider>
      <DataProvider>
        <View style={styles.container}>
          <TopBar />
          <TeamModal />
          <AddBtn />
          <MainContent>
            <MainPanelContent />
          </MainContent>
        </View>
      </DataProvider>
    </ModalContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
  },
});
