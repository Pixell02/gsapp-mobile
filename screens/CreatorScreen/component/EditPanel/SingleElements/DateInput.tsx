import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Input from "../../../../../components/Input";
import useLanguageContext from "../../../../../hooks/useLanguageContext";
import useAddText from "../../../hooks/useAddText";
import useThemeOption from "../../../hooks/useThemeOption";
import translate from "../../../locales/translate.json";

const DateInput = ({ webViewRef, coords }) => {
  const { language } = useLanguageContext();
  const { selectedTheme } = useThemeOption();
  const [typeDate, setTypeDate] = useState(null);
  const { handleAddText } = useAddText(webViewRef);
  useEffect(() => {
    if (webViewRef.current) {
      handleAddText(typeDate, selectedTheme, "typeDate", coords.typeData);
    }
  }, [typeDate, selectedTheme]);

  return (
    <View style={{ width: "100%" }}>
      <Input
        name={translate.typeDate[language] || translate.typeDate["en"]}
        value={typeDate}
        onChangeText={(value: string) => setTypeDate(value)}
      />
    </View>
  );
};

export default DateInput;
