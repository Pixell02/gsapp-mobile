import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import translate from "../locales/translate.json"
import Description from './Description'
import ChapterTitle from './ChapterTitle'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LanguageContext } from '../../../context/LanguageContext'

const GuideContent = ({setIsOpen}) => {

  const {language} = useContext(LanguageContext)


  return (
    <View style={{width: "80%"}}>
      {translate.chapters.map((chapter, i) => (
        <TouchableOpacity style={{marginTop: 10, marginBottom: 10}} onPress={() => setIsOpen({id: i, open: true})} key={i}>
        <ChapterTitle text={chapter.title[language]} />
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default GuideContent
