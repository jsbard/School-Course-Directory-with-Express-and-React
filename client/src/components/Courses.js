import {React, Component} from 'react';
import config from "../config";
import axios from "axios";


class Courses extends Component {

    state = {
        courses: []
    }

    getCourses =  () => {
        const courses = axios.get(config.apiBaseUrl + "/courses");
        return courses;
    }

    componentDidMount() {
        this.getCourses()
            .then(res => {
                this.setState({
                    courses: res.data
                })
            });
    }

    render() {

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
                    </div>
                </main>
            </div>
        )
    }
}
export default Courses;
