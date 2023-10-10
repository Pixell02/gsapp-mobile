import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native"; // Import Image from react-native
import ItemBlock from "../../../components/ItemBlock";
import ItemCenter from "../../../components/ItemCenter";
import RoundedButton from "../../../components/RoundedButton";
import Title from "../../../components/Title";
import { useAuthContext } from "../../../hooks/useAuthContext";
import useLanguageContext from "../../../hooks/useLanguageContext";
import { RootStackParamList } from "../../StartingScreen/type";
import useTeamPosters from "../hooks/useTeamPosters";
import translate from "../locales/translate.json";
import NavContainer from "./NavContainer";

type IndividualCatalogContentNavigationProp = StackNavigationProp<RootStackParamList, "CreatorScreen">;

interface posterProps {
  id: string;
  name: string;
  src: string;
  uuid: string
}



export default function IndividualCatalogContent() {
  const { user } = useAuthContext();
  const {yourPoster, teamPosters, License } = useTeamPosters();
  const { language } = useLanguageContext();
  const navigation = useNavigation<IndividualCatalogContentNavigationProp>();

  const handleNavigate = (uid: string) => {
    navigation.navigate("CreatorScreen", uid)
  }

  const handleNavigateGuide = () => {
    navigation.navigate("GuideScreen");
  };

  return (
    <View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Title name={translate.navigation[language] || translate.navigation["en"]} />
        <View style={{ marginTop: 10, width: 200 }}>
          <RoundedButton
            text={translate.guide[language] || translate.guide["en"]}
            onPress={() => handleNavigateGuide()}
          />
        </View>
      </View>
      <ItemCenter>
        <NavContainer />
      </ItemCenter>
      <Title name={translate.yourGraphics[language] || translate.yourGraphics["en"]} />
      <ItemCenter>
        {yourPoster?.map((item: posterProps) => (
          <ItemBlock
            key={item.id}
            firstName={item.name}
            secondName={""}
            img={item.src}
            onPress={() => handleNavigate(item.uuid)}
          />
        ))}
      </ItemCenter>
      <Title name={translate.teamPosters[language] || translate.teamPosters["en"]} />
      <ItemCenter>
        {License?.team !== user.uid &&
          teamPosters?.map((item: posterProps) => (
            <ItemBlock
              key={item.id}
              firstName={item.name}
              secondName={""}
              img={item.src}
              onPress={() => handleNavigate(item.uuid)}
            />
          ))}
      </ItemCenter>
    </View>
  );
}
