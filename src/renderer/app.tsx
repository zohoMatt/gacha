import 'mobx-react-lite/batchingForReactDom';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { message } from 'antd';
import Application from './components/Application';
import { Storage } from '../utils/localStore';
import { Store } from './store/init';

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Render components
const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        mainElement
    );
};

// Config message
message.config({
    maxCount: 5,
    top: 240
});
// Init storage and import data
export const DataFileStorage = new Storage({ filename: 'pfast-user-data' });

/* eslint-disable import/no-mutable-exports */
let store: any = null;

DataFileStorage.import().then(() => {
    // Functions that dependent on data import

    // Init Store here to prevent HMR error
    store = new Store();

    // Render
    render(Application);
});

export { store };
/* eslint-enable import/no-mutable-exports */
