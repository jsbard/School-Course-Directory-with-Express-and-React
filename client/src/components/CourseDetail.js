import {React, Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import ReactMarkdown from "react-markdown";

class CourseDetail extends Component {
    // Initial state
    state = {
        user: {},
        course: {},
        courseCreatorEmail: "",
        author: "",
        name: "",
        courseTitle: "",
        courseDescription: "",
        estimatedTime: "",
        materialsNeeded: "",
        errors: null

    }

    // Get specific course from url "id" parameter and push to state
    componentDidMount() {
        const { context } = this.props;
        const id = this.props.match.params.id;
        context.actions.getCourse(id)
            .then(res => {
                this.setState({
                    user: context.authenticatedUser,
                    course: res,
                    courseCreatorEmail: res.User.emailAddress,
                    author: `${res.firstName} ${res.lastName}`,
                    courseTitle: res.title,
                    courseDescription: res.description,
                    estimatedTime: res.estimatedTime,
                    materialsNeeded: res.materialsNeeded
                })
            });
    }


    render() {
        const author = this.state.author;
        const description = this.state.courseDescription;
        const estimatedTime = this.state.estimatedTime;
        const materialsNeeded = this.state.materialsNeeded;
        const courseCreatorEmail = this.state.courseCreatorEmail;
        let materials = "";
        if (materialsNeeded !== "") {
            materials = materialsNeeded;
        }


        // Render the specific course if user is logged in
            return (
                <div id="root">
                    <main>
                        <div className="actions--bar">
                            <div className="wrap">
                                { // Render update and delete buttons only if the course is owned by the logged in user
                                    this.state.user && (
                                        ( this.state.user.emailAddress === courseCreatorEmail) && (
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
                                        <h4 className="course--name">{this.state.courseTitle}</h4>
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
    }

    // Delete Course
    delete = () => {
        const { context } = this.props;
        const id = this.props.match.params.id;
        const loggedInUser = context.authenticatedUser;

        context.actions.deleteCourse(id, loggedInUser);
        this.props.history.push("/");
    }
}


export default CourseDetail;
