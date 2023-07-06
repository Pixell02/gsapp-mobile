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

const GuideScreen = () => {

  const {language} = useContext(LanguageContext)
  const [isOpen, setIsOpen] = useState({
    id: null,
    open: false,
  })
  return (
    <View style={styles.container}>
      <TopBar />
      <MainContent>
        {isOpen.open ? <ChapterModal isOpen={isOpen} setIsOpen={setIsOpen} chapter={translate.chapters[isOpen.id]} /> : (
          <>
            <Title name={(translate.guide[language] || translate.guide["en"])} />
            <ItemCenter>
              <GuideContent setIsOpen={setIsOpen} />
            </ItemCenter>
          </>
        )}
      </MainContent>
      <NavBar />
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
