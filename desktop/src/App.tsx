import React from "react";
import { Amplify } from "@aws-amplify/core";
import { HashRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";

import awsconfig from "./aws-exports";
import { SignIn } from "./Components/SignIn/SignIn";
import { RequireAuth } from "./Components/Auth/AuthHandlers/RequireAuth";
import { AuthProvider } from "./Components/Auth/AuthHandlers/AuthProvider";
import ReactDOM from "react-dom/client";

Amplify.configure(awsconfig);

// Plugin allows streaming uploads to S3
// Typescript throws an error due to a conflict in the definitions for CredentialsClass, which was not fixed by yarn dependency resolution. Thus, "as any"
// const storagePlugin = new StorageChunkUpload({}, Credentials as any);
// Storage.addPluggable(storagePlugin);
// storagePlugin.configure(awsconfig);

const App: React.FC<{}> = () => (
  <AuthProvider>
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
  </AuthProvider>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <HashRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>
);
