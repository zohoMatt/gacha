import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import WelcomePage from './welcome/WelcomePage';
import ConfigurationPage from './configuration/ConfigurationPage';
import { store } from '../app';

const styles = require('./Application.less');
const headPic = require('../assets/images/pfas.png');

const Application = () => (
    <Provider store={store}>
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
    </Provider>
);

export default hot(Application);
