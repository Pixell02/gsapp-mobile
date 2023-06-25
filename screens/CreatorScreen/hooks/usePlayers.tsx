import React, { useEffect, useState } from 'react'
import { useCollection } from '../../../hooks/useCollection'
import { useAuthContext } from '../../../hooks/useAuthContext'

const usePlayers = () => {

  const { user } = useAuthContext()
  const {documents: Players} = useCollection("Players", ["uid", "==", user.uid])
  const [playerOptions, setPlayerOptions] = useState(null);

  useEffect(() => {
    const options = Players?.map((player, i) => ({
      label: player.firstName + " " + player.secondName,
      value: player.firstName + "..." + player.secondName + "..." + player.img
    }));
    setPlayerOptions(options);

  },[Players])

  return {playerOptions}
}

export default usePlayers
