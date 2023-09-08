import React from "react";
import { StyleSheet, Text, View } from "react-native";
import translate from "../locales/translate.json";
import { useAuthContext } from "../../../hooks/useAuthContext";
import useAccountData from "./hooks/useAccountData";
import { useDoc } from "../../../hooks/useDoc";
import useLanguageContext from "../../../hooks/useLanguageContext";
import { Button } from "react-native-paper";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import AddUserContainer from "./MultiAccountContainer/AddUserContainer";
import Users from "./MultiAccountContainer/Users";

const MultiAccountContainer: React.FC = () => {
  const { user } = useAuthContext();
  const { language } = useLanguageContext();
  const { documents: accounts } = useDoc("teamAccounts", ["uid", "==", user.uid]);
  const { documents: License } = useDoc("user", ["uid", "==", user.uid]);
  const { accountData, setAccountData, handleAddUser, alert, handleDeleteTeam, handleDeleteUser } = useAccountData(accounts, License);
  
  const handleCreateTeamsAccount = () => {
    const ref = doc(db, "teamAccounts", user.uid);
    setDoc(ref, {
      uid: user.uid,
      users: [
        {
          email: user.email,
          uid: user.uid,
        },
      ],
      expireDate: License.expireDate || "",
    });
    const licenseDoc = doc(db, "user", License.id);
    updateDoc(licenseDoc, {
      team: user.uid,
    });
  };
  return (
    <View style={styles.container}>
      {!accounts && (
        <View style={styles.margin}>
          <Text>{translate.createTeam[language] || translate.createTeam["en"]}</Text>
          <View style={styles.buttonContainer}>
            <Button style={{ backgroundColor: "black", borderRadius: 0 }} onPress={() => handleCreateTeamsAccount()}>
              <Text style={{ color: "white", fontFamily: "Poppins-SemiBold" }}>{translate.create[language] || translate.create["en"]}</Text>
            </Button>
          </View>
        </View>
      )}
      {accounts && (
        <>
          <View>
            <AddUserContainer accounts={accounts} handleAddUser={handleAddUser} accountData={accountData} setAccountData={setAccountData} alert={alert} />
          </View>
          <View style={{width: "100%"}}>
           {accounts?.users && (
              <Users users={accounts.users} handleDeleteTeam={handleDeleteTeam} handleDeleteUser={handleDeleteUser} />
           )} 
          </View>
        </>
      )}
    </View>
  );
};

export default MultiAccountContainer;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginTop: 10,
    backgroundColor: "white",
    flex: 1,
  },
  margin: {
    margin: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
