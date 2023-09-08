import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import TopBar from "../components/TopBar";
import MainContent from "../components/MainContent";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import translate from "./locales/translate.json";
import { LanguageContext } from "../../context/LanguageContext";
import GuideContent from "./components/GuideContent";
import ChapterModal from "./components/ChapterModal";
import ItemCenter from "../components/ItemCenter";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../StartingScreen/type";
import { StackNavigationProp } from "@react-navigation/stack";
import RoundedButton from "../components/RoundedButton";

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
