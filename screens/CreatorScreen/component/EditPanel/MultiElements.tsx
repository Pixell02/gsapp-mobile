import React from "react";
import { Text, View } from "react-native";
import YourTeams from "./MultiElements/YourTeams";
import SelectLeagueTeams from "./MultiElements/SelectLeagueTeams";
import SelectTeams from "./MultiElements/SelectTeams";
import Results from "./MultiElements/Results";
import UniversalTextLayer from "./MultiElements/UniversalTextLayer";
import UniversalNumberLayer from "./MultiElements/UniversalNumberLayer";
import useProperties from "./MultiElements/hooks/useProperties";
import useLanguageContext from "../../../../hooks/useLanguageContext";
import translate from "../../locales/translate.json"

const MultiElements = ({ webViewRef, coords, selectedMatch }) => {
  const {properties} = useProperties(coords);
  const {language} = useLanguageContext();
  return (
    <View style={{ width: "100%" }}>
      <View style={{ width: "100%", marginTop: 10, alignContent: "flex-start", justifyContent: "flex-start" }}>
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>{translate.match[language]} {selectedMatch}</Text>
      </View>
      {(coords.yourTeamLogoOne || coords.yourTeamNameOne) &&
        (!coords.yourOpponentNameOne || !coords.opponentImageOne) && (
          <YourTeams webViewRef={webViewRef} coords={coords} selectedMatch={selectedMatch} />
        )}
      {(!coords.yourTeamLogoOne && !coords.yourTeamNameOne) &&
        (coords.yourOpponentNameOne || coords.opponentImageOne) && (
          <SelectLeagueTeams webViewRef={webViewRef} coords={coords} selectedMatch={selectedMatch} />
        )}
      {(coords.yourTeamLogoOne || coords.yourTeamNameOne) &&
        (coords.yourOpponentNameOne || coords.opponentImageOne) && (
          <SelectTeams webViewRef={webViewRef} coords={coords} selectedMatch={selectedMatch} />
        )}
      {coords.connectedTeams &&  <SelectTeams webViewRef={webViewRef} coords={coords} selectedMatch={selectedMatch} />}
      <Results webViewRef={webViewRef} coords={coords} selectedMatch={selectedMatch} />
      {coords?.TextOne?.map((item, i) => (
        <UniversalTextLayer key={i} webViewRef={webViewRef} properties={properties} coords={item} selectedMatch={selectedMatch} />
      ))}
      {coords?.NumberOne?.map((item, i) => (
        <UniversalNumberLayer key={i} webViewRef={webViewRef} properties={properties} coords={item} selectedMatch={selectedMatch} />  
      ))}
    </View>
  );
};

export default MultiElements;
