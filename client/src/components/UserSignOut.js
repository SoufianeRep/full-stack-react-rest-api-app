import React, { useContext, useEffect } from "react";
import { Context } from "../context/Context";
import { Redirect } from "react-router";

const UserSignOut = () => {
  const { actions } = useContext(Context);

  useEffect(() => {
    actions.signOut();
  }, [actions]);

  return <Redirect to="/signin" />;
};

export default UserSignOut;
