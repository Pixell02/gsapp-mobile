import { createContext, useEffect } from "react";
import moment from "moment";
import React from 'react'
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import usePromoCode from "../hooks/usePromoCode";

export const PromoCodeContext = createContext(null);




const PromoCodeProvider = ({children}) => {

  const {user} = useAuthContext();
  const {documents: promoDocs} = useCollection("expirationCode", ["uid", "==", user.uid])
  const { promoCode, alert, handleUseCode, usedCode, setUsedCode, setPromoCode } = usePromoCode();
  useEffect(() => {
    if (promoDocs?.length > 0) {
      setPromoCode(promoDocs[0])
      const currentDate = moment()
      const dayAfter = currentDate.add(1, "day");
      if (dayAfter.format("MM-DD-YYYY") === promoDocs[0].expireDate) {
        const docRef = doc(db, "expirationCode", promoDocs[0].id);
        deleteDoc(docRef);
      }
    }
  },[promoDocs])

  return (
    <PromoCodeContext.Provider value={{promoCode, alert, handleUseCode, usedCode, setUsedCode}}>
      {children}
    </PromoCodeContext.Provider>
  )
}

export default PromoCodeProvider
