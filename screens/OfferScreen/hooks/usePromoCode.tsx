import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import moment from "moment/moment";
import { useState } from "react";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import useLanguageContext from "../../../hooks/useLanguageContext";
import translate from "../locales/translate.json";

const usePromoCode = () => {
  const { language } = useLanguageContext();
  const { user } = useAuthContext();

  const [promoCode, setPromoCode] = useState({
    code: ""
  });
  const [usedCode, setUsedCode] = useState("");
  const [alert, setAlert] = useState("");

  const handleUseCode = async (value: string) => {
    let ref = query(collection(db, "promoCode"), where("code", "==", value));

    try {
      const snapshot = await getDocs(ref);
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      if (results.length > 0) {
        const docRef = doc(db, "promoCode", results[0].id);
        if (results[0].amount > 0) {
          if (results[0]?.expireDate && results[0]?.expireDate !== "0") {
            const ref = doc(db, "expirationCode", user.uid);
            const currentDate = moment();
            const futureDate = currentDate.add(results[0].expireDate, "month");
            await setDoc(ref, {
              products: results[0].products,
              code: usedCode,
              expireDate: futureDate.format("MM-DD-YYYY"),
              percentage: results[0].percentage,
              uid: user.uid,
            });
          }
          setPromoCode(results[0]);
          setAlert(translate.success[language]);
        }
        if (results[0].amount === 0) {
          await deleteDoc(docRef);
          setAlert(translate.codeUsed[language]);
        }
      } else {
        setAlert(translate.doesntExist[language]);
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return { promoCode, alert, handleUseCode, usedCode, setUsedCode, setPromoCode };
};

export default usePromoCode;
