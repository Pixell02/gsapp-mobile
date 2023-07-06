import React, { useContext } from "react";
import { Text, View } from "react-native";
import translate from "../../locales/translate.json"
import { LanguageContext } from "../../../../context/LanguageContext";

const FreeLicenseInformation = ({ license }) => {
  console.log(license)
  const {language} = useContext(LanguageContext)
  return (
    <View style={{ height: 20, backgroundColor: "#D9dede", width: "100%", alignItems: "center" }}>
      {license && license.license === "free-trial" && <Text>{translate.freeUsesFirstPart[language] + " " + license.numberOfFreeUse + " " + translate.freeUsesLastPart[language]}</Text>}
    </View>
  );
};

export default FreeLicenseInformation;
