import React from 'react';
import { View } from 'react-native';
import ItemBlock from '../../../../components/ItemBlock';
import ItemCenter from '../../../../components/ItemCenter';
import TeamPicker from '../../../../components/TeamPicker';
import Title from '../../../../components/Title';
import { useCollection } from '../../../../hooks/useCollection';
import useLanguageContext from '../../../../hooks/useLanguageContext';
import translate from '../../locales/translate.json';

interface props {
  uid: string;
  setPlayerData: (value: object) => void;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  setIsOpen: (value: number) => void;
}

interface playerProps {
  id: string;
  firstName: string;
  secondName: string;
  number: string;
  team: string;
  img: string;
}

const TeamPlayers = (props: props) => {

  const { language } = useLanguageContext();
  const { documents: teamPlayers } = useCollection("Players", ["uid", "==", props.uid]);
  const { documents: Teams } = useCollection("Teams", ["uid", "==", props.uid]);
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
    <View>
      <Title name={translate.teamPlayers[language] || translate.teamPlayers["en"]} />
      {Teams && (
        <TeamPicker Teams={Teams} selectedValue={props.selectedValue} setSelectedValue={props.setSelectedValue} />
      )}
          <ItemCenter>
              {teamPlayers?.map((player: playerProps, i:number) => (
                <ItemBlock
                key={i}
                firstName={player.firstName}
                secondName={player.secondName}
                img={player.img ? player.img : null}
                onPress={() => handlePress(player)}
              />
              ))}
          </ItemCenter>
    </View>
  )
}

export default TeamPlayers
