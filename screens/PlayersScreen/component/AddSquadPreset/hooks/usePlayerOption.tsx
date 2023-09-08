import React, { useEffect, useState } from 'react'

const usePlayerOption = (players) => {

  const [option, setOption] = useState([]);

  useEffect(() => {
    const playerOption = players?.map((player) => ({
      label: player.number + " " + player.firstName + " " + player.secondName,
      value: {...player}
    }))
    setOption(playerOption)
  },[players])

  return option
}

export default usePlayerOption
