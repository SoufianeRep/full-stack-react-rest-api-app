import { createContext, useState } from "react";
import Cookies from "js-cookie";
import Data from "../data";

export const Context = createContext();

export const Provider = ({ children }) => {
  const data = new Data();
  const [authUser, setAuthUser] = useState(Cookies.get("authUser") || null);
  const [values] = useState({
    data,
    authUser,
    actions: { signIn, signOut },
  });

  async function signIn(credentials) {
    return await data.getUser("/users", credentials).then((res) => {
      setAuthUser(res.user.firstName);
      Cookies.set("authUser", res.user.firstName);
      return res.user;
    });
  }
  function signOut() {
    setAuthUser(null);
    Cookies.remove("authUser");
  }

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
