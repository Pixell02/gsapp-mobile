import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import Input from "../../../../components/Input";

const AddUserContainer = ({ accounts, handleAddUser, accountData, setAccountData, alert }) => {
  
  return (
    <View style={{ margin: 10 }}>
      <Text style={{ marginLeft: 10, fontFamily: "Poppins-SemiBold" }}>Konta podpięte do licencji</Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
        <View style={{ width: "60%" }}>
          <Input value={accountData} onChangeText={(value: string) => setAccountData(value)} />
        </View>
        <Button
          style={{ borderRadius: 0, backgroundColor: "black", width: "30%", marginTop: 10 }}
          onPress={() => handleAddUser(accountData)}
          disabled={accounts?.users?.length === 5}
        >
          <Text style={{ color: "white", fontFamily: "Poppins-SemiBold" }}>Dodaj</Text>
        </Button>
      </View>
      {alert && <Text style={{marginLeft: 10, marginBottom: 5}}>{alert}</Text>}
      <Text style={{ fontSize: 12, marginLeft: 10, fontFamily: "Poppins_Medium", color: "gray" }}>
        Możesz dodać jeszcze: {5 - accounts?.users?.length} użytkowników
      </Text>
    </View>
  );
};

export default AddUserContainer;
