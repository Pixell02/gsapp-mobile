import { Picker } from "@react-native-picker/picker";
import React, { useContext, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LanguageContext } from "../../../../../context/LanguageContext";
import { ThemeOptionContext } from "../../../context/themeOptionContext";
import useBackgrounds from "../../../hooks/useBackgrounds";
import translate from "../../../locales/translate.json";

export default function ThemeOption({ webViewRef, uid, size }) {
  const { language } = useContext(LanguageContext);
  const { backgrounds, selectedBackground, dataURL, handleFetchBackground } = useBackgrounds(uid ? uid : null);
  const { setSelectedTheme } = useContext(ThemeOptionContext);
  const imageRef = useRef(null);
  useEffect(() => {
    if (selectedBackground) {
      setSelectedTheme(selectedBackground.split("...")[1]);
    }
  }, [selectedBackground]);

  useEffect(() => {
    if (webViewRef.current && dataURL) {
        webViewRef.current.injectJavaScript(`
        var fabricCanvas;
        var backgroundImage = new Image();
        backgroundImage.src = "${dataURL}";
        backgroundImage.onload = function() {
          
          if(!fabricCanvas){
           fabricCanvas = new fabric.Canvas(canvas, {
            width: backgroundImage.width,
            height: backgroundImage.height,
            selection: false
          });
          }
          var bg = new fabric.Image(backgroundImage, {
            left: 0,
            top: 0,
            width: backgroundImage.width,
            height: backgroundImage.height
          });
          fabricCanvas.add(bg)
          // window.ReactNativeWebView.postMessage(JSON.stringify())
         var image = document.querySelector("#image");
      image.style.transform = "scale(${600 / size})";
          var data = {
            width: backgroundImage.width,
            height: backgroundImage.height,
            type: 'resolution'
          }
          window.ReactNativeWebView.postMessage(JSON.stringify(data));
        };
      `);
      
    }
  }, [dataURL, size]);

  useEffect(() => {
    if (backgrounds?.length > 0) {
      handleFetchBackground(backgrounds[0].src + "..." + backgrounds[0].color);
    }
  }, [backgrounds]);


  return (
    <>
        <View style={styles.text}>
          <Text style={styles.textStyle}>{translate.themes[language] || translate.themes["en"]}</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedBackground ? selectedBackground : null}
            onValueChange={(value) => handleFetchBackground(value)}
          >
            <Picker.Item key={-1} label="" value="" />
            {backgrounds?.map((item: any, i: number) => (
              <Picker.Item key={i} label={item.color} value={item.src + "..." + item.color} />
            ))}
          </Picker>
        </View>
    </>
  );
}
const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#7f7f7f",
    justifyContent: "center",
    padding: 10,
    height: 40,
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
  },
  text: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
  },
  textStyle: {
    fontFamily: "Poppins-SemiBold",
  },
});
