import { useEffect, useState } from "react";

const useFetch = (link: string) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = () => {
          setImage(reader.result);
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    if(link) handleFetch();
  }, [link]);
  return { image };
};

export default useFetch;
