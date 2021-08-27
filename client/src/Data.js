import config from './config';

export default class Data {

    // Default method for making requests to api
    // Please note that some components in this app use axios rather than calling this method using context
    api(path, method = 'GET', body, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;
        const options = {
            method,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        };


        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);
    }

   //getUser method returns specific user
    async getUser(username, password) {
        const response = await this.api(`/users`, 'GET', null, true, {username, password});
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    // createUser creates a new user
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    // createCourse creates a new course
    async createCourse (course, user) {
        const username = user.emailAddress;
        const password = user.password;
        const response = await this.api("/courses", "POST", course, true, {username, password});
        if (response.status === 201){
            return [];
        } else if (response.status === 400) {
            return response.json();
        } else {
            throw new Error();
        }
    }

    // updateCourse updates an existing course
    async updateCourse (course, id, user) {
        const username = user.emailAddress;
        const password = user.password;
        const response = await this.api("/courses/" + id, "PUT", course, true, {username, password});
        if (response.status === 201){
            return [];
        } else if (response.status === 400) {
            return response.json();
        }
    }

    // deleteCourse deletes an existing course
    async deleteCourse (id, user) {
        const username = user.emailAddress;
        const password = user.password;
        const response = await this.api("/courses/" + id, "DELETE", null, true, {username, password});
        if (response.status === 201){
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        }
    }

    // Get course retrieves a specific course via the course id
    async getCourse(id) {
        const response = await this.api(`/courses/${id}`, 'GET', null, false);
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }
}
