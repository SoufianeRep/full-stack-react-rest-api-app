import React, { useContext, useEffect, useState } from "react";
import ReactMarkDown from "react-markdown";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

export default function CourseDetail() {
  const { data, credentials } = useContext(Context);
  const { id } = useParams();
  const history = useHistory();
  const [course, setCourse] = useState({});
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    data
      .getCourse("/courses/" + id)
      .then((course) => {
        if (course) {
          setCourse(course);
          if (course.user.id === parseInt(localStorage.userId)) {
            setIsOwner(true);
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          history.push("/notfound");
        } else {
          history.push("/error");
        }
      });
    //eslint-disable-next-line
  }, []);

  const deleteCourse = () => {
    data.deleteCourse("/courses/" + id, credentials).then(() => {
      history.push("/");
    });
  };

  return (
    <>
      <div className="actions--bar">
        <div className="wrap">
          {isOwner && (
            <>
              <Link className="button" to={`/courses/${id}/update`}>
                Update Course
              </Link>
              <button className="button" onClick={deleteCourse}>
                Delete Course
              </button>
            </>
          )}

          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>
                By{" "}
                {course.user &&
                  `${course.user.firstName} ${course.user.lastName}`}
              </p>

              <ReactMarkDown>{course.description}</ReactMarkDown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkDown>{course.materialsNeeded}</ReactMarkDown>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
