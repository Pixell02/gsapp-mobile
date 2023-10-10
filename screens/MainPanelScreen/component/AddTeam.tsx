import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Modal, Text, View } from "react-native";
import InputData from "../../../components/InputData";
import PreviewBlock from "../../../components/PreviewBlock";
import RoundedButton from "../../../components/RoundedButton";
import Title from "../../../components/Title";
import useAddImage from "../../../hooks/useAddImage";
import useCustomPanResponder from "../../../hooks/useCustomPanResponder";
import useLanguageContext from "../../../hooks/useLanguageContext";
import { teamDataProps } from "../context/DataContext";
import translate from "../locales/translate.json";
import useDataContextProvider from "./hooks/useDataContextProvider";
import useHandleTeamEvents from "./hooks/useHandleTeamEvents";
import useModalContextProvider from "./hooks/useModalContextProvider";
import useSportOptions from "./hooks/useSportOptions";
import { styles } from "./styles/styles";

const AddTeam = () => {
  const {isModalOpen, setIsModalOpen} = useModalContextProvider();
  const {teamData, setTeamData} = useDataContextProvider();
  const panResponder = useCustomPanResponder(isModalOpen, setIsModalOpen);
  const { setImageUri, handleAddPhoto, preview } = useAddImage(setTeamData);
  const { handleSave } = useHandleTeamEvents({ setTeamData, setIsModalOpen });
  const {language} = useLanguageContext();
  const sportOptions = useSportOptions();
  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType="slide" visible={isModalOpen === 1} onRequestClose={() => setIsModalOpen(0)}>
        <View style={styles.modalContent}>
          <Title name={translate.addTeam[language] || translate.addTeam["en"]} />
          <View style={styles.inputCenter}>
            <InputData
              name={translate.firstTeamName[language] || translate.firstTeamName["en"]}
              text={teamData.firstName}
              onChangeText={(value) => setTeamData((prev: teamDataProps) => ({ ...prev, firstName: value.trim() }))}
            />
            <InputData
              name={translate.secondTeamName[language] || translate.secondTeamName["en"]}
              text={teamData.secondName}
              onChangeText={(value) => setTeamData((prev: teamDataProps) => ({ ...prev, secondName: value.trim() }))}
            />
            <Text style={{ width: "100%", fontFamily: "Poppins-SemiBold" }}>
              {translate.sport[language] || translate.sport["en"]}
            </Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={teamData.sport}
                onValueChange={(itemValue) => setTeamData((prev: teamDataProps) => ({ ...prev, sport: itemValue }))}
              >
                {sportOptions.map((item) => (
                  <Picker.Item key={item.label} label={item.label} value={item.value} />
                ))}
              </Picker>
            </View>
            <View style={styles.margin}>
              <RoundedButton text={translate.addImage[language] || translate.addImage["en"]} onPress={handleAddPhoto} />
            </View>
            <PreviewBlock preview={preview} setImageUri={setImageUri} />
            <View style={{ width: "100%" }}>
              <RoundedButton
                text={translate.save[language] || translate.save["en"]}
                onPress={() => handleSave(teamData, preview)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddTeam;
