import React, { useEffect, useState } from 'react'
import { useCollection } from './useCollection';
import { useAuthContext } from './useAuthContext';

const useTeamUid = () => {

  const [uid, setUid] = useState(null);
  const {user} = useAuthContext();
  const {documents: license} = useCollection("user", ["uid","==", user.uid]);
  
  useEffect(() => {
    license?.team && setUid(license.team);
  },[license])

  return uid
}

export default useTeamUid
