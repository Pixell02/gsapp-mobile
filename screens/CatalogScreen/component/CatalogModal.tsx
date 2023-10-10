import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import CatalogBlock from "../../../components/CatalogBlock";
import ItemCenter from "../../../components/ItemCenter";
import MainContent from "../../../components/MainContent";
import { useCollection } from "../../../hooks/useCollection";
import useCustomPanResponder from "../../../hooks/useCustomPanResponder";
import { RootStackParamList } from "../../StartingScreen/type";

interface posterProps {
  id: string;
  name: string;
  src: string;
  uid: string;
}



export default function CatalogModal({ isOpen, setIsOpen, name, id}) {
  const panResponder = useCustomPanResponder(isOpen, setIsOpen);
  const { documents: posters } = useCollection("piecesOfPoster", ["themeId", "==", id]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handlePress = (uid: string) => {
    navigation.navigate("CreatorScreen", { uid: uid });
    setIsOpen(false);
  };
  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType={"slide"} visible={isOpen}  onRequestClose={() => setIsOpen(false)}>
        <View style={style.modalContent}>
          <Text style={style.name}>{name}</Text>
          <MainContent>
            <ItemCenter>
              {posters?.map((item: posterProps) => (
                  <CatalogBlock
                  key={item.id}
                  name={item.name}
                  img={item.src}
                  onPress={() => handlePress(item.uid)}
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
