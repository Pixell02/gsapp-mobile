import React, { useContext } from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import useLanguageContext from '../../../../../hooks/useLanguageContext';
import RadioContext from '../../../context/radioContext';
import translate from "../../../locales/translate.json";
const RadioContainer = () => {
  
  const {radioChecked, setRadioChecked} = useContext(RadioContext)
  const {language} = useLanguageContext();
  return (
    <View style={{width: "100%", alignItems: "center", justifyContent: "space-between"}}>
    <RadioButton.Group
      onValueChange={(value) => setRadioChecked(value)}
      value={radioChecked}
    >
      <View style={{flexDirection: "row"}}>
        <RadioButton.Item label={translate.host[language] || translate.host["en"]} value="radio1" />
        <RadioButton.Item style={{marginLeft: 30}} label={translate.guest[language] || translate.guest["en"]} value="radio2" />
      </View>
    </RadioButton.Group>
  </View>
  );
}

export default RadioContainer;
