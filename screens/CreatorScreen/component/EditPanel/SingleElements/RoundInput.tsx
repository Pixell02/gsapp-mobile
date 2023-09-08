import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Input from '../../../../components/Input'
import translate from "../../../locales/translate.json"
import { LanguageContext } from '../../../../../context/LanguageContext'
import { ThemeOptionContext } from '../../../context/themeOptionContext'
const RoundInput = ({webViewRef, coords}) => {

  const {language} = useContext(LanguageContext)
  const { selectedTheme } = useContext(ThemeOptionContext);
  const [typeRound, setTypeRound] = useState(null)

  useEffect(() => {
    if(webViewRef.current && typeRound) {
      webViewRef.current.injectJavaScript(`
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "yourKolejka") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
      var themeOption = ${JSON.stringify(coords.yourKolejka.themeOption)}
      var font = new FontFaceObserver("${coords.yourKolejka.FontFamily}")
      font.load().then(() => {
        var text = new fabric.Text("${typeRound}", {
          top: ${ coords.yourKolejka.Top},
          left: ${coords.yourKolejka.Left},
          className: "yourKolejka",
          selectable: false,
          fontFamily: "${coords.yourKolejka.FontFamily}",
          fontSize: ${coords.yourKolejka.FontSize},
          fill: "${coords.yourKolejka.Fill}",
          originX: "${coords.yourKolejka.OriginX}",
          originY: "${coords.yourKolejka.OriginY}",
        });
        if(text.width > ${coords.yourKolejka.ScaleToWidth}){
          text.scaleToWidth(${coords.yourKolejka.ScaleToWidth});
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
  },[typeRound, selectedTheme])



  return (
    <View>
      <Input 
      name={translate.typeRound[language] || translate.typeRound["en"]} 
      value={typeRound} 
      onChangeText={(value) => setTypeRound(value)} 
      />
    </View>
  )
}

export default RoundInput
