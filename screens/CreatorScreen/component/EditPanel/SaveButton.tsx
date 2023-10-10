import { addDoc, collection, deleteField, doc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { View } from "react-native";
import RoundedButton from "../../../../components/RoundedButton";
import { db } from "../../../../firebase/config";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useDoc } from "../../../../hooks/useDoc";
import useLanguageContext from "../../../../hooks/useLanguageContext";
import exportImage from "../../functions/exportImage";
import useMessageContext from "../../hooks/useMessageContext";
import useThemeOption from "../../hooks/useThemeOption";
import translate from "../../locales/translate.json";

const SaveButton = ({ webViewRef }) => {
  const { language } = useLanguageContext();
  const {message} = useMessageContext();
  const {user} = useAuthContext();
  const { documents: license } = useDoc("user", ["uid", "==", user.uid]);
  const { posterInfo } = useThemeOption();
  
  useEffect(() => {
    if(message?.type === "image") exportImage(message.message)
  },[message])


  const handleSave = () => {
    webViewRef.current.injectJavaScript(`
      var canvas = document.querySelector("#image");
      var watermark = document.querySelector("#watermark")
      var image = document.querySelector("#image");
      var computedStyle = window.getComputedStyle(image);
      var transformValue = computedStyle.getPropertyValue("transform");
      image.style.transform = "scale(1)";
      if(${license.license === "free-trial"})
      watermark.style.opacity = "0.2";
      html2canvas(canvas, {scale: 1,  useCORS: true}).then((canvas) => {
        watermark.style.opacity = "0";
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
