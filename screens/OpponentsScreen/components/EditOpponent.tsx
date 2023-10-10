import { Picker } from "@react-native-picker/picker";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect } from "react";
import { Alert, Modal, Text, View } from "react-native";
import InputData from "../../../components/InputData";
import PreviewBlock from "../../../components/PreviewBlock";
import RoundedButton from "../../../components/RoundedButton";
import Title from "../../../components/Title";
import { db } from "../../../firebase/config";
import useAddImage from "../../../hooks/useAddImage";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import useCustomPanResponder from "../../../hooks/useCustomPanResponder";
import useLanguageContext from "../../../hooks/useLanguageContext";
import { styles } from "../../MainPanelScreen/component/styles/styles";
import translate from "../locales/translate.json";

export default function EditOpponent({ isOpen, teamData, setIsOpen, setTeamData }) {
  const { user } = useAuthContext();
  const panResponder = useCustomPanResponder(isOpen, setIsOpen, setTeamData);
  const { imageUri, setImageUri, handleAddPhoto, preview, setPreview, isImage, setIsImage } = useAddImage();
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const { language } = useLanguageContext();

  const handleDeleteItem = () => {
    const docRef = doc(db, "Opponents", teamData.id);
    deleteDoc(docRef);
    setIsOpen(0);
  };

  
  useEffect(() => {
    if (preview) {
      setTeamData((prev) => ({
        ...prev,
        img: preview.substring(preview.lastIndexOf("/") + 1),
      }));
      setIsImage(true);
    }
  }, [preview]);
  const handleSave = async () => {
    if (!teamData.firstName || !teamData.secondName) {
      Alert.alert(translate.emptyField[language]);
    } else {
      if (isImage) {
        const storage = getStorage();
        const metadata = {
          contentType: "image/png",
        };
        const teamRef = ref(storage, `${user.uid}/przeciwnik/${teamData.firstName}_${teamData.secondName}`);
        const response = await fetch(preview);
        const blob = await response.blob();
        const uploadTask = uploadBytesResumable(teamRef, blob, metadata);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const docRef = doc(db, "Opponents", teamData.id);
            updateDoc(docRef, {
              firstName: teamData.firstName.trim(),
              secondName: teamData.secondName.trim(),
              img: downloadURL,
              team: teamData.team,
              uid: user.uid,
            });
          }
        );
      } else {
        const docRef = doc(db, "Opponents", teamData.id);
        updateDoc(docRef, {
          firstName: teamData.firstName.trim(),
          secondName: teamData.secondName.trim(),
          team: teamData.team,
          img: teamData.img ? teamData.img : "",
          uid: user.uid,
        });
      }
      setTeamData((prev) => ({
        ...prev,
        firstName: "",
        secondName: "",
        img: "",
        team: "",
        uid: user.uid,
      }));
      setIsOpen(0);
    }
  };
  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType="slide" visible={isOpen === 2} onRequestClose={() => setIsOpen(0)}>
        <View style={styles.modalContent}>
          <Title name={translate.title[language]} />
          <View style={styles.inputCenter}>
            <InputData
              name={translate.firstOpponentName[language]}
              text={teamData.firstName}
              onChangeText={(value) => setTeamData((prev) => ({ ...prev, firstName: value }))}
            />
            <InputData
              name={translate.secondOpponentName[language]}
              text={teamData.secondName}
              onChangeText={(value) => setTeamData((prev) => ({ ...prev, secondName: value }))}
            />
            <View style={{ width: "100%" }}>
              <Text style={{ fontFamily: "Poppins_Medium" }}>{translate.team[language]}</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={teamData.team}
                  onValueChange={(itemValue) => setTeamData((prev) => ({ ...prev, team: itemValue }))}
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
              <RoundedButton text={translate.save[language]} onPress={handleSave} />
            </View>
            <View style={{ marginTop: 20, width: "100%" }}>
              <RoundedButton text={translate.delete[language] || translate.delete["en"]} onPress={handleDeleteItem} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
