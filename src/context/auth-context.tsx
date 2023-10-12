import React, { createContext, PropsWithChildren, useMemo, useState } from 'react';
import { User } from 'firebase/auth';

type AuthContext = {
  isLogin: boolean | null;
  user: User | null;
  setLogin: (user: User | null) => void;
}

const defaultValue: AuthContext = { isLogin: null, user: null, setLogin: () => {}};

export const AuthContext = createContext(defaultValue);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({ children}) => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(() => {
    return {
      isLogin: isLogin,
      user: user,
      setLogin: (user: User) => {
        setUser(user);
        setIsLogin(!!user);
      }
    }
  }, [isLogin, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
