import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import WelcomePage from './welcome/WelcomePage';
import NavBar from './nav/NavBar';

const styles = require('./Application.less');
const headPic = require('../assets/images/pfas.png');

const Application = () => (
    <Router basename="/">
        <div className={styles.app}>
            <Switch>
                <Route path="/workspace">
                    <NavBar />
                </Route>
                <Route path="/">
                    <WelcomePage src={headPic} goto="/workspace" />
                </Route>
            </Switch>
        </div>
    </Router>
);

export default hot(Application);
