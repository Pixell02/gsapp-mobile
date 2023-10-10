import React from 'react'
import { View } from 'react-native'
import ItemCenter from '../../../../components/ItemCenter'
import RoundedButton from '../../../../components/RoundedButton'
import SlabBlock from '../../../../components/SlabBlock'
import Title from '../../../../components/Title'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import { useCollection } from '../../../../hooks/useCollection'
import useLanguageContext from '../../../../hooks/useLanguageContext'
import useTeamCollection from '../../../../hooks/useTeamCollection'
import useModalContextProvider from '../../../MainPanelScreen/component/hooks/useModalContextProvider'
import useDataContext from '../../hooks/useDataContext'
import translate from '../../locales/translate.json'
interface itemProps {
  id: string,
  place: string,
  uid: string
}

const PlaygroundContent = () => {
  const { language } = useLanguageContext();
  const { user } = useAuthContext();
  const { setIsModalOpen} = useModalContextProvider();
  const {setPlace} = useDataContext();
  const { documents: placePreset } = useCollection("placePreset", ["uid", "==", user.uid])
  const {documents: LicensePlacePreset} = useTeamCollection("placePreset");
  const handlePress = (item: itemProps) => {
    setPlace({...item})
    setIsModalOpen(4)
  }
  return (
    <View>
      <Title name={translate.places[language] || translate.places["en"]} />
      <View style={{ width: "30%", marginLeft: 10 }}>
        <RoundedButton text={translate.add[language]} onPress={() => setIsModalOpen(3)} />
        </View>
        <ItemCenter>
          {placePreset?.map((item: itemProps) => (
            <SlabBlock key={item.place} place={item.place} onPress={() => handlePress(item)} />
          ))}
          {LicensePlacePreset?.map((item: itemProps) => (
            <SlabBlock key={item.place} place={item.place} onPress={() => handlePress(item)} />
          ))}
        </ItemCenter>
      
    </View>
  )
}

export default PlaygroundContent
