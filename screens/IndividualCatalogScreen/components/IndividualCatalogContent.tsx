import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext } from "react";
import { View } from "react-native"; // Import Image from react-native
import { LanguageContext } from "../../../context/LanguageContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { RootStackParamList } from "../../StartingScreen/type";
import ItemBlock from "../../components/ItemBlock";
import ItemCenter from "../../components/ItemCenter";
import RoundedButton from "../../components/RoundedButton";
import Title from "../../components/Title";
import useTeamPosters from "../hooks/useTeamPosters";
import translate from "../locales/translate.json";
import NavBlock from "./NavBlock";

type IndividualCatalogContentNavigationProp = StackNavigationProp<RootStackParamList, "CreatorScreen">;

interface NavItem {
  name: string;
  link: React.FC | string;
  image: any; // Replace 'any' with the actual type of your image assets
  sign: any; // Replace 'any' with the actual type of your image assets
  ScreenName?: string;
}

export default function IndividualCatalogContent() {
  const { user } = useAuthContext();
  const { yourPoster, teamPosters, License } = useTeamPosters();
  const { language } = useContext(LanguageContext);
  const navigation = useNavigation<IndividualCatalogContentNavigationProp>();
  const addTeam = require("../assets/addTeam.png");
  const addPlayer = require("../assets/addPlayer.png");
  const addOpponent = require("../assets/addOpponent.png");
  const generate = require("../assets/generate.png");
  const orderGraphic = require("../assets/order.png");
  const plusSign = require("../assets/plus.png");
  const arrowSign = require("../assets/arrow.png");

  const navItem: NavItem[] = [
    {
      name: translate.createTeam[language] || translate.createTeam["en"],
      link: translate.YourTeamPanel[language] || translate.YourTeamPanel["en"],
      image: addTeam,
      sign: plusSign,
      ScreenName: (translate.YourCatalog[language] || translate.YourCatalog["en"])
    },
    {
      name: translate.addPlayer[language] || translate.addPlayer["en"],
      link: translate.Players[language] || translate.Players["en"],
      image: addPlayer,
      sign: plusSign,
    },
    {
      name: translate.addOpponent[language] || translate.addOpponent["en"],
      link: translate.Opponents[language] || translate.Opponents["en"],
      image: addOpponent,
      sign: plusSign,
    },
    {
      name: translate.generate[language] || translate.generate["en"],
      link: translate.Catalog[language] || translate.Catalog["en"],
      image: generate,
      sign: arrowSign,
      ScreenName: (translate.Catalog[language] || translate.Catalog["en"])
    },
    {
      name: translate.order[language] || translate.order["en"],
      link: "OfferScreen",
      image: orderGraphic,
      sign: arrowSign,
    },
  ];

  const handleNavigate = (uid: string) => {
    navigation.navigate("CreatorScreen", { uid: uid });
  };

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
        {navItem.map((item, i) => (
          <NavBlock key={i} name={item.name} link={item.link} image={item.image} sign={item.sign} />
        ))}
      </ItemCenter>
      <Title name={translate.yourGraphics[language] || translate.yourGraphics["en"]} />
      <ItemCenter>
        {yourPoster?.map((item) => (
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
          teamPosters?.map((item: any) => (
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
