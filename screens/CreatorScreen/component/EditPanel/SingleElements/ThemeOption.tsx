import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import useLanguageContext from "../../../../../hooks/useLanguageContext";
import useAddBackround from "../../../hooks/useAddBackround";
import useBackgrounds from "../../../hooks/useBackgrounds";
import useMessageContext from "../../../hooks/useMessageContext";
import translate from "../../../locales/translate.json";

export default function ThemeOption({ webViewRef, uid, setAdditionalLayer }) {
  const { language } = useLanguageContext();
  const { backgrounds, selectedBackground, dataURL, setSelectedBackground, additionalLayer } =
    useBackgrounds(uid ? uid : null);
    const { handleAddBackground } = useAddBackround(webViewRef);
  const { message } = useMessageContext();
  const [size, setSize] = useState(600);
  useEffect(() => {
    if (message?.type === "resolution") {
      if (message.width > message.height) {
        setSize(message.width);
      } else {
        setSize(message.height);
      }
    }
  }, [message]);

  useEffect(() => {
    if (webViewRef.current && dataURL) {
      webViewRef.current.injectJavaScript(handleAddBackground(dataURL, size));
    }
  }, [dataURL, size, webViewRef]);

  useEffect(() => {
    if(additionalLayer)  setAdditionalLayer(additionalLayer);
  },[additionalLayer])

  
  return (
    <>
    {backgrounds?.length > 1 && (
      <>
      <View style={styles.text}>
        <Text style={styles.textStyle}>
          {translate.themes[language] || translate.themes["en"]}
        </Text>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedBackground ? selectedBackground : null}
          onValueChange={(value) => setSelectedBackground(value)}
        >
          <Picker.Item key={-1} label="" value="" />
          {backgrounds?.map((item: any, i: number) => (
            <Picker.Item
              key={i}
              label={item.color}
              value={item}
            />
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
