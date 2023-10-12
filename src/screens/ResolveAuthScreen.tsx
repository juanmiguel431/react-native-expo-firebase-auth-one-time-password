import React, { useContext, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { ResolveAuthScreenProps } from '../models/screen';
import { AuthContext } from '../context/auth-context';

const ResolveAuthScreen: React.FC<ResolveAuthScreenProps> = () => {
  const { setLogin } = useContext(AuthContext);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      setLogin(user);
    });
  }, [setLogin]);

  return null;
};

export default ResolveAuthScreen;
