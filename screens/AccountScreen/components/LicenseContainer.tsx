import React, { useContext, useEffect, useState } from 'react'
import {View, StyleSheet, Text} from 'react-native'
import UserAccountData from './UserAccountData'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useCollection } from '../../../hooks/useCollection';
import FreeTrialData from './FreeTrialData';
import translate from "../locales/translate.json"
import { LanguageContext } from '../../../context/LanguageContext';

export default function LicenseContainer({license}) {
  
  const {language} = useContext(LanguageContext)
 
  const [licenseData, setLicenseData] = useState([
    {name: translate.licenseType[language], value: license.license},
    {name: translate.expireDate[language], value: license.expireDate}
  ])
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translate.license[language]}</Text>
      <View style={styles.margin}>
      {license.license === "full-license" && licenseData.map(data => (
        <UserAccountData key={data.name} name={data.name} value={data.value} type='medium' backGround="asd" />
      ))}
      {license.license === "free-trial" && (
        <FreeTrialData uses={license.numberOfFreeUse} />
      )}
      {license.license === "admin" && (
        <Text>Konto adminowskie</Text>
      )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: "90%",
    height: 200,
    backgroundColor: "#FFF"
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    marginTop: 10,
    marginLeft: 10
  },
  margin: {
    marginLeft: 10,
  }
})