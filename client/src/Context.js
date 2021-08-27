import React, { Component } from 'react';
import Data from "./Data";
import Cookies from "js-cookie";

const Context = React.createContext();

export class Provider extends Component {

    state = {
        authenticatedUser: null
    };

    constructor() {
        super();
        this.data = new Data();

        this.cookie = Cookies.get("authenticatedUser");
        this.state = {
            authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null,
        }
    }

    render() {

        const { authenticatedUser } = this.state;

        const value = {
            authenticatedUser: authenticatedUser,
            data: this.data,
            formErrors: {},
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
                createCourse: this.createCourse,
                getCourse: this.getCourse,
                updateCourse: this.updateCourse,
                deleteCourse: this.deleteCourse
            },
        }

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }


    signIn = async (username, password) => {
        const user = await this.data.getUser(username, password);
        if (user !== null) {
            this.setState(() => {
                return {
                    authenticatedUser: user,
                    authenticatedPassword: password
                };
            });
            this.state.authenticatedUser.password = password;
            Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 1});
            console.log(user);
        }
        return user;
    }

    signOut = () => {
        this.setState({ authenticatedUser: null });
        Cookies.remove("authenticatedUser");
    }

    getCourse = async (id, user) => {
        return await this.data.getCourse(id);
    }

    createCourse = async (course, user) => {
        return await this.data.createCourse(course, user)
            .then(res => {
                if (res.message){
                    return res.message;
                }
            });
    }

    updateCourse = async (course, id, user) => {
        return await this.data.updateCourse(course, id, user);
    }

    deleteCourse = (id, user) => {
        this.data.deleteCourse(id, user);
    }

}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
}
