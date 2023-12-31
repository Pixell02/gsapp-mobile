import React, { useContext, useEffect } from "react";
import { Image, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import useLanguageContext from "../../../../../hooks/useLanguageContext";
import { ThemeOptionContext } from "../../../context/themeOptionContext";
import useSelectedTeamContext from "../../../hooks/useSelectedTeamContext";
import translate from "../../../locales/translate.json";
import PlayersRoles from "./PlayersRoles";
import Header from "./components/Header";

const SquadPlayers = ({isModalOpen, webViewRef, goalkeeper, setGoalkeeper, capitan, setCapitan, coords }) => {

  const { language } = useLanguageContext();
  const { selectedTheme } = useContext(ThemeOptionContext);
  const { Players, selectedPlayers, handlePlayerChecked } = useSelectedTeamContext();
  
  useEffect(() => {
    if (webViewRef.current && selectedPlayers && coords.playerOne) {
      webViewRef.current.injectJavaScript(`
      var array = ${JSON.stringify(selectedPlayers)}
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
        if("${goalkeeper?.firstName + " " + goalkeeper?.secondName}" === player.firstName + " " + player.secondName) {
          formatPlayer += " (gk)";
        }
        if("${capitan?.firstName + " " + capitan?.secondName}" === player.firstName + " " + player.secondName) {
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
  }, [selectedPlayers, goalkeeper, capitan, selectedTheme]);
  return (
    <View style={{ width: "100%" }}>
      {isModalOpen.type === "squadPlayers" && (
        <>
      <Header title={translate.players[language]} />
        <View style={{ marginLeft: 20 }}>
        {!Players ? (
          <Text>{translate.noPlayers[language]}</Text>
        ) : (
          <View>
            {Players?.map((player, i) => (
                <View key={i} style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: "70%" }}>
                    <CheckBox
                      checked={selectedPlayers.some(
                        (selectedPlayer: any) =>
                          selectedPlayer.firstName === player.firstName &&
                          selectedPlayer.secondName === player.secondName &&
                          selectedPlayer.number === player.number
                      )}
                      title={player.firstName + " " + player.secondName}
                      onPress={() => handlePlayerChecked(player)}
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
      </>
      )}
      {isModalOpen.type === "PlayersRoles" && (
        <PlayersRoles capitan={capitan} webViewRef={webViewRef} selectedTheme={selectedTheme} setCapitan={setCapitan} setGoalkeeper={setGoalkeeper} goalkeeper={goalkeeper} />
      )}
      
    </View>
  );
};

export default SquadPlayers;
