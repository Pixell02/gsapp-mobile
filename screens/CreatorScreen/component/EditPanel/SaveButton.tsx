import React, { useContext } from "react";
import RoundedButton from "../../../components/RoundedButton";
import translate from "../../locales/translate.json";
import { LanguageContext } from "../../../../context/LanguageContext";
import { Text, View } from "react-native";
import { LicenseContext } from "../../context/licenseContext";
import { addDoc, collection, deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { ThemeOptionContext } from "../../context/themeOptionContext";

const SaveButton = ({ webViewRef }) => {
  const { language } = useContext(LanguageContext);
  const { license } = useContext(LicenseContext);
  const { user } =useAuthContext();
  const {selectedTheme, posterInfo } = useContext(ThemeOptionContext);
  const handleSave = () => {
    webViewRef.current.injectJavaScript(`
      var canvas = document.querySelector("#canvas");
      var image = document.querySelector("#image");
      var computedStyle = window.getComputedStyle(image);
      var transformValue = computedStyle.getPropertyValue("transform");
      image.style.transform = "scale(1)";
      html2canvas(canvas, {scale: 1.5}).then((canvas) => {
        var dataURL = canvas.toDataURL("image/jpeg");
        image.style.transform = transformValue;
        var data = {
          message: dataURL,
          type: "image"
        }
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
      });
    `);

    const docRef = doc(db, "user", license.id);
   
      if (license?.numberOfFreeUse > 0) {
        updateDoc(docRef, {
          numberOfFreeUse: license.numberOfFreeUse - 1,
        });
        license.numberOfFreeUse = 0;
      }
      if(license?.numberOfFreeUse === 0){
        updateDoc(docRef, {
          license: "no-license",
          numberOfFreeUse: deleteField()
        });
      }
      
    const generatorRef = collection(db, "generated");
    addDoc(generatorRef, {
      createdDate: Date.now(),
      user: user.uid,
      ...posterInfo,
    })
  };

  return (
    <View style={{ marginTop: 10, marginBottom: 10 }}>
      <RoundedButton text={translate.save[language]} onPress={() => handleSave()} />
    </View>
  );
};

export default SaveButton;
