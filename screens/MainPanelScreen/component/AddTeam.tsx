import React, { useState, useEffect, useContext } from "react";
import { View, Modal, Alert, Text, Image, TouchableOpacity } from "react-native";
import InputData from "../../components/InputData";
import * as ImagePicker from "expo-image-picker";
import RoundedButton from "../../components/RoundedButton";
import { styles } from "./styles/styles";
import Title from "../../components/Title";
import useAddImage from "../../../hooks/useAddImage";
import { Picker } from "@react-native-picker/picker";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import useCustomPanResponder from "../../../hooks/useCustomPanResponder";
import translate from "../locales/translate.json"
import { LanguageContext } from "../../../context/LanguageContext";

const AddTeam = ({ isOpen, teamData, setTeamData, setIsOpen }) => {
  const panResponder = useCustomPanResponder(isOpen, setIsOpen, setTeamData);
  const { imageUri, setImageUri, handleAddPhoto, preview } = useAddImage();
  const {language} = useContext(LanguageContext)
  const { user } = useAuthContext();

  const sportOptions = [
    { label: translate.football[language], value: 'piłka nożna' },
    { label: translate.basketball[language], value: 'koszykówka' },
    { label: translate.volleyball[language], value: 'siatkówka' },
    { label: translate.hockey[language], value: 'hokej' },
    {label: translate.handball[language], value: 'piłka ręczna'}
  ]

  useEffect(() => {
    if (preview) {
      setTeamData((prev) => ({
        ...prev,
        img: preview.substring(preview.lastIndexOf("/") + 1),
      }));
    }
  }, [preview]);
  const handleSave = async () => {
    if (!teamData.firstName || !teamData.secondName || !teamData.sport) {
      Alert.alert(translate.emptyField[language]);
    } else {
      if (teamData.img) {
        const storage = getStorage();
        const metadata = {
          contentType: "image/png",
        };
        const teamRef = ref(storage, `${user.uid}/herb/${teamData.firstName}_${teamData.secondName}`);
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
            addDoc(collection(db, "Teams"), {
              firstName: teamData.firstName,
              secondName: teamData.secondName,
              img: downloadURL,
              sport: teamData.sport,
              uid: user.uid,
            });
          }
        );
      } else {
        const docRef = collection(db, "Teams");
        addDoc(docRef, {
          firstName: teamData.firstName,
          secondName: teamData.secondName,
          img: "",
          sport: teamData.sport,
          uid: user.uid,
        });
      }
      setTeamData((prev) => ({
        ...prev,
        firstName: "",
        secondName: "",
        img: "",
        sport: "piłka nożna",
        uid: user.uid,
      }));
      setIsOpen();
    }
  };

  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType="slide" visible={isOpen}>
        <View style={styles.modalContent}>
          <Title name={translate.addTeam[language]}/>
          <View style={styles.inputCenter}>
            <InputData
              name={translate.firstTeamName[language]}
              text={teamData.firstName}
              onChangeText={(value) => setTeamData((prev) => ({ ...prev, firstName: value }))}
            />
            <InputData
              name={translate.secondTeamName[language]}
              text={teamData.secondName}
              onChangeText={(value) => setTeamData((prev) => ({ ...prev, secondName: value }))}
            />
            <View
              style={{
                borderWidth: 1,
                marginTop: 20,
                borderColor: "black",
                padding: 10,
                width: "100%",
                height: 50,
                alignContent: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Picker
                selectedValue={teamData.sport}
                onValueChange={(itemValue) => setTeamData((prev) => ({ ...prev, sport: itemValue }))}
              >
                {sportOptions.map((item) => (
                  <Picker.Item key={item.label} label={item.label} value={item.value} />
                ))}
              </Picker>
            </View>
            <View style={styles.margin}>
              <RoundedButton text="Dodaj zdjęcie" onPress={handleAddPhoto} />
            </View>
            <View style={styles.imageContainer}>
              {preview && (
                <>
                  <View style={styles.imageContent}>
                    <Image source={{ uri: preview }} style={styles.image} />
                  </View>
                  <View style={styles.binContent}>
                    <TouchableOpacity onPress={() => setImageUri("")}>
                      <Image source={require("../../img/bin.png")} style={styles.binImage} />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
            <View>
              <RoundedButton text="Zapisz" onPress={handleSave} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddTeam;
