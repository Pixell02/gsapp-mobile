import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Modal, ScrollView, Text, TextInput, View } from "react-native";
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

const AddPlayer = () => {
  const { user } = useAuthContext();
  const {isModalOpen ,setIsModalOpen} = useModalContextProvider();
  const {playerData, setPlayerData} = useDataContext();
  const panResponder = useCustomPanResponder(isModalOpen, setIsModalOpen);
  const { setImageUri, handleAddPhoto, isImage, preview } = useAddImage(setPlayerData);
  const {handleSave} = useHandleEvents({setPlayerData, setIsModalOpen});
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const {language} = useLanguageContext();
  
  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType="slide" visible={isModalOpen === 1} onRequestClose={() => setIsModalOpen(0)}>
        <View style={styles.modalContent}>
          <Title name={(translate.addPlayer[language] || translate.addPlayer["en"])} />
          <ScrollView>
          <View style={styles.inputCenter}>
            <InputData
              name={(translate.name[language] || translate.name["en"])}
              text={playerData.firstName}
              onChangeText={(value) => setPlayerData((prev: playerProps) => ({ ...prev, firstName: value.trim() }))}
            />
            <InputData
              name={(translate.surName[language] || translate.surName["en"])}
              text={playerData.secondName}
              onChangeText={(value) => setPlayerData((prev: playerProps) => ({ ...prev, secondName: value.trim() }))}
            />
            <View style={{width: "100%"}}>
              <Text style={{fontFamily: "Poppins_Medium"}}>{(translate.number[language] || translate.number["en"])}</Text>
            <TextInput 
            keyboardType="numeric"
            style={{borderColor: "#7f7f7f",
            borderWidth: 1,
            padding: 10,
            height: 50,
            width: "100%",
            backgroundColor: "#fff",}}
            value={playerData.number}
            onChangeText={(value) => setPlayerData((prev: playerProps) => ({...prev, number: value.trim() }))}
            />
            </View>
            <View style={{width: "100%"}}>
              <Text style={{fontFamily: "Poppins_Medium"}}>{(translate.team[language] || translate.team["en"])}</Text>
              <View style={styles.picker}>
                
                <Picker
                  selectedValue={playerData.team}
                  onValueChange={(itemValue) => setPlayerData((prev: playerProps) => ({ ...prev, team: itemValue }))}
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
              <RoundedButton text={(translate.addPhoto[language] || translate.addPhoto["en"])} onPress={handleAddPhoto} />
            </View>
            <PreviewBlock preview={preview} setImageUri={setImageUri} />
            <View style={{width: "100%"}}>
              <RoundedButton text={(translate.save[language] || translate.save["en"])}  onPress={() => handleSave(playerData, isImage, preview)} />
            </View>
          </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default AddPlayer;
