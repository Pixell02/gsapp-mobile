import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Modal, ScrollView, Text, View } from "react-native";
import useAddImage from "../../../hooks/useAddImage";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import useCustomPanResponder from "../../../hooks/useCustomPanResponder";
import useLanguageContext from "../../../hooks/useLanguageContext";
import InputData from "../../components/InputData";
import PreviewBlock from "../../components/PreviewBlock";
import RoundedButton from "../../components/RoundedButton";
import Title from "../../components/Title";
import { teamDataProps, trainerProps } from "../context/DataContext";
import translate from "../locales/translate.json";
import useDataContextProvider from "./hooks/useDataContextProvider";
import useHandleTrainerData from "./hooks/useHandleTrainerData";
import useModalContextProvider from "./hooks/useModalContextProvider";
import { styles } from "./styles/styles";

const AddTrainer = () => {
  const { user } = useAuthContext();
  const { isModalOpen, setIsModalOpen } = useModalContextProvider();
  const {trainerData, setTrainerData } = useDataContextProvider();
  const panResponder = useCustomPanResponder(
    isModalOpen,
    setIsModalOpen,
  );
  const { setImageUri, handleAddPhoto, preview } = useAddImage(setTrainerData);
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const { language } = useLanguageContext();
  const { handleSave } = useHandleTrainerData(); 

  return (
    <View {...panResponder.panHandlers}>
      <Modal
        animationType="slide"
        visible={isModalOpen === 3}
        onRequestClose={() => setIsModalOpen(0)}
      >
        <View style={styles.modalContent}>
          <Title
            name={translate.addTrainer[language] || translate.addTrainer["en"]}
          />
          <ScrollView>
            <View style={styles.inputCenter}>
              <InputData
                name={translate.name[language] || translate.name["en"]}
                text={trainerData.firstName}
                onChangeText={(value) =>
                  setTrainerData((prev: trainerProps) => ({ ...prev, firstName: value.trim() }))
                }
              />
              <InputData
                name={translate.surName[language] || translate.surName["en"]}
                text={trainerData.secondName}
                onChangeText={(value) =>
                  setTrainerData((prev: trainerProps) => ({ ...prev, secondName: value.trim() }))
                }
              />

              <View style={{ width: "100%" }}>
                <Text style={{ fontFamily: "Poppins_Medium" }}>
                  {translate.team[language] || translate.team["en"]}
                </Text>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={trainerData.team}
                    onValueChange={(itemValue) =>
                      setTrainerData((prev: trainerProps) => ({ ...prev, team: itemValue }))
                    }
                  >
                    {Teams?.map((item: teamDataProps) => (
                      <Picker.Item
                        key={item.id}
                        label={item.firstName + " " + item.secondName}
                        value={item.firstName + " " + item.secondName}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.margin}>
                <RoundedButton
                  text={
                    translate.addPhoto[language] || translate.addPhoto["en"]
                  }
                  onPress={handleAddPhoto}
                />
              </View>
              <PreviewBlock preview={preview} setImageUri={setImageUri} />
              <View style={{ width: "100%" }}>
                <RoundedButton
                  text={translate.save[language] || translate.save["en"]}
                  onPress={() => handleSave(trainerData, preview)}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default AddTrainer;
