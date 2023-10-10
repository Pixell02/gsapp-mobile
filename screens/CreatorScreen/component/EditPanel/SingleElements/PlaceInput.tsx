import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Input from "../../../../../components/Input";
import SelectPicker from "../../../../../components/SelectPicker";
import useLanguageContext from "../../../../../hooks/useLanguageContext";
import useAddText from "../../../hooks/useAddText";
import usePlacePresetOption from "../../../hooks/usePlacePresetOption";
import useThemeOption from "../../../hooks/useThemeOption";
import translate from "../../../locales/translate.json";
const PlaceInput = ({ webViewRef, coords }) => {
  const { language } = useLanguageContext();
  const [typePlace, setTypePlace] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState(null);
  const { selectedTheme } = useThemeOption();
  const { placePreset } = usePlacePresetOption();
  const { handleAddText } = useAddText(webViewRef);
  useEffect(() => {
    if (webViewRef.current) {
      handleAddText(typePlace, selectedTheme, "typePlace", coords.typePlace);
    }
  }, [typePlace, selectedTheme]);
  

  return (
    <View>
      <Input
        name={translate.typePlace[language] || translate.typePlace["en"]}
        value={typePlace}
        onChangeText={(value: string) => setTypePlace(value)}
      />
      {placePreset?.length > 0 && (
        <View>
          <SelectPicker
            name={translate.field[language || "en"]}
            options={placePreset}
            onValueChange={(value) => setSelectedOption(value)}
            selectedValue={selectedOption}
          />
        </View>
      )}
    </View>
  );
};

export default PlaceInput;
