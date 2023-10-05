import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';




const useAddImage = (setData: (value) => void) => {

  const [imageUri, setImageUri] = useState({});
  const [preview, setPreview] = useState("");
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    if (preview) {
      setData((prev: object) => ({
        ...prev,
        img: preview.substring(preview.lastIndexOf("/") + 1),
      }));
    }
  }, [preview]);

  const handleAddPhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert("Brak uprawnień", "Nie masz uprawnień do dostępu do galerii.");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Limit to only images
      });
      
      if (!pickerResult.canceled) {
        setImageUri(pickerResult.assets[0]); // Store the selected image URI
        setPreview(pickerResult.assets[0].uri);
        setIsImage(true);
      }
    } catch (error) {
      console.error("Błąd podczas dodawania zdjęcia:", error);
    }
  };

  return {imageUri, setImageUri, handleAddPhoto, preview, setPreview, isImage, setIsImage}
}

export default useAddImage
