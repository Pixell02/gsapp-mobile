import React, { useEffect } from "react";
import { View } from "react-native";
import Title from "../../../components/Title";
import ItemCenter from "../../../components/ItemCenter";
import ItemBlock from "../../../components/ItemBlock";
import { useCollection } from "../../../../hooks/useCollection";
import TeamPicker from "../../../components/TeamPicker";
import translate from "../../locales/translate.json";
import useTeamOption from "../../../PlayersScreen/hooks/useTeamOption";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import useLanguageContext from "../../../../hooks/useLanguageContext";

interface props {
  setOpponentData: (value: object) => void;
  setSelectedValue: (value: string) => void;
  selectedValue: string;
  setIsOpen: (value: number) => void
}

const MainOpponent = (props: props) => {
  const { user } = useAuthContext();
  const { language } = useLanguageContext();
  const { documents: opponents } = useCollection("Opponents", ["uid", "==", user.uid]);
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const { teamOption } = useTeamOption();
  const handlePress = (opponent) => {
    props.setOpponentData((prev) => ({
      ...prev,
      id: opponent.id,
      firstName: opponent.firstName,
      secondName: opponent.secondName,
      team: opponent.team,
      img: opponent.img,
    }));
    props.setIsOpen(2);
  };
  useEffect(() => {
    if (teamOption && teamOption.length > 0) {
      props.setSelectedValue(teamOption[0].value);
    }
  }, [teamOption]);
  return (
    <View>
      <Title name={translate.title[language] || translate.title["en"]} />
      {Teams && (
        <TeamPicker Teams={Teams} selectedValue={props.selectedValue} setSelectedValue={props.setSelectedValue} />
      )}
      <ItemCenter>
        {opponents
          ?.filter((opponent) => opponent.team === props.selectedValue)
          .map((opponent, i) => (
            <ItemBlock
              key={i}
              firstName={opponent.firstName}
              secondName={opponent.secondName}
              img={opponent.img}
              onPress={() => handlePress(opponent)}
            />
          ))}
      </ItemCenter>
    </View>
  );
};

export default MainOpponent;
