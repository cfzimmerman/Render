import React from "react";
import { Amplify } from "@aws-amplify/core";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";

import awsconfig from "./aws-exports";
import { SignIn } from "./Components/SignIn/SignIn";
import { RequireAuth } from "./Components/Auth/AuthHandlers/RequireAuth";
import ReactDOM from "react-dom/client";
import { Main } from "./Routes/Main/Main";
import { AuthProvider } from "./Components/Auth/AuthHandlers/AuthProvider";

Amplify.configure(awsconfig);

const App: React.FC<{}> = () => {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        {/* <Route element={<RequireAuth />}> */}
        <Route path="/" element={<Main />} />
        {/* </Route> */}
        <Route path="/not-found" element={<h1>Not found</h1>} />
        <Route path="/*" element={<h1>Not found</h1>} />
      </Routes>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
  <AuthProvider>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </AuthProvider>
  // </React.StrictMode>
);
