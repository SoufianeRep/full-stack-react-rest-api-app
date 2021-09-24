import React, { useContext, useState } from "react";
import { useHistory, Redirect } from "react-router";
import { Context } from "../context/Context";
import useForm from "../utils/useForm";

const UserSignIn = () => {
  const { actions, authorizedUser } = useContext(Context);
  const history = useHistory();
  const { values, handleChange, handleSubmit } = useForm(submit);
  const [err, setErr] = useState("");

  function submit() {
    const credentials = {
      username: values.emailAddress,
      password: values.password,
    };
    actions
      .signIn(credentials)
      .then(() => {
        history.goBack();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErr(
            "The supplied user credentials are invalid. Please try again."
          );
        } else {
          history.push("/error");
        }
      });
  }

  const cancle = () => {
    history.push("/");
  };

  return authorizedUser ? (
    <Redirect to="/" />
  ) : (
    <div className="form--centered">
      <h2>Sign In</h2>

      {err && (
        <div className="validation--errors">
          <h3>Incorrect username or password</h3>
          <ul>{err}</ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          onChange={handleChange}
          value={values.emailAddress || ""}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          value={values.password || ""}
        />
        <button className="button" type="submit">
          Sign In
        </button>
        <button className="button button-secondary" onClick={cancle}>
          Cancel
        </button>
      </form>
      <p>
        Don't have a user account? Click here to <a href="/signup">sign up</a>!
      </p>
    </div>
  );
};

export default UserSignIn;
