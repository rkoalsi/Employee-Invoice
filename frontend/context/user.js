import { createContext, useContext } from 'react';
import usePersistState from '../hooks/usePersistState';
const Context = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = usePersistState('userData', { loading: true });

  return (
    <Context.Provider value={[user, setUser]}>{children}</Context.Provider>
  );
}

export function useUserContext() {
  return useContext(Context);
}
