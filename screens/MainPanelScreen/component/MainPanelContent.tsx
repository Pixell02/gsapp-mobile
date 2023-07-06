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
import RoundedButton from "../../components/RoundedButton";
import { RootStackParamList } from "../../StartingScreen/type";
import { useNavigation } from "@react-navigation/native";
interface props {
  teamData: object;
  setTeamData: (teamData: object) => void;
  setIsOpen: () => void;
}

export default function MainPanelContent(props: props): JSX.Element {
  const { user } = useAuthContext();
  const { documents: Team } = useCollection("Teams", ["uid", "==", user.uid]);
  const {language} = useContext(LanguageContext);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleNavigate = () => {
    navigation.navigate("GuideScreen")
  }
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
      <View style={{flexDirection:"row", width: "100%", alignItems: "center"}}>
        <View>
      <Title name={(translate.teamPanel[language] || translate.teamPanel["en"])} />
      </View>
      <View style={{marginTop: 10, marginLeft: 20}}>
      <RoundedButton text={(translate.guide[language] || translate.guide["en"])} onPress={() => handleNavigate()} />
      </View>
      </View>
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
