import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Input from '../../../../components/Input'
import translate from "../../../locales/translate.json"
import { LanguageContext } from '../../../../../context/LanguageContext'
import { ThemeOptionContext } from '../../../context/themeOptionContext'
const MonthInput = ({webViewRef, coords}) => {

  const {language} = useContext(LanguageContext);
  const [typeMonth, setTypeMonth] = useState(null);
  const {selectedTheme} = useContext(ThemeOptionContext)
  useEffect(() => {
    if(webViewRef.current && typeMonth) {
      webViewRef.current.injectJavaScript(`
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "typeMonth") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
      var font = new FontFaceObserver("${coords.typeMonth.FontFamily}")
      var themeOption = ${JSON.stringify(coords.typeMonth.themeOption)}
      font.load().then(() => {
        var text = new fabric.Text("${typeMonth}", {
          top: ${ coords.typeMonth.Top},
          left: ${coords.typeMonth.Left},
          className: "typeMonth",
          selectable: false,
          fontFamily: "${coords.typeMonth.FontFamily}",
          fontSize: ${coords.typeMonth.FontSize},
          fill: "${coords.typeMonth.Fill}",
          originX: "${coords.typeMonth.OriginX}",
          originY: "${coords.typeMonth.OriginY}",
        });
        if(text.width > ${coords.typeMonth.ScaleToWidth}){
          text.scaleToWidth(${coords.typeMonth.ScaleToWidth});
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
  },[typeMonth, selectedTheme])

  return (
    <View>
      <Text>{translate.typeMonth[language] || translate.typeMonth["en"]}</Text>
      <Input value={typeMonth} onChangeText={(value) => setTypeMonth(value)} />
    </View>
  )
}

export default MonthInput