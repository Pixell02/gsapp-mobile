

import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCollection } from '../../../hooks/useCollection';

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
  useEffect(() => {
    const option = Teams?.map((team: TeamProps, i: string) => ({
      id: i,
      label: team.firstName + " " + team.secondName,
      value: team.firstName + " " + team.secondName,
    }))
    
    setTeamOption(option)
  },[Teams])
  
  

  return {teamOption}
}

export default useTeamOption
