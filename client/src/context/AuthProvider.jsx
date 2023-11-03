import React from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../assets/service/User";

export const AuthProvider = (props) => {
  const [isLogged, setIsLogged] = React.useState(false);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsLogged(true);
      User().then((data) => {
        setUser(data);
      });
    }
  }, [isLogged]);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
