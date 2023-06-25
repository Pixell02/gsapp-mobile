import React, { useContext, useState } from "react";
import translate from "../locales/translate.json";
import { View, Text, TextInput } from "react-native";
import styles from "./style";
import Title from "./EditPanel/Title";
import ItemCenter from "../../components/ItemCenter";
import { ScrollView } from "react-native-gesture-handler";
import ThemeOption from "./EditPanel/ThemeOption";
import { RadioProvider } from "../context/radioContext";
import RadioContainer from "./EditPanel/RadioContainer";
import YourTeam from "./EditPanel/YourTeam";
import useBackgrounds from "../hooks/useBackgrounds";
import OpponentSelect from "./EditPanel/OpponentSelect";
import DateInput from "./EditPanel/DateInput";
import LeagueInput from "./EditPanel/LeagueInput";
import PlaceInput from "./EditPanel/PlaceInput";
import SaveButton from "./EditPanel/SaveButton";
import RoundedButton from "../../components/RoundedButton";
import { LanguageContext } from "../../../context/LanguageContext";
import ModalWindows from "./EditPanel/ModalWindows";
import SingleElements from "./EditPanel/SingleElements";

const EditPanel = ({ webViewRef, uid, coords, handleSave }) => {
  const { language } = useContext(LanguageContext);
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    type: "",
  });

  return (
    <View style={styles.editContainer}>
      <RadioProvider>
        <ScrollView>
          <ItemCenter>
            {isModalOpen.isOpen && <ModalWindows isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
            {!isModalOpen.isOpen && (
              <>
                <SingleElements 
                coords={coords}
                webViewRef={webViewRef}
                uid={uid}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                />

                <SaveButton webViewRef={webViewRef} handleSave={handleSave} />
              </>
            )}
          </ItemCenter>
        </ScrollView>
      </RadioProvider>
    </View>
  );
};

export default EditPanel;
