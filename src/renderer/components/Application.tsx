import { hot } from 'react-hot-loader/root';
import * as React from 'react';

// We must use HashRouter otherwise it would cause the problem like https://github.com/gaearon/react-hot-loader/issues/620
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import WelcomePage from './welcome/WelcomePage';
import ConfigurationPage from './configuration/ConfigurationPage';

const styles = require('./Application.less');
const headPic = require('../assets/images/pfas.png');

const Application = () => (
    <Router basename="/">
        <div className={styles.app}>
            <Switch>
                <Route path="/workspace">
                    <ConfigurationPage />
                </Route>
                <Route path="/">
                    <WelcomePage src={headPic} goto="/workspace" />
                </Route>
            </Switch>
        </div>
    </Router>
);

export default hot(Application);
