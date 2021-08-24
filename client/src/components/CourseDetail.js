import {React, Component} from 'react';
import axios from "axios";
import config from "../config";

class CourseDetail extends Component {

    constructor(props) {
        super(props);

        axios.get(config.apiBaseUrl + "/courses/" + this.props.match.params.id)
            .then(res => {
                this.setState({
                    courses: res.data,
                    user: res.data.User,
                    materials: res.data.materialsNeeded
                })
            });
    }

    state = {
        courses: {},
        user: {},
        materials: []
    }

    render() {
        console.log(this.state.courses);
        const title = this.state.courses.title;
        const author = `${this.state.user.firstName} ${this.state.user.lastName}`;
        const description = this.state.courses.description;
        const estimatedTime = this.state.courses.estimatedTime;
        const materialsNeeded = JSON.stringify(this.state.materials);
        let materials = "";
        if (materialsNeeded !== "") {
            materials = materialsNeeded.split("*");
        }

        return (
            <div id="root">
                <main>
                    <div className="actions--bar">
                        <div className="wrap">
                            <a className="button" href="update-course.html">Update Course</a>
                            <a className="button" href="#">Delete Course</a>
                            <a className="button button-secondary" href="index.html">Return to List</a>
                        </div>
                    </div>

                    <div className="wrap">
                        <h2>Course Detail</h2>
                        <form>
                            <div className="main--flex">
                                <div>
                                    <h3 className="course--detail--title">Course</h3>
                                    <h4 className="course--name">{this.state.courses.title}</h4>
                                    <p>By {author}</p>

                                    <p>{description}</p>
                                </div>
                                <div>
                                    <h3 className="course--detail--title">Estimated Time</h3>
                                    <p>{estimatedTime}</p>

                                    <h3 className="course--detail--title">Materials Needed</h3>
                                    <ul className="course--detail--list">
                                        {materials[0] !== "null" &&
                                            materials.map(material => (
                                                (material !== "\"") && (
                                            <li>{material}</li>
                                                )))}
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}

export default CourseDetail;
