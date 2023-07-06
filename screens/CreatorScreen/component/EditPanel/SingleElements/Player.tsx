import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import usePlayers from "../../../hooks/usePlayers";
import { LanguageContext } from "../../../../../context/LanguageContext";
import SelectPicker from "../../../../components/SelectPicker";
import translate from "../../../locales/translate.json";
import { ThemeOptionContext } from "../../../context/themeOptionContext";

const Player = ({ webViewRef, coords }) => {
  const { language } = useContext(LanguageContext);
  const { playerOptions } = usePlayers();
  const [player, setPlayer] = useState(null);
  const { selectedTheme } = useContext(ThemeOptionContext);
  useEffect(() => {
    if (webViewRef.current && player && coords.player) {
      webViewRef.current.injectJavaScript(`
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "yourPlayer") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
      var formatPlayer = "";
      if ("${coords.player.format}" === "dotted") {
        formatPlayer = "${player.split("...")[0][0]}" + "." + "${player.split("...")[1]}";
      } else if ("${coords.player.format}" === "nameSurName") {
        formatPlayer = "${player.split("...")[0]}" + " " +"${player.split("...")[1]}";
      } else {
        formatPlayer = "${player.split("...")[1]}";
      }
      var font = new FontFaceObserver("${coords.player.FontFamily}");
      font.load().then(() => {
        var playerName = new fabric.Text(formatPlayer, {
          left: ${coords.player.Left},
          top: ${coords.player.Top},
          fill: "${coords.player.Fill}",
          originX: "${coords.player.OriginX}",
          originY: "${coords.player.OriginY}",
          className: "yourPlayer",
          selectable: false,
          fontFamily: "${coords.player.FontFamily}",
          fontSize: ${coords.player.FontSize},
        })
        if (playerName.width > ${coords.player.ScaleToWidth}) {
          playerName.scaleToWidth(${coords.player.ScaleToWidth});
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
        fabricCanvas.add(playerName);
    fabricCanvas.renderAll();
      })
      `);
    }
  }, [player]);

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <SelectPicker
        options={playerOptions}
        name={translate.player[language]}
        selectedValue={player}
        onValueChange={(value) => setPlayer(value)}
      />
    </View>
  );
};

export default Player;
