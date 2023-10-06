import React, { useEffect, useState } from "react";
import { View } from "react-native";
import useLanguageContext from "../../../../../hooks/useLanguageContext";
import InputData from "../../../../components/InputData";
import useAddText from "../../../hooks/useAddText";
import useThemeOption from "../../../hooks/useThemeOption";
import translate from "../../../locales/translate.json";

const Result = ({ webViewRef, coords }) => {
  const { language } = useLanguageContext();
  const { selectedTheme } = useThemeOption();
  const [yourResult, setYourResult] = useState<string>("");
  const [opponentResult, setOpponentResult] = useState<string>("");
  const { handleAddText } = useAddText(webViewRef);
  useEffect(() => {
    if (webViewRef.current) {
      handleAddText(yourResult, selectedTheme, "yourResult", coords.yourTeamResult);
    }
  }, [yourResult, selectedTheme]);

  useEffect(() => {
    if (webViewRef.current) {
      handleAddText(opponentResult, selectedTheme, "opponentResult", coords.yourOpponentResult);
    }
  }, [opponentResult, selectedTheme]);

  

  return (
    <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
      <View style={{ width: "48%" }}>
        <InputData
          type="numeric"
          name={translate.hostResult[language] || translate.hostResult["en"]}
          text={yourResult}
          onChangeText={(value) => setYourResult(value)}
        />
      </View>
      <View style={{ width: "48%" }}>
        <InputData
          type="numeric"
          name={translate.opponentResult[language] || translate.opponentResult["en"]}
          text={opponentResult}
          onChangeText={(value) => setOpponentResult(value)}
        />
      </View>
    </View>
  );
};

export default Result;
