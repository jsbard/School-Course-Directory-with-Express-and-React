import {React} from 'react';

const Header = (props) => {
    const { context } = props;
    const authUser = context.authenticatedUser;

    // Render sign up and sign in links if user is logged out,
    // Render personlized welcome message and sign out link if user is signed in
    return(
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="/">Courses</a></h1>
                <nav>
                    {authUser === null ?
                    <ul className="header--signedout">
                        <li><a href="/signup">Sign Up</a></li>
                        <li><a href="/signin">Sign In</a></li>
                    </ul>
                    :
                    <ul>
                        <span>Welcome, {authUser.firstName}!</span>
                        <a className="signout" href="/signout">Sign Out</a>
                    </ul>
                    }
                </nav>
            </div>
        </header>
    )
}

export default Header;
