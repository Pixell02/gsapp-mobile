import React from "react";
import AddBtn from "../../components/AddBtn";
import MainContent from "../../components/MainContent";
import ScreenContainer from "../../components/ScreenContainer";
import TopBar from "../../components/TopBar";
import { ModalContextProvider } from "../../context/ModalContext";
import OpponentModal from "./components/OpponentModal";
import OpponentsContent from "./components/OpponentsContent";
import { DataProvider } from "./context/DataContext";



export default function OpponentsScreen() {


  return (
    <ModalContextProvider>
      <DataProvider>
    <ScreenContainer>
      <TopBar />
        <OpponentModal />
      <AddBtn />
      <MainContent>
        <OpponentsContent
        />
      </MainContent>
    </ScreenContainer>
    </DataProvider>
    </ModalContextProvider>
  );
}
