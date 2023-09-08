import React, { useContext } from 'react'
import { SelectedTeamContext } from '../context/selectedTeamContext'

const useSelectedTeamContext = () => {

  const context = useContext(SelectedTeamContext);
  if(!context) {
    throw Error('selectedContext ')
  }

  return context
}

export default useSelectedTeamContext
