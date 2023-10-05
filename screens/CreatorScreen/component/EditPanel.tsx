import React, { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import useLicenseContext from "../../../hooks/useLicenseContext";
import ItemCenter from "../../components/ItemCenter";
import { RadioProvider } from "../context/radioContext";
import { SelectedTeamProvider } from "../context/selectedTeamContext";
import { ThemeOptionProvider } from "../context/themeOptionContext";
import FreeLicenseInformation from "./EditPanel/FreeLicenseInformation";
import ModalWindows from "./EditPanel/ModalWindows";
import MultiElementButton from "./EditPanel/MultiElementButton";
import SaveButton from "./EditPanel/SaveButton";
import SingleElements from "./EditPanel/SingleElements";
import styles from "./style";

const EditPanel = ({ webViewRef, uid, coords}) => {
  const { license } = useLicenseContext();
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
                    setIsModalOpen={setIsModalOpen}
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
