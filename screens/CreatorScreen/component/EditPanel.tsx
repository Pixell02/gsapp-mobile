import React, { useContext, useState } from "react";
import { View } from "react-native";
import styles from "./style";
import ItemCenter from "../../components/ItemCenter";
import { ScrollView } from "react-native-gesture-handler";
import { RadioProvider } from "../context/radioContext";
import SaveButton from "./EditPanel/SaveButton";
import ModalWindows from "./EditPanel/ModalWindows";
import SingleElements from "./EditPanel/SingleElements";
import { SelectedTeamProvider } from "../context/selectedTeamContext";
import { ThemeOptionProvider } from "../context/themeOptionContext";
import FreeLicenseInformation from "./EditPanel/FreeLicenseInformation";
import { LicenseContext } from "../context/licenseContext";
import MultiElementButton from "./EditPanel/MultiElementButton";

const EditPanel = ({ webViewRef, uid, coords, size}) => {
  const { license } = useContext(LicenseContext);
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    type: "",
  });
  const [selectedMatch, setSelectedMatch] = useState(null);
  
  return (
    <View style={styles.editContainer}>
      <RadioProvider>
        <SelectedTeamProvider>
          <ThemeOptionProvider>
            <ScrollView>
              <ItemCenter>
                <View style={isModalOpen.isOpen ? styles.showModal: styles.hideModal}>
                  <ModalWindows
                    coords={coords}
                    webViewRef={webViewRef}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    selectedMatch={selectedMatch}
                  />
                </View>
                <View style={isModalOpen.isOpen === false ? styles.showModal : styles.hideModal}>
                  <SingleElements
                    coords={coords}
                    webViewRef={webViewRef}
                    uid={uid}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    size={size}
                  />
                  {coords.numberOfMatches && (
                    <MultiElementButton coords={coords} setIsModalOpen={setIsModalOpen} setSelectedMatch={setSelectedMatch} />
                  )}
                  {license.license === "free-trial" && <FreeLicenseInformation license={license} />}
                    <SaveButton webViewRef={webViewRef} />
                </View>
              </ItemCenter>
            </ScrollView>
          </ThemeOptionProvider>
        </SelectedTeamProvider>
      </RadioProvider>
    </View>
  );
};

export default EditPanel;