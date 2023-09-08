import React, { useState } from "react";
import AddTeam from "./AddTeam";
import EditTeam from "./EditTeam";
import AddTrainer from "./AddTrainer";
import EditTrainer from "./EditTrainer";

interface props {
  isOpen: boolean;
  setIsOpen: () => void;
  teamData: any;
  setTeamData: any;
  isEditOpen: boolean;
  setIsEditOpen: () => void;
  isTrainerOpen: boolean;
  setIsTrainerOpen: any;
  trainerData: any;
  setTrainerData: any;
  isEditTrainerOpen: boolean;
  setIsEditTrainerOpen: any;
}

export default function TeamModal({
  isOpen,
  setIsOpen,
  teamData,
  setTeamData,
  isEditOpen,
  setIsEditOpen,
  isTrainerOpen,
  setIsTrainerOpen,
  trainerData,
  setTrainerData,
  isEditTrainerOpen,
  setIsEditTrainerOpen
}: props) {
  return (
    <>
      {isOpen && <AddTeam isOpen={isOpen} setIsOpen={setIsOpen} teamData={teamData} setTeamData={setTeamData} />}
      {isEditOpen && (
        <EditTeam isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} teamData={teamData} setTeamData={setTeamData} />
      )}
      {isTrainerOpen && (
        <AddTrainer
          isTrainerOpen={isTrainerOpen}
          trainerData={trainerData}
          setTrainerData={setTrainerData}
          setIsTrainerOpen={setIsTrainerOpen}
        />
      )}
      {isEditTrainerOpen && (
        <EditTrainer 
          trainerData={trainerData}
          setTrainerData={setTrainerData}
          isEditTrainerOpen={isEditTrainerOpen}
          setIsEditTrainerOpen={setIsEditTrainerOpen}
        />
      )}
    </>
  );
}
