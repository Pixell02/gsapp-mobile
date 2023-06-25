import React, { useState, useRef, useEffect, useContext } from "react";
import { View, Modal, StyleSheet, Text, PanResponder, Animated } from "react-native";
import Title from "../../components/Title";
import ItemCenter from "../../components/ItemCenter";
import CatalogContainer from "./CatalogContainer";
import { useCollection } from "../../../hooks/useCollection";
import { useFocusEffect } from "@react-navigation/native";
import CatalogModal from "./CatalogModal";
import translate from "../locales/translate.json"
import { LanguageContext } from "../../../context/LanguageContext";

export default function CatalogContent({navigation}): JSX.Element {
  const { documents: catalog } = useCollection("catalog", ["public", "==", true]);
  const {language} = useContext(LanguageContext)
  const [theme, setTheme] = useState([]);
  useEffect(() => {
    if (catalog) {
      const sortedCatalog = [...catalog]; // Tworzenie kopii tablicy catalog
      sortedCatalog.sort((a, b) => {
        const numA = parseInt(a.theme.split(" ")[1]);
        const numB = parseInt(b.theme.split(" ")[1]);
        return numA - numB;
      });
      setTheme(sortedCatalog);
    }
  }, [catalog]);

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  return (
    <View>
      {isOpen && <CatalogModal isOpen={isOpen} setIsOpen={setIsOpen} name={name} id={id} setId={setId} navigation={navigation} />}

      <Title name={translate.catalog[language]} />
      <ItemCenter>
        {theme &&
          theme.map((theme, i) => (
            <CatalogContainer
              key={theme.id}
              id={theme.id}
              name={theme.theme}
              // favorite={theme.favorite}
              open={() => setIsOpen(true)}
              setName={setName}
              setId={setId}
            />
          ))}
      </ItemCenter>
    </View>
  );
}
