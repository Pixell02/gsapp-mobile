import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import Input from "../../../../components/Input";
import translate from "../../../locales/translate.json";
import { LanguageContext } from "../../../../../context/LanguageContext";
import { ThemeOptionContext } from "../../../context/themeOptionContext";

const DateInput = ({ webViewRef, coords }) => {
  const { language } = useContext(LanguageContext);
  const { selectedTheme } = useContext(ThemeOptionContext);
  const [typeDate, setTypeDate] = useState(null);

  useEffect(() => {
    if (webViewRef.current && typeDate) {
      webViewRef.current.injectJavaScript(`
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "typeData") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
      var themeOption = ${JSON.stringify(coords.typeData.themeOption)}
      var font = new FontFaceObserver("${coords.typeData.FontFamily}")
      font.load().then(() => {
        var text = new fabric.Text("${typeDate}", {
          top: ${coords.typeData.Top},
          left: ${coords.typeData.Left},
          className: "typeData",
          selectable: false,
          fontFamily: "${coords.typeData.FontFamily}",
          fontSize: ${coords.typeData.FontSize},
          fill: "${coords.typeData.Fill}",
          originX: "${coords.typeData.OriginX}",
          originY: "${coords.typeData.OriginY}",
        });
        if(text.width > ${coords.typeData.ScaleToWidth}){
          text.scaleToWidth(${coords.typeData.ScaleToWidth});
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
  }, [typeDate, selectedTheme]);

  return (
    <View style={{width: "100%"}}>
      <Input name={translate.typeDate[language] || translate.typeDate["en"]} value={typeDate} onChangeText={(value) => setTypeDate(value)} />
    </View>
  );
};

export default DateInput;
