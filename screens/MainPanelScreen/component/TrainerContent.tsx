import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import ItemBlock from "../../../components/ItemBlock";
import ItemCenter from "../../../components/ItemCenter";
import Title from "../../../components/Title";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import useLanguageContext from "../../../hooks/useLanguageContext";
import useTeamCollection from "../../../hooks/useTeamCollection";
import { trainerProps } from "../context/DataContext";
import translate from "../locales/translate.json";
import useDataContextProvider from "./hooks/useDataContextProvider";
import useModalContextProvider from "./hooks/useModalContextProvider";

const TrainerContent = () => {
  const { user } = useAuthContext();
  const { setIsModalOpen } = useModalContextProvider();
  const { setTrainerData } = useDataContextProvider();
  const { documents: Trainers } = useCollection("Trainers", [
    "uid",
    "==",
    user.uid,
  ]);
  const { documents: LicenseTrainers } = useTeamCollection("Trainers");
  const { language } = useLanguageContext();
  const handleTrainerOpen = () => {
    setIsModalOpen(3);
  };
  const handleTrainerPress = (trainer: trainerProps) => {
    setTrainerData((prev: trainerProps) => ({
      ...prev,
      id: trainer.id,
      firstName: trainer.firstName,
      secondName: trainer.secondName,
      img: trainer.img,
    }));
    setIsModalOpen(4);
  };
  return (
    <View>
      <Title name={translate.coach[language] || translate.coach["en"]} />
      <Button
        style={{
          backgroundColor: "black",
          borderRadius: 0,
          width: 150,
          marginLeft: 10,
        }}
        onPress={() => handleTrainerOpen()}
      >
        <Text style={{ color: "white", fontFamily: "Poppins-SemiBold" }}>
          {translate.addTrainer[language] || translate.addTrainer["en"]}
        </Text>
      </Button>
      <ItemCenter>
        {Trainers?.map((trainer: trainerProps) => (
          <ItemBlock
            key={trainer.id}
            firstName={trainer.firstName}
            secondName={trainer.secondName}
            img={trainer.img}
            onPress={() => handleTrainerPress(trainer)}
          />
        ))}
        {LicenseTrainers?.map((trainer: trainerProps) => (
          <ItemBlock
            key={trainer.id}
            firstName={trainer.firstName}
            secondName={trainer.secondName}
            img={trainer.img}
            onPress={() => handleTrainerPress(trainer)}
          />
        ))}
      </ItemCenter>
    </View>
  );
};

export default TrainerContent;
