import { useEffect, useState } from 'react'

export default function useCreateOpponentGoals(initialState) {
    const [opponentGoals, setOpponentGoals] = useState(initialState);
    const [opponentGoalMinute, setOpponentGoalMinute] = useState(initialState);
    const handleOpponentGoalChange = (e, i) => {
        const newGoalValue = [...opponentGoals];
        newGoalValue[i] = e;
        setOpponentGoals(newGoalValue);
    }
    const handleOpponentMinuteChange = (e, i) => {
        const newMinuteValue = [...opponentGoalMinute];
        newMinuteValue[i] = e;
        setOpponentGoalMinute(newMinuteValue);
        
    }
    
    return {opponentGoals, handleOpponentGoalChange, handleOpponentMinuteChange, opponentGoalMinute}
}
