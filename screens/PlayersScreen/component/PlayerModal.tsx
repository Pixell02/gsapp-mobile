import React from "react";
import { SelectedTeamProvider } from "../../CreatorScreen/context/selectedTeamContext";
import useModalContextProvider from "../../MainPanelScreen/component/hooks/useModalContextProvider";
import AddPlayer from "./AddPlayer";
import AddSquadPreset from "./AddSquadPreset";
import EditPlayer from "./EditPlayer";
import EditSquadPreset from "./EditSquadPreset";

const PlayerModal = (): JSX.Element => {
  const { isModalOpen } = useModalContextProvider();
  return (
    <>
      {isModalOpen === 1 && <AddPlayer />}
      {isModalOpen === 2 && <EditPlayer />}
      {isModalOpen === 3 && (
        <SelectedTeamProvider>
          <AddSquadPreset />
        </SelectedTeamProvider>
      )}
      {isModalOpen === 4 && (
        <SelectedTeamProvider>
          <EditSquadPreset />
        </SelectedTeamProvider>
      )}
    </>
  );
};

export default PlayerModal;
