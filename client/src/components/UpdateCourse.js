import React, { useEffect, useContext, useState } from "react";
import { Context } from "../context/Context";
import { useParams, useHistory } from "react-router-dom";
import useForm from "../utils/useForm";

export default function UpdateCourse() {
  const context = useContext(Context);
  const history = useHistory();
  const { id } = useParams();
  const { values, setValues, handleChange, handleSubmit } = useForm(submit);
  const [err, setErr] = useState([]);

  useEffect(() => {
    context.data.getCourse("/courses/" + id).then((course) => {
      console.log(course);
      setValues(course);
    });
  }, []);

  function submit() {
    const body = {
      ...values,
    };

    context.data
      .updateCourse("/courses/" + id, body)
      .then(() => {
        history.push("/courses/" + id);
      })
      .catch((error) => {
        setErr(error.response.data.errors);
      });
  }

  const cancel = () => {
    history.push(`/courses/${id}`);
  };

  return (
    <div className="wrap">
      <h2>Update Course</h2>

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
            <p>##Name of Owner##</p>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="description"
              value={values.description || ""}
              onChange={handleChange}
            />
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
              value={values.materialsNeeded || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="button" type="submit">
          Update Course
        </button>
        <button className="button button-secondary" onClick={cancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
