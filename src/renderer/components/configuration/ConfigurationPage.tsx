import * as React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import NavBar from '../nav/NavBar';
import { WaterProps } from './water/WaterProps';
import { SimulationParameter } from './simParams/SimulationParameter';
import PollutantProps from './pollutant/PollutantProps';
import { FixedBedProps } from './bed/FixedBedProps';

const styles = require('./ConfigurationPage.module.less');

const ConfigurationPage: React.FunctionComponent = () => {
    const match = useRouteMatch();
    return (
        <div className={styles.container}>
            <NavBar />
            <div className={styles.mainConfigArea}>
                <Switch>
                    <Route path={`${match.path}/settings/water/prop`}>
                        <WaterProps />
                    </Route>
                    <Route path={`${match.path}/settings/components/prop`}>
                        <PollutantProps />
                    </Route>
                    <Route path={`${match.path}/settings/sim/psdm`}>
                        <SimulationParameter />
                    </Route>
                    <Route path={`${match.path}/settings/bed/prop`}>
                        <FixedBedProps />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default ConfigurationPage;
