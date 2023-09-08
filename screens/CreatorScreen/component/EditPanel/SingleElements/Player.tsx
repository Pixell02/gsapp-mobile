import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { LanguageContext } from "../../../../../context/LanguageContext";
import useFetch from "../../../../../hooks/useFetch";
import SelectPicker from "../../../../components/SelectPicker";
import { ThemeOptionContext } from "../../../context/themeOptionContext";
import usePlayers from "../../../hooks/usePlayers";
import translate from "../../../locales/translate.json";

const Player = ({ webViewRef, coords }) => {
  const { language } = useContext(LanguageContext);
  const { selectedTheme } = useContext(ThemeOptionContext);
  const { playerOptions, handleAddPlayerName, handleAddPlayerImage } = usePlayers(webViewRef, selectedTheme);
  const [player, setPlayer] = useState(null);
  const {image: playerImage} = useFetch(player?.img);
  useEffect(() => {
    if (webViewRef.current && coords.player) {
      handleAddPlayerName(coords, player)
    }
    if (webViewRef.current && coords.playerImage) {
      handleAddPlayerImage(coords.playerImage, playerImage)
    }
  }, [player, selectedTheme]);

  return (
    <View style={{ width: "100%"}}>
      <SelectPicker
        options={playerOptions}
        name={translate.player[language] || translate.player["en"]}
        selectedValue={player}
        onValueChange={(value) => setPlayer(value)}
      />
      {coords?.playerImage && playerImage && (
        <View>
          
        </View>
      )}
    </View>
  );
};

export default Player;
