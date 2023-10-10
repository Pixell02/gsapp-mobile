import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
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

export default function EditTeam() {
  const { isModalOpen, setIsModalOpen } = useModalContextProvider();
  const { teamData, setTeamData } = useDataContextProvider();
  const panResponder = useCustomPanResponder(isModalOpen, setIsModalOpen);
  const { handleAddPhoto, preview, setPreview, isImage, setIsImage } =
    useAddImage(setTeamData);
  const { language } = useLanguageContext();
  const { handleDeleteTeam, handleUpdate } = useHandleTeamEvents({
    setTeamData,
    setIsModalOpen,
  });
  const sportOptions = useSportOptions();
  const [oldName] = useState(teamData.firstName + " " + teamData.secondName);

  const handleDeletePhoto = () => {
    setTeamData((prev: teamDataProps) => ({
      ...prev,
      img: "",
    }));
    setPreview(null);
    setIsImage(false);
  };
  return (
    <View {...panResponder.panHandlers}>
      <Modal
        animationType="slide"
        visible={isModalOpen === 2}
        onRequestClose={() => setIsModalOpen(0)}
      >
        <View style={styles.modalContent}>
          <Title
            name={translate.editTeam[language] || translate.editTeam["en"]}
          />

          <View style={styles.inputCenter}>
            <InputData
              name={
                translate.firstTeamName[language] ||
                translate.firstTeamName["en"]
              }
              text={teamData.firstName}
              onChangeText={(value) =>
                setTeamData((prev: teamDataProps) => ({
                  ...prev,
                  firstName: value.trim(),
                }))
              }
            />
            <InputData
              name={
                translate.secondTeamName[language] ||
                translate.secondTeamName["en"]
              }
              text={teamData.secondName}
              onChangeText={(value) =>
                setTeamData((prev: teamDataProps) => ({
                  ...prev,
                  secondName: value.trim(),
                }))
              }
            />
            <Text style={{ width: "100%", fontFamily: "Poppins-SemiBold" }}>
              {translate.sport[language] || translate.sport["en"]}
            </Text>
            <View
              style={styles.pickerContainer}
            >
              <Picker
                selectedValue={teamData.sport}
                onValueChange={(itemValue) =>
                  setTeamData((prev: teamDataProps) => ({
                    ...prev,
                    sport: itemValue,
                  }))
                }
              >
                {sportOptions.map((item) => (
                  <Picker.Item
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.margin}>
              <RoundedButton
                text={translate.addImage[language] || translate.addImage["en"]}
                onPress={handleAddPhoto}
              />
            </View>
            <PreviewBlock
              preview={preview || teamData.img}
              setImageUri={handleDeletePhoto}
            />
            <View style={{ width: "100%" }}>
              <RoundedButton
                text={translate.save[language] || translate.save["en"]}
                onPress={() => handleUpdate(preview, oldName, teamData, isImage)}
              />
            </View>
            <View style={{ marginTop: 40, width: "100%" }}>
              <RoundedButton
                text={translate.delete[language] || translate.delete["en"]}
                onPress={() => handleDeleteTeam(teamData)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
