import React, { useContext, useState } from "react";
import useForm from "../utils/useForm";
import { Context } from "../context/Context";
import { useHistory } from "react-router";

const CreateCourse = () => {
  const { values, handleChange, handleSubmit } = useForm(submit);
  const [err, setErr] = useState([]);
  const history = useHistory();
  const context = useContext(Context);

  function submit() {
    //Post request's body
    const body = {
      ...values,
      userId: 1, //to change later
    };
    context.data
      .createCourse("/courses", body)
      .then((res) => {
        history.push("/");
      })
      .catch((error) => {
        setErr(error.response.data.errors);
      });
  }

  const cancel = () => {
    history.push("/");
  };

  return (
    <div className="wrap">
      <h2>Create Course</h2>

      {err.length !== 0 && (
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
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="title"
              type="text"
              value={values.title || ""}
              onChange={handleChange}
            />

            <p>By Joe Smith</p>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="description"
              value={values.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={values.estimatedTime || ""}
              onChange={handleChange}
            />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              value={values.materialsNeeded}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <button className="button" type="submit">
          Create Course
        </button>
        <button className="button button-secondary" onClick={cancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
