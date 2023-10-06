import { useContext } from 'react';
import { ThemeOptionContext } from '../context/themeOptionContext';

const useThemeOption = () => {
  const context = useContext(ThemeOptionContext);
    if(!context) {
        throw Error('TeamContext ')
    }

    return context
}

export default useThemeOption
