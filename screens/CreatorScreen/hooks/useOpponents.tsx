import React, { useEffect, useState } from 'react'
import { useCollection } from '../../../hooks/useCollection'
import { useAuthContext } from '../../../hooks/useAuthContext'


const useOpponents = () => {
  const {user} = useAuthContext();
  const [opponentSelect, setOpponentSelect] = useState(null);
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const {documents: Opponents} = useCollection("Opponents", ["uid","==", user.uid])
  
  useEffect(() => {
    
    if(Opponents) {
      const options = Opponents.map((opponent) => ({
        firstName: opponent.firstName,
        secondName: opponent.secondName,
        img: opponent.img
      }))
      setOpponentSelect(options)
    }

  },[Opponents])

  const handleFetchOpponent = (opponents: any) => {
    
    if(opponents.split("...")[2]){
      
    fetch(opponents.split("...")[2])
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setSelectedOpponent(prev => ({
            ...prev,
            img: reader.result,
            firstName: opponents.split("...")[0],
            secondName: opponents.split("...")[1],
            value: opponents
          }))
        }
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      if(opponents !== " "){
      setSelectedOpponent(prev => ({
        ...prev,
        img: null,
        firstName: opponents.split("...")[0],
        secondName: opponents.split("...")[1],
        value: opponents
      }))
    } else {
      setSelectedOpponent(prev => ({
        ...prev,
        img: " ",
        firstName: " ",
        secondName: " ",
        value: " "
      }))
    }
    }
  }

  return {opponentSelect, selectedOpponent, handleFetchOpponent}
}

export default useOpponents
