import React, { useContext, useEffect } from "react";
import { View, Alert, Modal, Image, TouchableOpacity, Text, TextInput, ScrollView } from "react-native";
import { styles } from "../../MainPanelScreen/component/styles/styles";
import useAddImage from "../../../hooks/useAddImage";
import useCustomPanResponder from "../../../hooks/useCustomPanResponder";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import Title from "../../components/Title";
import InputData from "../../components/InputData";
import { Picker } from "@react-native-picker/picker";
import RoundedButton from "../../components/RoundedButton";
import { useCollection } from "../../../hooks/useCollection";
import translate from "../locales/translate.json"
import { LanguageContext } from "../../../context/LanguageContext";

const AddPlayer = ({ isOpen, teamData, setTeamData, setIsOpen }) => {
  const { user } = useAuthContext();
  const panResponder = useCustomPanResponder(isOpen, setIsOpen, setTeamData);
  const { setImageUri, handleAddPhoto, preview } = useAddImage();
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const {language} = useContext(LanguageContext);
  useEffect(() => {
    if (preview) {
      setTeamData((prev) => ({
        ...prev,
        img: preview.substring(preview.lastIndexOf("/") + 1),
      }));
    }
  }, [preview]);
  const handleSave = async () => {
    if (!teamData.firstName || !teamData.secondName) {
      Alert.alert(translate.emptyField[language]);
    } else {
      if (teamData.img) {
        const storage = getStorage();
        const metadata = {
          contentType: "image/png",
        };
        const teamRef = ref(storage, `${user.uid}/zawodnik/${teamData.firstName}_${teamData.secondName}`);
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
            addDoc(collection(db, "Players"), {
              firstName: teamData.firstName.trim(),
              secondName: teamData.secondName.trim(),
              img: downloadURL,
              team: teamData.team,
              uid: user.uid,
              number: (teamData.number || "")
            });
          }
        );
      } else {
        const docRef = collection(db, "Players");
        addDoc(docRef, {
          firstName: teamData.firstName.trim(),
          secondName: teamData.secondName.trim(),
          img: "",
          team: teamData.team,
          number: (teamData.number || ""),
          uid: user.uid,
        });
      }
      setTeamData((prev) => ({
        ...prev,
        firstName: "",
        secondName: "",
        img: "",
        team: "",
        number: "",
        uid: user.uid,
      }));
      setIsOpen(0);
    }
  };
  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType="slide" visible={isOpen === 1} onRequestClose={() => setIsOpen(0)}>
        <View style={styles.modalContent}>
          <Title name={(translate.addPlayer[language] || translate.addPlayer["en"])} />
          <ScrollView>
          <View style={styles.inputCenter}>
            <InputData
              name={(translate.name[language] || translate.name["en"])}
              text={teamData.firstName}
              onChangeText={(value) => setTeamData((prev) => ({ ...prev, firstName: value }))}
            />
            <InputData
              name={(translate.surName[language] || translate.surName["en"])}
              text={teamData.secondName}
              onChangeText={(value) => setTeamData((prev) => ({ ...prev, secondName: value }))}
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
            value={teamData.number}
            onChangeText={(value) => setTeamData((prev) => ({...prev, number: parseFloat(value) }))}
            />
            </View>
            <View style={{width: "100%"}}>
              <Text style={{fontFamily: "Poppins_Medium"}}>{(translate.team[language] || translate.team["en"])}</Text>
              <View style={styles.picker}>
                
                <Picker
                  selectedValue={teamData.team}
                  onValueChange={(itemValue) => setTeamData((prev) => ({ ...prev, team: itemValue }))}
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
            </View>
          </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default AddPlayer;
