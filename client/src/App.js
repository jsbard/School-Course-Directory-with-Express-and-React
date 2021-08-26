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

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

function App() {

  return (
        <div className="App">
            <HeaderWithContext />
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/courses" />} />
                    <Route exact path="/courses" component={Courses} />
                    <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
                    <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
                    <Route path="/courses/:id" component={CourseDetailWithContext} />
                    <Route path="/signup" component={UserSignUpWithContext} />
                    <Route path="/signin" component={UserSignInWithContext} />
                    <Route path="/signout" component={UserSignOutWithContext} />
                    <Route path="/coursenotfound" component={NotFound} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </div>
  );
}

export default App;
