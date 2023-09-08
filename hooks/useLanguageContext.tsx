import React, { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'

const useLanguageContext = () => {

  const context = useContext(LanguageContext);
  if (!context) {
    throw Error ("langaugeContext")
  }

  return context
}

export default useLanguageContext
