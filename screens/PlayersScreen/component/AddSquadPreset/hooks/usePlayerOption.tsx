import { useEffect, useState } from 'react';
import { playerProps } from '../../../context/DataContext';

const usePlayerOption = (players: playerProps[]) => {

  const [option, setOption] = useState([]);

  useEffect(() => {
    const playerOption = players?.map((player: playerProps) => ({
      label: player.number + " " + player.firstName + " " + player.secondName,
      value: {...player}
    }))
    setOption(playerOption)
  },[players])

  return option
}

export default usePlayerOption
