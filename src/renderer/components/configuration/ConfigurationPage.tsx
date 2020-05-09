import * as React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import NavBar from '../nav/NavBar';
import { ContaminantProps } from '../databasePages/contaminant/contaminant/ContaminantProps';
import { AdsorbentDatabase } from '../databasePages/adsorbent/AdsorbentDatabase';
import { ProfileSettings } from '../experimentPages/ProfileSettings';

const styles = require('./ConfigurationPage.module.less');

const ConfigurationPage: React.FunctionComponent = () => {
    const match = useRouteMatch();
    return (
        <div className={styles.container}>
            <NavBar />
            <div className={styles.mainConfigArea}>
                <Switch>
                    <Route path={`${match.path}/database/adsorbent`}>
                        <AdsorbentDatabase />
                    </Route>
                    <Route path={`${match.path}/database/contaminants`}>
                        <ContaminantProps />
                    </Route>
                    <Route path={`${match.path}/exp/profile`}>
                        <ProfileSettings />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default ConfigurationPage;
