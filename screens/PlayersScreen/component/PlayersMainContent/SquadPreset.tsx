import React from "react";
import { View } from "react-native";
import ItemCenter from "../../../../components/ItemCenter";
import RoundedButton from "../../../../components/RoundedButton";
import SlabBlock from "../../../../components/SlabBlock";
import Title from "../../../../components/Title";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useCollection } from "../../../../hooks/useCollection";
import useLanguageContext from "../../../../hooks/useLanguageContext";
import useModalContextProvider from "../../../MainPanelScreen/component/hooks/useModalContextProvider";
import useDataContext from "../../hooks/useDataContext";
import translate from "../../locales/translate.json";

interface squadPresetProps {
  presetName: string;
}

const SquadPreset = () => {
  const { language } = useLanguageContext();
  const { user } = useAuthContext();
  const { setIsModalOpen } = useModalContextProvider();
  const { setSquadData } = useDataContext();
  const { documents: squadPreset } = useCollection("squadPreset", ["uid", "==", user.uid]);

  const handlePress = (item: squadPresetProps) => {
    setSquadData((prev: squadPresetProps) => ({...prev, ...item}));
    setIsModalOpen(4);
  };

  return (
    <View>
      <Title name={translate.squadPreset[language || "en"]} />
      <View style={{ width: "30%", marginLeft: 10 }}>
        <RoundedButton text={translate.addPreset[language || "en"]} onPress={() => setIsModalOpen(3)} />
      </View>
      <ItemCenter>
        {squadPreset?.map((item: squadPresetProps, i: string) => (
          <SlabBlock key={i} place={item.presetName} onPress={() => handlePress(item)} />
        ))}
      </ItemCenter>
    </View>
  );
};

export default SquadPreset;
