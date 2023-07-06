import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import Title from "../../components/Title";
import ItemCenter from "../../components/ItemCenter";
import ItemBlock from "../../components/ItemBlock";
import { ScrollView } from "react-native-gesture-handler";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import AddBtn from "../../components/AddBtn";
import TeamPicker from "../../components/TeamPicker";
import { LanguageContext } from "../../../context/LanguageContext";
import translate from "../locales/translate.json"
import useTeamOption from "../../PlayersScreen/hooks/useTeamOption";

export default function OpponentsContent(props): JSX.Element {
  const { user } = useAuthContext();
  const {language} = useContext(LanguageContext)
  const { documents: opponents } = useCollection("Opponents", ["uid", "==", user.uid]);
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const { teamOption } = useTeamOption(Teams);
  const handlePress = (opponent) => {
    props.setOpponentData((prev) => ({
      ...prev,
      id: opponent.id,
      firstName: opponent.firstName,
      secondName: opponent.secondName,
      team: opponent.team,
      img: opponent.img,
    }));
    props.setIsOpen();
  };
  useEffect(() => {
    if (teamOption && teamOption.length > 0 && props.selectedValue === "") {
      props.setSelectedValue(teamOption[0].value);
    }
  }, [teamOption]);
  return (
    <View>
      <Title name={translate.title[language]} />
      {Teams && (
        <TeamPicker Teams={Teams} selectedValue={props.selectedValue} setSelectedValue={props.setSelectedValue} />
      )}
      <ItemCenter>
        {opponents &&
          opponents
            .filter((opponent) => opponent.team === props.selectedValue)
            .map((opponent, index) => (
              <ItemBlock
                key={index}
                firstName={opponent.firstName}
                secondName={opponent.secondName}
                img={opponent.img}
                onPress={() => handlePress(opponent)}
              />
            ))}
      </ItemCenter>
    </View>
  );
}
