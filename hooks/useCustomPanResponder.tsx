import { useRef, useEffect } from 'react';
import { PanResponder, BackHandler } from 'react-native';

const useCustomPanResponder = (isOpen, setIsOpen, data?, id?) => {
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy > 0 && gestureState.vy > 0;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          setIsOpen(false);
          if(data){
          data(prev => ({
            ...prev,
            firstName: "",
            secondName: "",
            img: "",
            sport: "",
          }))
        }
        if(id) {
          id("")
        }
        }
      },
    })
  ).current;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Obsługa naciśnięcia przycisku cofnij
      setIsOpen(false);
      if(data){
      data(prev => ({
        ...prev,
        firstName: "",
        secondName: "",
        img: "",
        sport: "",
      }));
      
    }
    if(id) {
      id("")
    }
      // Zwrócenie true uniemożliwia domyślne zachowanie przycisku cofnij (np. zamknięcie aplikacji)
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, [isOpen, setIsOpen, data]);

  return panResponder;
};

export default useCustomPanResponder;
