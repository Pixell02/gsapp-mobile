import { useEffect, useState } from 'react';
import useLicenseContext from './useLicenseContext';

const useTeamUid = () => {

  const [uid, setUid] = useState(null);
  const {license} = useLicenseContext();
  useEffect(() => {
    license?.team && setUid(license.team);
  },[license])

  return uid
}

export default useTeamUid
