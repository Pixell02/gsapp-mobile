

import { useEffect, useState } from 'react'
import { useCollection } from '../../../hooks/useCollection'

const useCoords = (uid) => {
 const [coords, setCoords] = useState({})
 const {documents: posterCoords} = useCollection("coords", ["uid", "==", uid])
 useEffect(() => {
  if(posterCoords){
  setCoords(posterCoords[0])
  }
 },[uid, posterCoords])


  return {coords}
}

export default useCoords
