import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Context } from "../context/Context";
import useForm from "../utils/useForm";

const UserSignUp = () => {
  const { data, actions } = useContext(Context);
  const history = useHistory();
  const { values, handleChange, handleSubmit } = useForm(submit);
  const [err, setErr] = useState([]);

  function submit() {
    const body = {
      ...values,
    };

    data
      .createUser("/users", body)
      .then(() => {
        actions.signIn({
          username: values.emailAddress,
          password: values.password,
        });
      })
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        const { status } = error.response;
        if (status === 400) {
          setErr(error.response.data.errors);
        } else {
          history.push("/error");
        }
      });
  }

  const cancle = () => {
    history.push("/");
  };

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      {err.length > 0 && (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {err.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={handleChange}
          value={values.firstName || ""}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={handleChange}
          value={values.lastName || ""}
        />
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
          Sign Up
        </button>
        <button className="button button-secondary" onClick={cancle}>
          Cancel
        </button>
      </form>
      <p>
        Already have a user account? Click here to <a href="/signin">sign in</a>
        !
      </p>
    </div>
  );
};

export default UserSignUp;
