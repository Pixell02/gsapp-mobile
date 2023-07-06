import React, { useContext, useState } from "react";
import translate from "../locales/translate.json";
import { View, Text, TextInput } from "react-native";
import styles from "./style";
import Title from "./EditPanel/Title";
import ItemCenter from "../../components/ItemCenter";
import { ScrollView } from "react-native-gesture-handler";
import ThemeOption from "./EditPanel/SingleElements/ThemeOption";
import { RadioProvider } from "../context/radioContext";
import RadioContainer from "./EditPanel/SingleElements/RadioContainer";
import YourTeam from "./EditPanel/SingleElements/YourTeam";
import useBackgrounds from "../hooks/useBackgrounds";
import OpponentSelect from "./EditPanel/SingleElements/OpponentSelect";
import DateInput from "./EditPanel/SingleElements/DateInput";
import LeagueInput from "./EditPanel/SingleElements/LeagueInput";
import PlaceInput from "./EditPanel/SingleElements/PlaceInput";
import SaveButton from "./EditPanel/SaveButton";
import RoundedButton from "../../components/RoundedButton";
import { LanguageContext } from "../../../context/LanguageContext";
import ModalWindows from "./EditPanel/ModalWindows";
import SingleElements from "./EditPanel/SingleElements";
import { SelectedTeamProvider } from "../context/selectedTeamContext";
import { ThemeOptionProvider } from "../context/themeOptionContext";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import FreeLicenseInformation from "./EditPanel/FreeLicenseInformation";
import { LicenseContext } from "../context/licenseContext";

const EditPanel = ({ webViewRef, uid, coords, size }) => {
  const { language } = useContext(LanguageContext);
  const {user} = useAuthContext();
  const {license} = useContext(LicenseContext)
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    type: "",
  });

  return (
    <View style={styles.editContainer}>
      <RadioProvider>
        <SelectedTeamProvider>
          <ThemeOptionProvider>
            <ScrollView>
              <ItemCenter>
                {isModalOpen.isOpen && (
                  <ModalWindows
                    coords={coords}
                    webViewRef={webViewRef}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                  />
                )}
                {!isModalOpen.isOpen && (
                  <>
                    <SingleElements
                      coords={coords}
                      webViewRef={webViewRef}
                      uid={uid}
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                      size={size}
                    />
                  {license.license === "free-trial" && <FreeLicenseInformation license={license} />}
                    
                    <SaveButton webViewRef={webViewRef} />
                  </>
                )}
              </ItemCenter>
            </ScrollView>
          </ThemeOptionProvider>
        </SelectedTeamProvider>
      </RadioProvider>
    </View>
  );
};

export default EditPanel;
