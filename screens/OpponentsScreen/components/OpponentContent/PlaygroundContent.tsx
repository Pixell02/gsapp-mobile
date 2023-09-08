import React from 'react'
import { View } from 'react-native'
import Title from '../../../components/Title'
import useLanguageContext from '../../../../hooks/useLanguageContext'
import RoundedButton from '../../../components/RoundedButton'
import translate from '../../locales/translate.json'
import { useCollection } from '../../../../hooks/useCollection'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import ItemCenter from '../../../components/ItemCenter'
import SlabBlock from '../../../components/SlabBlock'

interface itemProps {
  id: string,
  place: string,
  uid: string
}

interface props {
  setPlace: (value) => void;
  setIsOpen: (value: number) => void;
}


const PlaygroundContent = (props:props) => {
  const { language } = useLanguageContext();
  const { user } = useAuthContext();
  const { documents: placePreset } = useCollection("placePreset", ["uid", "==", user.uid])

  const handlePress = (item: itemProps) => {
    props.setPlace({...item})
    props.setIsOpen(4)
  }
  return (
    <View>
      <Title name={translate.places[language] || translate.places["en"]} />
      <View style={{ width: "30%", marginLeft: 10 }}>
        <RoundedButton text={translate.add[language]} onPress={() => props.setIsOpen(3)} />
        </View>
        <ItemCenter>
          {placePreset?.map((item: itemProps) => (
            <SlabBlock place={item.place} onPress={() => handlePress(item)} />
          ))}
        </ItemCenter>
      
    </View>
  )
}

export default PlaygroundContent
