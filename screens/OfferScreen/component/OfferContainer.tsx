import React, {useState} from 'react'
import {View} from 'react-native'
import Title from '../../components/Title'
import LoadingScreen from '../../components/LoadingScreen'
import { RadioButton } from 'react-native-paper';
import useCheckBox from '../hooks/useCheckBox';
import RadioContainer from './RadioContainer';
import ScreenContainer from '../../components/ScreenContainer';

const OfferContainer = () => {
  
  const {checked, handleCheckedChange} = useCheckBox()

  return (
    <View>
      <Title name="Sklep" />
      <ScreenContainer>
        <RadioContainer checked={checked} handleCheckedChange={handleCheckedChange} />
      </ScreenContainer>
    </View>
  )
}

export default OfferContainer
