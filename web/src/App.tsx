import React, { useState } from 'react';
import { Amplify } from '@aws-amplify/core';
import { CognitoUser } from '@aws-amplify/auth';
import styles from './App.module.css';

import awsconfig from './aws-exports';
import { SignIn } from './Components/SignIn/SignIn';
import { UserContext } from './Context/UserContext';
import { UploadHandler } from './Components/Upload/UploadHandler';

Amplify.configure(awsconfig);

// Plugin allows streaming uploads to S3
// Typescript throws an error due to a conflict in the definitions for CredentialsClass, which was not fixed by yarn dependency resolution. Thus, "as any"
// const storagePlugin = new StorageChunkUpload({}, Credentials as any);
// Storage.addPluggable(storagePlugin);
// storagePlugin.configure(awsconfig);

const App: React.FC<{}> = () => {
  const [user, setUser] = useState<CognitoUser | null>(null);
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const userContext = { user, setUser }; // TODO: investigate eslint rule //

  return (
    <div className={styles.App}>
      <UserContext.Provider value={userContext}>
        {!user && <SignIn />}
        {!!user && <UploadHandler signOut={() => setUser(null)} />}
      </UserContext.Provider>
    </div>
  );
};

export default App;
