import React, { useContext, useEffect, useState } from "react";
import { View, Alert, Modal, Image, TouchableOpacity, Text, TextInput } from "react-native";
import { styles } from "../../MainPanelScreen/component/styles/styles";
import useAddImage from "../../../hooks/useAddImage";
import useCustomPanResponder from "../../../hooks/useCustomPanResponder";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import Title from "../../components/Title";
import InputData from "../../components/InputData";
import { Picker } from "@react-native-picker/picker";
import RoundedButton from "../../components/RoundedButton";
import { useCollection } from "../../../hooks/useCollection";
import translate from "../locales/translate.json"
import { LanguageContext } from "../../../context/LanguageContext";

export default function EditOpponent({ isEditOpen, teamData, setIsEditOpen, setTeamData }) {
  const { user } = useAuthContext();
  const panResponder = useCustomPanResponder(isEditOpen, setIsEditOpen, setTeamData);
  const { imageUri, setImageUri, handleAddPhoto, preview, setPreview, isImage, setIsImage } = useAddImage();
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const {language} = useContext(LanguageContext)
  const handleDeletePhoto = () => {
    setTeamData((prev) => ({
      ...prev,
      img: "",
    }));
    setPreview(null)
    setIsImage(false)
  }
  useEffect(() => {
    if (preview) {
      setTeamData((prev) => ({
        ...prev,
        img: preview.substring(preview.lastIndexOf("/") + 1),
      }));
      setIsImage(true)
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
              firstName: teamData.firstName,
              secondName: teamData.secondName,
              img: downloadURL,
              team: teamData.team,
              uid: user.uid,
            });
          }
        );
      } else {
        const docRef = doc(db, "Opponents", teamData.id);
        updateDoc(docRef, {
          firstName: teamData.firstName,
          secondName: teamData.secondName,
          team: teamData.team,
          img: teamData.img?teamData.img:"",
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
      setIsEditOpen();
    }
  };
  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType="slide" visible={isEditOpen}>
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
                  onValueChange={(itemValue) => setTeamData((prev) => ({ ...prev, sport: itemValue }))}
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
            <View style={styles.imageContainer}>
              {(preview || teamData.img) && (
                <>
                  <View style={styles.imageContent}>
                    <Image source={{ uri: preview ? preview : teamData.img }} style={styles.image} />
                  </View>
                  <TouchableOpacity onPress={() => handleDeletePhoto()}>
                    <Image source={require("../../img/bin.png")} style={styles.binImage} />
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View>
              <RoundedButton text={translate.save[language]} onPress={handleSave} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
