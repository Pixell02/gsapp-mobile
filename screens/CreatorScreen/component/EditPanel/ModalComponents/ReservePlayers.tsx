import React, { useContext } from 'react'
import { Image, Text, View } from 'react-native'
import Header from './components/Header'
import translate from "../../../locales/translate.json"
import { LanguageContext } from '../../../../../context/LanguageContext'
import { useAuthContext } from '../../../../../hooks/useAuthContext'
import { useCollection } from '../../../../../hooks/useCollection'
import { CheckBox } from 'react-native-elements'

const ReservePlayers = ({goalkeeper}) => {

  const { user } = useAuthContext()
  const {language} = useContext(LanguageContext)
  const {documents: Players} = useCollection("Players", ["uid", "==", user.uid])

  return (
    <View style={{width: "100%"}}>
      <Header title={translate.addReserve[language]} />
      <View style={{ marginLeft: 20 }}>
        {!Players ? (
          <Text>{translate.noPlayers[language]}</Text>
        ) : (
          <View>
            {Players &&
              Players.map((player, i) => (
                <View key={i} style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: "70%" }}>
                    <CheckBox checked={false} title={player.firstName + " " + player.secondName} />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    {player.img && (
                      <Image
                        source={{ uri: player.img }}
                        style={{ width: 30, flex: 1, resizeMode: "contain", maxHeight: 30 }}
                      />
                    )}
                  </View>
                </View>
              ))}
          </View>
        )}
      </View>
    </View>
  )
}

export default ReservePlayers
