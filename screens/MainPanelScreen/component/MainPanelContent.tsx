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
import { Button } from "react-native-paper";
interface props {
  teamData: object;
  setTeamData: (teamData: object) => void;
  setIsOpen: () => void;
  trainerData: object;
  setTrainerData: any;
  isTrainerOpen: boolean;
  setIsTrainerOpen: any;
  isEditTrainerOpen: boolean;
  setIsEditTrainerOpen: any;
}

export default function MainPanelContent(props: props): JSX.Element {
  console.log(props)
  const { user } = useAuthContext();
  const { documents: Team } = useCollection("Teams", ["uid", "==", user.uid]);
  const {documents: Trainers} = useCollection("Trainers", ["uid", "==", user.uid]);
  const {language} = useContext(LanguageContext);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleNavigate = () => {
    navigation.navigate("GuideScreen")
  }
  const handleTrainerOpen = () => {
    props.setIsTrainerOpen();
  }
  const handleTrainerPress = (trainer: any) => {
    props.setTrainerData((prev: any) => ({
      ...prev,
      id: trainer.id,
      firstName: trainer.firstName,
      secondName: trainer.secondName,

    }))
    props.setIsEditTrainerOpen(true);
  }
  const handlePress = (team: any) => {
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
      <Title name={translate.coach[language] || translate.coach["en"]} />
      <Button style={{backgroundColor: "black", borderRadius: 0, width: 150, marginLeft: 10}} onPress={() => handleTrainerOpen()}>
        <Text style={{color: "white", fontFamily: "Poppins-SemiBold"}}>{translate.addTrainer[language] || translate.addTrainer["en"]}</Text>
        </Button>
        <ItemCenter>
          {Trainers?.map((trainer: any) => (
            <ItemBlock 
            key={trainer.id}
            firstName={trainer.firstName}
            secondName={trainer.secondName}
            img={trainer.img}
            onPress={() => handleTrainerPress(trainer)}
            />
          ))}
        </ItemCenter>
    </View>
  );
}
