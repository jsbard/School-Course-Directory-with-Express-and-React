import './App.css';
import withContext from './Context';
import "./styles/global.css";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./components/NotFound";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import { useEffect } from "react";

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {

  return (
      <BrowserRouter>
        <div className="App">
            <HeaderWithContext />
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/courses" />} />
                    <Route path="/courses" component={Courses} />
                    <PrivateRoute path="/create-course" component={CreateCourse} />
                    <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
                    <Route path="/courses/:id" component={CourseDetail} />
                    <Route path="/signup" component={UserSignUpWithContext} />
                    <Route path="/signin" component={UserSignInWithContext} />
                    <Route path="/signout" component={UserSignOutWithContext} />
                    <Route component={NotFound} />
                </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
