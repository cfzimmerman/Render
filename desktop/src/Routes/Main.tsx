import React, { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";

export const Main: React.FC<{}> = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const filesystemOps = async () => {
      window.electron.invokeFsOpen();
    };
    filesystemOps();
    console.log("main: ", user, setUser);
  }, []);

  return <h1>Logged in!</h1>;
};
