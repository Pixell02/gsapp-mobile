import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Alert } from 'react-native';
import { db } from '../../../../firebase/config';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import useLanguageContext from '../../../../hooks/useLanguageContext';
import useStorage from '../../../../hooks/useStorage';
import { trainerProps } from '../../context/DataContext';
import translate from "../../locales/translate.json";
import useDataContextProvider from './useDataContextProvider';
import useModalContextProvider from './useModalContextProvider';
const useHandleTrainerData = () => {

    const { handleAddImage } = useStorage();
    const { user } = useAuthContext();
    const { language } = useLanguageContext();
    const { setTrainerData } = useDataContextProvider();
    const { setIsModalOpen } = useModalContextProvider();


    const handleSave = async (trainerData: trainerProps, preview: string) => {
        if (!trainerData.firstName || !trainerData.secondName) {
            Alert.alert(translate.emptyField[language]);
        } else {
            if (trainerData.img) {
                const response = await fetch(preview);
                const blob = await response.blob();
                const downloadURL = await handleAddImage(blob, `${user.uid}/trenerzy/${trainerData.firstName}_${trainerData.secondName}`)
                addDoc(collection(db, "Trainers"), {
                    ...trainerData,
                    img: downloadURL,
                });
            } else {
                const docRef = collection(db, "Trainers");
                addDoc(docRef, {
                    firstName: trainerData.firstName.trim(),
                    secondName: trainerData.secondName.trim(),
                    img: "",
                    team: trainerData.team,
                    uid: user.uid,
                });
            }
            setTrainerData((prev: trainerProps) => ({
                ...prev,
                firstName: "",
                secondName: "",
                img: "",
                team: "",
                number: "",
            }));
            setIsModalOpen(0);
        }
    };
    // `${user.uid}/zawodnik/${trainerData.firstName}_${trainerData.secondName}`
    const handleUpdate = async (trainerData: trainerProps, preview: string, isImage: boolean) => {
    if (!trainerData.firstName || !trainerData.secondName) {
      Alert.alert(translate.emptyField[language]);
    } else {
      if (isImage) {
        
        
        const response = await fetch(preview);
        const blob = await response.blob();
        const downloadURL = await handleAddImage(blob, `${user.uid}/zawodnik/${trainerData.firstName}_${trainerData.secondName}`)

            const docRef = doc(db, "Trainers", trainerData.id)
            updateDoc(docRef, {
              firstName: trainerData.firstName,
              secondName: trainerData.secondName,
              img: downloadURL,
            });
      } else {
        const docRef = doc(db, "Trainers", trainerData.id)
        updateDoc(docRef, {
          firstName: trainerData.firstName,
          secondName: trainerData.secondName,
          img: trainerData.img,
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
      }));
      setIsModalOpen(0);
    }
  };
  const handleDelete = async (trainerData: trainerProps) => {
    const docRef = doc(db, "Trainers", trainerData.id)
    await deleteDoc(docRef)
     .then(() => setIsModalOpen(0))
     .catch((err) => console.log(err))
  }

    return { handleSave, handleUpdate, handleDelete }
}

export default useHandleTrainerData
