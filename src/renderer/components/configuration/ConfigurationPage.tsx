import * as React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { NavBar, NAV_KEYS, ITEM_KEYS } from '../nav/NavBar';
import { ContaminantProps } from '../databasePages/contaminant/ContaminantProps';
import { AdsorbentDatabase } from '../databasePages/adsorbent/AdsorbentDatabase';
import { ProfileSettings } from '../experimentPages/ProfileSettings';
import { ProfileStatus } from '../plotPages/results/ProfileStatus';
import { GraphComparison } from '../plotPages/comparison/GraphComparison';
import { ErrorBoundary } from '../common/ErrorBoundary';

const styles = require('./ConfigurationPage.module.less');

const ConfigurationPage: React.FunctionComponent = () => {
    const match = useRouteMatch();
    return (
        <div className={styles.container}>
            <NavBar />
            <div className={styles.mainConfigArea}>
                <ErrorBoundary>
                    <Switch>
                        <Route path={`${match.path}/${NAV_KEYS.Database}/${ITEM_KEYS.Adsorbent}`}>
                            <AdsorbentDatabase />
                        </Route>
                        <Route path={`${match.path}/${NAV_KEYS.Database}/${ITEM_KEYS.Contaminant}`}>
                            <ContaminantProps />
                        </Route>
                        <Route path={`${match.path}/${NAV_KEYS.Experiment}/${ITEM_KEYS.Profile}`}>
                            <ProfileSettings />
                        </Route>
                        <Route path={`${match.path}/${NAV_KEYS.Plot}/${ITEM_KEYS.Status}`}>
                            <ProfileStatus />
                        </Route>
                        <Route path={`${match.path}/${NAV_KEYS.Plot}/${ITEM_KEYS.Comparison}`}>
                            <GraphComparison />
                        </Route>
                    </Switch>
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default ConfigurationPage;
