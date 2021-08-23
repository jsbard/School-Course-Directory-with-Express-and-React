import {React, Component} from 'react';
import Header from "./Header";

class UserSignIn extends Component {

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
                                            onClick={() => this.props.history.push("/signin")}>Cancel
                                    </button>
                        </form>
                        <p>Don't have a user account? Click here to <a href="sign-up.html">sign up</a>!</p>

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
        const username = document.getElementById("emailAddress").value;
        const password = document.getElementById("password").value;
        context.actions.signIn(username, password)
            .then( user => {
                if (user === null) {
                    return {errors: ["Sign in was unsuccessful"]}
                } else {
                    this.props.history.push("/courses");
                    console.log(`SUCCESS! ${username} is now signed in!`);
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
