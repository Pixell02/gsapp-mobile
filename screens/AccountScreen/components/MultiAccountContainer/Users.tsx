import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const Users = ({ users, handleDeleteTeam, handleDeleteUser }) => {
  return (
    <View style={style.table}>
      <View style={style.header}>
        <View style={style.idContainer}>
          <Text>Lp</Text>
        </View>
        <View style={style.emailContainer}>
          <Text>email</Text>
        </View>
        <View style={style.userContainer}>
          <Text>Usuń</Text>
        </View>
      </View>
      {users?.map((user: any, i: number) => (
        <View key={i} style={style.row}>
          <View style={style.idContainer}>
            <Text style={style.idText}>{i + 1}</Text>
          </View>
          <View style={style.emailContainer}>
            <Text style={style.emailText}>{user.email}</Text>
          </View>
          <View style={style.userContainer}> 
            <Button style={{backgroundColor: "black", borderRadius: 0}} onPress={() => handleDeleteUser(user.uid)}>
              <Text style={{color: "white"}}>-</Text>
            </Button>
          </View>
        </View>
      ))}
      <Button style={style.button} onPress={() => handleDeleteTeam()}>
       <Text style={style.textButton}>Usuń drużynę</Text>
      </Button>
    </View>
  );
};

export default Users;

const style = StyleSheet.create({
  textButton: {
    color: "white"
  },
  button:{
    backgroundColor: "black",
    marginTop: 50,
    borderRadius: 0,
    width: "90%",
  },
  table: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  idContainer: {
    width: "20%",
    alignItems: "center",
  },
  emailContainer: {
    width: "45%",
    
  },
  userContainer: {
    width: "15%",
    
  },
  header: {
    flexDirection: "row",
    width: "90%",
    borderColor: "gray",
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    paddingTop: 10,
    paddingBottom: 10
  },
  row: {
    flexDirection: "row",
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10
  },
  idText: {
    fontSize: 10,
    
  },
  emailText: {
    fontSize: 10
  },
  userText: {
    fontSize: 8
  }
});
