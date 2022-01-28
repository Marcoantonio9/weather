import React from 'react';

export const GlobalContext = React.createContext()

export const GlobalStorage = ({children}) => {
  const [nome, setNome] = React.useState('Marco')

  return (
    <GlobalContext.Provider value={{nome, setNome}}>
      {children}
    </GlobalContext.Provider>
  )
}