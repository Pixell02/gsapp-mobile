import { useEffect, useState } from "react";
import { useCollection } from "../../../hooks/useCollection";
import useFetch from "../../../hooks/useFetch";
import useThemeOption from "./useThemeOption";
interface Background {
  uuid: string;
  src: string;
  color: string;
}

interface backgroundProps {
  uuid: string;
  uid: string;
  name: string;
  src: string;
  color: string
}

interface posterInfoProps {
  posterId: string;
  name: string;
  src: string;
}

const useBackgrounds = (uid: string) => {
  const { documents: mainBackgrounds } = useCollection("piecesOfPoster", [
    "uuid",
    "==",
    uid,
  ]);
  const { documents: individualBackgrounds } = useCollection("yourCatalog", [
    "uuid",
    "==",
    uid,
  ]);
  const { setPosterInfo, setSelectedTheme } = useThemeOption();
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const { image: dataURL } = useFetch(selectedBackground?.src);
  const { image: additionalLayer } = useFetch(
    selectedBackground?.additionalLayer
  );

  useEffect(() => {
    if (selectedBackground) {
      setSelectedTheme(selectedBackground.color);
    }
  }, [selectedBackground]);

  useEffect(() => {
    if (backgrounds?.length > 0) {
      setSelectedBackground(backgrounds[0]);
    }
  }, [backgrounds]);

  useEffect(() => {
    if (mainBackgrounds?.length > 0) {
      setBackgrounds(mainBackgrounds[0]);
      mainBackgrounds?.forEach((item: backgroundProps) => {
        if (item.uid) {
          setPosterInfo((prev: posterInfoProps) => ({
            ...prev,
            posterId: item.uid,
            name: item.name,
            src: item.src,
          }));
        }
      });
    } else {
      setBackgrounds(individualBackgrounds[0]);
      individualBackgrounds?.forEach((item: backgroundProps) => {
        if (item.uuid) {
          setPosterInfo((prev: posterInfoProps) => ({
            ...prev,
            posterId: item.uid,
            name: item.color,
            src: item.src,
          }));
        }
      });
    }
  }, [mainBackgrounds, individualBackgrounds]);

  return { backgrounds, selectedBackground, setSelectedBackground, dataURL, additionalLayer };
};

export default useBackgrounds;

