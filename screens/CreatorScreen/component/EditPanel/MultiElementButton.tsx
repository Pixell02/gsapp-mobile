import React from "react";
import { View } from "react-native";
import RoundedButton from "../../../components/RoundedButton";

const MultiElementButton = ({ coords, setIsModalOpen, setSelectedMatch }) => {
  const handleButtonClick = (buttonNumber: number) => {
    setIsModalOpen({ type: "MultiElements", isOpen: true });
    setSelectedMatch(buttonNumber);
  };

  const generateButtons = () => {
    const buttons = [];
    for (let i = 1; i <= coords.numberOfMatches; i++) {
      buttons.push(
        <View style={{marginTop: 10}} key={i}>
          <RoundedButton text={"Mecz " + i} onPress={() => handleButtonClick(i)} />
        </View>
      );
    }
    return buttons;
  };

  return <View>{generateButtons()}</View>;
};

export default MultiElementButton;
