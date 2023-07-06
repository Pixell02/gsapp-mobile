import React, { useContext, useEffect, useState } from 'react'
import { useCollection } from '../../../hooks/useCollection'
import ImageSize from 'react-native-image-size';
import { ThemeOptionContext } from '../context/themeOptionContext';
interface Background {
  uuid: string;
  src: string;
  color: string;
}

interface BackgroundsData {
  backgrounds: Background[];
  selectedBackground: string | null;
  dataURL : string;
  handleFetchBackground: (string) => void;
}

const useBackgrounds = (uid: string): BackgroundsData => {
  
  const { documents: mainBackgrounds } = useCollection("piecesOfPoster", ["uuid", "==", uid])
  const { documents: individualBackgrounds } = useCollection("yourCatalog", ["uuid", "==", uid])
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [dataURL, setDataURL] = useState<string>("");
  const { setPosterInfo } = useContext(ThemeOptionContext);
  useEffect(() => {
    if (mainBackgrounds) {
      setBackgrounds(mainBackgrounds);
      mainBackgrounds?.forEach((item: any) => {
        if(item.uid){
          setPosterInfo(prev => ({
            ...prev,
            posterId: item.uid,
            name: item.name,
            src: item.src
          }))
        }
      });
    } else {
      setBackgrounds(individualBackgrounds);
      mainBackgrounds?.forEach((item: any) => {
        if(item.uid) {
          setPosterInfo(prev => ({
            ...prev,
            posterId: item.uid,
            name: item.name,
            src: item.src
          }))
        }
      });
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
