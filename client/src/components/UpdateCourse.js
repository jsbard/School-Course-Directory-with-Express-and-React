import {React, Component} from 'react';

class UpdateCourse extends Component {

    state = {
        course: {},
        author: "",
        name: "",
        courseTitle: "",
        courseDescription: "",
        estimatedTime: "",
        materialsNeeded: ""
    }

    componentDidMount() {
        const { context } = this.props;
        const id = this.props.match.params.id;
        context.actions.getCourse(id)
            .then(res => {
                this.setState({
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

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const { context } = this.props;
        const title = document.getElementById("courseTitle").value;
        const description = document.getElementById("courseDescription").value;
        const estimatedTime = document.getElementById("estimatedTime").value;
        const materialsNeeded = document.getElementById("materialsNeeded").value;
        const user = context.authenticatedUser;
        const id = this.props.match.params.id;

        const course = {
            title: title,
            description: description,
            estimatedTime: estimatedTime,
            materialsNeeded: materialsNeeded
        }

        context.actions.updateCourse(course, id, user);
        this.props.history.push("/courses");

    }


    cancel = () => {
        this.props.history.push("/courses");
    }
}

export default UpdateCourse;
