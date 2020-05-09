import * as React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import NavBar from '../nav/NavBar';
import { WaterProps } from '../experimentPages/profile/water/WaterProps';
import { SimulationParameter } from '../experimentPages/profile/simParams/SimulationParameter';
import { ContaminantProps } from '../databasePages/contaminant/contaminant/ContaminantProps';
import { FixedBedProps } from '../experimentPages/profile/bed/FixedBedProps';
import { AdsorbentDatabase } from '../databasePages/adsorbent/AdsorbentDatabase';
import { AdsorptionMechanisms } from '../databasePages/contaminant/adsorption/AdsorptionMechanisms';
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

                    {/* deprecated */}
                    <Route path={`${match.path}/settings/water/prop`}>
                        <WaterProps />
                    </Route>
                    <Route path={`${match.path}/settings/components/adsorb`}>
                        <AdsorptionMechanisms />
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
