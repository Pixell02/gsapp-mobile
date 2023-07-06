import { Picker } from "@react-native-picker/picker";
import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useAuthContext } from "../../../../../hooks/useAuthContext";
import { useCollection } from "../../../../../hooks/useCollection";
import translate from "../../../locales/translate.json";
import { LanguageContext } from "../../../../../context/LanguageContext";
import useBackgrounds from "../../../hooks/useBackgrounds";
import { ThemeOptionContext } from "../../../context/themeOptionContext";

export default function ThemeOption({ webViewRef, uid, size}) {
  const { language } = useContext(LanguageContext);
  const { backgrounds, selectedBackground, dataURL, handleFetchBackground } = useBackgrounds(uid ? uid : null);
  const { setSelectedTheme } = useContext(ThemeOptionContext);
  useEffect(() => {
    if(selectedBackground){
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
          var image = document.querySelector("#image");
      var computedStyle = window.getComputedStyle(image);
      var transformValue = computedStyle.getPropertyValue("transform");
      image.style.transform = "scale(${600 / size})";
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
          fabricCanvas.setBackgroundImage(bg, fabricCanvas.renderAll.bind(fabricCanvas));
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
    if (backgrounds && backgrounds.length > 0) {
      handleFetchBackground(backgrounds[0].src + "..." + backgrounds[0].color);
    }
  }, [backgrounds]);

  return (
    <>
      {backgrounds && backgrounds.length > 1 && (
        <>
          <View style={styles.text}>
            <Text style={styles.textStyle}>{translate.themes[language]}</Text>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedBackground ? selectedBackground : null}
              onValueChange={(value) => handleFetchBackground(value)}
            >
              {backgrounds.map((item: any, i: number) => (
                <Picker.Item key={i} label={item.color} value={item.src + "..." + item.color} />
              ))}
            </Picker>
          </View>
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    padding: 10,
    height: 40,
    width: "65%",
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  text: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "65%",
  },
  textStyle: {
    fontFamily: "Poppins-SemiBold",
  },
});
