import { createContext, useState } from "react";
import Data from "../data";

export const Context = createContext();

const data = new Data();
export const Provider = ({ children }) => {
  const [courses, setCourses] = useState(data.getCourses());

  return <Context.Provider value={courses}>{children}</Context.Provider>;
};
