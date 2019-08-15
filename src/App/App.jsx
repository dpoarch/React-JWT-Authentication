import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history } from '@/_helpers';
import { userService, authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { LoginPage } from '@/LoginPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          currentUser: authenticationService.currentUserValue,
          users: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));

    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-primary">
                            <ul className="navbar-nav mr-auto">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                  {currentUser.firstName} {currentUser.lastName}
                                </a>
                                <div class="dropdown-menu">
                                  <a class="dropdown-item" href="#">Profile</a>
                                  <a class="dropdown-item" href="#">Settings</a>
                                  <a class="dropdown-item" onClick={this.logout}>Logout</a>
                                </div>
                              </li>

                            </ul>
                        </nav>
                    }
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <Route path="/login" component={LoginPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export { App };
