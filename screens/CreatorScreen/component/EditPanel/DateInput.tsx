

import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Input from '../../../components/Input'
import translate from "../../locales/translate.json"
import { LanguageContext } from '../../../../context/LanguageContext'
import moment from 'moment';

const DateInput = ({webViewRef, coords}) => {
  const {language} = useContext(LanguageContext)
  const [typeDate, setTypeDate] = useState(null);

  useEffect(() => {
    if(webViewRef.current && typeDate) {
      webViewRef.current.injectJavaScript(`
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "typeData") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
        var text = new fabric.Text("${typeDate}", {
          top: ${ coords.typeData.Top},
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
        fabricCanvas.add(text);
        fabricCanvas.renderAll();
    `);
    }
  },[typeDate])


  return (
    <View>
      <Input name={translate.typeDate[language]} value={typeDate} onChangeText={(value) => setTypeDate(value)} />
    </View>
  )
}

export default DateInput;

