import React, { useEffect, useState } from "react";
import { View } from "react-native";
import TextArea from "../../../../../components/TextArea";
import useThemeOption from "../../../hooks/useThemeOption";

const TextBoxInput = ({ webViewRef, coords }) => {
  const [textValue, setTextValue] = useState<string>("");
  const { selectedTheme } = useThemeOption();
  
  useEffect(() => {
    if (webViewRef && textValue) {
      webViewRef.current.injectJavaScript(`
      var object = fabricCanvas.getObjects().find((item) => item.className === "${coords.className}");
      if(object){
        object.set("text", "${textValue}")
         if(text.width > ${coords.ScaleToWidth}){
          text.scaleToWidth(${coords.ScaleToWidth});
        }
        fabricCanvas.renderAll();
      } else {
      var themeOption = ${JSON.stringify(coords.themeOption)}
      var font = new FontFaceObserver("${coords.FontFamily}")
      font.load().then(() => {
        var text = new fabric.Textbox("${textValue}", {
          top: ${coords.Top},
          left: ${coords.Left},
          className: "${coords.className}",
          selectable: false,
          width: ${coords.ScaleToWidth},
          height: ${coords.ScaleToHeight},
          textAlign: "${coords.TextAlign}",
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
    }
    `);
    }
  }, [textValue]);

  return (
    <View>
      <TextArea name={coords.className} text={textValue} onChangeText={(value: string) => setTextValue(value)} />
    </View>
  );
};

export default TextBoxInput;
