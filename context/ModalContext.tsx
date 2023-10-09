import React, { createContext, useState } from "react";



export const ModalContext = createContext(null);

interface props {
    children: React.ReactNode
}

export const ModalContextProvider = ({children}: props) => {

    const [isModalOpen, setIsModalOpen] = useState<number>(0);


    return (
        <ModalContext.Provider value={{isModalOpen, setIsModalOpen}}>
            {children}
        </ModalContext.Provider>
    )
}