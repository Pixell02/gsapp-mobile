import { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const useDataContext = () => {

    const context = useContext(DataContext);
    if(!context) {
        throw Error('DataContext')
    }
  return context;
}

export default useDataContext
