import React, { useState, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import Title from "../../components/Title";
import ItemCenter from "../../components/ItemCenter";
import CatalogContainer from "./CatalogContainer";
import CatalogModal from "./CatalogModal";
import translate from "../locales/translate.json";
import { LanguageContext } from "../../../context/LanguageContext";
import useSelectSport from "../hooks/useSelectSport";
import SelectPicker from "../../components/SelectPicker";

export default function CatalogContent(): JSX.Element {
  const { data: catalog, sportOptions, selectedSportKeys, setSelectedSportKeys } = useSelectSport();
  const { language } = useContext(LanguageContext);
  const [theme, setTheme] = useState([]);

  // const langOptions = [
  //   {}
  // ]

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
      {id && isOpen && <CatalogModal isOpen={isOpen} setIsOpen={setIsOpen} name={name} id={id} setId={setId} />}
      <Title name={translate.catalog[language] || translate.catalog["en"]} />
      {sportOptions?.length > 1 && (
         <View style={{width: "100%", alignItems: "center"}}>
        <View style={{ width: "90%", marginTop: 10 }}>
          <SelectPicker
            name={translate.sport[language]}
            options={sportOptions}
            selectedValue={selectedSportKeys}
            onValueChange={(value) => setSelectedSportKeys(value)}
          />
        </View>
      </View>
      )}
      {/* <SelectPicker
      name="język"
      options={}
      /> */}
      <ItemCenter>
        {theme.length === 0 && (
          <View>
            <Text>No Content</Text>
          </View>
        )}
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
