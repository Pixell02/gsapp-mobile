import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Modal, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import InputData from "../../../components/InputData";
import PreviewBlock from "../../../components/PreviewBlock";
import RoundedButton from "../../../components/RoundedButton";
import Title from "../../../components/Title";
import useAddImage from "../../../hooks/useAddImage";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import useCustomPanResponder from "../../../hooks/useCustomPanResponder";
import useLanguageContext from "../../../hooks/useLanguageContext";
import useModalContextProvider from "../../MainPanelScreen/component/hooks/useModalContextProvider";
import { styles } from "../../MainPanelScreen/component/styles/styles";
import { teamDataProps } from "../../MainPanelScreen/context/DataContext";
import { playerProps } from "../PlayersScreen";
import useDataContext from "../hooks/useDataContext";
import useHandleEvents from "../hooks/useHandleEvents";
import translate from "../locales/translate.json";

const EditPlayer = (): JSX.Element => {
  const { user } = useAuthContext();
  const { isModalOpen, setIsModalOpen } = useModalContextProvider();
  const { playerData, setPlayerData } = useDataContext();
  const { language } = useLanguageContext();
  const panResponder = useCustomPanResponder(isModalOpen, setIsModalOpen);
  const { handleAddPhoto, preview, setPreview, isImage, setIsImage } = useAddImage(setPlayerData);
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);

  const { handleDeleteItem, handleSave } = useHandleEvents({ setPlayerData, setIsModalOpen });

  const handleDeletePhoto = () => {
    setPlayerData((prev: playerProps) => ({
      ...prev,
      img: "",
    }));
    setPreview(null);
    setIsImage(false);
  };

  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType="slide" visible={isModalOpen === 2} onRequestClose={() => setIsModalOpen(0)}>
        <View style={styles.modalContent}>
          <Title name={translate.editPlayer[language]} />
          <ScrollView>
            <View style={styles.inputCenter}>
              <InputData
                name={translate.name[language]}
                text={playerData.firstName}
                onChangeText={(value) =>
                  setPlayerData((prev: playerProps) => ({
                    ...prev,
                    firstName: value.trim(),
                  }))
                }
              />
              <InputData
                name={translate.surName[language]}
                text={playerData.secondName}
                onChangeText={(value) =>
                  setPlayerData((prev: playerProps) => ({
                    ...prev,
                    secondName: value.trim(),
                  }))
                }
              />
              <View style={{ width: "100%" }}>
                <Text style={{ fontFamily: "Poppins_Medium" }}>{translate.number[language]}</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.pickerContainer}
                  value={playerData.number}
                  onChangeText={(value) =>
                    setPlayerData((prev: playerProps) => ({
                      ...prev,
                      number: value.trim(),
                    }))
                  }
                />
              </View>
              <View style={{ width: "100%" }}>
                <Text style={{ fontFamily: "Poppins_Medium" }}>{translate.team[language]}</Text>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={playerData.team}
                    onValueChange={(itemValue) =>
                      setPlayerData((prev: playerProps) => ({
                        ...prev,
                        team: itemValue,
                      }))
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
                <RoundedButton text={translate.addPhoto[language]} onPress={handleAddPhoto} />
              </View>
              <PreviewBlock preview={playerData.img || preview} setImageUri={handleDeletePhoto} />
              <View style={{ width: "100%" }}>
                <RoundedButton
                  text={translate.save[language] || translate.save["en"]}
                  onPress={() => handleSave(playerData, isImage, preview)}
                />
              </View>
              <View style={{ marginTop: 20, width: "100%" }}>
                <RoundedButton
                  text={translate.delete[language] || translate.delete["en"]}
                  onPress={() => handleDeleteItem(playerData)}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default EditPlayer;
