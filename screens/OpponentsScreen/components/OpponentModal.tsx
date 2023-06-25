import React from 'react'
import {View} from 'react-native'
import AddOpponent from './AddOpponent'
import EditOpponent from './EditOpponent'
export default function OpponentModal({ isOpen, setIsOpen, opponentData, setOpponentData, isEditOpen, setIsEditOpen }) {
  return (
    <>
      {isOpen && (<AddOpponent  isOpen={isOpen} setIsOpen={setIsOpen} teamData={opponentData} setTeamData={setOpponentData} />)}
      {isEditOpen && (<EditOpponent isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} teamData={opponentData} setTeamData={setOpponentData} />)}
    </>
  )
}
