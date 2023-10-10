import React, { useEffect } from "react";
import ItemBlock from "../../../../components/ItemBlock";
import ItemCenter from "../../../../components/ItemCenter";
import TeamPicker from "../../../../components/TeamPicker";
import Title from "../../../../components/Title";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useCollection } from "../../../../hooks/useCollection";
import useLanguageContext from "../../../../hooks/useLanguageContext";
import useModalContextProvider from "../../../MainPanelScreen/component/hooks/useModalContextProvider";
import useDataContext from "../../hooks/useDataContext";
import useTeamOption from "../../hooks/useTeamOption";
import translate from "../../locales/translate.json";

interface playerProps {
  id: string;
  firstName: string;
  secondName: string;
  number: string;
  team: string;
  img: string;
}


const MainPlayers = () => {
  const { user } = useAuthContext();
   const { isModalOpen, setIsModalOpen } = useModalContextProvider();
   const { playerData, setPlayerData, selectedValue, setSelectedValue } = useDataContext();
  const { documents: players } = useCollection("Players", ["uid", "==", user.uid]);
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const { language } = useLanguageContext();
  const { teamOption } = useTeamOption();
  useEffect(() => {
    if (teamOption && teamOption.length > 0) {
      setSelectedValue(teamOption[0].value);
    }
  }, [teamOption]);

  const handlePress = (player: playerProps) => {
    setPlayerData((prev: playerProps) => ({
      ...prev,
      id: player.id,
      firstName: player.firstName,
      secondName: player.secondName,
      number: player.number,
      team: player.team,
      img: player.img,
    }));
   setIsModalOpen(0)
  };

  return (
    <>
      <Title name={translate.title[language] || translate.title["en"]} />
      {Teams && (
        <TeamPicker Teams={Teams} selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
      )}
      <ItemCenter>
        {players
          ?.filter((player: playerProps) => player.team === selectedValue)
          .map((player: playerProps, i: number) => (
            <ItemBlock
              key={i}
              firstName={player.firstName}
              secondName={player.secondName}
              img={player.img ? player.img : null}
              onPress={() => handlePress(player)}
            />
          ))}
      </ItemCenter>
    </>
  );
};

export default MainPlayers;
