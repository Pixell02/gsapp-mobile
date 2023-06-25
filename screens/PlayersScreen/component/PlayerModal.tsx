import React from 'react'
import {View} from 'react-native'
import useCustomPanResponder from '../../../hooks/useCustomPanResponder';
import EditPlayer from './EditPlayer';
import AddPlayer from './AddPlayer';

const PlayerModal = ({ isOpen, setIsOpen, playerData, setPlayerData, isEditOpen, setIsEditOpen }) => {
  const panResponder = useCustomPanResponder(isOpen, setIsOpen, setPlayerData);
  
 return (
  <>
    {isOpen && (<AddPlayer isOpen={isOpen} setIsOpen={setIsOpen} teamData={playerData} setTeamData={setPlayerData} />)}
    {isEditOpen &&(<EditPlayer  isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} teamData={playerData} setTeamData={setPlayerData} />) }
  </>
 )
}

export default PlayerModal
