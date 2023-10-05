import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase/config';
import useLanguageContext from '../../../hooks/useLanguageContext';
import useTeamContext from './useTeamContext';

const useSelectSport = () => {
 
  const { language } = useLanguageContext();
  const [lang, setLang] = useState(language);
  const { selectedSportKeys, sportOptions, setSelectedSportKeys } = useTeamContext();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, 'catalog'), // Zastąp "nazwa_kolekcji" nazwą kolekcji w swojej bazie Firestore
          where('sport', '==', selectedSportKeys),
          where('lang', '==', "pl"),
          where('public', '==', true)
        );

        const querySnapshot = await getDocs(q);

        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Dodane pole id
          ...doc.data(),
        }));
        setData(documents);
      } catch (error) {
        console.error('Błąd pobierania danych z Firestore:', error);
      }
    };
    if(selectedSportKeys){
      fetchData();
    } else {
      setData([]);
    }
  }, [language, selectedSportKeys]);
 
 
  return {data, sportOptions, selectedSportKeys, setSelectedSportKeys, lang, setLang}
}

export default useSelectSport;
