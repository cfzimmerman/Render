import React, { useEffect, useState } from "react";
import { Amplify } from "@aws-amplify/core";
import { HashRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";

import awsconfig from "./aws-exports";
import { SignIn } from "./Components/SignIn/SignIn";
import { RequireAuth } from "./Components/Auth/AuthHandlers/RequireAuth";
import ReactDOM from "react-dom/client";
import { CognitoUser } from "@aws-amplify/auth";
import { UserContext } from "./Context/UserContext";

Amplify.configure(awsconfig);

const App: React.FC<{}> = () => {
  const [user, setUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, signOut: () => setUser(null) }}
    >
      <div className={styles.App}>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<h1>logged in</h1>} />
          </Route>
          <Route path="/login" element={<SignIn />} />
          <Route path="/not-found" element={<h1>Not found</h1>} />
          <Route path="/*" element={<h1>Not found</h1>} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
