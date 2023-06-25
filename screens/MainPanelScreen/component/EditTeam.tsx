import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, Alert, Image, Text } from 'react-native';
import Title from '../../components/Title';
import InputData from '../../components/InputData';
import * as ImagePicker from 'expo-image-picker';
import { styles } from "./styles/styles";
import RoundedButton from '../../components/RoundedButton';
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from 'react-native-gesture-handler';
import useAddImage from '../../../hooks/useAddImage';
import useCustomPanResponder from '../../../hooks/useCustomPanResponder';
import translate from "../locales/translate.json"
import { useAuthContext } from '../../../hooks/useAuthContext';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { registerRootComponent } from 'expo';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { LanguageContext } from '../../../context/LanguageContext';

export default function EditTeam({ isEditOpen, teamData, setIsEditOpen, setTeamData }) {
  const panResponder = useCustomPanResponder(isEditOpen, setIsEditOpen, setTeamData);
  const { imageUri, setImageUri, handleAddPhoto, preview, setPreview, isImage, setIsImage } = useAddImage();
  const {language} = useContext(LanguageContext)
  const { user } = useAuthContext()

  const sportOptions = [
    { label: translate.football[language], value: 'piłka nożna' },
    { label: translate.basketball[language], value: 'koszykówka' },
    { label: translate.volleyball[language], value: 'siatkówka' },
    { label: translate.hockey[language], value: 'hokej' },
    {label: translate.handball[language], value: 'piłka ręczna'}
  ]

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

  const handleSave = async() => {
    
    if (!teamData.firstName || !teamData.secondName || !teamData.sport) {
      Alert.alert("puste pole");
    } else {
      if (isImage) {
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
            const docRef= doc(db, "Teams", teamData.id);
            updateDoc(docRef, {
              firstName: teamData.firstName,
              secondName: teamData.secondName,
              img: downloadURL,
              sport: teamData.sport,
              uid: user.uid,
            });
          }
        );
      } else {
        const docRef= doc(db, "Teams", teamData.id);
        updateDoc(docRef, {
          firstName: teamData.firstName,
          secondName: teamData.secondName,
          img: teamData.img?teamData.img: "",
          sport: teamData.sport,
          uid: user.uid,
        });
      }
      
      setIsEditOpen(false);
    }
    setTeamData(prev => ({
      ...prev,
      firstName: "",
      secondName: "",
      img: "",
      sport: ""
    }))
  };
  

  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType="slide" visible={isEditOpen}>
        <View style={styles.modalContent}>
          <Title name={translate.editTeam[language]} />
          <View style={styles.inputCenter}>
            <InputData
              name={translate.firstTeamName[language]}
              text={teamData.firstName}
              onChangeText={(value) => setTeamData(prev => ({...prev, firstName: value}))}
            />
            <InputData
              name={translate.secondTeamName[language]}
              text={teamData.secondName}
              onChangeText={(value) => setTeamData(prev => ({...prev, secondName: value}))}
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
              <RoundedButton text={translate.addImage[language]} onPress={handleAddPhoto} />
            </View>
            <View style={styles.imageContainer}>
              { (teamData.img || preview) && (
                <>
                  <View style={styles.imageContent}>
                    <Image
                      source={{ uri: preview ? preview : teamData.img }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.binContent}>
                    <TouchableOpacity onPress={() => handleDeletePhoto()}>
                  <Image source={require("../../img/bin.png")} style={styles.binImage} />
                  </TouchableOpacity>
                  </View>
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
