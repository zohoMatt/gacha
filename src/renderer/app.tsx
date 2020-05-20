import 'mobx-react-lite/batchingForReactDom';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { message } from 'antd';
import Application from './components/Application';
import { DataStorage } from '../utils/storage/storage';
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
const DATA_VERSION = '0.1.0';
export const ContaminantDatabase = new DataStorage({
    filename: 'contaminants.pfast',
    defaultStore: { version: DATA_VERSION, data: [] }
});
export const AdsorbentDatabase = new DataStorage({
    filename: 'adsorbents.pfast',
    defaultStore: { version: DATA_VERSION, data: [] }
});
export const ExpProfilesStorage = new DataStorage({
    filename: 'exp-profiles.pfast',
    defaultStore: { version: '0.1.0', profiles: [] }
});

/* eslint-disable import/no-mutable-exports */
let store: any = null;

Promise.all(
    [ContaminantDatabase, AdsorbentDatabase, ExpProfilesStorage].map(storage => storage.import())
)
    .then(() => {
        // Functions that dependent on data import

        // Init Store here to prevent HMR error
        store = new Store();

        // Render
        render(Application);
    })
    .catch(console.error);

export { store };
/* eslint-enable import/no-mutable-exports */
