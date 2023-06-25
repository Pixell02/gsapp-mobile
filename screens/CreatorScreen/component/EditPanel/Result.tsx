import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import Input from '../../../components/Input'
import InputData from '../../../components/InputData'
import RadioContext from '../../context/radioContext'
import translate from "../../locales/translate.json"
import { LanguageContext } from '../../../../context/LanguageContext'

const Result = ({webViewRef, coords}) => {

  const {language} = useContext(LanguageContext)
  const {radioChecked} = useContext(RadioContext);
  const [yourResult, setYourResult] = useState(null);
  const [opponentResult, setOpponentResult] = useState(null);
  
  useEffect(() => {
    if(webViewRef.current && yourResult && coords.yourTeamResult) {
      webViewRef.current.injectJavaScript(`
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "yourTeamResult") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
        var text = new fabric.Text("${yourResult}", {
          top: ${radioChecked === "radio1" ? coords.yourTeamResult.Top : coords.yourOpponentResult.Top},
          left: ${radioChecked === "radio1" ? coords.yourTeamResult.Left : coords.yourOpponentResult.Left},
          className: "yourTeamResult",
          selectable: false,
          fontFamily: "${coords.yourTeamResult.FontFamily}",
          fontSize: ${coords.yourTeamResult.FontSize},
          fill: "${coords.yourTeamResult.Fill}",
          originX: "${radioChecked === "radio1" ? coords.yourTeamResult.OriginX : coords.yourOpponentResult.OriginX}",
          originY: "${radioChecked === "radio1" ? coords.yourTeamResult.OriginY : coords.yourOpponentResult.OriginY}",
        });
        if(text.width > ${coords.yourTeamResult.ScaleToWidth}){
          text.scaleToWidth(${coords.yourTeamResult.ScaleToWidth});
        }
        fabricCanvas.add(text);
        fabricCanvas.renderAll();
      `)
    }
    if(webViewRef.current && opponentResult && coords.yourOpponentResult) {
      webViewRef.current.injectJavaScript(`
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "yourOpponentResult") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
        var text = new fabric.Text("${opponentResult}", {
          top: ${radioChecked === "radio1" ? coords.yourOpponentResult.Top : coords.yourTeamResult.Top},
          left: ${radioChecked === "radio1" ? coords.yourOpponentResult.Left : coords.yourTeamResult.Left},
          className: "yourOpponentResult",
          selectable: false,
          fontFamily: "${coords.yourOpponentResult.FontFamily}",
          fontSize: ${coords.yourOpponentResult.FontSize},
          fill: "${coords.yourOpponentResult.Fill}",
          originX: "${radioChecked === "radio1" ? coords.yourOpponentResult.OriginX : coords.yourTeamResult.OriginX}",
          originY: "${radioChecked === "radio1" ? coords.yourOpponentResult.OriginY : coords.yourTeamResult.OriginY}",
        });
        if(text.width > ${coords.yourOpponentResult.ScaleToWidth}){
          text.scaleToWidth(${coords.yourOpponentResult.ScaleToWidth});
        }
        fabricCanvas.add(text);
        fabricCanvas.renderAll();
      `)
    }
  },[yourResult,opponentResult, radioChecked])

  return (
    <View style={{flexDirection: "row", width: "65%", justifyContent: "center"}}>
      <View style={{width: "45%", marginRight: 10}}>
        <InputData type="numeric" name={translate.hostResult[language]} text={yourResult} onChangeText={(value) => setYourResult(value)} />
      </View>
      <View style={{width: "45%"}}>
        <InputData type="numeric" name={translate.opponentResult[language]} text={opponentResult} onChangeText={(value) => setOpponentResult(value)} />
      </View>
    </View>
  )
}

export default Result
