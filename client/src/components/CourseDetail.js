import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Context } from "../context/Context";

export default function CourseDetail() {
  const context = useContext(Context);
  const { id } = useParams();
  const history = useHistory();
  const [course, setCourse] = useState({});

  useEffect(() => {
    context.data.getCourse("/courses/" + id).then((course) => {
      setCourse(course);
    });
  }, [id]);

  const deleteCourse = () => {
    context.data.deleteCourse("/courses/" + id).then(() => {
      history.push("/");
    });
  };

  return (
    <>
      <div className="actions--bar">
        <div className="wrap">
          <a className="button" href={`/courses/${id}/update`}>
            Update Course
          </a>
          <button className="button" onClick={deleteCourse}>
            Delete Course
          </button>
          <a className="button button-secondary" href="/">
            Return to List
          </a>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>{`By Joe Smith`}</p>

              <p>{course.description}</p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">{course.materialsNeeded}</ul>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
