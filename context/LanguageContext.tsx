import * as Localization from "expo-localization";
import React, { createContext, useEffect, useState } from 'react';

const LanguageContext = createContext<Partial<any>>({});

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('');
  
  useEffect(() => {
    const currentLocale = Localization.locale.split('-')[0];
    setLanguage(currentLocale || 'en');
  }, []);
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };

