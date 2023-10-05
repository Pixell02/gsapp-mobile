import { useRef } from 'react';
import { PanResponder } from 'react-native';

interface Props {
  data?: {
    firstName: string;
    secondName: string;
    img: string;
    sport: string;
  };
  id?: (value: string) => void;
}

const useCustomPanResponder = ( 
  isOpen: number | boolean,
  setIsOpen: (value: number | boolean) => void,
  id?: Props['id']) => {
  
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy > 0 && gestureState.vy > 0;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          setIsOpen(typeof isOpen === 'number' ? 0 : false);
          if (id) {
            id("")
          }
        }
      },
    })
  ).current;

  

  return panResponder;
};

export default useCustomPanResponder;
