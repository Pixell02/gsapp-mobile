import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import ItemCenter from "../../components/ItemCenter";
import MainContent from "../../components/MainContent";
import RoundedButton from "../../components/RoundedButton";
import Title from "../../components/Title";
import TopBar from "../../components/TopBar";
import { LanguageContext } from "../../context/LanguageContext";
import { RootStackParamList } from "../StartingScreen/type";
import ChapterModal from "./components/ChapterModal";
import GuideContent from "./components/GuideContent";
import translate from "./locales/translate.json";

type IndividualCatalogContentNavigationProp = StackNavigationProp<RootStackParamList, "CreatorScreen">;

const GuideScreen = () => {

  const {language} = useContext(LanguageContext)
  const navigation = useNavigation<IndividualCatalogContentNavigationProp>();
  const [isOpen, setIsOpen] = useState({
    id: null,
    open: false,
  })
  const handleNavigate = () => {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <TopBar />
      <MainContent>
        {isOpen.open ? <ChapterModal isOpen={isOpen} setIsOpen={setIsOpen} chapter={translate.chapters[isOpen.id]} /> : (
          <>
            <Title name={(translate.guide[language] || translate.guide["en"])} />
            <ItemCenter>
              <GuideContent setIsOpen={setIsOpen} />
              <View style={{width: "80%", marginTop: 10}}>
                <RoundedButton text={translate.return[language]} onPress={() => handleNavigate()} />
              </View>
            </ItemCenter>
          </>
        )}
      </MainContent>
      {/* <NavBar /> */}
    </View>
  );
};

export default GuideScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
  },
});
