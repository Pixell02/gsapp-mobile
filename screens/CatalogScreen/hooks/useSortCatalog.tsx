import { useEffect, useState } from 'react';

export interface catalogProps {
    theme: string;
    id: string
}

const useSortCatalog = (catalog: catalogProps[]) => {

    const [theme, setTheme] = useState<catalogProps[]>([]);

    useEffect(() => {
      if (catalog) {
        const sortedCatalog = [...catalog];
        sortedCatalog.sort((a, b) => {
          const numA = parseInt(a.theme.split(" ")[1]);
          const numB = parseInt(b.theme.split(" ")[1]);
          return numA - numB;
        });
        setTheme(sortedCatalog);
      }
    }, [catalog]);



  return theme;
}

export default useSortCatalog
