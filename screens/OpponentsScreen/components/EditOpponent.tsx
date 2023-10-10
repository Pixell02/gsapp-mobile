import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Modal, Text, View } from "react-native";
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
import { OpponentDataProps } from "../context/DataContext";
import useDataContext from "../hooks/useDataContext";
import useHandleOpponentEvents from "../hooks/useHandleOpponentEvents";
import translate from "../locales/translate.json";

export default function EditOpponent() {
  const { user } = useAuthContext();
  const { isModalOpen, setIsModalOpen } = useModalContextProvider();
  const { opponentData, setOpponentData } = useDataContext();
  const panResponder = useCustomPanResponder(isModalOpen, setIsModalOpen);
  const { handleUpdate, handleDeleteItem } = useHandleOpponentEvents({ setOpponentData, setIsModalOpen });
  const { setImageUri, handleAddPhoto, preview, isImage } = useAddImage(setOpponentData);
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const { language } = useLanguageContext();

  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType="slide" visible={isModalOpen === 2} onRequestClose={() => setIsModalOpen(0)}>
        <View style={styles.modalContent}>
          <Title name={translate.title[language]} />
          <View style={styles.inputCenter}>
            <InputData
              name={translate.firstOpponentName[language]}
              text={opponentData.firstName}
              onChangeText={(value) => setOpponentData((prev: OpponentDataProps) => ({ ...prev, firstName: value.trim() }))}
            />
            <InputData
              name={translate.secondOpponentName[language]}
              text={opponentData.secondName}
              onChangeText={(value) => setOpponentData((prev: OpponentDataProps) => ({ ...prev, secondName: value.trim() }))}
            />
            <View style={{ width: "100%" }}>
              <Text style={{ fontFamily: "Poppins_Medium" }}>{translate.team[language]}</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={opponentData.team}
                  onValueChange={(itemValue) => setOpponentData((prev: OpponentDataProps) => ({ ...prev, team: itemValue }))}
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
            <PreviewBlock preview={preview} setImageUri={setImageUri} />
            <View style={{ width: "100%" }}>
              <RoundedButton text={translate.save[language]} onPress={() => handleUpdate(opponentData, isImage, preview)} />
            </View>
            <View style={{ marginTop: 20, width: "100%" }}>
              <RoundedButton
                text={translate.delete[language] || translate.delete["en"]}
                onPress={() => handleDeleteItem(opponentData)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
