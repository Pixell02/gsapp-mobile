import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Title from "../../components/Title";
import ItemBlock from "../../components/ItemBlock";
import ItemCenter from "../../components/ItemCenter";
import { ScrollView } from "react-native-gesture-handler";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Picker } from "@react-native-picker/picker";
import useTeamOption from "../hooks/useTeamOption";
import TeamPicker from "../../components/TeamPicker";
import { LanguageContext } from "../../../context/LanguageContext";
import translate from "../locales/translate.json"

interface props {
  playerData: object;
  setPlayerData: (playerData: object) => void;
  setIsOpen: () => void;
  selectedValue?: string;
  setSelectedValue?: (selectedValue) => void;
}

export default function PlayersMainContent(props: props): JSX.Element {
  const { user } = useAuthContext();
  const { documents: players } = useCollection("Players", ["uid", "==", user.uid]);
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const {language} = useContext(LanguageContext)
  const { teamOption } = useTeamOption(Teams);
  useEffect(() => {
    if (teamOption && teamOption.length > 0 && props.selectedValue === "") {
      props.setSelectedValue(teamOption[0].value);
    }
  }, [teamOption]);
  const handlePress = (player) => {
    props.setPlayerData((prev) => ({
      ...prev,
      id: player.id,
      firstName: player.firstName,
      secondName: player.secondName,
      number: player.number ? player.number.toString() : null,
      team: player.team,
      img: player.img,
    }));
    props.setIsOpen();
  };

  return (
    <View>
      <Title name={translate.title[language]} />
      {Teams && (
        <TeamPicker Teams={Teams} selectedValue={props.selectedValue} setSelectedValue={props.setSelectedValue} />
      )}
      <ItemCenter>
        {players &&
          players
            .filter((player) => player.team === props.selectedValue)
            .map((player, index) => (
              <ItemBlock
                key={index}
                firstName={player.firstName}
                secondName={player.secondName}
                img={player.img ? player.img : null}
                onPress={() => handlePress(player)}
              />
            ))}
      </ItemCenter>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    width: "100%",
  }
});
