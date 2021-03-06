import {React, Component} from 'react';

class UpdateCourse extends Component {

    // Initial state
    state = {
        user: null,
        course: {},
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
                    author: `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`,
                    courseTitle: res.title,
                    courseDescription: res.description,
                    estimatedTime: res.estimatedTime,
                    materialsNeeded: res.materialsNeeded
                })
            });
    }

    render() {

        return (
            <div id="root">
                <main>
                    <div className="wrap">
                        <h2>Update Course</h2>
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
                                    <input id="courseTitle" name="courseTitle" type="text" value={this.state.courseTitle} onChange={e => this.change(e)}/>
                                        <p>By {this.state.author}</p>

                                        <label htmlFor="courseDescription">Course Description</label>
                                        <textarea id="courseDescription" name="courseDescription" value={this.state.courseDescription} onChange={e => this.change(e)}></textarea>
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input id="estimatedTime" name="estimatedTime" type="text"  value={this.state.estimatedTime} onChange={e => this.change(e)}/>

                                        <label htmlFor="materialsNeeded">Materials Needed</label>
                                        <textarea id="materialsNeeded"
                                                  name="materialsNeeded" value={this.state.materialsNeeded} onChange={e => this.change(e)}></textarea>
                                </div>
                            </div>
                            <button className="button" type="submit" onClick={(e) => {e.preventDefault(); this.submit();}}>Update Course</button>
                            <button className="button button-secondary"
                                    onClick={this.cancel}>Cancel
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        )
    }

    // Change event to handle input change
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    // Submit course update form
    submit = async () => {
        const { context } = this.props;
        // Get values of inputs
        const title = document.getElementById("courseTitle").value;
        const description = document.getElementById("courseDescription").value;
        const estimatedTime = document.getElementById("estimatedTime").value;
        const materialsNeeded = document.getElementById("materialsNeeded").value;
        const user = context.authenticatedUser;
        const id = this.props.match.params.id;

        // Bundle input values into object
        const course = {
            title: title,
            description: description,
            estimatedTime: estimatedTime,
            materialsNeeded: materialsNeeded
        }

        // Redirect to courses is server response is OK,
        // otherwise receive the errors and set state to render errors in DOM
        const res = await context.actions.updateCourse(course, id, user);
        if (res === undefined){
            this.props.history.push("/");
        } else if (res.message){
            this.setState({
                errors: res.message
            })
        }
    }

    cancel = () => {
        this.props.history.push(`/courses/${this.props.match.params.id}`);
    }
}

export default UpdateCourse;
