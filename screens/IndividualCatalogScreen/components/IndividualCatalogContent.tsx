import React, { useContext } from 'react'
import {View} from 'react-native'
import Title from '../../components/Title'
import { useCollection } from '../../../hooks/useCollection'
import { useAuthContext } from '../../../hooks/useAuthContext'
import ItemBlock from '../../components/ItemBlock'
import ItemCenter from '../../components/ItemCenter'
import { LanguageContext } from '../../../context/LanguageContext'
import translate from "../locales/translate.json"

export default function IndividualCatalogContent({navigation}) {
  const { user } = useAuthContext() 
  const {documents: individualPoster} = useCollection("yourCatalog", ["uid", "==", user.uid])
  const {language} = useContext(LanguageContext)

  const handleNavigate = (uid: string) => {
    navigation.navigate("CreatorScreen", {uid: uid})
  }

  return (
    <View>
      <Title name={translate.yourGraphics[language]} />
      <ItemCenter>
      {individualPoster && individualPoster.map((item) => ( 
        <ItemBlock key={item.id} firstName={item.name} secondName={""} img={item.src} onPress={() => handleNavigate(item.uuid)} />
      ))}
      </ItemCenter>
      <Title name={translate.yourFavorite[language]} />
    </View>
  )
}
