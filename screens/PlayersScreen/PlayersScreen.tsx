import React from "react";
import { StyleSheet, View } from "react-native";
import AddBtn from "../../components/AddBtn";
import MainContent from "../../components/MainContent";
import TopBar from "../../components/TopBar";
import { ModalContextProvider } from "../../context/ModalContext";
import PlayerModal from "./component/PlayerModal";
import PlayersMainContent from "./component/PlayersMainContent";
import { DataProvider } from "./context/DataContext";


export interface playerProps {
  id: string;
  firstName: string;
  secondName: string;
  number: string;
  team: string;
  uid: string;
}

export default function PlayersScreen(): JSX.Element {

  return (
    <ModalContextProvider>
      <DataProvider>
        <View style={styles.container}>
          <TopBar />
          <PlayerModal />
          <AddBtn />
          <MainContent>
            <PlayersMainContent />
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
