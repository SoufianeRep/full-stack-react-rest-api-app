import { useState } from "react";

/**
 * React custom hook to manage different form controlled components
 * and actions (state, changes, submissions, errors)
 *
 * @param {function} Callback function for form submission to server
 * @returns [{object}] Object containing Form state with controlled values and different actions for changes, submissions and errors
 */
const useForm = (cb) => {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cb();
  };

  return { values, setValues, handleChange, handleSubmit };
};

export default useForm;
