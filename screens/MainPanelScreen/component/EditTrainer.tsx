import React, { useContext, useEffect, useState } from 'react'
import { Alert, Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native'
import { LanguageContext } from '../../../context/LanguageContext';
import { useCollection } from '../../../hooks/useCollection';
import useAddImage from '../../../hooks/useAddImage';
import { useAuthContext } from '../../../hooks/useAuthContext';
import useCustomPanResponder from '../../../hooks/useCustomPanResponder';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { Picker } from '@react-native-picker/picker';
import RoundedButton from '../../components/RoundedButton';
import { styles } from "./styles/styles";
import translate from "../locales/translate.json";
import InputData from '../../components/InputData';
import Title from '../../components/Title';
import { Text } from 'react-native';

const EditTrainer = ({trainerData, setTrainerData, isEditTrainerOpen, setIsEditTrainerOpen}) => {
  const { user } = useAuthContext();
  const panResponder = useCustomPanResponder(isEditTrainerOpen, setIsEditTrainerOpen, setTrainerData);
  const { imageUri, setImageUri, handleAddPhoto, preview, setPreview, isImage, setIsImage } = useAddImage();
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
   const {language} = useContext(LanguageContext)
  
  const [oldName] = useState(trainerData.firstName + " " + trainerData.secondName)
  
  const handleDelete = async () => {
    const docRef = doc(db, "Trainers", trainerData.id)
    await deleteDoc(docRef)
     .then(() => setIsEditTrainerOpen(false))
     .catch((err) => console.log(err))
  }

  const handleSave = async () => {
    if (!trainerData.firstName || !trainerData.secondName) {
      Alert.alert(translate.emptyField[language]);
    } else {
      if (isImage) {
        const storage = getStorage();
        const metadata = {
          contentType: "image/png",
        };
        const teamRef = ref(storage, `${user.uid}/zawodnik/${trainerData.firstName}_${trainerData.secondName}`);
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
            const docRef = doc(db, "Trainers", trainerData.id)
            updateDoc(docRef, {
              firstName: trainerData.firstName.trim(),
              secondName: trainerData.secondName.trim(),
              img: downloadURL,
            });
          }
        );
      } else {
        const docRef = doc(db, "Trainers", trainerData.id)
        updateDoc(docRef, {
          firstName: trainerData.firstName.trim(),
          secondName: trainerData.secondName.trim(),
          img: trainerData.img ? trainerData.img : "",
        });
      }
      setTrainerData((prev) => ({
        ...prev,
        id:"",
        firstName: "",
        secondName: "",
        img: "",
        team: "",
        number: "",
        uid: user.uid,
      }));
      setIsEditTrainerOpen(false);
    }
  };
  return (
    <View {...panResponder.panHandlers}>
    <Modal animationType="slide" visible={isEditTrainerOpen} onRequestClose={() => setIsEditTrainerOpen(false)}>
      <View style={styles.modalContent}>
        <Title name={(translate.addTrainer[language] || translate.addTrainer["en"])} />
        <ScrollView>
        <View style={styles.inputCenter}>
          <InputData
            name={(translate.name[language] || translate.name["en"])}
            text={trainerData.firstName}
            onChangeText={(value) => setTrainerData((prev) => ({ ...prev, firstName: value }))}
          />
          <InputData
            name={(translate.surName[language] || translate.surName["en"])}
            text={trainerData.secondName}
            onChangeText={(value) => setTrainerData((prev) => ({ ...prev, secondName: value }))}
          />
          
          <View style={{width: "100%"}}>
            <Text style={{fontFamily: "Poppins_Medium"}}>{(translate.team[language] || translate.team["en"])}</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={trainerData.team}
                onValueChange={(itemValue) => setTrainerData((prev) => ({ ...prev, team: itemValue }))}
              >
                {Teams &&
                  Teams.map((item: any) => (
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
          <View style={{width: "100%"}}>
            <RoundedButton text={(translate.save[language] || translate.save["en"])}  onPress={handleSave} />
           <View style={{marginTop: 20}}>
            <RoundedButton text={(translate.delete[language] || translate.delete["en"])} onPress={handleDelete} />
          </View>
          </View>
        </View>
        </ScrollView>
      </View>
    </Modal>
  </View>
  )
}

export default EditTrainer
