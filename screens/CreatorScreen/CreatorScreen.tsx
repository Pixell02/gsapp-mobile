import React from "react";
import { View } from "react-native";
import WorkSpace from "./WorkSpace";
import ScreenContainer from "../components/ScreenContainer";
import TopBar from "../components/TopBar";
import MainContent from "../components/MainContent";
import ItemCenter from "../components/ItemCenter";
import NavBar from "../components/NavBar";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import NoLicense from "./NoLicense";
import { LicenseContextProvider } from "./context/licenseContext";
function CreatorScreen({ navigation, route }) {
  const { uid } = route.params;
  const {user} = useAuthContext();
  const {documents: License} = useCollection("user", ["uid", "==", user.uid])
  
  return (
    <LicenseContextProvider>
    <ScreenContainer>
      <TopBar />
        <ItemCenter>
         {License && License[0].license !== "no-license" &&  <WorkSpace uid={uid} />}
         {License && License[0].license === "no-license" && <NoLicense />}
        </ItemCenter>
      {/* <NavBar /> */}
    </ScreenContainer>
    </LicenseContextProvider>
  );
}

export default CreatorScreen;
