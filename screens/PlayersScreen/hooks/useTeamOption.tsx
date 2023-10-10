

import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCollection } from '../../../hooks/useCollection';
import useDataContext from './useDataContext';

interface TeamProps {
  firstName: string;
  secondName: string;
}
interface optionProps {
  label: string;
  value: string;
}

const useTeamOption = () => {
  const { user } = useAuthContext();
  const [teamOption, setTeamOption] = useState<optionProps[]>([]);
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const { setSelectedValue } = useDataContext();
  useEffect(() => {
    const option = Teams?.map((team: TeamProps, i: string) => ({
      id: i,
      label: team.firstName + " " + team.secondName,
      value: team.firstName + " " + team.secondName,
    }))
    
    setTeamOption(option)
  },[Teams])
useEffect(() => {
  if (teamOption && teamOption.length > 0) {
    setSelectedValue(teamOption[0].value);
  }
}, [teamOption]);  
  

  return {teamOption}
}

export default useTeamOption
