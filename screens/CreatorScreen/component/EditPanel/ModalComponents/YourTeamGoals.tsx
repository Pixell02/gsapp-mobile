import React, { useContext } from 'react'
import { View } from 'react-native'
import Header from './components/Header'
import translate from "../../../locales/translate.json"
import { LanguageContext } from '../../../../../context/LanguageContext'
import usePlayers from '../../../hooks/usePlayers'

const YourTeamGoals = () => {

  const {language} = useContext(LanguageContext)
  const {playerOptions} = usePlayers();


  return (
    <View style={{width: "100%"}} >
      <Header title={translate.addYourTeamGoals[language]} />
    </View>
  )
}

export default YourTeamGoals
