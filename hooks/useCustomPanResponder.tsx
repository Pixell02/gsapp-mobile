import { useRef } from 'react';
import { PanResponder } from 'react-native';

const useCustomPanResponder = (isOpen, setIsOpen, data?, id?) => {
  
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy > 0 && gestureState.vy > 0;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          setIsOpen(typeof isOpen === 'number' ? 0 : false);
          if (data) {
            data(prev => ({
              ...prev,
              firstName: "",
              secondName: "",
              img: "",
              sport: "",
            }))
          }
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
