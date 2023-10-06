import React from 'react';
import useLanguageContext from '../../../hooks/useLanguageContext';
import translate from "../locales/translate.json";

interface NavItem {
  name: string;
  link: React.FC | string;
  image: string;
  sign: string;
  ScreenName?: string;
}

const useNavItems = () => {

    const { language } = useLanguageContext();
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
        ScreenName: translate.YourCatalog[language] || translate.YourCatalog["en"],
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
        ScreenName: translate.Catalog[language] || translate.Catalog["en"],
      },
      {
        name: translate.order[language] || translate.order["en"],
        link: "OfferScreen",
        image: orderGraphic,
        sign: arrowSign,
      },
    ];

  return navItem;
}

export default useNavItems
