import React, { useContext } from "react";
import { Context } from "./context/Context";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authorizedUser } = useContext(Context);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authorizedUser ? (
          <Component />
        ) : (
          <Redirect
            push
            to={{ pathname: "/signin", state: { from: location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
