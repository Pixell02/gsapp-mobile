import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

// Firebase Firestore imports
import { CollectionReference, DocumentData, Query, QuerySnapshot, collection, onSnapshot, query, where } from 'firebase/firestore';



export const useCollection = (c: string, _q?: any[]) => {
  const [documents, setDocuments] = useState<DocumentData | null>(null);
  console.log(_q)
  useEffect(() => {
    const fetchData = async () => {
     let ref: CollectionReference | Query = collection(db, c);

      if (_q) {
        ref = query(ref, where(_q[0], _q[1], _q[2])); // Use the collection reference here, not query
      }

      const unsub = onSnapshot(ref, (snapshot: QuerySnapshot<DocumentData>) => {
        const results: DocumentData[] = [];

        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id } as DocumentData);
        });

        // If you want to store all documents matching the query, you can update state accordingly
        setDocuments(results);
      });

      return () => unsub();
    };

    fetchData();
  }, [c]);

  return { documents };
};
