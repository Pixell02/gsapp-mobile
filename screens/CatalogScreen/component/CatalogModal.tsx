import React from "react";
import { View, Modal, Text, StyleSheet, TouchableOpacity } from "react-native";
import useCustomPanResponder from "../../../hooks/useCustomPanResponder";
import { useCollection } from "../../../hooks/useCollection";
import ItemCenter from "../../components/ItemCenter";
import ItemBlock from "../../components/ItemBlock";
import MainContent from "../../components/MainContent";
import CatalogBlock from "../../components/CatalogBlock";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../../StartingScreen/type";

const Stack = createStackNavigator<RootStackParamList>();

export default function CatalogModal({ isOpen, setIsOpen, name, id, setId, navigation }) {
  const panResponder = useCustomPanResponder(isOpen, setIsOpen, null, setId);
  const { documents: posters } = useCollection("piecesOfPoster", ["themeId", "==", id]);

  const handlePress = (item) => {
    navigation.navigate("CreatorScreen", { uid: item.uid });
  };

  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType={"slide"} visible={isOpen} transparent={true}>
        <View style={style.modalContent}>
          <Text style={style.name}>{name}</Text>
          <MainContent>
            <ItemCenter>
              {posters &&
                posters.map((item) => (
                  <CatalogBlock
                  key={item.id}
                  name={item.name}
                  img={item.src}
                  onPress={() => handlePress(item)}
                  />
                ))}
            </ItemCenter>
          </MainContent>
        </View>
      </Modal>
    </View>
  );
}
const style = StyleSheet.create({
  modal: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  name: {
    fontFamily: "Poppins-SemiBold",
  },
});
