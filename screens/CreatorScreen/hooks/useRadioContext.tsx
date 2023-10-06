import { useContext } from "react";
import RadioContext from "../context/radioContext";

const useRadioContext = () => {
  const context = useContext(RadioContext);
  if (!context) {
    throw Error("RadioContext '");
  }

  return context;
};

export default useRadioContext;
