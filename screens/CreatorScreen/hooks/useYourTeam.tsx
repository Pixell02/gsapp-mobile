

import React, { useEffect, useState } from 'react'
import { useCollection } from '../../../hooks/useCollection';
import { useAuthContext } from '../../../hooks/useAuthContext';

const useYourTeam = () => {
  const { user } = useAuthContext();
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const [yourTeams, setYourTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  useEffect(() => {
    if(Teams && Teams.length > 0) {
      
      const teamOption = Teams.map((team: any) => ({
        firstName: team.firstName,
        secondName: team.secondName,
        img: team.img
      }));
      setYourTeams(teamOption);
    }
  },[Teams])

  const handleSelectTeam = (team: any) => {
    if(team.split("...")[2]){
    fetch(team.split("...")[2])
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setSelectedTeam(prev => ({
            ...prev,
            img: reader.result
          }))
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
    if(team !== " "){
    setSelectedTeam(prev => ({
      ...prev,
      img: null,
      firstName: team.split("...")[0],
      secondName: team.split("...")[1],
      value: team
    }))
  } else {
    setSelectedTeam(prev => ({
      ...prev,
      img: " ",
      firstName: " ",
      secondName: " ",
      value: " "
    }))
  }
  }

  return {yourTeams ,selectedTeam, handleSelectTeam}

}

export default useYourTeam
