import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../context/Context";

export default function Courses() {
  const { data } = useContext(Context);
  const [courses, setCourses] = useState([]);
  const history = useHistory();

  useEffect(() => {
    data
      .getCourse("/courses")
      .then((courses) => {
        setCourses(courses);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          history.push("/error");
        }
      });
  }, [data, history]);

  return (
    <div className="wrap main--grid">
      {courses.map((course) => (
        <Link
          to={`/courses/${course.id}`}
          key={course.id}
          className="course--module course--link"
        >
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </Link>
      ))}

      <Link className="course--module course--add--module" to="/courses/create">
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </Link>
    </div>
  );
}
