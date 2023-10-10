import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import ItemCenter from "../../../components/ItemCenter";
import RoundedButton from "../../../components/RoundedButton";
import Title from "../../../components/Title";
import useCustomPanResponder from "../../../hooks/useCustomPanResponder";
import useLanguageContext from "../../../hooks/useLanguageContext";
import Description from "./Description";

const ChapterModal = ({ chapter, isOpen, setIsOpen }) => {
  const { language } = useLanguageContext();
  const panResponder = useCustomPanResponder(isOpen.open, setIsOpen);
  console.log(isOpen)
  return (
    <View {...panResponder.panHandlers}>
      <Modal animationType={"slide"} visible={isOpen.open} onRequestClose={() => setIsOpen({ id: null, open: false })}>
        <Title name={chapter.title[language]} />
        <Description text={chapter.description[language]} />
        <ItemCenter>
          <View style={styles.button}>
            {isOpen.id !== 7 && (
              <RoundedButton text="Następne" onPress={() => setIsOpen(prev => ({...prev, id: isOpen.id + 1}))} />
            )}
            
          </View>
          <View style={{width: 200}}>
            <RoundedButton text="Zamknij" onPress={() => setIsOpen(prev => ({...prev, id: null, open: false}))} />
          </View>
        </ItemCenter>
      </Modal>
    </View>
  );
};

export default ChapterModal;

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
    width: 200
  }
})