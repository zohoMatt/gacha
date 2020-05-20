import 'mobx-react-lite/batchingForReactDom';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { message } from 'antd';
import Application from './components/Application';
import { DataStorage } from '../utils/storage/storage';
import { Store } from './store/init';
import {
    AdsorbentData,
    AdsorbentParams,
    ContaminantData,
    ExpProfileParams,
    ProfileData
} from '../utils/storage/types';

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
export const ContaminantDatabase = new DataStorage<ContaminantData>({
    filename: 'contaminants.pfast'
});
export const AdsorbentDatabase = new DataStorage<AdsorbentData>({
    filename: 'adsorbents.pfast'
});
export const ExpProfilesStorage = new DataStorage<ProfileData>({
    filename: 'exp-profiles.pfast'
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
