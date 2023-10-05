import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import useLanguageContext from '../../../../../hooks/useLanguageContext'
import InputData from '../../../../components/InputData'
import RadioContext from '../../../context/radioContext'
import useCreateOpponentGoals from '../../../hooks2/useCreateOpponentGoals'
import translate from '../../../locales/translate.json'
import Header from './components/Header'

const OpponentTeamGoals = ({webViewRef, coords}) => {
  
  const {language} = useLanguageContext();
  const {opponentGoals, opponentGoalMinute, handleOpponentGoalChange, handleOpponentMinuteChange} = useCreateOpponentGoals(Array(9).fill(""))
  const {radioChecked} = useContext(RadioContext);
  useEffect(() => {
    if(webViewRef.current && (opponentGoals || opponentGoalMinute)) {
      webViewRef.current.injectJavaScript(`
          var array = ${JSON.stringify(opponentGoals)};
          var yourTeamGoalMinute = ${JSON.stringify(opponentGoalMinute)};
          var themeOption = ${JSON.stringify(coords.opponentPlayerOneGoal.themeOption)}
          var text = "";
          fabricCanvas._objects.forEach((item, i) => {
            if (item.className === "opponentPlayerOneGoal") {
              fabricCanvas.remove(item);
            }
          });
          fabricCanvas.renderAll();
          array.forEach((yourTeamGoal, i) => {
            if(yourTeamGoal) {
          var formatPlayer = "";
          if(yourTeamGoalMinute[i] !== undefined) {
            formatPlayer = yourTeamGoalMinute[i] + "' " + yourTeamGoal + " ";
          } else {
            formatPlayer = yourTeamGoal + " ";
          }
          text += formatPlayer + "\\n";
        }
          });
          var font = new FontFaceObserver("${coords.yourPlayerOneGoal.FontFamily}");
          font.load().then(() => {
            const showPlayer = new fabric.Textbox(text, {
              top: ${radioChecked === "radio1" ? coords.opponentPlayerOneGoal.Top : coords.yourPlayerTwoGoal.Top},
              left: ${radioChecked === "radio1" ? coords.opponentPlayerOneGoal.Left : coords.yourPlayerOneGoal.Left},
              textAlign: "${radioChecked === "radio1" ? coords.opponentPlayerOneGoal.TextAlign : coords.yourPlayerOneGoal.TextAlign}",
              lineHeight: parseFloat(${coords.yourPlayerOneGoal.LineHeight ? coords.yourPlayerOneGoal.LineHeight : 1}),
              width: ${coords.yourPlayerOneGoal.ScaleToWidth},
              fontFamily: "${coords.yourPlayerOneGoal.FontFamily}",
              fontSize: ${coords.yourPlayerOneGoal.FontSize},
              selectable: false,
              fill: "${coords.yourPlayerOneGoal.Fill}",
              className: "opponentPlayerOneGoal",
              originX: "${radioChecked === "radio1" ? coords.opponentPlayerOneGoal.OriginX : coords.yourPlayerOneGoal.OriginX}",
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
  },[opponentGoalMinute,opponentGoals, radioChecked])

  return (
    <View style={{ width: "100%" }}>
      <Header title={translate.addOpponentTeamGoals[language]} />

      {opponentGoals.map((goal, i) => (
        <View key={i} style={{ flexDirection: "row", width: "90%", justifyContent: "space-between" }}>
          <View style={{ width: "30%", alignItems: "center", marginLeft: 20, justifyContent: "center" }}>
            <InputData
              name='minuta'
              type="numeric"
              onChangeText={(value) => handleOpponentMinuteChange(value, i)}
              text={opponentGoalMinute[i]}
            />
          </View>
          <View style={{ width: "60%", alignItems: "center" }}>
            <InputData
              name="zawodnik"
              onChangeText={(value) => handleOpponentGoalChange(value, i)}
              text={opponentGoals}
            />
          </View>
        </View>
      ))}
    </View>
  )
}

export default OpponentTeamGoals
