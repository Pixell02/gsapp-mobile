import React, { useEffect, useState } from 'react'
import { useCollection } from '../../../hooks/useCollection'

interface Background {
  uuid: string;
  src: string;
  color: string;
}

interface BackgroundsData {
  backgrounds: Background[];
  selectedBackground: Background | null;
  dataURL : string;
  handleFetchBackground: (string) => void;
}

const useBackgrounds = (uid: string): BackgroundsData => {
  const { documents: mainBackgrounds } = useCollection("piecesOfPoster", ["uuid", "==", uid])
  const { documents: individualBackgrounds } = useCollection("yourCatalog", ["uuid", "==", uid])
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [dataURL, setDataURL] = useState<string>("");
  useEffect(() => {
    if (mainBackgrounds) {
      setBackgrounds(mainBackgrounds)
    } else {
      setBackgrounds(individualBackgrounds)
    }
  }, [mainBackgrounds, individualBackgrounds])


  const handleFetchBackground = (background: string) => {
    
    fetch(background.split("...")[0])
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setDataURL(reader.result as string);
          setSelectedBackground(background)
        }
      })
      .catch((err) => {
        console.log(err)
        setDataURL("");
      })
  }
  


  return { backgrounds, selectedBackground, dataURL, handleFetchBackground}
}

export default useBackgrounds
