import React, { useState } from 'react';
import { CognitoUser } from '@aws-amplify/auth';
import { UserContext } from '../../../Context/UserContext';

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [user, setUser] = useState<CognitoUser | null>(null);

  const signOut = () => setUser(null);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const userContext = { user, setUser, signOut }; // TODO: investigate eslint rule //

  return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
};
