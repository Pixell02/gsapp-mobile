import React from "react";
import { View } from "react-native";
import Title from "../../../components/Title";
import translate from "../../locales/translate.json";
import useLanguageContext from "../../../../hooks/useLanguageContext";
import RoundedButton from "../../../components/RoundedButton";
import { useCollection } from "../../../../hooks/useCollection";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import ItemCenter from "../../../components/ItemCenter";
import SlabBlock from "../../../components/SlabBlock";

const SquadPreset = ({ setSquadData, setIsOpen }) => {
  const { language } = useLanguageContext();
  const { user } = useAuthContext();
  const { documents: squadPreset } = useCollection("squadPreset", ["uid", "==", user.uid]);

  const handlePress = (item) => {
    setSquadData(item)
    setIsOpen(4)
  }

  return (
    <View>
      <Title name={translate.squadPreset[language || "en"]} />
      <View style={{ width: "30%", marginLeft: 10 }}>
        <RoundedButton text={translate.addPreset[language || "en"]} onPress={() => setIsOpen(3)} />
      </View>
      <ItemCenter>
        {squadPreset?.map((item, i) => (
          <SlabBlock key={i} place={item.presetName} onPress={() => handlePress(item)} />
        ))}
      </ItemCenter>
    </View>
  );
};

export default SquadPreset;
