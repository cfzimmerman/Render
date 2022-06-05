import React, { useState } from 'react';
import { Amplify } from '@aws-amplify/core';
import { CognitoUser } from '@aws-amplify/auth';
import styles from './App.module.css';

import awsconfig from './aws-exports';
import { SignIn } from './Components/SignIn/SignIn';
import { UserContext } from './Context/UserContext';

Amplify.configure(awsconfig);

const App: React.FC<{}> = () => {
  const [user, setUser] = useState<CognitoUser | null>(null);
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const userContext = { user, setUser }; // TODO: investigate eslint rule //

  return (
    <div className={styles.App}>
      <UserContext.Provider value={userContext}>
        {!user && <SignIn />}
        {!!user && <h1>Signed in</h1>}
      </UserContext.Provider>
    </div>
  );
};

export default App;
