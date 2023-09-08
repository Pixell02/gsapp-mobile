import React, { useContext, useEffect, useState } from "react";
import RoundedButton from "../../../components/RoundedButton";
import translate from "../../locales/translate.json";
import { LanguageContext } from "../../../../context/LanguageContext";
import { View } from "react-native";
import { LicenseContext } from "../../context/licenseContext";
import { addDoc, collection, deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { ThemeOptionContext } from "../../context/themeOptionContext";

const logo = require("../../../../assets/adaptive-icon.png")

const SaveButton = ({ webViewRef }) => {
  const { language } = useContext(LanguageContext);
  const { license } = useContext(LicenseContext);
  const { user } =useAuthContext();
  const {selectedTheme, posterInfo } = useContext(ThemeOptionContext);
  const [logoDataURL, setLogoDataURL] = useState(null);

  useEffect(() => {
    fetch("https://firebasestorage.googleapis.com/v0/b/poster-dd714.appspot.com/o/logo%2Fadaptive-icon.png?alt=media&token=c3970fb2-b78a-4339-868a-79c7763cf9ed")
    .then((res) => res.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        setLogoDataURL(reader.result);
      };
    });
  }, []);
  const handleSave = () => {
    webViewRef.current.injectJavaScript(`
    var image = new Image();
    image.src = "${logoDataURL}";
    image.onload = () => {
      var canvas = document.querySelector("#canvas");
      var watermarkContainer = document.querySelector(".canvas-container")
      var image = document.querySelector("#image");
      var watermark = document.createElement("img");
      watermark.src = image.src;
      watermark.style.position = "absolute";
      watermark.style.width = "100px";
      watermarkContainer.appendChild(watermark);
      var computedStyle = window.getComputedStyle(image);
      var transformValue = computedStyle.getPropertyValue("transform");
      image.style.transform = "scale(1)";
      html2canvas(canvas, {scale: 1}).then((canvas) => {
        var dataURL = canvas.toDataURL("image/jpeg");
        image.style.transform = transformValue;
        var data = {
          message: dataURL,
          type: "image"
        }
        

        window.ReactNativeWebView.postMessage(JSON.stringify(data));
      });
      }
    `);

    const docRef = doc(db, "user", license.id);
   
      if (license?.numberOfFreeUse > 0) {
        updateDoc(docRef, {
          numberOfFreeUse: license.numberOfFreeUse - 1,
        });
      }
      if(license?.numberOfFreeUse <= 0){
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
    <View style={{ marginTop: 10, marginBottom: 10, width: "100%"}}>
      <RoundedButton text={translate.save[language] || translate.save["en"]} onPress={() => handleSave()} />
    </View>
  );
};

export default SaveButton;
