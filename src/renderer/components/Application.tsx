import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Provider } from 'mobx-react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import WelcomePage from './welcome/WelcomePage';
import ConfigurationPage from './configuration/ConfigurationPage';
import { store } from '../app';

const styles = require('./Application.less');
const coverPic = require('../assets/images/cover-page.jpg');

const Application = () => (
    <Provider store={store}>
        <Router basename="/">
            <div className={styles.app}>
                <Switch>
                    <Route path="/workspace">
                        <ConfigurationPage />
                    </Route>
                    <Route path="/">
                        <WelcomePage
                            img={coverPic}
                            goto="/workspace"
                            repo="https://github.com/zohoMatt/gacha"
                            mail="mattzuo12@gmail.com"
                            />
                    </Route>
                </Switch>
            </div>
        </Router>
    </Provider>
);

export default hot(Application);
