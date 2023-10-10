import React from 'react';
import { View } from 'react-native';
import ItemBlock from '../../../../components/ItemBlock';
import ItemCenter from '../../../../components/ItemCenter';
import TeamPicker from '../../../../components/TeamPicker';
import Title from '../../../../components/Title';
import { useCollection } from '../../../../hooks/useCollection';
import useLanguageContext from '../../../../hooks/useLanguageContext';
import useModalContextProvider from '../../../MainPanelScreen/component/hooks/useModalContextProvider';
import useDataContext from '../../hooks/useDataContext';
import translate from '../../locales/translate.json';

interface props {
  uid: string;
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
   const { setIsModalOpen } = useModalContextProvider();
   const { setPlayerData, selectedValue, setSelectedValue } = useDataContext();
  const { documents: teamPlayers } = useCollection("Players", ["uid", "==", props.uid]);
  const { documents: Teams } = useCollection("Teams", ["uid", "==", props.uid]);
  const handlePress = (player: playerProps) => {
    setPlayerData((prev: playerProps) => ({
      ...prev,
      ...player
    }));
    setIsModalOpen(2);
  };
  return (
    <View>
      <Title name={translate.teamPlayers[language] || translate.teamPlayers["en"]} />
      {Teams && (
        <TeamPicker Teams={Teams} selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
      )}
          <ItemCenter>
              {teamPlayers?.map((player: playerProps, i:number) => (
                <ItemBlock
                key={i}
                firstName={player.firstName}
                secondName={player.secondName}
                img={player.img || null}
                onPress={() => handlePress(player)}
              />
              ))}
          </ItemCenter>
    </View>
  )
}

export default TeamPlayers
