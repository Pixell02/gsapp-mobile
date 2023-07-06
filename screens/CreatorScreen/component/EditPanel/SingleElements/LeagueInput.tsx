import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Input from '../../../../components/Input'
import translate from "../../../locales/translate.json"
import { LanguageContext } from '../../../../../context/LanguageContext'
import { ThemeOptionContext } from '../../../context/themeOptionContext'

const LeagueInput = ({webViewRef, coords}) => {

  const { language } = useContext(LanguageContext)
  const [typeLeague, setTypeLeague] = useState(null)
  const {selectedTheme} = useContext(ThemeOptionContext)
  useEffect(() => {
    if(webViewRef.current && typeLeague){
      webViewRef.current.injectJavaScript(`
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "yourLeague") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
      var themeOption = ${JSON.stringify(coords.yourLeague.themeOption)}
      var font = new FontFaceObserver("${coords.yourLeague.FontFamily}")
      font.load().then(() => {
        var text = new fabric.Text("${typeLeague}", {
          top: ${ coords.yourLeague.Top},
          left: ${coords.yourLeague.Left},
          className: "yourLeague",
          selectable: false,
          fontFamily: "${coords.yourLeague.FontFamily}",
          fontSize: ${coords.yourLeague.FontSize},
          fill: "${coords.yourLeague.Fill}",
          originX: "${coords.yourLeague.OriginX}",
          originY: "${coords.yourLeague.OriginY}",
        });
        if(text.width > ${coords.yourLeague.ScaleToWidth}){
          text.scaleToWidth(${coords.yourLeague.ScaleToWidth});
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
  },[typeLeague, selectedTheme])

  return (
    <View>
      <Input name={translate.typeLeague[language]} value={typeLeague} onChangeText={(value) => setTypeLeague(value)} />
    </View>
  )
}

export default LeagueInput
