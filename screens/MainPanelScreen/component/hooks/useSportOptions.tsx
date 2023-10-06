import useLanguageContext from '../../../../hooks/useLanguageContext';
import translate from "../../locales/translate.json";
const useSportOptions = () => {

    const {language} = useLanguageContext();

    const sportOptions = [
    {
      label: translate.football[language] || translate.football["en"],
      value: "piłka nożna",
    },
    {
      label: translate.basketball[language] || translate.basketball["en"],
      value: "koszykówka",
    },
    {
      label: translate.volleyball[language] || translate.volleyball["en"],
      value: "siatkówka",
    },
    {
      label: translate.hockey[language] || translate.hockey["en"],
      value: "hokej",
    },
    {
      label: translate.handball[language] || translate.handball["en"],
      value: "piłka ręczna",
    },
  ];

  return sportOptions
}

export default useSportOptions
