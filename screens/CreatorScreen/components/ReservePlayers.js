import React from 'react'

export default function ReservePlayers({reserve, playerOptions,  handleReserveChange}) {
    
  return (
    <div>
      {reserve && reserve.map((reserve, i) => (
        <>
            <label>Rezerowy {i + 1}</label>
            {/* <Select options={playerOptions} onChange={(option) => handleReserveChange(option, i)} /> */}
        </>
      ))}
    </div>
  )
}
