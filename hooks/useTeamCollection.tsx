import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import useLicenseContext from "./useLicenseContext";

function useTeamCollection(c: string) {
  const [documents, setDocuments] = useState(null);
  const { license } = useLicenseContext();
  console.log(license.team)
  useEffect(() => {
    if (license.team) {
      const ref = query(collection(db, c), where("uid", "==", license.team));
      onSnapshot(ref, (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(results);
      });
    }
  }, [c, license]);

  return { documents };
}

export default useTeamCollection;
