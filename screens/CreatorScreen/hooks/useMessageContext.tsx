import { useContext } from 'react'
import { MessageContext } from '../context/messageContext'

const useMessageContext = () => {

    const context = useContext(MessageContext)

    if(!context) {
        throw Error("!messageContext")
    }
    
  return context
}

export default useMessageContext
