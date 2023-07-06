import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, BackHandler, Alert } from "react-native";
import Title from "../../components/Title";
import ItemBlock from "../../components/ItemBlock";
import { StackNavigationProp } from "@react-navigation/stack";
import ItemCenter from "../../components/ItemCenter";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import translate from "../locales/translate.json"
import { LanguageContext } from "../../../context/LanguageContext";
interface props {
  teamData: object;
  setTeamData: (teamData: object) => void;
  setIsOpen: () => void;
}

export default function MainPanelContent(props: props): JSX.Element {
  const { user } = useAuthContext();
  const { documents: Team } = useCollection("Teams", ["uid", "==", user.uid]);
  const {language} = useContext(LanguageContext)
  const handlePress = (team) => {
    props.setTeamData(prev => ({
      ...prev,
      id: team.id,
      firstName: team.firstName,
      secondName: team.secondName,
      sport: team.sport,
      img: team.img
    }))
    props.setIsOpen();
  }

  return (
    <View>
      <Title name={(translate.teamPanel[language] || translate.teamPanel["en"])} />
      <ItemCenter>
        {Team &&
          Team.map((team) => (
            <ItemBlock
              key={team.id}
              firstName={team.firstName}
              secondName={team.secondName}
              img={team.img}
              onPress={() => handlePress(team)}
            />
          ))}
      </ItemCenter>
    </View>
  );
}
