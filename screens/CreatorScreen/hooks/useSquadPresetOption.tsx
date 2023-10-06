import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCollection } from '../../../hooks/useCollection';
import useTeamCollection from '../../../hooks/useTeamCollection';

const useSquadPresetOption = () => {

    const [squadOption, setSquadOption] = useState(null);
    const { user } = useAuthContext();
    const {documents: preset} = useCollection("squadPreset", ["uid","==", user.uid])
    const { documents: LicensePreset} = useTeamCollection("squadPreset");

    useEffect(() => {
        if(preset) {
            const option = preset?.map((item) => ({
            label: item.presetName,
            value: {...item}
        }))
        setSquadOption(prev =>  option)
        }
        if(LicensePreset) {
          const option = LicensePreset?.map((item) => ({
            label: item.presetName,
            value: {...item}
        }))
        setSquadOption(prev =>  option)
        }
    },[preset, LicensePreset])

  return squadOption;
}

export default useSquadPresetOption
