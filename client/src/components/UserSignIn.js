import {React, Component} from 'react';

class UserSignIn extends Component {

    // Initial state
    state = {
        username: '',
        password: '',
        errors: [],
    }

    render() {

        return (
            <div id="root">
                <main>
                    <div className="form--centered">
                        <h2>Sign In</h2>

                        <form>
                            <label htmlFor="emailAddress">Email Address</label>
                            <input id="emailAddress" name="emailAddress" type="email" />
                                <label htmlFor="password">Password</label>
                                <input id="password" name="password" type="password" />
                                    <button className="button" type="submit" onClick={(e) => {e.preventDefault(); this.submit();}}>Sign In</button>
                                    <button className="button button-secondary"
                                            onClick={() => this.props.history.push("/")}>Cancel
                                    </button>
                        </form>
                        <p>Don't have a user account? Click here to <a href="/signup">sign up</a>!</p>

                    </div>
                </main>
            </div>
        )
    }

    // Change event for inputs
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
        const { from } = this.props.location.state ||  { from: { pathname: "/courses" } };
        // Get username and password from input values
        const username = document.getElementById("emailAddress").value;
        const password = document.getElementById("password").value;

        // Set sign in error if user does not exist,
        // otherwise return signed in user to page they came from
        context.actions.signIn(username, password)
            .then( user => {
                if (user === null) {
                    return {errors: ["Sign in was unsuccessful"]}
                } else {
                    this.props.history.push(from);
                }
            })
            .catch(err => {
                console.log(err);
                this.props.history.push("/error");
            });
    }


    cancel = () => {
        this.props.history.push("/");
    }

}

export default UserSignIn;
