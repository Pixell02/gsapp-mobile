import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import SelectPicker from '../../../../../components/SelectPicker';
import useLanguageContext from '../../../../../hooks/useLanguageContext';
import { ThemeOptionContext } from '../../../context/themeOptionContext';
import useSquadPresetOption from '../../../hooks/useSquadPresetOption';
import translate from "../../../locales/translate.json";

const SquadPresetSelect = ({webViewRef, coords}) => {
    const { language } = useLanguageContext();
    const [selectedPreset, setSelectedPreset] = useState(null);
    const { selectedTheme } = useContext(ThemeOptionContext);
    const squadPreset = useSquadPresetOption();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    useEffect(() => {
        if(coords.playerOne && selectedPreset) {
            webViewRef.current.injectJavaScript(`
      var array = ${JSON.stringify(selectedPreset.squadPlayers)}
      var themeOption = ${JSON.stringify(coords.playerOne?.themeOption)}
      var text = "";
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "player") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
      array.forEach((player, i) => {
        let formatPlayer;
        
          if ("${coords.playerOne?.format}" === "NumDotSurName") {
          formatPlayer = (player.number || "") + "." + player.secondName;
        } else if ("${coords.playerOne?.format}" === "NumSurName") {
          formatPlayer = (player.number || "") + " " + player.secondName;
        } else if ("${coords.playerOne?.format}" === "dotted") {
          formatPlayer = (player.number || "") + "." + player.firstName[0] + "." + player.secondName;
        } else if ("${coords.playerOne?.format}" === "oneDot") {
          formatPlayer = (player.number || "") + " " + player.firstName[0] + "." + player.secondName;
        } else {
          formatPlayer = player.secondName;
        }
        if(${currentYear} - Number(player?.age) <= 21) {
            formatPlayer += " (m)";
        }

        if("${selectedPreset.goalkeeper?.firstName + " " + selectedPreset.goalkeeper?.secondName}" === player.firstName + " " + player.secondName) {
          formatPlayer += " (gk)";
        }
        if("${selectedPreset.capitan?.firstName + " " + selectedPreset.capitan?.secondName}" === player.firstName + " " + player.secondName) {
          formatPlayer += " (c)";
        }
        text = text + formatPlayer + "\\n";
      })
        
      
      if ("${coords.playerOne.textType}" === "upper") {
        text = text.toUpperCase();
      }
      var font = new FontFaceObserver("${coords.playerOne.FontFamily}")
      font.load().then(() => {
            var showPlayer = new fabric.Textbox(text, {
              selectable: false,
              top: ${coords.playerOne.Top},
              left: ${coords.playerOne.Left},
              lineHeight: parseFloat(${coords.playerOne.LineHeight}),
              textAlign: "${coords.playerOne.TextAlign}",
              originX: "${coords.playerOne.OriginX}",
              originY: "top",
              width: ${coords.playerOne.ScaleToWidth},
              fontSize: ${coords.playerOne.FontSize},
              fill: "${coords.playerOne.Fill}",
              className: "player",
              fontFamily: "${coords.playerOne.FontFamily}",
              splitByGrapheme: true,
            });
            if (showPlayer.width > ${coords.playerOne.ScaleToWidth}) {
              showPlayer.scaleToWidth(${coords.playerOne.ScaleToWidth})
            }
            
            if(themeOption){
              themeOption.forEach((theme, i) => {
                if ((theme.color === "${selectedTheme}") || (theme.label === "${selectedTheme}")) {
                  
                  showPlayer.set({
                    fill: theme.Fill
                  })
                }
              })
            }
            showPlayer._textLines.forEach((lines, i) => {
              var width = showPlayer.getLineWidth(i);
      
              while (width > ${coords.playerOne.ScaleToWidth} - 50) {
                var fontSize = showPlayer.get("fontSize");
                showPlayer.set("fontSize", fontSize - 1);
                var newWidth = showPlayer.getLineWidth(i);
                if (newWidth <= ${coords.playerOne.ScaleToWidth} - 50) {
                 fabricCanvas.renderAll();
                  break;
                }
               
              }
            });
            fabricCanvas.add(showPlayer);
            fabricCanvas.renderAll();
          });
      `);
        }
        if (webViewRef.current && selectedPreset && coords.reserveOne) {
      
      webViewRef.current.injectJavaScript(`
      var themeOption = ${JSON.stringify(coords.reserveOne?.themeOption)}
      var array = ${JSON.stringify(selectedPreset.reservePlayers)}
      var text = "";
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "reserve") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
      array.forEach((player, i) => {
        let formatPlayer;
          if ("${coords.reserveOne.Format}" === "NumDotSurName") {
          formatPlayer = (player.number || "") + "." + player.secondName;
        } else if ("${coords.reserveOne.Format}" === "NumSurName") {
          formatPlayer = (player.number || "") + " " + player.secondName;
        } else if ("${coords.reserveOne.Format}" === "dotted") {
          formatPlayer = (player.number || "") + "." + player.firstName[0] + "." + player.secondName;
        } else if ("${coords.reserveOne.Format}" === "oneDot") {
          formatPlayer = (player.number || "") + " " + player.firstName[0] + "." + player.secondName;
        } else {
          formatPlayer = player.secondName;
        }
        if(${currentYear} - Number(player.age) <= 21) {
            formatPlayer += "(m)";
        }
        
        text += formatPlayer + "${coords.reserveOne.Formatter}";
      })

            var reserveText = new fabric.Textbox(text, {
              selectable: false,
              top: ${coords.reserveOne.Top},
              left: ${coords.reserveOne.Left},
              textAlign: "${coords.reserveOne.TextAlign}",
              width: ${coords.reserveOne.ScaleToWidth * 1.1},
              originX: "${coords.reserveOne.OriginX}",
              originY: "${coords.reserveOne.OriginY}",
              fontSize: ${coords.reserveOne.FontSize},
              fill: "${coords.reserveOne.Fill}",
              className: "reserve",
              fontFamily: "${coords.reserveOne.FontFamily}",
            });
            if (reserveText.width > ${coords.reserveOne.ScaleToWidth}) {
              reserveText.scaleToWidth(${coords.reserveOne.ScaleToWidth})
            }
            if(themeOption){
              themeOption.forEach((theme, i) => {
                if ((theme.color === "${selectedTheme}") || (theme.label === "${selectedTheme}")) {
                  reserveText.set({
                    fill: theme.Fill
                  })
                }
              })
            }
            fabricCanvas.add(reserveText);
            fabricCanvas.renderAll();
      `);
    }

    },[selectedPreset, webViewRef, selectedTheme])

  return (
    <View style={{width: "100%"}}>
        {squadPreset?.length > 0 && (
            <View>
        <SelectPicker name={translate.field[language || "en"]} options={squadPreset} onValueChange={(value) => setSelectedPreset(value)} selectedValue={selectedPreset} />
      </View>
        )}
    </View>
  )
}

export default SquadPresetSelect
