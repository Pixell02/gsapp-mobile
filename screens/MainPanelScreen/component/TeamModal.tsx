import React from "react";
import AddTeam from "./AddTeam";
import AddTrainer from "./AddTrainer";
import EditTeam from "./EditTeam";
import EditTrainer from "./EditTrainer";
import useModalContextProvider from "./hooks/useModalContextProvider";

export default function TeamModal() {
  const { isModalOpen } = useModalContextProvider();

  return (
    <>
      {isModalOpen === 1 && <AddTeam />}
      {isModalOpen === 2 && <EditTeam />}
      {isModalOpen === 3 && <AddTrainer />}
      {isModalOpen === 4 && <EditTrainer />}
    </>
  );
}
