import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../../firebase/config';

const useHandleTeamData = () => {

    const deleteData = async(user: string, firstName: string, secondName: string) => {
  
  const playerRef = collection(db, "Players");
  const opponentRef = collection(db, "Opponents");
  const playerQuery = query(playerRef, where("uid", "==", user), where("team", "==", firstName + " " + secondName));
  const opponentQuery = query(opponentRef, where("uid", "==", user), where("team", "==", firstName + " " + secondName));

  const playerSnapshots = await getDocs(playerQuery);
  const opponentSnapshots = await getDocs(opponentQuery);

const playerPromises = playerSnapshots.docs.map(async (snap) => {
  const docRef = doc(db, "Players", snap.id);
  return await deleteDoc(docRef)
  
})

const opponentPromises = opponentSnapshots.docs.map(async (snap) => {
    const docRef = doc(db, "Opponents", snap.id)
    return await deleteDoc(docRef)
});

  await Promise.all([...playerPromises, ...opponentPromises]);


}

    const updateData = async (user: string, oldName: string, firstName: string, secondName: string) => {
  
    const playerRef = collection(db, "Players");
    const opponentRef = collection(db, "Opponents");
    const playerQuery = query(playerRef, where("uid", "==", user), where("team", "==", oldName));
    const opponentQuery = query(opponentRef, where("uid", "==", user), where("team", "==", oldName));

    const playerSnapshots = await getDocs(playerQuery);
    const opponentSnapshots = await getDocs(opponentQuery);

  const playerPromises = playerSnapshots.docs.map(async (snap) => {
    const docRef = doc(db, "Players", snap.id);
    return await updateDoc(docRef, {
      team: firstName + " " + secondName
    })
    
  })
  
  const opponentPromises = opponentSnapshots.docs.map(async (snap) => {
      const docRef = doc(db, "Opponents", snap.id)
      return await updateDoc(docRef, {
        team: firstName + " " + secondName
      })
  });

    await Promise.all([...playerPromises, ...opponentPromises]);

    
  
};
  return {deleteData, updateData};
}

export default useHandleTeamData
