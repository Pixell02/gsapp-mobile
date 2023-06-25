import React, { useEffect } from 'react'
import { YourTeamNameAndLogo } from '../../hooks2/useYourTeamLogo';
import { useCollection } from '../../../../hooks/useCollection';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import teamLogo from './TeamOption/teamLogo';
import { useContext } from 'react';
import radioContext from '../../context/radioContext';
import teamFullName from './TeamOption/teamFullName';
import teamFirstName from './TeamOption/teamFirstName';
import teamSecondName from './TeamOption/teamSecondName';


export default function TeamOption({ fabricRef, coords, themeOption, posterBackground }) {
  
  const { user } = useAuthContext();
  const { documents: Logo } = useCollection("Teams", ["uid", "==", user.uid]);
  const { radioChecked } = useContext(radioContext)

  const [yourTeam, teamOption, getTeamOption, yourLogo, yourName] = YourTeamNameAndLogo(Logo);
  
  useEffect(() => {
    if (fabricRef.current && posterBackground) {
      teamLogo(fabricRef, yourLogo, coords, themeOption, radioChecked)
    }
  }, [fabricRef.current, posterBackground, yourLogo, radioChecked])
  useEffect(() => {
    if (fabricRef.current && posterBackground && yourName) {
      if (coords.yourTeamName) {
        teamFullName(fabricRef, yourName, coords, themeOption, radioChecked)
      } 
      if (coords.yourTeamFirstName) {
        teamFirstName(fabricRef, yourName, coords, themeOption, radioChecked)
      }
      if (coords.yourTeamSecondName) {
        teamSecondName(fabricRef, yourName, coords, themeOption, radioChecked)
       }
    }
  }, [fabricRef.current, posterBackground, yourName, radioChecked])
  
  return (
    <div>
      {teamOption && teamOption.length > 1 && (
                <>
                  <label>Twoje drużyny</label>
                  {/* <Select options={teamOption} onChange={getTeamOption} /> */}
                </>
              )}
    </div>
  )
}
