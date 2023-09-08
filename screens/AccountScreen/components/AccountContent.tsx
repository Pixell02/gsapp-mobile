import React, { useContext, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Title from "../../components/Title";
import Input from "../../components/Input";
import UserAccountData from "./UserAccountData";
import ItemCenter from "../../components/ItemCenter";
import LicenseContainer from "./LicenseContainer";
import { ScrollView } from "react-native-gesture-handler";
import Stats from "./Stats";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import LogoutButton from "./LogoutButton";
import { LanguageContext } from "../../../context/LanguageContext";
import translate from "../locales/translate.json"
import MultiAccountContainer from "./MultiAccountContainer";
import { useDoc } from "../../../hooks/useDoc";
import { Button } from "react-native-paper";

export default function AccountContent({navigation}): JSX.Element {
  const { user } = useAuthContext();
  const {language} = useContext(LanguageContext)
  const { documents: license } = useCollection("user", ["uid", "==", user.uid]);
  const {documents: orderId} = useDoc("orderId", ["uid", "==", user.uid])
  const accountData = [
    { name: translate.accountId[language] || translate.accountId["en"], value: user.uid },
    { name: translate.email[language] || translate.email["en"], value: user.email },
  ];

  const handleNavigate = () => {
    navigation.navigate("SuccessScreen");
  }

  return (
    <ScrollView>
      <Title name={translate.account[language] || translate.account["en"]} />
      <LogoutButton navigation={navigation} />
      <View style={styles.container}>
        <ItemCenter>
          {accountData &&
            accountData.map((data) => (
              <UserAccountData key={data.name} name={data.name} value={data.value} type="normal" backGround="light" />
            ))}
          {license && <LicenseContainer license={license[0]} />}
          {orderId?.orderId && 
          <View style={{flexDirection: "row", alignItems: "center", marginTop: 10}}>
          <Button onPress={() => handleNavigate()} style={{width: 100, backgroundColor: "black", borderRadius: 0}}>
            <Text style={{color: "white"}}>Przenieś</Text>
          </Button>
          <Text style={{fontSize: 10, marginLeft: 10}}>Twoja licencja nie zaskoczyła? kliknij przycisk</Text>
          </View>
          }
          <MultiAccountContainer />
          {/* <Stats /> */}
        </ItemCenter>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
});
