import {React, Component} from 'react';

class CreateCourse extends Component {

    state = {
        errors: null
    }

    render() {
        return (
            <div id="root">
                <main>
                    <div className="wrap">
                        <h2>Create Course</h2>
                        <div className="validation--errors">
                            <h3>Validation Errors</h3>
                            <ul>
                                <li>Please provide a value for "Title"</li>
                                <li>Please provide a value for "Description"</li>
                            </ul>
                        </div>
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

                                        <label htmlFor="materialsNeeded">Materials Needed (enter materials separated by *)</label>
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
        const title = document.getElementById("courseTitle").value;
        const description = document.getElementById("courseDescription").value;
        const estimatedTime = document.getElementById("estimatedTime").value;
        const materialsNeeded = document.getElementById("materialsNeeded").value;
        const user = context.authenticatedUser;

        const course = {
            title: title,
            description: description,
            estimatedTime: estimatedTime,
            materialsNeeded: materialsNeeded,
            userId: user
        }

        const test = await context.actions.createCourse(course, user);
        console.log(test);

    }


    cancel = () => {
        this.props.history.push("/courses");
    }
}

export default CreateCourse;
