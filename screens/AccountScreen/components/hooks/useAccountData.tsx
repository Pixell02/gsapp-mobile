import React, { useEffect, useState } from "react";
import { collection, deleteDoc, deleteField, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { db } from "../../../../firebase/config";

const useAccountData = (accounts, License) => {
  const { user } = useAuthContext();
  const [accountData, setAccountData] = useState("");
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    if (accounts?.users?.length > 0) {
      setUsers(accounts.users);
    }
  }, [accounts]);

  const handleDeleteTeam = async () => {
    const ref = doc(db, "teamAccounts", accounts.id);
    users.forEach(async (users) => {
      const q = query(collection(db, "user"), where("uid", "==", users.uid));
      const userSnapshot = await getDocs(q);
      let userId;
      userSnapshot.forEach((doc) => {
        userId = doc.id;
      });
      const userRef = doc(db, "user", userId);
      updateDoc(userRef, {
        team: deleteField(),
      });
    });
    await deleteDoc(ref);
  };

  const handleDeleteUser = async (id: string) => {
    const ref = doc(db, "teamAccounts", accounts.id);
    const q = query(collection(db, "user"), where("uid", "==", id));
    const userSnapshot = await getDocs(q);
    let userId;
    userSnapshot.forEach((doc) => {
      userId = doc.id;
    });
    const userRef = doc(db, "user", userId);
    updateDoc(userRef, {
      team: deleteField(),
    });

    const filteredUsers = users.filter((user) => user.uid !== id);
    updateDoc(ref, {
      users: filteredUsers,
    });
  };

  const handleAddUser = async (accountData: string) => {
    const q = query(collection(db, "email"), where("email", "==", accountData));
    const querySnapshot = await getDocs(q);
    let userEmail;
    querySnapshot.forEach((doc) => {
      userEmail = doc.data();
    });
    if (userEmail) {
      const q2 = query(collection(db, "user"), where("uid", "==", userEmail.uid));
      const snapshot = await getDocs(q2);
      let userTeam;
      snapshot.forEach((doc) => {
        userTeam = doc.data();
      });
        if (userTeam.team) {
          setAlert("użytkownik już został dodany do grupy, bądź jest już do jakieś przypisany");
        } else {
          const ref = doc(db, "teamAccounts", accounts.id);
          updateDoc(ref, {
            users: [
              ...users,
              {
                email: userEmail.email,
                uid: userEmail.uid,
              },
            ],
          });
          const licenseQuery = query(collection(db, "user"), where("uid", "==", userEmail.uid));
          const querySnapshot = await getDocs(licenseQuery);
          let result;
          querySnapshot.forEach((doc) => {
            result = doc.id;
          });
          const userRef = doc(db, "user", result);
          if (License.license === "full-license") {
            setDoc(userRef, {
              license: "full-license",
              expireDate: License.expireDate,
              team: user.uid,
              uid: userEmail.uid,
            });
          } else {
            updateDoc(userRef, {
              team: user.uid,
            });
          }
          setAlert("użytkownik dodany");
        }
    } else {
      setAlert("użytkownik nie istnieje");
    }
  };

  return { accountData, setAccountData, handleAddUser, alert, handleDeleteUser, handleDeleteTeam };
};

export default useAccountData;
