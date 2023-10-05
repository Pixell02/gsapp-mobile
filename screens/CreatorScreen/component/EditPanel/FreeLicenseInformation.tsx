import React from "react";
import { Text, View } from "react-native";
import useLanguageContext from "../../../../hooks/useLanguageContext";
import translate from "../../locales/translate.json";

const FreeLicenseInformation = ({ license }) => {
  const {language} = useLanguageContext()
  return (
    <View style={{ height: 20, backgroundColor: "#D9dede", width: "100%", alignItems: "center" }}>
      {license && license.license === "free-trial" && <Text>{translate.freeUsesFirstPart[language] + " " + license.numberOfFreeUse + " " + translate.freeUsesLastPart[language]}</Text>}
    </View>
  );
};

export default FreeLicenseInformation;
