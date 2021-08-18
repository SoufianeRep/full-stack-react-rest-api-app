import React from "react";
import Header from "./components/Header";
import Course from "./components/Courses";

const App = () => {
  // fetch("http://localhost:5000/api/courses").then((res) => {
  //   console.log(res.json());
  // });
  return (
    <>
      <Header />
      <Course />
    </>
  );
};

export default App;
