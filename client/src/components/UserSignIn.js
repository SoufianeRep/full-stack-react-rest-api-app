import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Context } from "../context/Context";
import useForm from "../utils/useForm";

const UserSignIn = () => {
  const { actions } = useContext(Context);
  const history = useHistory();
  const { values, handleChange, handleSubmit } = useForm(submit);
  const [err, setErr] = useState([]);

  function submit() {
    const credentials = {
      username: values.emailAddress,
      password: values.password,
    };
    actions
      .signIn(credentials)
      .then((res) => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const cancle = () => {
    history.push("/");
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>

      {err.length > 0 && (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {err.map((x, i) => {
              <li key={i}>{x}</li>;
            })}
          </ul>
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
