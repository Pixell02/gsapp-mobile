import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
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

export default function AccountContent({navigation}): JSX.Element {
  const { user } = useAuthContext();
  const {language} = useContext(LanguageContext)
  const { documents: license } = useCollection("user", ["uid", "==", user.uid]);

  const accountData = [
    { name: translate.accountId[language], value: user.uid },
    { name: translate.email[language], value: user.email },
  ];
  return (
    <ScrollView>
      <Title name={translate.account[language]} />
      <LogoutButton navigation={navigation} />
      <View style={styles.container}>
        <ItemCenter>
          {accountData &&
            accountData.map((data) => (
              <UserAccountData key={data.name} name={data.name} value={data.value} type="normal" backGround="light" />
            ))}
          {license && <LicenseContainer license={license[0]} />}
          <Stats />
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
