// Auth0Context.js
import React from "react";

// This is a simplified version, please adjust as needed.
const Auth0Context = React.createContext({
  isAuthenticated: true,
  user: { name: "Test User", email: "test.user@test.com" },
  loginWithRedirect: () => {},
  logout: () => {}
});

export default Auth0Context;