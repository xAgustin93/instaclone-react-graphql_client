import { createContext } from "react";

const AuthContext = createContext({
  user: undefined,
});

export default AuthContext;
