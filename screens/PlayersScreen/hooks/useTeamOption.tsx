

import React, { useEffect, useState } from 'react'
import { useCollection } from '../../../hooks/useCollection';
import { useAuthContext } from '../../../hooks/useAuthContext';

const useTeamOption = () => {
  const { user } = useAuthContext();
  const [teamOption, setTeamOption] = useState([]);
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  useEffect(() => {
    const option = Teams?.map((team, i) => ({
      id: i,
      label: team.firstName + " " + team.secondName,
      value: team.firstName + " " + team.secondName,
    }))
    
    setTeamOption(option)
  },[Teams])
  
  

  return {teamOption}
}

export default useTeamOption
