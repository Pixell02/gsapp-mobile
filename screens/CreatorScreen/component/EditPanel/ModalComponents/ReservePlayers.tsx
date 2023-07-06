import React, { useContext, useEffect } from 'react'
import { Image, Text, View } from 'react-native'
import Header from './components/Header'
import translate from "../../../locales/translate.json"
import { LanguageContext } from '../../../../../context/LanguageContext'
import { useAuthContext } from '../../../../../hooks/useAuthContext'
import { useCollection } from '../../../../../hooks/useCollection'
import { CheckBox } from 'react-native-elements'
import { SelectedTeamContext } from '../../../context/selectedTeamContext'
import { ThemeOptionContext } from '../../../context/themeOptionContext'

const ReservePlayers = ({goalkeeper, capitan, coords, webViewRef}) => {

  const { user } = useAuthContext()
  const {language} = useContext(LanguageContext)
  const { selectedTheme } = useContext(ThemeOptionContext);
  const {reservePlayers, selectedReserve, handleReserveChecked} = useContext(SelectedTeamContext)
  
  useEffect(() => {
    if (webViewRef.current && selectedReserve) {
      
      webViewRef.current.injectJavaScript(`
      var themeOption = ${JSON.stringify(coords.reserveOne.themeOption)}
      var array = ${JSON.stringify(selectedReserve)}
      var text = "";
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "reserve") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
      array.forEach((player, i) => {
        let formatPlayer;
          if ("${coords.playerOne.format}" === "NumDotSurName") {
          formatPlayer = (player.number || "") + "." + player.secondName;
        } else if ("${coords.playerOne.format}" === "NumSurName") {
          formatPlayer = (player.number || "") + " " + player.secondName;
        } else if ("${coords.playerOne.format}" === "dotted") {
          formatPlayer = (player.number || "") + "." + player.firstName[0] + "." + player.secondName;
        } else if ("${coords.playerOne.format}" === "oneDot") {
          formatPlayer = (player.number || "") + " " + player.firstName[0] + "." + player.secondName;
        } else {
          formatPlayer = player.secondName;
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
                  showPlayer.set({
                    fill: theme.Fill
                  })
                }
              })
            }
            fabricCanvas.add(reserveText);
            fabricCanvas.renderAll();
      `);
    }
  }, [selectedReserve, selectedTheme]);
  
  return (
    <View style={{width: "100%"}}>
      <Header title={translate.addReserve[language]} />
      <View style={{ marginLeft: 20 }}>
        {!reservePlayers ? (
          <Text>{translate.noPlayers[language]}</Text>
        ) : (
          <View>
            {reservePlayers &&
              reservePlayers.map((player, i) => (
                <View key={i} style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: "70%" }}>
                    <CheckBox 
                    checked={selectedReserve.some(
                      (selectedReserve: any) =>
                        selectedReserve.firstName === player.firstName &&
                        selectedReserve.secondName === player.secondName &&
                        selectedReserve.number === player.number
                    )} 
                    title={player.firstName + " " + player.secondName} 
                    onPress={() => handleReserveChecked(player)}
                    />
                    
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    {player.img && (
                      <Image
                        source={{ uri: player.img }}
                        style={{ width: 30, flex: 1, resizeMode: "contain", maxHeight: 30 }}
                      />
                    )}
                  </View>
                </View>
              ))}
          </View>
        )}
      </View>
    </View>
  )
}

export default ReservePlayers
