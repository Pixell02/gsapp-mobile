import React, { useEffect, useState } from "react";
import { View } from "react-native";
import useLanguageContext from "../../../../../hooks/useLanguageContext";
import Input from "../../../../components/Input";
import useAddText from "../../../hooks/useAddText";
import useThemeOption from "../../../hooks/useThemeOption";
import translate from "../../../locales/translate.json";

const LeagueInput = ({ webViewRef, coords }) => {
  const { language } = useLanguageContext();
  const [typeLeague, setTypeLeague] = useState(null);
  const { selectedTheme } = useThemeOption();
  const { handleAddText } = useAddText(webViewRef);
  useEffect(() => {
    if (webViewRef.current) {
      handleAddText(typeLeague, selectedTheme, "typeLeague", coords.yourLeague);
    }
  }, [typeLeague, selectedTheme]);

  return (
    <View>
      <Input
        name={translate.typeLeague[language] || translate.typeLeague["en"]}
        value={typeLeague}
        onChangeText={(value: string) => setTypeLeague(value)}
      />
    </View>
  );
};

export default LeagueInput;
