import React, {useState} from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {View, Text , StyleSheet} from 'react-native'
import { RootStackParamList } from '../StartingScreen/type';
import TopBar from '../components/TopBar';
import MainContent from '../components/MainContent';
import PlayersMainContent from './component/PlayersMainContent';
import NavBar from '../components/NavBar';
import AddBtn from '../components/AddBtn';
import { useAuthContext } from '../../hooks/useAuthContext';
import PlayerModal from './component/PlayerModal';

type PlayersScreenNavigationProp = StackNavigationProp<RootStackParamList, "PlayersScreen">;

type Props = {
  navigation: PlayersScreenNavigationProp;
};


export default function PlayersScreen({navigation}: Props):JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false);
  const {user} = useAuthContext();
  const [selectedValue, setSelectedValue] = useState("");
  const [playerData, setPlayerData] = useState({
    firstName: "",
    secondName: "",
    img: null,
    number: null,
    team: "",
    uid: user.uid
  })
  return (
    <View style={styles.container}>
      <TopBar />
      {(isOpen || isEditOpen) && (
        <PlayerModal isOpen={isOpen} setIsOpen={() => setIsOpen(false)} isEditOpen={isEditOpen} setIsEditOpen={() => setIsEditOpen(false)} playerData={playerData} setPlayerData={setPlayerData} />
      )}
      <AddBtn onPress={() => setIsOpen(true)} />
      <MainContent>
        <PlayersMainContent 
        setIsOpen={() => setIsEditOpen(true)} 
        setPlayerData={setPlayerData}  
        playerData={playerData}
        selectedValue={selectedValue} 
        setSelectedValue={setSelectedValue}
        />
      </MainContent>
      <NavBar />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1
  }
})