import React, { useState, useRef, useEffect, useContext, useCallback } from "react";
import { View, Modal, StyleSheet, Text, PanResponder, Animated, BackHandler, Alert } from "react-native";
import Title from "../../components/Title";
import ItemCenter from "../../components/ItemCenter";
import CatalogContainer from "./CatalogContainer";
import { useCollection } from "../../../hooks/useCollection";
import CatalogModal from "./CatalogModal";
import translate from "../locales/translate.json";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../StartingScreen/type";

export default function CatalogContent(): JSX.Element {
  const { documents: catalog } = useCollection("catalog", ["public", "==", true]);
  const navigation = useNavigation();
  const { language } = useContext(LanguageContext);
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
  console.log(isOpen)
  return (
    <View>
      {id && isOpen && <CatalogModal isOpen={isOpen} setIsOpen={setIsOpen} name={name} id={id} setId={setId} />}
      <Title name={translate.catalog[language]} />
      <ItemCenter>
        {theme &&
          theme.map((theme, i) => (
            <CatalogContainer
              key={theme.id}
              id={theme.id}
              name={theme.theme}
              open={() => setIsOpen(true)}
              setName={setName}
              setId={setId}
            />
          ))}
      </ItemCenter>
    </View>
  );
}
