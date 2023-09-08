import React from "react";
import EditPlayer from "./EditPlayer";
import AddPlayer from "./AddPlayer";
import AddSquadPreset from "./AddSquadPreset";
import { SelectedTeamProvider } from "../../CreatorScreen/context/selectedTeamContext";
import EditSquadPreset from "./EditSquadPreset";

const PlayerModal = ({ isOpen, setIsOpen, playerData, setPlayerData, squadData, setSquadData }) => {
  return (
    <>
      {isOpen === 1 && <AddPlayer isOpen={isOpen} setIsOpen={setIsOpen} teamData={playerData} setTeamData={setPlayerData} />}
      {isOpen === 2 && (
        <EditPlayer
          isEditOpen={isOpen}
          setIsEditOpen={setIsOpen}
          teamData={playerData}
          setTeamData={setPlayerData}
        />
      )}
      {isOpen === 3 && (
        <SelectedTeamProvider>
          <AddSquadPreset
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setSquadData={setSquadData}
          />
        </SelectedTeamProvider>
      )}
      {isOpen === 4 && (
        <SelectedTeamProvider>
          <EditSquadPreset
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setSquadData={setSquadData}
            data={squadData}
          />
        </SelectedTeamProvider>
      )}
    </>
  );
};

export default PlayerModal;
