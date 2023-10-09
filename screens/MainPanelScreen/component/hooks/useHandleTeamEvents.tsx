import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { db } from "../../../../firebase/config";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import useLanguageContext from "../../../../hooks/useLanguageContext";
import useStorage from "../../../../hooks/useStorage";
import { teamDataProps } from "../../context/DataContext";
import translate from "../../locales/translate.json";
import useHandleTeamData from "./useHandleTeamData";
const useHandleTeamEvents = ({ setTeamData, setIsModalOpen }) => {
  const { user } = useAuthContext();
  const { updateData, deleteData } = useHandleTeamData();
  const { handleAddImage } = useStorage();
  const { language } = useLanguageContext(); 
  const handleUpdate = async (
    preview: string,
    oldName: string,
    teamData: teamDataProps,
    isImage: boolean
  ) => {
    if (!teamData.firstName || !teamData.secondName || !teamData.sport) {
      Alert.alert("puste pole");
    } else {
      updateData(user.uid, oldName, teamData.firstName, teamData.secondName);
      if (isImage) {
        const response = await fetch(preview);
        const blob = await response.blob();
        const downloadURL = await handleAddImage(
          blob,
          `${user.uid}/herb/${teamData.firstName}_${teamData.secondName}`
        );

        const docRef = doc(db, "Teams", teamData.id);
        updateDoc(docRef, {
          ...teamData,
          img: downloadURL,
        });
      } else {
        const docRef = doc(db, "Teams", teamData.id);
        updateDoc(docRef, {
          ...teamData,
        });
      }

      setIsModalOpen(0);
    }
    setTeamData((prev: teamDataProps) => ({
      ...prev,
      firstName: "",
      secondName: "",
      img: "",
      sport: "",
    }));
  };

  const handleSave = async (teamData: teamDataProps, preview: string) => {
    if (!teamData.firstName || !teamData.secondName || !teamData.sport) {
      Alert.alert(translate.emptyField[language]);
    } else {
      if (teamData.img) {
        const response = await fetch(preview);
        const blob = await response.blob();
        const downloadURL = await handleAddImage(blob, `${user.uid}/herb/${teamData.firstName}_${teamData.secondName}`)
            addDoc(collection(db, "Teams"), {
              ...teamData,
              img: downloadURL,
            });
      } else {
        const docRef = collection(db, "Teams");
        addDoc(docRef, {
          ...teamData,
          img: "",
        });
      }
      setTeamData((prev: teamDataProps) => ({
        ...prev,
        firstName: "",
        secondName: "",
        img: "",
        sport: "piłka nożna",
      }));
      setIsModalOpen(0);
    }
  };

  const handleDeleteTeam = (teamData: teamDataProps) => {
    const docRef = doc(db, "Teams", teamData.id);
    deleteData(user.uid, teamData.firstName, teamData.secondName);
    deleteDoc(docRef)
      .then(() => {
        setIsModalOpen(0);
        setTeamData((prev: teamDataProps) => ({
          ...prev,
          firstName: "",
          secondName: "",
          img: "",
          sport: "",
        }));
      })
      .catch((err) => console.log(err));
  };
  return { handleDeleteTeam, handleUpdate, handleSave };
};

export default useHandleTeamEvents;
