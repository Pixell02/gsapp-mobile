import React from "react";
import AddOpponent from "./AddOpponent";
import EditOpponent from "./EditOpponent";
import AddPlace from "./AddPlace";
import EditPlace from "./EditPlace";

interface props {
  isOpen: number;
  setIsOpen: () => void;
  setOpponentData: (value) => void;
  place: object;
  setPlace: (value) => void;
  opponentData: object;
}

export default function OpponentModal(props: props) {
  return (
    <>
      {props.isOpen === 1 && (
        <AddOpponent
          isOpen={props.isOpen}
          setIsOpen={props.setIsOpen}
          teamData={props.opponentData}
          setTeamData={props.setOpponentData}
        />
      )}
      {props.isOpen === 2 && (
        <EditOpponent
          isOpen={props.isOpen}
          setIsOpen={props.setIsOpen}
          teamData={props.opponentData}
          setTeamData={props.setOpponentData}
        />
      )}
      {props.isOpen === 3 && <AddPlace isOpen={props.isOpen} setIsOpen={props.setIsOpen} setData={props.isOpen} />}
      {props.isOpen === 4 && (
        <EditPlace isOpen={props.isOpen} setIsOpen={props.setIsOpen} setData={props.setPlace} data={props.place} />
      )}
    </>
  );
}
