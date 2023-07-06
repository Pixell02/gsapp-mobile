import React from 'react'
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const exportImage = async(dataURL) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    const fileUri = `${FileSystem.documentDirectory}image.jpg`;
    
    if(status === "granted"){
     
    const base64ImageData = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    
    await FileSystem.writeAsStringAsync(fileUri, base64ImageData, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    if (asset) {
      Alert.alert("Grafika utworzona")
    } else {
      Alert.alert("Błąd")
    }
  }
  } catch (error) {
    console.error('Error saving image to library:', error);
  }
}

export default exportImage
