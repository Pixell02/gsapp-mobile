import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useLanguageContext from '../../../hooks/useLanguageContext';
import translate from "../locales/translate.json";
import FreeTrialData from './FreeTrialData';
import UserAccountData from './UserAccountData';

export default function LicenseContainer({license}) {
  
  const {language} = useLanguageContext();
 
  const [licenseData, setLicenseData] = useState([]);

  useEffect(() => {
    setLicenseData([
      { name: translate.licenseType[language] || translate.licenseType["en"], value: license.license },
      { name: translate.expireDate[language] || translate.expireDate["en"], value: license.expireDate }
    ]);
  }, [license, language]);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translate.license[language] || translate.license["en"]}</Text>
      <View style={styles.margin}>
      {license.license === "full-license" && licenseData.map(data => (
        <UserAccountData key={data.name} name={data.name} value={data.value} type='medium' backGround="asd" />
      ))}
      {license.license === "no-license" && licenseData.map(data => (
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