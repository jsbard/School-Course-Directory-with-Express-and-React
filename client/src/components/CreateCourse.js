import {React, Component} from 'react';

class CreateCourse extends Component {

    // Initial state
    state = {
        errors: null
    }

    render() {
        return (
            <div id="root">
                <main>
                    <div className="wrap">
                        <h2>Create Course</h2>
                        {this.state.errors !== null &&
                            <div className="validation--errors">
                                <h3>Validation Errors</h3>
                                <ul>
                                    <li>{this.state.errors}</li>
                                </ul>
                            </div>
                        }
                        <form>
                            <div className="main--flex">
                                <div>
                                    <label htmlFor="courseTitle">Course Title</label>
                                    <input id="courseTitle" name="courseTitle" type="text" />

                                        <p>By Joe Smith</p>

                                        <label htmlFor="courseDescription">Course Description</label>
                                        <textarea id="courseDescription" name="courseDescription"></textarea>
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input id="estimatedTime" name="estimatedTime" type="text" />

                                        <label htmlFor="materialsNeeded">Materials Needed</label>
                                        <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                                </div>
                            </div>
                            <button className="button" type="submit" onClick={(e) => {e.preventDefault(); this.submit();}}>Create Course</button>
                            <button className="button button-secondary"
                                    onClick={() => this.props.history.push("/")}>Cancel
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        )
    }

    submit = async () => {
        const { context } = this.props;
        // Get values of inputs
        const title = document.getElementById("courseTitle").value;
        const description = document.getElementById("courseDescription").value;
        const estimatedTime = document.getElementById("estimatedTime").value;
        const materialsNeeded = document.getElementById("materialsNeeded").value;

        const user = context.authenticatedUser;

        // Bundle course data into object
        const course = {
            title: title,
            description: description,
            estimatedTime: estimatedTime,
            materialsNeeded: materialsNeeded,
            userId: user
        }

        const res = await context.actions.createCourse(course, user);
        // If server response is OK, redirect to courses, otherwise set errors in state to render
        if (res === undefined){
            this.props.history.push("/");
        } else {
            this.setState({
                errors: res
            })
        }
    }

    cancel = () => {
        this.props.history.push("/courses");
    }
}

export default CreateCourse;
