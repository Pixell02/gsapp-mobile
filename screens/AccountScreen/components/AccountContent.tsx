import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useDoc } from "../../../hooks/useDoc";
import useLanguageContext from "../../../hooks/useLanguageContext";
import ItemCenter from "../../components/ItemCenter";
import Title from "../../components/Title";
import translate from "../locales/translate.json";
import LicenseContainer from "./LicenseContainer";
import LogoutButton from "./LogoutButton";
import MultiAccountContainer from "./MultiAccountContainer";
import UserAccountData from "./UserAccountData";

export default function AccountContent({navigation}): JSX.Element {
  const { user } = useAuthContext();
  const {language} = useLanguageContext();
  const { documents: license } = useDoc("user", ["uid", "==", user.uid]);
  const {documents: orderId} = useDoc("orderId", ["uid", "==", user.uid]);
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
          {license && <LicenseContainer license={license} />}
          {orderId?.orderId && 
          <View style={{flexDirection: "row", alignItems: "center", marginTop: 10}}>
          <Button onPress={() => handleNavigate()} style={{width: 100, backgroundColor: "black", borderRadius: 0}}>
            <Text style={{color: "white"}}>Przenieś</Text>
          </Button>
          <Text style={{fontSize: 10, marginLeft: 10}}>Twoja licencja nie zaskoczyła? kliknij przycisk</Text>
          </View>
          }
          <MultiAccountContainer />
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
