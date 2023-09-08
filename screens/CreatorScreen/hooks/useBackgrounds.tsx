import { useContext, useEffect, useState } from 'react';
import { useCollection } from '../../../hooks/useCollection';
import { ThemeOptionContext } from '../context/themeOptionContext';
interface Background {
  uuid: string;
  src: string;
  color: string;
}



const useBackgrounds = (uid: string) => {
  
  const { documents: mainBackgrounds } = useCollection("piecesOfPoster", ["uuid", "==", uid])
  const { documents: individualBackgrounds } = useCollection("yourCatalog", ["uuid", "==", uid])
  const { setPosterInfo } = useContext(ThemeOptionContext);
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [dataURL, setDataURL] = useState<string>("");
  useEffect(() => {
    if (mainBackgrounds?.length > 0) {
      setBackgrounds(mainBackgrounds);
      mainBackgrounds?.forEach((item: any) => {
        console.log(item.uid)
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
      individualBackgrounds?.forEach((item: any) => {
        if(item.uuid) {
          setPosterInfo(prev => ({
            ...prev,
            posterId: item.uid,
            name: item.color,
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
