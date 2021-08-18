import { createContext, useState } from "react";
import Data from "../data";

export const Context = createContext();

export const Provider = ({ children }) => {
  const data = new Data();
  const [courses, setCourses] = useState(data.getCourses());

  return <Context.Provider value={courses}>{children}</Context.Provider>;
};
