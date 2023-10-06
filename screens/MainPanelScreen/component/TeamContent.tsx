import React from 'react';
import { View } from 'react-native';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCollection } from '../../../hooks/useCollection';
import useLanguageContext from '../../../hooks/useLanguageContext';
import useTeamCollection from '../../../hooks/useTeamCollection';
import ItemBlock from '../../components/ItemBlock';
import ItemCenter from '../../components/ItemCenter';
import Title from '../../components/Title';
import translate from "../locales/translate.json";
import { teamDataProps } from './context/DataContext';
import useDataContextProvider from './hooks/useDataContextProvider';
import useModalContextProvider from './hooks/useModalContextProvider';

const TeamContent = () => {
    const { user } = useAuthContext();
    const { language } = useLanguageContext();
    const { documents: Team } = useCollection("Teams", ["uid", "==", user.uid]);
    const { setIsModalOpen } = useModalContextProvider();
    const { setTeamData } = useDataContextProvider();
    const { documents: LicenseTeams } = useTeamCollection("Teams");

    const handlePress = (team: teamDataProps) => {
    setTeamData((prev: teamDataProps) => ({
      ...prev,
      id: team.id,
      firstName: team.firstName,
      secondName: team.secondName,
      sport: team.sport,
      img: team.img,
    }));
    setIsModalOpen(2);
  };

  return (
    <View>
    <View
        style={{ flexDirection: "row", width: "100%", alignItems: "center" }}
      >
        <View>
          <Title
            name={translate.teamPanel[language] || translate.teamPanel["en"]}
          />
        </View>
      </View>
      <ItemCenter>
        {Team?.map((team: teamDataProps) => (
          <ItemBlock
            key={team.id}
            firstName={team.firstName}
            secondName={team.secondName}
            img={team.img}
            onPress={() => handlePress(team)}
          />
        ))}
        {LicenseTeams?.map((team: teamDataProps) => (
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
  )
}

export default TeamContent
