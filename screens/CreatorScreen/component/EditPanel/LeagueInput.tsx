import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Input from '../../../components/Input'
import translate from "../../locales/translate.json"
import { LanguageContext } from '../../../../context/LanguageContext'

const LeagueInput = ({webViewRef, coords}) => {

  const { language } = useContext(LanguageContext)
  const [typeLeague, setTypeLeague] = useState(null)

  useEffect(() => {
    if(webViewRef.current && typeLeague){
      webViewRef.current.injectJavaScript(`
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "yourLeague") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
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
        fabricCanvas.add(text);
        fabricCanvas.renderAll();
    `);
    }
  },[typeLeague])

  return (
    <View>
      <Input name={translate.typeLeague[language]} value={typeLeague} onChangeText={(value) => setTypeLeague(value)} />
    </View>
  )
}

export default LeagueInput
