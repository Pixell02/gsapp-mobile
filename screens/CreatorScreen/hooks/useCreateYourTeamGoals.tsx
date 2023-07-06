import React, { useState } from 'react'
import { useCollection } from '../../../hooks/useCollection';

export default function useCreateYourTeamGoals(initialState) {
    const [yourTeamGoal, setYourTeamGoal] = useState(initialState);
    const [yourTeamGoalMinute, setYourTeamGoalMinute] = useState(initialState);
   
    const handleGoalChange = (option, i) => {
        const newGoalValue = [...yourTeamGoal];
        newGoalValue[i] = option;
        setYourTeamGoal(newGoalValue);
    }
    const handleYourTeamMinuteChange = (e, i) => {
        const newMinuteValue = [...yourTeamGoalMinute];
        newMinuteValue[i] = e;
        setYourTeamGoalMinute(newMinuteValue);
        
    }

    return {yourTeamGoal, handleGoalChange, handleYourTeamMinuteChange, yourTeamGoalMinute};
}
