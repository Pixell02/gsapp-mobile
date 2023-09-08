import React from 'react'
import { useState } from 'react'
import useAddMultiplyImageAndText from './useAddMultiplyImageAndText';

import { useAuthContext } from '../../../../../../hooks/useAuthContext';
import { useEffect } from 'react';
import { useCollection } from '../../../../../../hooks/useCollection';

const useSelectTeams = (fabricRef, coords, selectedMatch) => {

  const { user } = useAuthContext(); 
  const [teamOption, setTeamOption] = useState(null);
  const [properties] = useState({
    Margin: coords.Margin,
    orientation: coords.orientation
  })
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid])
  const { documents: Opponents } = useCollection("Opponents", ["uid", "==", user.uid]);
  const [hostLogo, setHostLogo] = useState(null);
  const [guestLogo, setGuestLogo] = useState(null);
  const [selectedHost, setSelectedHost] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const { handleAddImage, handleAddText } = useAddMultiplyImageAndText(fabricRef, selectedMatch);
  
  useEffect(() => {
    const combinedOptions = [];

    if (Teams?.length) {
      const options = Teams?.map((team) => ({
        label: team.firstName + " " + team.secondName,
        value: team.firstName + "..." + team.secondName + "..." + team.img
      }))
      combinedOptions.push(...options)
    }
    if (Opponents?.length) {
      const options = Opponents?.map((opponent) => ({
        label: opponent.firstName + " " + opponent.secondName,
        value: opponent.firstName + "..." + opponent.secondName + "..." + opponent.img
      }))
      combinedOptions.push(...options)
    }
    setTeamOption(combinedOptions)
  }, [Teams, Opponents])

  useEffect(() => {
    if (selectedHost) {
      fetch(`${selectedHost.split("...")[2]}`)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setHostLogo(reader.result);
        };
      });
    }
  }, [selectedHost])
  useEffect(() => {
    if (selectedGuest) {
      fetch(`${selectedGuest.split("...")[2]}`)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setGuestLogo(reader.result);
        };
      });
    }
  },[selectedGuest])
    console.log(selectedHost)

  useEffect(() => {
    if (coords.yourTeamLogoOne && selectedHost) handleAddImage(coords.yourTeamLogoOne, hostLogo, properties)
    if(coords.yourTeamNameOne && selectedHost) handleAddText(coords.yourTeamNameOne, selectedHost.split("...")[0] + " " + selectedHost.split("...")[1], properties)
   
  }, [selectedHost, coords.yourTeamLogoOne, coords.yourTeamNameOne, handleAddImage, handleAddText, properties])
  
  useEffect(() => {
    if (coords.yourOpponentNameOne && selectedGuest) handleAddText(coords.yourOpponentNameOne, selectedGuest.split("...")[0] + " " + selectedGuest.split("...")[1], properties)
    if(coords.opponentImageOne && selectedGuest) handleAddImage(coords.opponentImageOne, guestLogo, properties)
  }, [selectedGuest, coords.yourOpponentNameOne, coords.opponentImageOne, handleAddImage, handleAddText, properties])
  useEffect(() => {
    if (coords.connectedTeams && (selectedHost || selectedGuest)) handleAddText(coords.connectedTeams, selectedHost.split("...")[0] + selectedHost.split("...")[1] + " - " + selectedGuest.split("...")[0] + " " + selectedGuest.split("...")[1] || null , properties);
  },[coords.connectedTeams, selectedHost, selectedGuest, handleAddText, properties])




  return {teamOption, setSelectedHost, setSelectedGuest, selectedGuest, selectedHost}
}

export default useSelectTeams
