import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Header from "./Header";

export default class UserSignUp extends Component {
    state = {
        value: "",
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        errors: [],
    }

    render() {
        let {
            firstName,
            lastName,
            emailAddress,
            password,
            errors,
        } = this.state;

        return (
            <div id="root">
                <main>
                    {errors.length > 0 &&
                    <div className="validation-errors">
                        <ul>
                            {this.state.errors.map((error, i) => <li key={i}>{error}</li>)}
                            {window.scrollTo(0, 0)}
                        </ul>
                    </div>
                    }
                    <div className="form--centered">
                        <h2>Sign Up</h2>
                        <form>
                            <label htmlFor="firstName">First Name</label>
                            <input id="firstName" name="firstName" type="text" />
                                <label htmlFor="lastName">Last Name</label>
                                <input id="lastName" name="lastName" type="text" />
                                    <label htmlFor="emailAddress">Email Address</label>
                                    <input id="emailAddress" name="emailAddress" type="email" />
                                        <label htmlFor="password">Password</label>
                                        <input id="password" name="password" type="password" />
                                            <button className="button" type="submit" onClick={(e) => {e.preventDefault(); this.submit()}}>Sign Up</button>
                                            <button className="button button-secondary" onClick={() => this.props.history.push("/")}>
                                                    Cancel
                                            </button>
                        </form>
                        <p>Already have a user account? Click here to <a href="/signin">sign in</a>!</p>
                    </div>
                </main>
            </div>
        );
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

        this.state.firstName = document.getElementById("firstName").value;
        this.state.lastName = document.getElementById("lastName").value;
        this.state.emailAddress = document.getElementById("emailAddress").value;
        this.state.password = document.getElementById("password").value;

        const { context } = this.props;

        let { firstName, lastName, emailAddress, password } = this.state;

        const user = {
            firstName,
            lastName,
            emailAddress,
            password

        };

        context.data.createUser(user)
            .then(errors => {
                if (errors.length) {
                    this.setState({errors});
                } else {
                    console.log(`${user.emailAddress} is successfully signed up and authenticated!`);
                }
            })
            .catch (err => {
                console.log(err);
                this.props.history.push('/error');
            });

    }

    cancel = () => {
        this.props.history.push("/");
    }

}
