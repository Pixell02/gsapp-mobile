import React, { useEffect } from 'react'
import { View } from 'react-native'
import useLanguageContext from '../../../../../hooks/useLanguageContext'
import InputData from '../../../../components/InputData'
import SelectPicker from '../../../../components/SelectPicker'
import useCreateYourTeamGoals from '../../../hooks/useCreateYourTeamGoals'
import usePlayers from '../../../hooks/usePlayers'
import useRadioContext from '../../../hooks/useRadioContext'
import useThemeOption from '../../../hooks/useThemeOption'
import translate from "../../../locales/translate.json"
import Header from './components/Header'

const YourTeamGoals = ({webViewRef, coords}) => {

  const {language} = useLanguageContext();
  const {yourTeamGoal, yourTeamGoalMinute, handleYourTeamMinuteChange, handleGoalChange} = useCreateYourTeamGoals(Array(9).fill(""))
  const { selectedTheme } = useThemeOption();
  const {playerOptions} = usePlayers(webViewRef, selectedTheme);
  const {radioChecked} = useRadioContext();

  useEffect(() => {
    if(webViewRef.current && (yourTeamGoal || yourTeamGoalMinute)) {
        webViewRef.current.injectJavaScript(`
          var array = ${JSON.stringify(yourTeamGoal)};
          var yourTeamGoalMinute = ${JSON.stringify(yourTeamGoalMinute)};
          var themeOption = ${JSON.stringify(coords.yourPlayerOneGoal.themeOption)}
          var text = "";
          fabricCanvas._objects.forEach((item, i) => {
            if (item.className === "yourPlayerOneGoal") {
              fabricCanvas.remove(item);
            }
          });
          fabricCanvas.renderAll();
          array.forEach((yourTeamGoal, i) => {
            if(yourTeamGoal){
          var formatPlayer = "";
          if(yourTeamGoalMinute[i] !== undefined) {
            formatPlayer = yourTeamGoalMinute[i] + "' " + yourTeamGoal?.split("...")[1] + " ";
          } else {
            formatPlayer = yourTeamGoal?.split("...")[1] + " ";
          }
          text += formatPlayer + "\\n";

        }
          });
          var font = new FontFaceObserver("${coords.yourPlayerOneGoal.FontFamily}");
          font.load().then(() => {
            const showPlayer = new fabric.Textbox(text, {
              top: ${coords.yourPlayerOneGoal.Top},
              left: ${radioChecked === "radio1" ? coords.yourPlayerOneGoal.Left : coords.opponentPlayerOneGoal.Left},
              textAlign: "${radioChecked === "radio1" ? coords.yourPlayerOneGoal.TextAlign : coords.opponentPlayerOneGoal.TextAlign}",
              lineHeight: parseFloat(${coords.yourPlayerOneGoal.LineHeight ? coords.yourPlayerOneGoal.LineHeight : 1}),
              width: ${coords.yourPlayerOneGoal.ScaleToWidth},
              fontFamily: "${coords.yourPlayerOneGoal.FontFamily}",
              fontSize: ${coords.yourPlayerOneGoal.FontSize},
              selectable: false,
              fill: "${coords.yourPlayerOneGoal.Fill}",
              className: "yourPlayerOneGoal",
              originX: "${radioChecked === "radio1" ? coords.yourPlayerOneGoal.OriginX : coords.opponentPlayerOneGoal.OriginX}",
              originY: "top",
            });
            showPlayer._textLines.forEach((lines, i) => {
              const width = showPlayer.getLineWidth(i);
              while (width > ${coords.yourPlayerOneGoal.ScaleToWidth - 20}) {
                const fontSize = showPlayer.get("fontSize");
                showPlayer.set("fontSize", fontSize - 1);
                const newWidth = showPlayer.getLineWidth(i);
                if (newWidth <= ${coords.yourPlayerOneGoal.ScaleToWidth - 20}) {
                  fabricRef.current.add(showPlayer);
                  fabricRef.current.renderAll();
                  break;
                }
              }
            });
          if (themeOption) {
            themeOption.forEach((theme, i) => {
              if ((theme.color === themeOption.label) || (theme.label === themeOption.label)) {
                text.set({
                  fill: theme.Fill
                })
              }
            })
          }
          fabricCanvas.add(showPlayer);
          fabricCanvas.renderAll();
        });
      `);
    }
      },[yourTeamGoal, yourTeamGoalMinute, radioChecked])

  return (
    <View style={{width: "100%"}} >
      <Header title={translate.addYourTeamGoals[language]} />
      {yourTeamGoal.map((goal, i) => (
        <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between"}} key={i}>
          <View style={{width: "20%", marginLeft: 20, justifyContent: "center"}}>
        <InputData name='minuta' type="numeric" text={yourTeamGoalMinute[i]} onChangeText={(value) => handleYourTeamMinuteChange(value, i)} />
          </View>
          <View style={{width: "70%", marginTop: 20}}>
        <SelectPicker name={`zawodnik ${i + 1}`} onValueChange={(value) => handleGoalChange(value, i)} selectedValue={yourTeamGoal[i]} options={playerOptions} />
          </View>
        </View>
      ))}
    </View>
  )
}

export default YourTeamGoals
