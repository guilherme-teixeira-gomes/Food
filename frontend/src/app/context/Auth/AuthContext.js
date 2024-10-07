import React, { createContext } from "react";

import useAuth from "../../hooks/useAuth.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const {
    loading,
    user,
    typeUser,
    isAuth,
    handleLogin,
    handleLogout,
    customValidation,
    handleLoginAdmins,
    handleLoginAmtech,
    handleValidateToken,
    handlerSignupOperadora,
  } = useAuth();

	return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        typeUser,
        isAuth,
        handleLogin,
        handleLogout,
        customValidation,
        handleLoginAdmins,
        handleLoginAmtech,
        handleValidateToken,
        handlerSignupOperadora
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
