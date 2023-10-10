import React, { useState } from "react";
import { Text, View } from "react-native";
import ItemCenter from "../../../components/ItemCenter";
import SelectPicker from "../../../components/SelectPicker";
import Title from "../../../components/Title";
import useLanguageContext from "../../../hooks/useLanguageContext";
import useSelectSport from "../hooks/useSelectSport";
import useSortCatalog from "../hooks/useSortCatalog";
import translate from "../locales/translate.json";
import CatalogContainer from "./CatalogContainer";
import CatalogModal from "./CatalogModal";

export default function CatalogContent(): JSX.Element {
  const { data: catalog, sportOptions, selectedSportKeys, setSelectedSportKeys } = useSelectSport();
  const { language } = useLanguageContext();
  const theme = useSortCatalog(catalog);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  return (
    <View>
      {id && isOpen && <CatalogModal isOpen={isOpen} setIsOpen={setIsOpen} name={name} id={id} />}
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
      <ItemCenter>
        {theme.length === 0 && (
          <View>
            <Text>No Content</Text>
          </View>
        )}
        {theme?.map((theme) => (
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
