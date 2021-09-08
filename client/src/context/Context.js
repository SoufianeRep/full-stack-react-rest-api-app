import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Data from "../data";

export const Context = createContext();

export const Provider = ({ children }) => {
  const data = new Data();
  const [cookie, setCookies, removeCookies] = useCookies();

  async function signIn(credentials) {
    return await data.getUser("/users", credentials).then((res) => {
      setCookies("authUser", res.user.firstName);
      return res;
    });
  }
  function signOut() {
    removeCookies("authUser");
  }

  const [values] = useState({ data, cookie, actions: { signIn, signOut } });

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
