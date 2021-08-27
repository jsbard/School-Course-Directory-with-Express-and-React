import {React, Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import config from "../config";
import {Redirect} from "react-router-dom";
import ReactMarkdown from "react-markdown";

class CourseDetail extends Component {

    constructor(props) {
        super(props);

        axios.get(config.apiBaseUrl + "/courses/" + this.props.match.params.id)
            .then(res => {
                try {
                    this.setState({
                        courses: res.data,
                        user: res.data.User,
                        materials: res.data.materialsNeeded
                    })
                } catch (err) {
                    console.log(err);
                }
            });
    }

    state = {
        courses: {},
        user: {},
        materials: []
    }

    render() {
        const { context } = this.props;
        const author = `${this.state.user.firstName} ${this.state.user.lastName}`;
        const description = this.state.courses.description;
        const estimatedTime = this.state.courses.estimatedTime;
        const materialsNeeded = this.state.materials;
        let materials = "";
        if (materialsNeeded !== "") {
            materials = materialsNeeded;
        }

        if (this.state.user && context.authenticatedUser) {
            return (
                <div id="root">
                    <main>
                        <div className="actions--bar">
                            <div className="wrap">
                                {
                                    (this.state.user.emailAddress === context.authenticatedUser.emailAddress) && (
                                        <Fragment>
                                            <Link className="button"
                                                  to={`/courses/${this.props.match.params.id}/update`}>Update
                                                Course</Link>
                                            <Link className="button" onClick={(e) => {
                                                e.preventDefault();
                                                this.delete();
                                            }} href="#">Delete Course</Link>
                                            <Link className="button button-secondary" to="/">Return to List</Link>
                                        </Fragment>
                                    )
                                }
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

                                        <p>
                                            <ReactMarkdown>{description}</ReactMarkdown>
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="course--detail--title">Estimated Time</h3>
                                        <p>{estimatedTime}</p>

                                        <h3 className="course--detail--title">Materials Needed</h3>
                                        <ul className="course--detail--list">
                                            <ReactMarkdown>{materials}</ReactMarkdown>
                                        </ul>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            )
        } else {
            return <Redirect to="/notfound" />
        }
    }

    delete = () => {
        const { context } = this.props;
        const id = this.props.match.params.id;
        const loggedInUser = context.authenticatedUser;

        context.actions.deleteCourse(id, loggedInUser);
        this.props.history.push("/");
    }
}


export default CourseDetail;
