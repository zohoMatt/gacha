import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import WelcomePage from './welcome/WelcomePage';
import ConfigPage from './configuration/ConfigPage';

const styles = require('./Application.less');
const headPic = require('../assets/images/pfas.png');

const Application = () => (
    <Router basename="/">
        <div className={styles.app}>
            <Switch>
                <Route path="/config">
                    <ConfigPage />
                </Route>
                <Route path="/">
                    <WelcomePage src={headPic} goto="/config" />
                </Route>
            </Switch>
        </div>
    </Router>
);

export default hot(Application);
