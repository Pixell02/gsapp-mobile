import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, Alert, Image, Text } from 'react-native';
import Title from '../../components/Title';
import InputData from '../../components/InputData';
import * as ImagePicker from 'expo-image-picker';
import { styles } from "./styles/styles";
import RoundedButton from '../../components/RoundedButton';
import { Picker } from "@react-native-picker/picker";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import useAddImage from '../../../hooks/useAddImage';
import useCustomPanResponder from '../../../hooks/useCustomPanResponder';
import translate from "../locales/translate.json"
import { useAuthContext } from '../../../hooks/useAuthContext';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { registerRootComponent } from 'expo';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { LanguageContext } from '../../../context/LanguageContext';
import updateData from './functions/updateData';
import deleteData from './functions/deleteData';

export default function EditTeam({ isEditOpen, teamData, setIsEditOpen, setTeamData }) {
  const panResponder = useCustomPanResponder(isEditOpen, setIsEditOpen, setTeamData);
  const { imageUri, setImageUri, handleAddPhoto, preview, setPreview, isImage, setIsImage } = useAddImage();
  const {language} = useContext(LanguageContext)
  const { user } = useAuthContext()
  const [oldName] = useState(teamData.firstName + " " + teamData.secondName)
  const sportOptions = [
    { label: (translate.football[language] || translate.football["en"]), value: 'piłka nożna' },
    { label: (translate.basketball[language] || translate.basketball["en"]), value: 'koszykówka' },
    { label: (translate.volleyball[language] || translate.volleyball["en"]), value: 'siatkówka' },
    { label: (translate.hockey[language] || translate.hockey["en"]), value: 'hokej' },
    {label: (translate.handball[language] || translate.handball["en"]), value: 'piłka ręczna'}
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

  const handleDeleteTeam = () => {
    const docRef = doc(db,"Teams", teamData.id);
    deleteData(user.uid, teamData.firstName, teamData.secondName)
    deleteDoc(docRef)
      .then(() => {
       setIsEditOpen(false);
    setTeamData(prev => ({
      ...prev,
      firstName: "",
      secondName: "",
      img: "",
      sport: ""
    })) 
      })
      .catch((err) => console.log(err))
    
  }

  const handleSave = async() => {
    
    if (!teamData.firstName || !teamData.secondName || !teamData.sport) {
      Alert.alert("puste pole");
    } else {
      updateData(user.uid, oldName, teamData.firstName, teamData.secondName)
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
              firstName: teamData.firstName.trim(),
              secondName: teamData.secondName.trim(),
              img: downloadURL,
              sport: teamData.sport,
              uid: user.uid,
            });
          }
        );
      } else {
        const docRef= doc(db, "Teams", teamData.id);
        updateDoc(docRef, {
          firstName: teamData.firstName.trim(),
          secondName: teamData.secondName.trim(),
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
      <Modal animationType="slide" visible={isEditOpen} onRequestClose={() => setIsEditOpen(false)}>
        <View style={styles.modalContent}>
          <Title name={(translate.editTeam[language] || translate.editTeam["en"])} />
         
          <View style={styles.inputCenter}>
            <InputData
              name={(translate.firstTeamName[language] || translate.firstTeamName["en"])}
              text={teamData.firstName}
              onChangeText={(value) => setTeamData(prev => ({...prev, firstName: value}))}
            />
            <InputData
              name={(translate.secondTeamName[language] || translate.secondTeamName["en"])}
              text={teamData.secondName}
              onChangeText={(value) => setTeamData(prev => ({...prev, secondName: value}))}
            />
            <Text style={{width:"100%", fontFamily:"Poppins-SemiBold"}}>{(translate.sport[language] || translate.sport["en"])}</Text>
            <View
              style={{
                borderWidth: 1,
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
              <RoundedButton text={(translate.addImage[language] || translate.addImage["en"])} onPress={handleAddPhoto} />
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
              <RoundedButton text={(translate.save[language] || translate.save["en"])} onPress={handleSave} />
            </View>
            <View style={{marginTop: 40}}>
              <RoundedButton text={(translate.delete[language] || translate.delete["en"])} onPress={handleDeleteTeam} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
