import React from "react";
import useModalContextProvider from "../../MainPanelScreen/component/hooks/useModalContextProvider";
import AddOpponent from "./AddOpponent";
import AddPlace from "./AddPlace";
import EditOpponent from "./EditOpponent";
import EditPlace from "./EditPlace";

export default function OpponentModal() {
  const { isModalOpen } = useModalContextProvider();

  return (
    <>
      {isModalOpen === 1 && <AddOpponent />}
      {isModalOpen === 2 && <EditOpponent />}
      {isModalOpen === 3 && <AddPlace />}
      {isModalOpen === 4 && <EditPlace />}
    </>
  );
}
