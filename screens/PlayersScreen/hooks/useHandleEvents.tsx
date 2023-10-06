import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import useLanguageContext from "../../../hooks/useLanguageContext";
import useStorage from "../../../hooks/useStorage";
import { playerProps } from "../PlayersScreen";
import translate from "../locales/translate.json";

interface props {
  setTeamData: (value: playerProps) => void;
  setIsEditOpen: (value: number) => void;
}

const useHandleEvents = ({ setTeamData, setIsEditOpen }: props) => {
  const { language } = useLanguageContext();
  const { handleAddImage } = useStorage();
  const { user } = useAuthContext();

  const handleDeleteItem = (teamData: playerProps) => {
    const docRef = doc(db, "Players", teamData.id);
    deleteDoc(docRef);
    setTeamData({
      id: "",
      firstName: "",
      secondName: "",
      team: "",
      number: "",
      uid: user.uid,
    });
    setIsEditOpen(0);
  };

  const handleSave = async (
    teamData: playerProps,
    isImage: boolean,
    preview: string
  ) => {
    if (!teamData.firstName || !teamData.secondName) {
      Alert.alert(translate.emptyField[language]);
    } else {
      if (isImage) {
        const response = await fetch(preview);
        const blob = await response.blob();
        const downloadURL = await handleAddImage(
          blob,
          `${user.uid}/zawodnik/${teamData.firstName}_${teamData.secondName}`
        );

        const docRef = doc(db, "Players", teamData.id);
        updateDoc(docRef, {
          ...teamData,
          img: downloadURL,
        });
      } else {
        const docRef = doc(db, "Players", teamData.id);
        updateDoc(docRef, {
          ...teamData,
        });
      }
      setTeamData({
        id: "",
        firstName: "",
        secondName: "",
        team: "",
        number: "",
        uid: user.uid,
      });
      setIsEditOpen(0);
    }
  };

  return { handleDeleteItem, handleSave };
};

export default useHandleEvents;
