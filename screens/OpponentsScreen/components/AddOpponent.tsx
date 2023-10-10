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
import { OpponentDataProps } from "../context/DataContext";
import useDataContext from "../hooks/useDataContext";
import useHandleOpponentEvents from "../hooks/useHandleOpponentEvents";
import translate from "../locales/translate.json";

export default function AddOpponent() {
  const { user } = useAuthContext();
  const {isModalOpen, setIsModalOpen} = useModalContextProvider();
  const { opponentData, setOpponentData } = useDataContext();
  const {language} = useLanguageContext();
  const panResponder = useCustomPanResponder(isModalOpen, setIsModalOpen);
  const { setImageUri, handleAddPhoto, preview } = useAddImage(setOpponentData);
  const { handleSave } = useHandleOpponentEvents({ setOpponentData, setIsModalOpen });
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
   
  
  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType="slide" visible={isModalOpen === 1} onRequestClose={() => setIsModalOpen(0)}>
        <View style={styles.modalContent}>
          <Title name={translate.addOpponent[language]} />
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
                  onValueChange={(itemValue) => setOpponentData((prev) => ({ ...prev, team: itemValue }))}
                >
                  {Teams &&
                    Teams.map((item) => (
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
              <RoundedButton text={translate.save[language]} onPress={() => handleSave(opponentData, preview)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
