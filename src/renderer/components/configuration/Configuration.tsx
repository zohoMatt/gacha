import * as React from 'react';
import { BrowserRouter, Switch, useRouteMatch } from 'react-router-dom';

import NavBar from '../nav/NavBar';

const ConfigurationPage: React.FunctionComponent = () => {
    const match = useRouteMatch();
    return (
        <div>
            <NavBar />
            <Switch />
        </div>
    );
};
