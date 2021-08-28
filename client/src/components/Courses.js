import {React, Component} from 'react';
import config from "../config";
import axios from "axios";


class Courses extends Component {

    // Initial state
    state = {
        courses: []
    }

    // Get all courses from api
    getCourses =  () => {
        const courses = axios.get(config.apiBaseUrl + "/courses");
        return courses;
    }

    // Push courses to state
    componentDidMount() {
        this.getCourses()
            .then(res => {
                this.setState({
                    courses: res.data
                })
            });
    }

    render() {
        // Loop over all courses and render each as it's own clickable div
        return (
            <div id="root">
                <main>
                    <div className="wrap main--grid">
                        { this.state.courses.map(course => (
                            <a className="course--module course--link" href={`/courses/${course.id}`}>
                                <h2 className="course--label">Course</h2>
                                <h3 className="course--title">{course.title}</h3>
                            </a>
                            ))}

                        <a className="course--module course--add--module" href="/courses/create">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                             viewBox="0 0 13 13" className="add"><polygon
                            points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                        </a>
                    </div>
                </main>
            </div>
        )
    }
}
export default Courses;
