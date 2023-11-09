import React, { Fragment, useState, useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";

import Dashboard from "./shared/components/Navigation/Dashboard";
import Login from "./auth/pages/Login";

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [userRole, setUserRole] = useState(false);

  const login = useCallback((uid, token, userRole) => {
    setUserId(uid);
    setToken(token);
    setUserRole(userRole);

    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, userRole: userRole, token: token })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserRole(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (storedData) {
      login(storedData.userId, storedData.token, storedData.userRole);
    }
  }, [login]);

  let routes;

  if (token) {
    routes = (
      <Fragment>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<Navigate replace to="/dashboard/home" />} />
      </Fragment>
    );
  } else {
    routes = (
      <Fragment>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLogged: !!token,
        token: token,
        userId: userId,
        userRole: userRole,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <Routes>{routes}</Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
