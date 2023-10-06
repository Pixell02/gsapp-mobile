import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import useTeamCollection from "../../../hooks/useTeamCollection";

interface presetProps {
  place: string;
}

const usePlacePresetOption = () => {
  const [placePreset, setPlacePreset] = useState([]);
  const { user } = useAuthContext();
  const { documents: preset } = useCollection("placePreset", [
    "uid",
    "==",
    user.uid,
  ]);
  const { documents: LicensedPreset } = useTeamCollection("placePreset");
  useEffect(() => {
    if (preset?.length > 0) {
      const option = preset?.map((item: presetProps) => ({
        label: item.place,
        value: item.place,
      }));
      setPlacePreset(prev => option);
    }
    if(LicensedPreset?.length > 0) {
        const option = LicensedPreset.map((item: presetProps) => ({
        label: item.place,
        value: item.place,
      }));
      setPlacePreset(prev => option);
    }
  }, [preset, LicensedPreset]);

  return { placePreset };
};

export default usePlacePresetOption;
