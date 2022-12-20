import React, { useMemo, useState } from "react";
import { CognitoUser } from "@aws-amplify/auth";
import { UserContext } from "../Context/UserContext";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [user, setUser] = useState<CognitoUser | null>(null);

  const signOut = () => setUser(null);

  const userContext = useMemo(
    () => ({ user, setUser, signOut }),
    [user, setUser, signOut]
  );

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};
