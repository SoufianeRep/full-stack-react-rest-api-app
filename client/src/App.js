import React from "react";
import { Switch, Route } from "react-router-dom";

//App components Imports
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route exact path="/courses/create" component={CreateCourse} />
          <Route exact path="/courses/:id/update" component={UpdateCourse} />
          <Route exact path="/courses/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signout" component={UserSignOut} />
        </Switch>
      </main>
    </>
  );
};

export default App;
