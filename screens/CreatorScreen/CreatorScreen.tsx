import React from "react";
import ItemCenter from "../../components/ItemCenter";
import ScreenContainer from "../../components/ScreenContainer";
import TopBar from "../../components/TopBar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import NoLicense from "./NoLicense";
import WorkSpace from "./WorkSpace";
import MessageContextProvider from "./context/MessageContext";
import { LicenseContextProvider } from "./context/licenseContext";
import { ThemeOptionProvider } from "./context/themeOptionContext";
function CreatorScreen({ navigation, route }) {
  const { uid } = route.params;
  const { user } = useAuthContext();
  const { documents: License } = useCollection("user", ["uid", "==", user.uid]);

  return (
    <LicenseContextProvider>
      <ThemeOptionProvider>
        <MessageContextProvider>
          <ScreenContainer>
            <TopBar />
            <ItemCenter>
              {License && License[0].license !== "no-license" && (
                <WorkSpace uid={uid} />
              )}
              {License && License[0].license === "no-license" && <NoLicense />}
            </ItemCenter>
          </ScreenContainer>
        </MessageContextProvider>
      </ThemeOptionProvider>
    </LicenseContextProvider>
  );
}

export default CreatorScreen;
