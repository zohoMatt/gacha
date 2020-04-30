import { action } from 'mobx';
import { v4 } from 'uuid';

import { BasicTableWithEditStore } from './types';

export interface PsdmParams {
    totalRunTime: number; // d
    firstPointDisplayed: number; // d
    timeStep: number; // d
    numOfAxialElms: number;
    axialCollocatPts: number;
    radialCollocatPts: number;
}

export class PsdmStore extends BasicTableWithEditStore<PsdmParams> {
    public STORE_NAME = 'PSDMStore';

    constructor() {
        super(['database', 'simParams', 'psdm']);
    }

    @action
    public createNew() {
        this.changesHappen(false);
        this.activeKey = v4();
        this.activeRecord = {
            name: '',
            description: '',
            totalRunTime: 0,
            firstPointDisplayed: 0,
            timeStep: 0,
            numOfAxialElms: 0,
            axialCollocatPts: 0,
            radialCollocatPts: 0
        };
    }
}
