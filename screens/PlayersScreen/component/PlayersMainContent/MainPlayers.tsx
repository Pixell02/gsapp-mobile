import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import Title from "../../../components/Title";
import { useCollection } from "../../../../hooks/useCollection";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { LanguageContext } from "../../../../context/LanguageContext";
import useTeamOption from "../../hooks/useTeamOption";
import translate from "../../locales/translate.json";
import ItemCenter from "../../../components/ItemCenter";
import TeamPicker from "../../../components/TeamPicker";
import ItemBlock from "../../../components/ItemBlock";

interface playerProps {
  id: string;
  firstName: string;
  secondName: string;
  number: string | null;
  team: string;
  img: string;
}
interface props {
  setPlayerData: (value: object) => void;
  setIsOpen: (value: number) => void;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const MainPlayers = (props: props) => {
  const { user } = useAuthContext();
  const { documents: players } = useCollection("Players", ["uid", "==", user.uid]);
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const { language } = useContext(LanguageContext);
  const { teamOption } = useTeamOption();
  useEffect(() => {
    if (teamOption && teamOption.length > 0) {
      props.setSelectedValue(teamOption[0].value);
    }
  }, [teamOption]);

  const handlePress = (player: playerProps) => {
    props.setPlayerData((prev: playerProps) => ({
      ...prev,
      id: player.id,
      firstName: player.firstName,
      secondName: player.secondName,
      number: player.number ? player.number.toString() : null,
      team: player.team,
      img: player.img,
    }));
    props.setIsOpen(2);
  };

  return (
    <>
      <Title name={translate.title[language] || translate.title["en"]} />
      {Teams && (
        <TeamPicker Teams={Teams} selectedValue={props.selectedValue} setSelectedValue={props.setSelectedValue} />
      )}
      <ItemCenter>
        {players
          ?.filter((player: playerProps) => player.team === props.selectedValue)
          .map((player: playerProps, i: number) => (
            <ItemBlock
              key={i}
              firstName={player.firstName}
              secondName={player.secondName}
              img={player.img ? player.img : null}
              onPress={() => handlePress(player)}
            />
          ))}
      </ItemCenter>
    </>
  );
};

export default MainPlayers;
