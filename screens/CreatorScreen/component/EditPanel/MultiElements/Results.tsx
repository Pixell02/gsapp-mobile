import React from "react";
import { View } from "react-native";
import InputData from "../../../../../components/InputData";
import useLanguageContext from "../../../../../hooks/useLanguageContext";
import translate from "../../../locales/translate.json";
import useResults from "./hooks/useResults";

const Results = ({ webViewRef, coords, selectedMatch }) => {
  const { hostResult, setHostResult, guestResult, setGuestResult } = useResults(webViewRef, coords, selectedMatch);
  const {language} = useLanguageContext();
  return (
    <>
      {(coords.connectedResultsOne || coords.yourTeamResultOne || coords.opponentTeamResultOne) && (
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <View style={{width: "45%"}}>
          <InputData type={"numeric"} name={translate.hostResult[language]} onChangeText={(value) => setHostResult(value)} text={hostResult} />
        </View>
        <View style={{width: "45%"}}>
          <InputData type={"numeric"} name={translate.opponentResult[language]} onChangeText={(value) => setGuestResult(value)} text={guestResult} />
        </View>
        </View>
      )}
    </>
  );
};

export default Results;
