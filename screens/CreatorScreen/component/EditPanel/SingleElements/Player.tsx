import React, { useEffect, useState } from "react";
import { View } from "react-native";
import useFetch from "../../../../../hooks/useFetch";
import useLanguageContext from "../../../../../hooks/useLanguageContext";
import RoundedButton from "../../../../components/RoundedButton";
import SelectPicker from "../../../../components/SelectPicker";
import useAddBackround from "../../../hooks/useAddBackround";
import usePlayers from "../../../hooks/usePlayers";
import useThemeOption from "../../../hooks/useThemeOption";
import translate from "../../../locales/translate.json";

const Player = ({ webViewRef, coords, additionalLayer }) => {
  const { language } = useLanguageContext();
  const { selectedTheme } = useThemeOption();
  const {handleAddAdditionalLayer, handleDeActiveObject, handleClickButton} = useAddBackround(webViewRef);
  const { playerOptions, handleAddPlayerName, handleAddPlayerImage } = usePlayers(webViewRef, selectedTheme);
  const [player, setPlayer] = useState(null);
  const {image: playerImage} = useFetch(player?.img);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (webViewRef.current && player && coords.player) {
      handleAddPlayerName(coords, player)
    }
    if (webViewRef.current  && coords.playerImage) {
      handleAddPlayerImage(coords.playerImage, playerImage)
    }
    if(webViewRef.current && additionalLayer) {
     webViewRef.current.injectJavaScript(handleAddAdditionalLayer(additionalLayer));
    }
  }, [player, playerImage, selectedTheme, additionalLayer]);

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
          {!isActive ? (
            <RoundedButton onPress={() => {
            webViewRef.current.injectJavaScript(handleClickButton())
            setIsActive(true);
            }} text="wybierz" />
          ) : (
            <RoundedButton onPress={() => {
            webViewRef.current.injectJavaScript(handleDeActiveObject())
            setIsActive(false);
            }} text="ustaw" />
          )}
          
        </View>
      )}
    </View>
  );
};

export default Player;
