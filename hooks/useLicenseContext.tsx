import { useContext } from 'react';
import { LicenseContext } from '../screens/CreatorScreen/context/licenseContext';


const useLicenseContext = () => {

    const context = useContext(LicenseContext);
    if(!context) {
        throw Error("LicenseContext error")
    }

  return context
}

export default useLicenseContext
