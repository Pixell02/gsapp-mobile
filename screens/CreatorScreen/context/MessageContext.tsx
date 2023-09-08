import { createContext, useState } from "react";



export const MessageContext = createContext(null);


const MessageContextProvider = ({children}) => {
    const [message, setMessage] = useState({});

    const handleMessage = (e: any) => {
    const message = JSON.parse(e.nativeEvent.data);
    setMessage(message)
  };

    return (
        <MessageContext.Provider value={{message, handleMessage}}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageContextProvider;