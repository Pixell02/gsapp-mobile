import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

const useModalContextProvider = () => {
    const context = useContext(ModalContext);
    if(!context) {
        throw Error ("ModalContext")
    }
  return context
}

export default useModalContextProvider
