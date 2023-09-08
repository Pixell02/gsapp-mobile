import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { ThemeOptionContext } from "../../../context/themeOptionContext";
import InputData from "../../../../components/InputData";

const TextInput = ({ webViewRef, coords }) => {
  const [textValue, setTextValue] = useState<string>("");
  const { selectedTheme } = useContext(ThemeOptionContext);
  useEffect(() => {
    if (webViewRef && textValue !== "") {
      webViewRef.current.injectJavaScript(`
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "${coords.className}") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
      var themeOption = ${JSON.stringify(coords.themeOption)}
      var font = new FontFaceObserver("${coords.FontFamily}")
      font.load().then(() => {
        var text = new fabric.Text("${textValue}", {
          top: ${coords.Top},
          left: ${coords.Left},
          className: "${coords.className}",
          selectable: false,
          fontFamily: "${coords.FontFamily}",
          fontSize: ${coords.FontSize},
          fill: "${coords.Fill}",
          originX: "${coords.OriginX}",
          originY: "${coords.OriginY}",
        });
        if(text.width > ${coords.ScaleToWidth}){
          text.scaleToWidth(${coords.ScaleToWidth});
        }
        if(themeOption){
          themeOption.forEach((theme, i) => {
            
            if ((theme.color === "${selectedTheme}") || (theme.label === "${selectedTheme}")) {
              text.set({
                fill: theme.Fill
              })
            }
          })
        }
        fabricCanvas.add(text);
        fabricCanvas.renderAll();
      });
    `);
    }
  }, [textValue]);

  return (
    <View>
      <InputData
      name={coords.className} 
      text={textValue} 
      onChangeText={(value: string) => setTextValue(value)} />
    </View>
  );
};

export default TextInput;
