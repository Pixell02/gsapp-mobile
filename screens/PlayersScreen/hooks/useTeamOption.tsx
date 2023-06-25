

import React, { useEffect, useState } from 'react'

const useTeamOption = (Teams) => {

  const [teamOption, setTeamOption] = useState([]);

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
