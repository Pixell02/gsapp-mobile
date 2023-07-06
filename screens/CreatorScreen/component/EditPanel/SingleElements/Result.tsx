import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import Input from '../../../../components/Input'
import InputData from '../../../../components/InputData'
import RadioContext from '../../../context/radioContext'
import translate from "../../../locales/translate.json"
import { LanguageContext } from '../../../../../context/LanguageContext'
import { ThemeOptionContext } from '../../../context/themeOptionContext'

const Result = ({webViewRef, coords}) => {

  const {language} = useContext(LanguageContext)
  const {radioChecked} = useContext(RadioContext);
  const {selectedTheme} = useContext(ThemeOptionContext)
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
      var themeOption = ${JSON.stringify(coords.yourTeamResult.themeOption)}
      var font = new FontFaceObserver("${coords.yourTeamResult.FontFamily}")
      font.load().then(() => {
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
      var themeOption = ${JSON.stringify(coords.yourOpponentResult.themeOption)}
      var font = new FontFaceObserver("${coords.yourOpponentResult.FontFamily}")
      font.load().then(() => {
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
      `)
    }
  },[yourResult,opponentResult, radioChecked, selectedTheme])

  return (
    <View style={{flexDirection: "row", width: "70%", justifyContent: "center"}}>
      <View style={{width: "55%", marginRight: 10}}>
        <InputData type="numeric" name={(translate.hostResult[language] || translate.hostResult["en"])} text={yourResult} onChangeText={(value) => setYourResult(value)} />
      </View>
      <View style={{width: "55%"}}>
        <InputData type="numeric" name={(translate.opponentResult[language] || translate.opponentResult["en"])} text={opponentResult} onChangeText={(value) => setOpponentResult(value)} />
      </View>
    </View>
  )
}

export default Result
