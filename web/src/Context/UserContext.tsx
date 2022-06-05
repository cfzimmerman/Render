import { CognitoUser } from '@aws-amplify/auth';
import { createContext } from 'react';

export interface UserContextObj {
  user: CognitoUser | null;
  setUser: (user: CognitoUser | null) => void;
}

export const UserContext = createContext<UserContextObj>({
  user: null,
  setUser: () => {}
});
